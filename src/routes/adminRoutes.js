const express = require('express');
//const multer = require('multer')
const router = express.Router();
const uploadFiles = require('../middleware/uploadFiles.js');
const {isLogged} = require('../middleware/authentication.js')
const adminControllers = require('../controllers/adminControllers.js');

/*const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, '../../public/img/nuevos'));
    },
    filename: (req, file, callback) => {
      const extension = file.mimetype.split('/')[1];
      const nombreImagen = `${Date.now()}.${extension}`;
      callback(null, nombreImagen);
    },
  });*/
  
 // const upload = multer({ storage });

router.use(isLogged);

router.get('/', adminControllers.admin); /*solicitud de datos*/
router.get('/create', adminControllers.create);
router.post('/create', /*uploadFiles.array('image', 2)*/ adminControllers.creating); /*envio de datos*/
router.get('/edit/:id', adminControllers.editItem); 
router.put('/edit/:id', /*uploadFiles.array('image', 2)*/ adminControllers.editingItem); /*actualizar o crear datos*/
router.delete('/delete/:id', adminControllers.delete); /*eliminar recursos del servidor*/

module.exports=router