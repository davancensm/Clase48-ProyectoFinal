/*Manager para el manejo de productos, en este archivo se incorpora toda la lógica necesaria para poder determinar qué hacer con los request: Que venga con todos los campos que se requieren para llevar a cabo el request solicitado, se controla que en el caso de querer generar un nuevo producto, el mismo ya no exista o no se le asigne un ID ya existente, etc.*/

const mongoose = require("mongoose")
const { productService } = require("../models/ProductsSchema.js")
const {logConsole} = require("../../services/users.services.js")
const dotenv = require("dotenv")

dotenv.config()

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) return ('Unable to Connect')
  logConsole.info("database = Connected products")
})

class ProductM_Mongo {
    Create = async(product) => {
        if (!product.name || !product.model || !product.bando || !product.description || !product.url || !product.price || !product.stock) {
            let exist = await productService.find({name:product.name})
        if(exist.length != 0) return {status:'error',message:'product already added'}
            return { status: 'error', error: 'Missing property', exist:exist }
        } else { 
            try {
              await productService.create(product)
            return { status: "success", message: "Product Created" }  
            } catch {
                await productService.insertMany([product])
            return {status:'succes',message:'product added'}
            }
        } 
    }
    Read = async() => {
        let product = await productService.find({}, {
            name: 1,
            product: 1,
            _id: 0
        })
        return { status: "success", payload: product }
    }
    ReadId = async (id) => {
        if (!id) return { status: "error", message: "ID nedded" }
        try {
            let result = await productService.find({
                _id:id
            })
            return {status:'succes',payload:result}
        } catch (error) {
            return {status:"error", error:"ID not found"}
        }
    }
    Update = async (id, product) => {
        if (!id) return { status: "error", error: "Id nedded" }
        if (!product.name || !product.model || !product.bando || !product.description || !product.url || !product.price || !product.stock ) return{status:"error", message:"data missing"}
        try {
            let result= await productService.update({
                _id: id
            }, {
                $set: {
                    name: product.name,
                    model: product.model,
                    bando: product.bando,
                    description: product.description,
                    url: product.url,
                    price: product.price,
                    stock: product.stock
                }
            })
            return { status: "success", message: "product update", payload:result }
        } catch (error) {
             return {status:"error",error:error}
        }
    }
    Delete = async (id) => {
        if (!id) return { status: "error", error: "Id needed" }
        try {
            let result = await productService.deleteOne({
                _id: id
            })
            return { status: "success", message: "product delete", payload:result }
        } catch (error) {
            return{status:"error", error:error}
        }
    }
}

module.exports = ProductM_Mongo