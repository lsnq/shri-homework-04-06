const {promisify} = require('util');
const {exec} = require('child_process');
const moment = require('moment');
moment.locale('ru');
const execute = promisify(exec);

const gitCli = async (script) => {
    const {stdout} = await execute(`git --git-dir=dist/repo/.git ${script}`);
    return stdout;
};

const COMMANDS = {
    branch: 'branch --format="%(if)%(HEAD)%(then)+++%(else)___%(end)%(refname:short)"',
    commits: (branch) => `log --format='%h___%an___%s___%at' ${branch}`,
    show: (branch, path) => `show ${branch}:${path}`
};

async function branches() {
    const dataRaw = await gitCli(COMMANDS.branch);
    const data = dataRaw.split('\n').filter((el) => Boolean(el));
    return data.map((el) => {
        return {
            isCurrent: el.startsWith('+++'),
            name: el.slice(3)
        };
    });
}

async function commits(branch) {
    const dataRaw = await gitCli(COMMANDS.commits(branch));
    const data = dataRaw.split('\n').filter((el) => Boolean(el));
    return data.map((el) => {
        const commit = el.split('___');
        const time = new Date(commit[3] * 1000);

        return {
            hash: commit[0],
            author: commit[1],
            message: commit[2],
            time: moment(time).format('DD MMMM в hh:mm')
        };
    });
}

async function show(branch, path = '') {
    try {
        const data = await gitCli(COMMANDS.show(branch, path));
        const type = data.startsWith('tree') ? 'tree' : 'blob';
        const result = {
            path: path,
            type: type
        };
        if (type === 'tree') {
            const rows = data.split('\n');
            rows.shift();
            result.list = rows.sort((a) => {
                return a.endsWith('/') ? -1 : 1;
            }).filter((el) => Boolean(el));
        } else {
            result.fileContent = data;
        }
        return result;
    } catch (err) {
        return {error: err};
    }
}

module.exports = {
    branches,
    show,
    commits
};
