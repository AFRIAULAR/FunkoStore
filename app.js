require('dotenv').config();
// app principal
const express = require('express');
const app = express();
const session = require('express-session')
const { body, validationResult } = require('express-validator');
const { initSession } = require('./src/utils/sesion');
const expressValidator = require('express-validator');
const multer = require('multer');

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

app.use(session({
  secret: 'S3cr3t01H@sh',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true } // Puedes ajustar esto según tus necesidades
}));

app.use(initSession());

app.use((req, res, next) => {
  res.locals.isLogged = req.session.isLogged;
  next();
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/img/nuevos');
  },
  filename: (req, file, callback) => {
    const extension = file.mimetype.split('/')[1];
    const nombreImagen = `${Date.now()}.${extension}`;
    callback(null, nombreImagen);
  },
});

const upload = multer({ storage });


app.use(methodOverride('__method'));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'));
app.use(upload.array('imagenes', 5)); // Multer

app.use('/', mainRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/shop', storeRoutes);

app.use((err, req, res, next) => {
  console.error('Error al obtener información de productos:', err);
  res.status(500).send('Error interno del servidor');
});

app.use((err, req, res, next) => {
   // console.log (`Recurso no encontrado: ${req.url}`);
    console.error('Recurso no encontrado:', err);
    res.status(404).send('Recurso no encontrado');  
});


app.listen(port, () => {
    console.log(`Puerto escuchando en localhost:${port}`);
});

