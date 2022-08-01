/* Este modulo incorpora toda la lógica necesaria para la autenticación, encriptación y decriptación de los datos para el acceso de usuarios.*/
const bcrypt = require('bcrypt')
const passport = require('passport')
const log4js = require('log4js')
const LocalStrategy = require('passport-local').Strategy
const User = require('../DAOS/models/UserSchema')

passport.serializeUser((user, done) => {
  return done(null, user)})
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    return done(err, user.id)
  })
})
const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/profile')
}
passport.use('signupS', new LocalStrategy({
  passReqToCallback: true
}, (req, username, password, done) => {
  User.findOne({ username: username }, (err, userCreated) => {
    if (err) return done(err)
    if (userCreated) return done(null, false, {
        message: 'user already register'
      })
    const newUser = {
      name: req.body.name,
      mail: req.body.mail,
      phone: req.body.phone,
      age: req.body.age,
      username: username,
      password: createHash(password),
      isAdmin: req.body.isAdmin || false
    }
    User.create(newUser, (err, userCreated) => {
      if (err) return done(err)
      return done(null, userCreated)
    })
  })
}))
passport.use('loginS', new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, userFound) => {
      if (err) return done(err)
      if (!userFound) return done(null, false, {message: 'user dont exist'})
      if (!bcrypt.compareSync(password, userFound.password)) return done(null, false, {message: 'invalid password'})
      return done(null, userFound)
    })
  }
))

/* Configuro los tipos y archivos de logs*/

log4js.configure({
  appenders: {
    theLoggerConsole: { type: 'console' },
    theLoggerFile: { type: 'file', filename: 'logs/warns.log' },
    theLoggerFile2: { type: 'file', filename: 'logs/errors.log' }
  },
  categories: {
    default: { appenders: ['theLoggerConsole'], level: 'info' },
    file: { appenders: ['theLoggerFile'], level: 'warn' },
    file2: { appenders: ['theLoggerFile2'], level: 'error' }
  }
})

let logConsole = log4js.getLogger()
let logWarn = log4js.getLogger('file')
let logError = log4js.getLogger('file2')

module.exports = {isAuth, logConsole, logWarn, logError}
