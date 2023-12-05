const express = require('express');
const router = express.Router();
/*const mainControllers = require('../controllers/mainControllers.js')*/
const adminControllers = require('../controllers/adminControllers.js');

router.get('/', adminControllers.admin); /*solicitud de datos*/
router.get('/create', adminControllers.create);
router.post('/create', adminControllers.creating); /*envio de datos*/
router.get('/edit/:id', adminControllers.editItem); 
router.put('/edit/:id', adminControllers.editingItem); /*actualizar o crear datos*/
router.delete('/delete/:id', adminControllers.delete); /*eliminar recursos del servidor*/

module.exports=router