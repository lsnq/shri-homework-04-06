const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Heroku Pull Request #3!');
});

const port = process.env.PORT || process.env.$PORT || 8080;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
