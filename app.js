require('dotenv').config();
// app principal
const express = require('express');
const app = express();
//const session = require('express-session')
const { body, validationResult } = require('express-validator');
const { initSession } = require('./src/utils/sesion');
const expressValidator = require('express-validator');

const mainRoutes = require('./src/routes/mainRoutes.js');
const adminRoutes = require('./src/routes/adminRoutes.js');
const authRoutes = require('./src/routes/authRoutes.js');
const storeRoutes = require('./src/routes/storeRoutes.js');
const path = require('path');
//override para habilitar metodos put y delete
const methodOverride = require('method-override');

const port = process.env.PORT;

//Configuracion de mototr de plantilla
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./src/views'));

app.use(initSession());

app.use((req, res, next) => {
  res.locals.isLogged = req.session.isLogged;
  next();
});

app.use(methodOverride('__method'));
app.use(express.urlencoded());
app.use(express.json());
//app.use(expressValidator());
app.use(express.static('public'));

app.use('/', mainRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/shop', storeRoutes);
/*app.post('/formulario', [
    // Definir reglas de validación con express-validator
    body('nombre').notEmpty().isString(),
    body('Apellido').notEmpty().isString(),
    body('email').notEmpty().isEmail(),
    body('password').isInt({ min: 1, max: 10 }),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send('Error de validación: ' + JSON.stringify(errors.array()));
    }
  
    // Procesar la solicitud si los datos son válidos
    const { nombre, apellido, email, password } = req.body;
    res.send(`Hola ${nombre}, tu correo es ${email} y tienes ${edad} años.`);
  });
  
  // Servir un formulario HTML
  app.get('/formulario', (req, res) => {
    res.sendFile(__dirname + '/formulario.html');
  });*/

// middleware para manejar error 404
app.use((req, res, next) => {
    console.log (`Recurso no encontrado: ${req.url}`);
    res.status(404).send('Recurso no encontrado');  
});


app.listen(port, () => {
    console.log(`Puerto escuchando en localhost:${port}`);
});

