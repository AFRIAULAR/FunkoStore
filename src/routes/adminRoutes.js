const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/adminControllers.js');

router.get('/admin',(req,res) => res.send ('Pagina de administrador')) /*solicitud de datos*/
router.get('/admin/create', (req,res) => res.send ('Pagina de crear producto'))
router.post('/admin/create', (req,res) => res.send ('Admin creando producto')) /*envio de datos*/
router.get('/admin/edit/:id', (req,res) => res.send ('Admin pagina de editar item')) 
router.put('/admin/edit/:id', (req,res) => res.send ('Admin ctualizando item')) /*actualizar o crear datos*/
router.delete('/admin/delete/:id', (req,res) => res.send ('administrador eliminando item')) /*eliminar recursos del servidor*/

module.exports=router