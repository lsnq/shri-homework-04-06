import {promisify} from 'util';
import {exec} from 'child_process';
const execute = promisify(exec);

const gitCli = async (script) => {
    const {stdout, stderr} = await execute('git ' + script);
    return stdout;
};

const COMMANDS = {
    branch: 'branch --format="%(refname:short)"',
    tree: 'ls-tree --abbrev'
};

class GitData {
    async branches() {
        const data = await gitCli(COMMANDS.branch);
        return data.split('\n').filter((el) => Boolean(el));
    }
    async tree(name) {
        try {
            const treeRaw = await gitCli(COMMANDS.tree + ' ' + name);
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
        } catch (err) {
            console.log(err);
        }
    }
}

export default GitData;
