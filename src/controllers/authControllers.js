const express = require('express');


module.exports ={
    login: (req,res) => {
        res.render('login/login.ejs')
    },
    logining: (req,res) => res.send ('iniciando sesion'),
    register: (req,res) => {
    res.render('login/register.ejs');
    },
    registing: (req,res) => res.send ('Registrando nuevo usuario'),
    logout: (req,res) => {
        /* implementacion de logica 
        req.logout ();*/
        res.redirect('/home');
    }
}
