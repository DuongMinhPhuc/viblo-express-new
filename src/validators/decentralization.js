exports.isAdmin = function(req,res,next) {
    //console.log('run isAdmin')
    //console.log(req.session.user.role)
    if(req.session.user.role === "admin"){
        console.log("run if admin")
        console.log(req.session.user.role)
        next()
    }else{
        console.log("require admin")
        res.json({err: "require admin"})
    }
    
}