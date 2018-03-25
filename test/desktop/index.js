/* eslint-disable */
const assert = require('assert');
const uri = 'http://localhost:8080';
describe('init test', () => {
    it('title главной страницы должен соответствовать ожидаемому', function() {
        return this.browser
            .url(uri)
            .getTitle()
            .then((title) => {
                return assert.equal(title, 'ветки');
            });
    });
    it('master должна быть первой в списке', function() {
        return this.browser
            .url(uri)
            .getText('.list__branches a')
            .then((a) => {
                return assert.equal(a[0], 'master');
            });
    });
});
