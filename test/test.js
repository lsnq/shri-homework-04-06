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

        it('должен получить информацию о ветках', async () => {
            const branchArray = await branches();
            assert.ok(branchArray.length);
        });

        it('одна из веток должна быть текущей', async () => {
            const branchInfo = await branches();
            assert.ok(branchInfo.some((el) => el.isCurrent));
        });
    });

    describe('работа с коммитами', () => {
        it('может получить список коммитов для ветки master', async () => {
            const commitList = await commits('master');
            assert.ok(commitList.length);
        });

        it('может получить информацию о коммите по хэшу', async () => {
            const hash = await git('rev-parse HEAD');
            const commit = await git(`show ${hash}`);
            assert.ok(commit.startsWith('commit'));
        });
    });

    describe('работа с деревьями', () => {
        it('может получить дерево файлов по названию ветки', async () => {
            const tree = await show('master');
            assert.equal(tree.type, 'tree');
        });

        it('может получить дерево файлов по хэшу коммита', async () => {
            const hash = await git('rev-parse HEAD');
            const tree = await show(hash.trim());
            assert.equal(tree.type, 'tree');
        })
    })
});

describe('ROUTER', () => {

});