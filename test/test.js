/* eslint-disable */
const {git, branches, show, commits, COMMANDS} = require('../dist/git');
const assert = require('assert');

describe('GIT CLI', () => {
    it('должен вернуть информация о статусе репозитория', async () => {
        const status = await git('status');
        assert.equal(status.startsWith('On branch'), true)
    });

    describe('работа с ветками', () => {
        it('должен вернуть строку при выполнении команды git branch', async () => {
            const branchInfo = await git(COMMANDS.branch());
            assert.equal(typeof branchInfo, 'string')
        });

        it('должен вывести информацию о ветках', async () => {
            const branchInfo = await branches();
            assert.equal(branchInfo.length, -1)
        });
    });

});