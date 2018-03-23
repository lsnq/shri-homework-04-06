const {promisify} = require('util');
const {exec} = require('child_process');
const execute = promisify(exec);

const gitCli = async (script) => {
    const {stdout} = await execute('git ' + script);
    return stdout;
};

const COMMANDS = {
    branch: 'branch --format="%(if)%(HEAD)%(then)+++%(else)---%(end)%(refname:short)"',
    commits: (name) => `rev-list --branches=${name}* --format=oneline`,
    show: (branch, path) => `show ${branch}:${path}`
};

async function branches() {
    const dataRaw = await gitCli(COMMANDS.branch);
    const data = dataRaw.split('\n').filter((el) => Boolean(el));
    const branches = data.map((el) => {
        return {
            isCurrent: el.startsWith('+++'),
            name: el.slice(3)
        };
    });
    return branches;
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
    show
};
