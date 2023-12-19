const multer =  require('multer');
const path = require('path');

/* Logica para guardar imagenes en el server */

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.resolve('public/img/nuevos')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const uploadFiles = multer({storage});

module.exports = uploadFiles;