const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers.js');

//Aqui no va /auth/login solo /login pues en app.js 
//se establece que la ruta raiz para la autenticacion va a ser /auth
router.get('/login', authControllers.login) ,   
router.post('/login', authControllers.logining),
router.get('/register', authControllers.register) ,
router.post('/register', authControllers.registing),
router.get('/logout', authControllers.logout),


module.exports=router