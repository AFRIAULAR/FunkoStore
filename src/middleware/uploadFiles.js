const multer =  require('multer');
const path = require('path');

/*app.post('/upload', upload.array(['image_front', 'image_back']), (req, res) => {
  try {

    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No se han subido imágenes.');
    }

    const imagePaths = req.files.map(file => file.path);

    const databasePaths = imagePaths.map(path => {
      const relativePath = path.replace('public', '');
      return relativePath;
    });

    res.status(200).json({ message: 'Imágenes subidas exitosamente.', paths: databasePaths });
  } catch (error) {
    console.error('Error en la subida de imágenes:', error);
    res.status(500).send('Error interno del servidor multer');
  }
});*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.resolve('public/img/nuevos')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const uploadFiles = multer({storage});

module.exports = uploadFiles;