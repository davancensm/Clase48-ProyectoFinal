/* Creación del esquema para la creación de carritos*/

const mongoose = require("mongoose")
/* Configuro la colección donde voy a guardar esta información*/
const collection = "carts_final"
const schema = new mongoose.Schema({
    produts: {
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model(collection, schema)