/*Controlador de intefaz de usuarios. Este módulo importa todos los servicios que se utilizan para la autenticación de usuarios: Password, la estrategia de Passport local y bcrypt para encriptar los datos*/
/* Despues lo que se va a encontrar abajo es solamente la renderización de las distintas páginas según corresponda y el logeo de cada request. */
const { logConsole, logWarn, logError } = require("../services/users.services.js")
//const {EMAIL, transporter} = require("../messages/messages.js")

const getHome = async(req, res) => {
    res.render("index.ejs",{prueba:0})
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const getLogin = async(req, res) => {
    if (req.isAuthenticated()) return res.redirect('/profile')
    res.render('login.ejs')
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const getSignup = async(req, res) => {
    if (req.isAuthenticated()) return res.redirect('/profile')
    res.render('signup.ejs')
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const getProfile = async(req, res) => {
    res.render("profile.ejs", { user: req.session.passport.user.username })
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const getLogout = async(req, res) => {
    if(req.isAuthenticated()) {
        req.logout((err) => { if (err) return next(err) })
        res.render('logout.ejs')
    } else {
        res.redirect('/')
    }
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`) 
}

const getUserExist = async(req, res) => {
    res.render("userExists.ejs")
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const getInvalidPassword = async(req, res) => {
    res.render("invalidPass.ejs")
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const postSignup = async (req, res, next) => {
    res.redirect('/profile')

    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const postLogin = async(req, res) => {
    res.redirect('/profile')
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const getWrong = async(req, res) => {
    logConsole.warn(`${req.method} to ${req.get('host')}${req.originalUrl}`)
    logWarn.warn(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const getNav = async (req, res) => {
    res.render("nav.ejs")
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
module.exports={ getHome, getNav, getInvalidPassword, getLogin, getLogout, getProfile, getSignup, getUserExist, getWrong, postLogin, postSignup }