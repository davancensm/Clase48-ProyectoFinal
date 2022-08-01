/* Módulo multer para subir al sevidor las imágenes de perfil de los usuarios*/

const multer = require('multer')

const uploader = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './../public/img')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
})

module.exports = uploader
