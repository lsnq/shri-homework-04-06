/*eslint no-console: off*/
import express from 'express';

const router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log(req.path);
    next();
});

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Hola',
        message: 'Hello world!'
    });
});

router.get('/branch', (req, res) => {
    res.render('branch', {
        title: 'Branch',
        message: 'Show branch!'
    });
});

export default router;
