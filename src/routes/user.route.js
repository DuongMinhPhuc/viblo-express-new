const express = require('express')
const router = express.Router()
const { UserValidator } = require('../validators/validator')
const { register, login , logout } = require('../controllers/user.controller')
const { requiresLogout, requiresLogin } = require('../middlewares/user.middleware')
const { isAdmin } = require('../validators/decentralization')
const expressjwt = require('express-jwt')

const jwtCheck = expressjwt({  
    secret: "mykey",
})

router.post('/register', isAdmin, UserValidator, register)
//router.post('/register', UserValidator, register)
router.post('/login',requiresLogout, login)
router.get('/logout', requiresLogin, logout)

module.exports = router
