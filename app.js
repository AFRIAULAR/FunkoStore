require('dotenv').config();
// app principal
const express = require('express');
const app = express();
const mainRoutes = require('./src/routes/mainRoutes.js');
const adminRoutes = require('./src/routes/adminRoutes.js');
const authRoutes = require('./src/routes/authRoutes.js');
const storeRoutes = require('./src/routes/storeRoutes.js');
const path = require('path');

const session = require('express-session')


//override para habilitar metodos put y delete
const methodOverride = require('method-override');

const port = process.env.PORT;

//Configuracion de mototr de plantilla
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

app.use(session({
    secret: 'S3cr3t01H@sh',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, 
        maxAge: 24 * 60 * 60 * 1000 // Configura el tiempo de expiración en milisegundos
    }
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

/*app.use(initSession());*/


app.use(methodOverride('__method'));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'));
app.use('/', mainRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/shop', storeRoutes);

// middleware para manejar error 404
app.use((req, res, next) => {
    res.render('home/not_found');
});


app.listen(port, () => {
    console.log(`Puerto escuchando en localhost:${port}`);
});

