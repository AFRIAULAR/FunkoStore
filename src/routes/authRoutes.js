const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers.js');

router.get('/auth/login', authControllers.login) ,
router.post('auth/login', authControllers.logining),
router.get('/auth/register', authControllers.register) ,
router.post('/auth/register', authControllers.registing),
router.get('/auth/logout', authControllers.logout),


module.exports=router