// app principal
const express = require('express');
const app = express();
const port = 3000;


app.listen(port, () => {
    console.log('Puerto escuchando en localhost:3000');
});

app.use(express.static('public'))