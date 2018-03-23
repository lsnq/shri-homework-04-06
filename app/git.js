import {promisify} from 'util';
import {exec} from 'child_process';
const execute = promisify(exec);

const gitCli = async (script) => {
    const {stdout} = await execute('git ' + script);
    return stdout;
};

const COMMANDS = {
    getBranches: 'branch --format="%(refname:short)"',
    getTree: 'ls-tree --abbrev'
};

class GitData {
    async branches() {
        const data = await gitCli(COMMANDS.getBranches);
        return data.split('\n').filter((el) => Boolean(el));
    }
    async tree(name) {
        const treeRaw = await gitCli(COMMANDS.getTree + ' ' + name);
        const treeArray = treeRaw.split('\n').filter((el) => Boolean(el));
        return treeArray.map((el) => {
            const chunks = el.split(/\s+/);
            chunks.shift();
            const item = {
                type: chunks[0],
                hash: chunks[1],
                name: chunks[2]
            };
            return item;
        });
    }
}

export default GitData;
