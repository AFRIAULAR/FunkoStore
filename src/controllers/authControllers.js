const express = require('express');
const userService = require('../services/userService')
const validate = require('../middleware/validation')
const bcrypt = require('bcrypt');
/*const {conn} = require ('../config/conn')
const middleware = require('../middleware/loginM')

const models = require ('../models/login')*/


module.exports ={
    login: (req,res) => {
        res.render('login/login.ejs')
    },

    logining: async (req, res) => {
      try {
        data = {
          email : req.body.email,
          password : req.body.password
      }
      const user_info = await userService.getUserByEmail(data.email);
      if (user_info[0].length === 0 && !validate.validatePassword(data.password,user_info[0][0].password)) {
          res.render('login/login.ejs', {msg_error: "email o password incorrecto."});
      }
    
        /*const passwordMatch = await bcrypt.compare(password, user[0].password);
        if (!passwordMatch) {
          return res.render('login/login', { error: 'Usuario o contraseña incorrectos' });
        }*/
        req.session.isLogged = true;
        req.session.user = {
          userId: user_info[0].user_id,
          name: user_info[0].name,
          email: user_info[0].email,
        };
    
        res.redirect('/admin');
      } catch (error) {
        console.log('Error al procesar el incio de sesion', error);
        res.status(500).send("Error al procesar el inicio de sesion")
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
        data = {
          name: req.body.name,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password
      };
      const newUserId = await userService.registerUser(data);
      console.log("usuario registrado");
  } catch (error){
      console.log("Error al registrar usuario", error);
      res.status(500).send("Error al registrar del usuario");
  }
},

      /*  const userId = await models.registerUser(name, lastname, email, password);
        res.status(200).json({ userId, message: 'Usuario registrado con éxito.' });
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario.' });
      }
    },*/

    logout: (req,res) => {
        req.session.null ();
        res.send("logout success!");
        res.redirect('/home');
    },
}
