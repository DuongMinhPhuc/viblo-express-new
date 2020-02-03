exports.requiresLogout = (req,res,next) => {
    if(req.session.user){
        return res.json({err: 'you must be logout in to login continue'})
    }else{
        next()
    }
}

exports.requiresLogin = (req,res,next) => {
    if(!req.session.user){
        return res.json({ err: 'you must be login'})
    }else{
        console.log("require login successfully")
        next()
    }
}