const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers.js');

router.get('/auth/login', (req,res) => res.send ('Pagina de inicio de sesion')) 
router.post('auth/login', (req,res) => res.send ('iniciando sesion'))
router.get('/auth/register', (req,res) => res.send ('Pagina de registro')) 
router.post('/auth/register', (req,res) => res.send ('Registrando nuevo usuario'))
router.get('/auth/logout', (req,res) => res.send ('Salida de la Pagina de shop'))


module.exports=router