const express = require('express');
const itemService = require('../services/itemService')

module.exports ={
    home: async (req, res) => {
        try {
            // Llamas al método getItems del servicio para obtener los datos
            const items = await itemService.getItems(req.query); // Puedes pasar parámetros si es necesario
           //console.log(items);
            // Renderizas la vista 'home/index.ejs' y le pasas los datos obtenidos del servicio
            res.render('home/index.ejs');
        } catch (error) {
            // Manejo de errores
            console.error('Error al obtener los items:', error);
            res.status(500).send('Error al obtener los items');
        }
    },
    contact: (req, res) => res.send("Pagina de Contacto"),
    about: (req, res) => res.send("Pagina Sobre Nosotros"),
    faqs: (req, res) => res.send("Pagina de preguntas frecuentes"),
}

