const express = require('express');
const {branches, show, commits} = require('./git');
const router = express.Router();

// Список веток
router.get('/', async (req, res) => {
    res.render('index', {
        title: 'ветки',
        data: await branches()
    });
});

router.get('/branch/:name/commits/', async (req, res) => {
    res.render('commits', {
        title: req.params.name + ' commits',
        data: await commits(req.params.name),
        name: req.params.name
    });
});

router.get('/:type/:name/tree/*?', async (req, res) => {
    const path = req.params[0] || '';
    const branchName = req.params.name;
    const data = await show(branchName, path);
    res.render('tree', {
        title: branchName + ' tree',
        data: data,
        path: path,
        name: branchName,
        type: req.params.type
    });
});

module.exports = router;
