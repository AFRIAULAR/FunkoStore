const express = require('express');
const router = express.Router();
const uploadFiles = require('../middleware/uploadFiles.js');
const {isLogged} = require('../middleware/authentication.js')
const adminControllers = require('../controllers/adminControllers.js');

router.use(isLogged);

router.get('/', adminControllers.admin); /*solicitud de datos*/
router.get('/create', adminControllers.create);
router.post('/create', uploadFiles.array('image', 2), adminControllers.creating); /*envio de datos*/
router.get('/edit/:id', adminControllers.editItem); 
router.put('/edit/:id', adminControllers.editingItem); /*actualizar o crear datos*/
router.delete('/delete/:id', adminControllers.delete); /*eliminar recursos del servidor*/

module.exports=router