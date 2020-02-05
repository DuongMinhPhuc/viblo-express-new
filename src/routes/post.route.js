const { requiresLogout, requiresLogin } = require('../middlewares/user.middleware')
const express = require('express')
const router = express.Router()
const {listPost, detailPost, createPost, editPost, deletePost} = require('../controllers/post.controller')
const {PostValidator, UserValidator} = require('../validators/post.validator')
const expressjwt = require('express-jwt')
const { isAdmin } = require('../validators/decentralization')

const jwtCheck = expressjwt({  
    secret: "mykey",
})


router.get('/post', jwtCheck ,requiresLogin, listPost)
router.get('/post/:id',requiresLogin, detailPost)

//send data to server need validator
//router.post('/post/new', requiresLogin, PostValidator, createPost)
router.post('/post/new', requiresLogin, PostValidator,createPost)
router.put('/post/:id/edit', requiresLogin, PostValidator, editPost)

router.delete('/post/:id', requiresLogin, deletePost)

module.exports = router