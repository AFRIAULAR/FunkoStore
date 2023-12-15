const express = require('express');
const bcrypt = require('bcrypt');
const {conn} = require ('../config/conn')
const middleware = require('../middleware/loginM')
const models = require ('../models/login')


module.exports ={
    login: (req,res) => {
        res.render('login/login.ejs')
    },

    logining: async (req, res) => {
      try {
        const { email, password } = req.body;
        const [user] = await conn.query('SELECT * FROM user WHERE email = ?', [email]);
    
        if (user.length === 0) {
          return res.render('login/login', { error: 'Usuario o contraseña incorrectos' });
        }
    
        const passwordMatch = await bcrypt.compare(password, user[0].password);
        if (!passwordMatch) {
          return res.render('login/login', { error: 'Usuario o contraseña incorrectos' });
        }
    
        req.session.user = {
          userId: user[0].user_id,
          name: user[0].name,
          email: user[0].email,
        };
    
        res.redirect('/home');
      } catch (error) {
        console.error('Error al procesar el inicio de sesión:', error);
        res.status(500).send(`Error interno del servidor: ${error.message}`);
      }
    },

    register: (req,res) => {
    res.render('login/register.ejs', {
      title: 'registro',
      logged: req.session.idUser
    })
    },

    registing: async (req, res) => {
      const { name, lastname, email, password } = req.body;
    
      try {
        const userId = await models.registerUser(name, lastname, email, password);
        res.status(200).json({ userId, message: 'Usuario registrado con éxito.' });
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario.' });
      }
    },

    logout: (req,res) => {
        /* implementacion de logica 
        req.session.null ();*/
        res.redirect('/home');
    },
}
