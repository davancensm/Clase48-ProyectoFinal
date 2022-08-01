/* Modulo para el CRUD de usuarios en mongo DB*/

const MongoContainer = require('../managers/cartManager');
const User = require("../models/UserSchema.js");

class UserDao {
    userManager = new MongoContainer(User);

    Create = async (users) => {
        return await this.userManager.Create(users)
    }
    Read = async (array, users) => {
        return await this.userManager.Read(array,users)
    }
    Upload = async (array,users) => {
        return await this.userManager.Upload(array,users);
    }
    Delete = async (array,users) => {
        return await this.userManager.Delete(array,users);
    }
    CreateProduct = async (array,users) => {
        return await this.userManager.CreateProduct(array,users);
    }
    DeleteProduct = async (array,users) => {
        return await this.userManager.DeleteProduct(array,users);
    }
}
module.exports = UserDao;