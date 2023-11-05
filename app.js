require('dotenv').config();
// app principal
const express = require('express');
const app = express();
const mainRoutes = require('./src/routes/mainRoutes.js');
//override para habilitar metodos put y delete
const methodOverride = require('method-override');

const port = process.env.PORT;

app.use(methodOverride('__method'));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'));
app.use('/', mainRoutes);

// middleware para manejar error 404
app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado');
});


app.listen(port, () => {
    console.log('Puerto escuchando en localhost:3000');
});

