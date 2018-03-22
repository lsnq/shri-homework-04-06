/*eslint no-console: off*/
import router from './router';
import path from 'path';
import express from 'express';

const app = express();

app.set('views', 'dist/views');
app.set('view engine', 'pug');

app.use(express.static(path.join('dist/assets')));

app.use('/', router);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
