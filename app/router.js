/*eslint no-console: off*/
const express = require('express');
const {branches, show} = require('./git');
const router = express.Router();

// Список веток
router.get('/', async (req, res) => {
    res.render('index', {
        title: 'Список веток',
        message: 'Список веток',
        data: await branches()
    });
});

router.get('/branch/:name/commits', (req, res) => {
    res.render('index', {
        title: 'Коммит',
        message: 'Дерево веток'
    });
});

router.get('/branch/:name/tree/*?', async (req, res) => {
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

router.get('/commit/:hash', async (req, res) => {
    res.render('tree', {
        title: 'Коммит',
        message: 'Дерево веток',
        data: await show(req.params.hash)
    });
});


module.exports = router;
