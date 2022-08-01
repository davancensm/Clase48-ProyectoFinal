/* Modulo para el CRUD de productos en mongo DB*/

const MongoContainer = require('../managers/productManager');
const Product = require('../models/ProductsSchema.js');

class MongoProductDao {
    productManager = new MongoContainer(Product);

    Read = async () => {
        return await this.productManager.Read();
    }
    Create = async (body) => {
        return await this.productManager.Create(body);
    }
    Delete = async (id)=>{
        return await this.productManager.Delete(id);
    }
    ReadId = async (id) => {
        return await this.productManager.ReadId(id);
    }
    Update = async (id,body) => {
        return await this.productManager.Update(id,body);
    }
}
module.exports = MongoProductDao;