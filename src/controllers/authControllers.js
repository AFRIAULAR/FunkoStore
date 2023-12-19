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
            if (user_info[0].length === 0 || !validate.validatePassword(data.password,user_info[0][0].password)) {
                return res.render('login/login.ejs', {msg_error: "Email o Contraseña incorrectos."});
            }

            req.session.user = {
                userId: user_info[0][0].user_id,
                name: user_info[0][0].name,
                email: user_info[0][0].email
            };

            console.log(req.session); // Agrega este registro
            res.redirect('/home');
        } catch(error) {
            console.log('Error al procesar el incio de sesion');
            res.status(500).send("Error al procesar el incio de sesion")
        }
    },
    register: (req,res) => {
        res.render('login/register');
    },
    registing: async (req,res) =>{
        try {
            data = {
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password1: req.body.password1,
                password2: req.body.password2
            };
            console.log(data);
            if (!validate.validatePasswords(data.password1,data.password2)){
                return res.render('login/register', {msg_error: "Las contraseñas ingresadas no coinciden."});
            };
            if(await userService.userExists(data)) {
                return res.render('login/register', {msg_error: "El email ya se encuentra registrado."});
            };
            const newUserId = await userService.registerUser(data);
            if(newUserId[0].length === 0) {
                console.log("error al registrar el usuario");
            };
            return res.render('login/register',{msg_error: "Usuario creado con exito."});
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
