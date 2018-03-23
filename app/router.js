/*eslint no-console: off*/
const express = require('express');
const {branches, show, commits} = require('./git');
const router = express.Router();

// Список веток
router.get('/', async (req, res) => {
    res.render('index', {
        title: 'Список веток',
        message: 'Список веток',
        data: await branches()
    });
});

router.get('/:name/commits/', async (req, res) => {
    res.render('commits', {
        title: 'Коммит',
        message: 'Дерево веток',
        data: await commits(req.params.name),
        name: req.params.name
    });
});

router.get('/:name/tree/*?', async (req, res) => {
    const path = req.params[0] || '';
    const branchName = req.params.name;
    res.render('tree', {
        title: 'Дерево',
        message: 'Дерево веток',
        data: await show(branchName, path),
        path: path,
        name: branchName
    });
});

module.exports = router;
