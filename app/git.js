const {promisify} = require('util');
const {exec} = require('child_process');
const moment = require('moment');
const {repoFolder} = require('../app.config');
moment.locale('ru');
const execute = promisify(exec);

const git = async (cmd) => {
    const {stdout} = await execute(`git --git-dir=${repoFolder} --work-tree=${repoFolder} ${cmd}`);
    return stdout;
};

const COMMANDS = {
    branch: () => 'branch --format="%(if)%(HEAD)%(then)+++%(else)___%(end)%(refname:short)"',
    commits: (branch) => `log --format='%h___%an___%s___%at' --max-count=100 ${branch}`,
    show: (item, path) => `show ${item}:${path}`
};

async function branches() {
    const dataRaw = await git(COMMANDS.branch());
    const data = dataRaw.split('\n').filter((el) => Boolean(el));
    return data.map((el) => {
        return {
            isCurrent: el.startsWith('+++'),
            name: el.slice(3)
        };
    }).sort((a, b) => b.isCurrent);
}

async function commits(branch) {
    const dataRaw = await git(COMMANDS.commits(branch));
    const data = dataRaw.split('\n').filter((el) => Boolean(el));
    return data.map((el) => {
        const commit = el.split('___');
        const time = new Date(commit[3] * 1000);
        return {
            hash: commit[0],
            author: commit[1],
            message: commit[2],
            time: moment(time).format('DD MMMM в HH:mm')
        };
    });
}

async function show(branch, path = '') {
    try {
        const data = await git(COMMANDS.show(branch, path));
        const type = data.startsWith('tree') ? 'tree' : 'blob';
        const result = {
            path: path,
            type: type
        };
        if (type === 'tree') {
            const rows = data.split('\n');
            rows.shift();
            result.list = rows.filter((el) => Boolean(el));
        } else {
            result.fileContent = data;
        }
        return result;
    } catch (err) {
        return {error: err.stderr};
    }
}

module.exports = {
    git,
    branches,
    show,
    commits,
    COMMANDS
};
