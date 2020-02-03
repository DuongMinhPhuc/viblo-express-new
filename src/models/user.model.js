const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type: String, unique: true, required: false, trim: true},
    username: {type: String, unique: true, required: false, trim:true},
    password: {type: String, required: true, trim: true, minlength: 6},
    password_confirm: {type: String, required: true, trim: true, minlength: 6}
})

module.exports = mongoose.model('User',userSchema)