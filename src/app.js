const express = require('express')
const session = require('express-session')
const dotenv = require('dotenv')
const passport = require('passport')
const mongoose = require('mongoose')
const { userRouter } = require('./router/users.routes.js')
const { productRouter } = require('./router/products.routes.js')
const { logConsole, logWarn, logError } = require('./services/users.services.js')
const {Server} = require('socket.io')


/* Inicializo la config para tomar los parámetros del archivo .env*/
dotenv.config()

/*Configuro el servidor*/
const app = express()
const PORT = process.env.PORT || 8030
const server = app.listen(PORT, () => {
  logConsole.info(`Listening on port ${PORT}`)
})



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


/*Inicializo el modulo socket.io para el canal del chat desde el lado del servidor*/
const io = new Server(server)

/*Parametrizo el tipo y base de datos a usar, traigo ptanto el parametro de la URL de la base de datos como el del secret password para poder decodificar la información*/
const URL = process.env.URL
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: 30000
  }
}))

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) return ('Unable to Connect')
  logConsole.info('database = users Connected')
})

/*Incluyo los middleware de passport para la autenticación de usuarios*/
app.use(passport.initialize())
app.use(passport.session())

/* Configuro los routes a utilizar para las distintas funciones de la aplicación, en este caso una para el tema logeo y la otra para el manejo de productos junto con el carrito*/
app.use('/', userRouter)
app.use('/product', productRouter)

module.exports = io
