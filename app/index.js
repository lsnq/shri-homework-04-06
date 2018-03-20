'use strict';

const express = require('express');
const app = express();
console.log(process.env.NODE_ENV);
app.get('/', (req, res) => {
    res.send('Hello World 32!');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
