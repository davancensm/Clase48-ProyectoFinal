/* Creación del esquema para la creación de usuarios*/

const mongoose = require('mongoose')
/* Configuro la colección donde voy a guardar esta información*/
const userCollection = 'users_final'
const userShema = new mongoose.Schema({
  name: { type: String },
  mail: { type: String },
  phone: { type: Number },
  age: { type: Number },
  cart: { type: Object },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})
const User = mongoose.model(userCollection, userShema)

module.exports = User
