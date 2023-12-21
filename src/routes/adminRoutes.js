const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/adminControllers.js');

router.get('/products', adminControllers.admin) /*solicitud de datos*/
router.get('/collections',adminControllers.collections)
router.get('/create', adminControllers.create)
router.post('/create', adminControllers.creating) /*envio de datos*/
router.get('/edit/:id', adminControllers.editItem) 
router.put('/edit/:id', adminControllers.editingItem) /*actualizar o crear datos*/
router.get('/delete_p/:id', adminControllers.delete_p)
router.get('/delete_c/:id', adminControllers.delete_c) /*eliminar recursos del servidor*/

module.exports=router