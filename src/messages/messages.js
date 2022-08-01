/* Configuro el módulo para el envio de mails para la confirmación de las cuentas creadas*/

const { SMTPClient } = require('emailjs')

const EMAIL = 'proyectoFinal@gmail.com'
const PASSWORD = 'password del mail'

const client = new SMTPClient({
  user: EMAIL,
  password: PASSWORD,
  host: 'smtp.your-email.com',
  ssl: true
})

module.exports = {client, EMAIL}
