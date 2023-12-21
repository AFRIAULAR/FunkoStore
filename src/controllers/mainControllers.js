const express = require('express');
const itemService = require('../services/itemService')

module.exports ={
    /*home: (req, res) =>{
        res.render('home/index')
    },*/
    home: async (req, res) => {
        try {
            res.render('home/index.ejs');
        } catch (error) {
            // Manejo de errores
            console.error('Error al obtener los items:', error);
            res.status(500).send('Error al obtener los items');
        }
    },
    contact: (req, res) => {
        res.render('home/contact');
    },
    about: (req, res) => res.send("Pagina Sobre Nosotros"),
    faqs: (req, res) => res.send("Pagina de preguntas frecuentes"),
}

