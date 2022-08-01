/* Creación del esquema para la creación de carritos*/

const mongoose = require('mongoose')
/* Configuro la colección donde voy a guardar esta información*/
const collection = 'products_final'
const schema = new mongoose.Schema({
  name: {type: String,required: true},
  model: {type: String,required: true},
  bando: { type: String, required: true },
  description: {type: String, required: true},
  url: {type: String,required: true},
  price: {type: Number,required: true},
  stock: {type: Number,required: true}
})
const productService = mongoose.model(collection, schema)

module.exports = {productService}
