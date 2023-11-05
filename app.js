// app principal
const express = require('express');
const app = express();
const mainRoutes = require('./src/routes/mainRoutes.js');

const port = 3000;

app.use(express.static('public'));
app.use('/', mainRoutes);


app.listen(port, () => {
    console.log('Puerto escuchando en localhost:3000');
});

