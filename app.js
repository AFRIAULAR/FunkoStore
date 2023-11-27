require('dotenv').config();
// app principal
const express = require('express');
const app = express();
const mainRoutes = require('./src/routes/mainRoutes.js');
const adminRoutes = require('./src/routes/adminRoutes.js');
const authRoutes = require('./src/routes/authRoutes.js');
const shopRoutes = require('./src/routes/storeRoutes.js');
const path = require('path');
//override para habilitar metodos put y delete
const methodOverride = require('method-override');

const port = process.env.PORT;

//Configuracion de mototr de plantilla
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./public/views'));



app.use(methodOverride('__method'));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'));
app.use('/', mainRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/shop', shopRoutes);

// middleware para manejar error 404
app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado');
});


app.listen(port, () => {
    console.log(`Puerto escuchando en localhost:${port}`);
});

