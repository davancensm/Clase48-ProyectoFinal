/* Módulo de routes para manejo de usuarios y autenticación */

const passport = require('passport')
const express = require('express')
const router = express.Router()
const { isAuth } = require('../services/users.services.js')
const uploader = require('../services/uploader.js')
const { getHome, getInvalidPassword, getLogin, getLogout, getProfile, getSignup, getUserExist, getWrong, postLogin, postSignup, getNav } = require('../controllers/users.controller.js')

router.get('/', getHome, getNav)
router.get('/signup', getSignup)
router.get('/login', getLogin)
router.get('/profile', isAuth, getProfile)
router.get('/logout', getLogout)
router.get('/userExist', getUserExist)
router.get('/invalidPassword', getInvalidPassword)
router.get('*', getWrong)
router.post('/signupForm', uploader.single('file'), passport.authenticate('signupS', {
  failureRedirect: '/userExists'
}), postSignup)
router.post('/loginForm', uploader.single('file'), passport.authenticate('loginS', {
  failureRedirect: '/invalidPass'
}), postLogin)

const userRouter = router
module.exports = { userRouter}
