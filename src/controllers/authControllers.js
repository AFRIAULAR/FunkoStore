const express = require('express');
const userService = require('../services/userService')
const validate = require('../middleware/validation')
const bcrypt = require('bcrypt')


module.exports ={
    login: (req,res) => {
        res.render('login/login.ejs')
    },
    logining: async (req,res) =>{
        try {
            data = {
                email : req.body.email,
                password : req.body.password
            }
            const user_info = await userService.getUserByEmail(data.email);
            if (user_info[0].length === 0 && !validate.validatePassword(data.password,user_info[0][0].password)) {
                res.render('login/login.ejs', {msg_error: "email o password incorrecto."});
            }
            
            /*
            if (! await validate.validatePassword(password, data.password)) {
                console.log("el password esta mal");
            }
            */

            req.session.user = {
                userId: user_info[0][0].user_id,
                name: user_info[0][0].name,
                email: user_info[0][0].email
            };

            res.redirect('/home');
        } catch(error) {
            console.log('Error al procesar el incio de sesion');
            res.status(500).send("Error al procesar el incio de sesion")
        }
    },
    register: (req,res) => {
        res.render('login/register.ejs');
    },
    registing: async (req,res) =>{
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
    logout: (req,res) =>{
        console.log('ON DESTROY SESSION = ',req.session.id)

        req.session.destroy();
        res.send("logout success!");
    },
}
