const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt")

exports.register = function(req,res,next){
    User.findOne({email: req.body.email}, (err, user) => {
        if(user == null){//check email is used or not
            //create user
            bcrypt.hash(req.body.password, 10, function(err, hash){
                if (err) {return next(err)}
                const user = new User(req.body)
                //role
                console.log("data: ")
                console.log(req.body)
                //user.role = require.body.role

                user.password = hash
                user.passowrd_confirm = hash
                user.save(function (err) {
                    if (err){
                        return err;
                    }else{
                        res.json(user)
                        return user
                    }
                  });
            })
        }else{
            console.log('email is used, please use another email!')
        }
    })
}


exports.login = function(req,res){
    User.findOne({email: req.body.email}).exec(function(err,user){
        console.log("login data")
        console.log(req.body)
        if(err){
            return res.json({err})
        }else if(!user){
            return res.json({err: 'Username or password are incorrect'})
        }
        bcrypt.compare(req.body.password, user.password, (err, result) =>{
            if(result === true){
                    //sava user into session
                    req.session.user = user

                    //jwt
                    const token = jwt.sign({//payload
                        email: user.email,
                        username: user.username
                    }, "mykey" //secretkey
                    , {expiresIn:"3 hours"} //time expire
                    )
                    req.headers['']
                    //req.head.jwttoken = token
                    //res.status(200).send({acces_token: token})
                    
                    //return
                    return res.json({
                        user : user,
                        "login" : "success",
                        acces_token: token
                    }) 
            }else{
                return res.json({err: "user name or password are incorrect"})
            }
        })
    })
}

exports.logout = function(req,res){
    if(req.session){
        req.session.destroy((err) => {
            if (err) {
                return res.json({ err })
            }else{
                return res.json({'logout': 'success'})
            }
        })
    }
}

