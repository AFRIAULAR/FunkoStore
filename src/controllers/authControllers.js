const express = require('express');


module.exports ={
    login: (req,res) => {
        res.render('login/login.ejs')
    },
    logining: (req,res) => res.send ('iniciando sesion'),
    register: (req,res) => res.send ('Pagina de registro'),
    registing: (req,res) => res.send ('Registrando nuevo usuario'),
    logout: (req,res) => res.send ('Salida de la Pagina de shop'),
}
