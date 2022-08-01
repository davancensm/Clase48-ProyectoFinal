const cartM_Mongo = require('./guia_mongo/mongousers')
const productM_Mongo = require('./guia_mongo/mongoproducts')

let productDAO
let cartDAO
const db = 'mongo'

switch (db) {
  case 'mongo':
    productDAO = productM_Mongo
    cartDAO = cartM_Mongo
    break
  default:
    break
}

module.exports = { productDAO, cartDAO}
