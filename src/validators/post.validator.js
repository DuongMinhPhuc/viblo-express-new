const post = require('../models/post.model')

exports.PostValidator = function(req, res, next){
    //title
    req.check('title', 'Title is required.').notEmpty();
    //content
    req.check('content', 'Write a content').notEmpty();


    //check for errors
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    console.log("post validator successfully")
    next();
}