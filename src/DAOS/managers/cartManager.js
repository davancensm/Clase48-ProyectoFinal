/*Manager para el manejo de los carritos, en este archivo se incorpora toda la lógica necesaria para poder determinar qué hacer con los request: Que venga con todos los campos que se requieren para llevar a cabo el request solicitado y devuelve el status del request.*/

const mongoose = require("mongoose")
const cartService = require("../models/cartsSchema.js")
const productM_Mongo = require("./productManager.js")
const dotenv = require("dotenv")
const {logConsole} = require("../../services/users.services.js")


dotenv.config()

const productService = new productM_Mongo()

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) return ('Unable to Connect')
  logConsole.info("database = carts Connected")
})

class cartM_Mongo {
    Create = async () => {
        try {
            let cart = {}
            cart.timestamp = Date.now()
            cart.products = []
            let result = await cartService.insertMany([cart])
            return {status:'succes',payload:result}
        } catch (error) {
            return {status:"error",error:error}
        }
    }
    Read = async () => {
        try {
            if (!id) return { status: "error", errror: "Id needed" }
            let cart = await cartService.find({}, {
            name: 1,
            cart: 1,
            _id: id
        })
        return { status: "success", payload: cart }
        } catch (error){
            return {status:"error", error:error}
        }
    }
    Update = async(_id, cart_body) => {
        await cartService.updateOne({
            id: _id
        }, {
            $set: {
                name: cart_body.name
            }
        })
        return { status: "success", message: "cart update" }
    }
    Delete = async (_id) => {
        if (!id) return { status: "error", error: "Id needed" }
        try {
            let result = await cartService.deleteOne({
                id: _id
            })
            return { status: "success", message: "cart delete", payload:result }
        } catch (error) {
            return {status:"error", error:error}
        }
    }
    CreateProduct = async(id, idProd) => {
        if(!id) return {status: 'error', error:'Id nedded'}
        if(!idProd) return {status:'error', message:'Id of product nedded'}
        try {
            let prod = await productService.find({
                _id: idProd
            }, {
                _id: 1,
                name: 0,
                    model: 0,
                bando: 0,
                    descrption:0,
                    url: 0,
                    price: 0,
                    stock: 0
            })
            let cart = await cartService.find({
                _id: id
            }, {
                _id: 0,
                timestamp: 0
            })
            let ids = []
            let exist = 0
            cart[0].products.forEach(el => {
                let id = el
                ids.push(id)
            })
            exist = ids.find(id => id == idProd)
            if(exist) return {status:'error',message:'product already added to cart'+exist}
            let result = await cartService.updateOne({
                _id: id
            }, {
                $push: {
                    products: prod[0]._id.toString()
                }
            })
            exist = 0
            return {status:'succes',payload:result}
        } catch (error) {
            return {status:"error",error:error} 
        }
    }
    DeleteProduct = async(id,idProd) => {
        if(!id) return {status: 'error', error:'Id needed'} 
        if(!idProd) return {status: 'error', error:'Id of product nedded'}
        try {
            let result = await cartService.updateOne({
                _id: id
            }, {
                $pull:
                    { products: idProd }
            })
            return {status:'succes',payload:result}
        } catch (error) {
            return {status:"error",error:error} 
        }
    }
}

module.exports = cartM_Mongo