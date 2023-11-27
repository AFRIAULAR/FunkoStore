const express = require('express');


module.exports ={
    home: (req, res) =>{
        res.render('index.ejs')
    },
    contact: (req, res) => res.send("Pagina de Contacto"),
    about: (req, res) => res.send("Pagina Sobre Nosotros"),
    faqs: (req, res) => res.send("Pagina de preguntas frecuentes"),
}

