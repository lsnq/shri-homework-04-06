/* eslint-disable */
const assert = require('assert');
const expect = require('chai').expect;

describe('На главной странице', () => {
    it('title должен соответствовать ожидаемому', function() {
        return this.browser
            .url('/')
            .getTitle()
            .then((title) => {
                return assert.equal(title, 'ветки');
            });
    });

    it('должна отображаться ветка по-умолчанию', function() {
        return this.browser
            .url('/')
            .isExisting('.list__branches .current')
            .then((exists) => {
                return assert.ok(exists, 'ветка по умолчанию не отображается')
            })
    });

    it('ветка master должна быть первой в списке', function() {
        return this.browser
            .url('/')
            .getText('.list__branches .list__item a')
            .then((a) => {
                return assert.equal(a[0], 'master')
            })
    });
});

describe('На странице ветки', () => {
    it('должна отображаться кнопка перехода на коммиты', function() {
        return this.browser
            .url('/branch/master/tree/')
            .isExisting('.button')
            .then((exists) => {
                return assert.ok(exists, 'Кнопка не появилась')
            })
    });

    it('должно отображаться дерево файлов', function() {
        return this.browser
            .url('/branch/master/tree/')
            .$$('.tree .list__item')
            .then((items) => {
                return expect(items.length).to.be.at.least(1)
            })
    });

    it('должны отображаться папки', function() {
        return this.browser
            .url('/branch/master/tree/')
            .isExisting('.tree .folder')
            .then((exists) => {
                return assert.ok(exists, 'папки не отображаются')
            })
    });

    it('должны отображаться файлы', function() {
        return this.browser
            .url('/branch/master/tree/')
            .isExisting('.tree .blob')
            .then((exists) => {
                return assert.ok(exists, 'файлы не отображаются')
            })
    });

    it('должны отображаться файлы только выбранной ветки', function() {
        return this.browser
            .url('/branch/master/tree/')
            .getText('.tree .blob')
            .then((blobs) => {
                return expect(blobs).include('only-master.txt')
            })
    });

    it('должна быть возможность подняться на уровень выше', function() {
        return this.browser
            .url('/branch/master/tree/folder2/folder2-2/')
            .isExisting('[href="/branch/master/tree/folder2/"]')
            .then((exists) => {
                return assert.ok(exists, 'нет ссылки на уровень вверх')
            })
    });
});


describe('На странице списка коммитов', () => {
    it('должна отображаться кнопка перехода к файлам', function() {
        return this.browser
            .url('/branch/master/commits/')
            .isExisting('.button')
            .then((exists) => {
                return assert.ok(exists, 'Кнопка не появилась')
            })
    });

    it('должен отображаться список коммитов', function() {
        return this.browser
            .url('/branch/master/commits/')
            .$$('.commits .list__item')
            .then((items) => {
                return expect(items.length).to.be.at.least(1)
            })
    });

    it('должны отображаться коммиты только выбранной ветки', function() {
        return this.browser
            .url('/branch/master/commits/')
            .getText('.commits .message')
            .then((messages) => {
                return expect(messages).include('Create only-master.txt')
            })
    });

    it('должна быть возможность вернуться на главную страницу', function() {
        return this.browser
            .url('/branch/master/tree/folder2/folder2-2/')
            .isExisting('[href="/"]')
            .then((exists) => {
                return assert.ok(exists, 'нет ссылки на главную страницу')
            })
    });
});

describe('На странице выбранного комита', () => {
    it('должно отображаться дерево файлов', function() {
        return this.browser
            .url('/commits/98c048c/tree/')
            .$$('.tree .list__item')
            .then((items) => {
                return expect(items.length).to.be.at.least(1)
            })
    });

    it('должны отображаться папки', function() {
        return this.browser
            .url('/commits/98c048c/tree/')
            .isExisting('.tree .folder')
            .then((exists) => {
                return assert.ok(exists, 'папки не отображаются')
            })
    });

    it('должны отображаться файлы', function() {
        return this.browser
            .url('/commits/98c048c/tree/')
            .isExisting('.tree .blob')
            .then((exists) => {
                return assert.ok(exists, 'файлы не отображаются')
            })
    });

    it('должны отображаться файлы только выбранного коммита', function() {
        return this.browser
            .url('/commits/98c048c/tree/')
            .getText('.tree .blob')
            .then((blobs) => {
                return expect(blobs).include('only-master.txt')
            })
    });
});