const express = require('express')
const router = express.Router()
const { UserValidator } = require('../validators/validator')
const { register, login , logout } = require('../controllers/user.controller')
const { requiresLogout, requiresLogin } = require('../middlewares/user.middleware')


router.post('/register', UserValidator, register)
router.post('/login',requiresLogout, login)
router.get('/logout', requiresLogin, logout)

module.exports = router
