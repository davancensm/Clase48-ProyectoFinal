/* Middleware para la configuración del usuario administrador*/

class admin {
    admin = async(id) =>{
        if (id === 1) {
            return true;
        } else {
            return false;
        }
    }
}
module.exports =admin
