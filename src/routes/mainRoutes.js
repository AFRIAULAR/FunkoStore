const express = require('express');
const router = express.Router();


/* Rutas principales */

router.get('/home', (req, res) => res.send("Pagina de home"));
router.get('/contact', (req, res) => res.send("Pagina de Contacto"));
router.get('/about', (req, res) => res.send("Pagina Sobre Nosotros"));

module.exports = router;