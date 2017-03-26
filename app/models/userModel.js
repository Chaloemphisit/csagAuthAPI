const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userID: String,
    firstName : String,
    lastName: String,
    username: {type: String, unique:true},
    email:{type: String, index: true},
    password: String,
    tel:String
});

mongoose.model('User',UserSchema);