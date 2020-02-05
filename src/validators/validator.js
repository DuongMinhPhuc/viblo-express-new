const User = require('../models/user.model')

exports.UserValidator = function(req,res,next){
    console.log('run userValidator')
    req.check('email', 'Invalid email.').isEmail()
    req.check('email', 'email is require').not().isEmpty()
    req.check('username','username is require').not().isEmpty()
    req.check('username', 'username can not have lenght lower than 2')
    req.check('password','password is require').not().isEmpty()
    req.check('password', 'password can not have lenght lower than 2').isLength({ min: 5 })
    req.check('password_confirm', 'Password confirm is required.').not().isEmpty()
    req.check('password_confirm','Password mismatch').equals(req.body.password)

    const errors = req.validationErrors();
    if(errors){
        console.log('validation error')
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }else{
        console.log('validation succesfully')
    }
    next();
}

