/*eslint no-console: off*/
import express from 'express';
import GitData from './git';

const data = new GitData();

const router = express.Router();

// Список веток
router.get('/', async (req, res) => {
    res.render('index', {
        title: 'Список веток',
        message: 'Список веток',
        data: await data.branches()
    });
});

// История коммитов
router.get('/commits/:name?', (req, res) => {
    res.render('tree', {
        title: 'Ветка: история коммитов',
        message: 'Show branch!'
    });
});

// Дерево файлов
router.get('/tree/:name?', async (req, res) => {
    res.render('tree', {
        title: 'Дерево файлов',
        message: 'Show branch!',
        name: req.params.name,
        data: await data.tree(req.params.name)
    });
});

// Содержимое файла
router.get('/blob/:name?', (req, res) => {
    res.render('tree', {
        title: 'Содержимое файла',
        message: 'Show branch!'
    });
});

export default router;
