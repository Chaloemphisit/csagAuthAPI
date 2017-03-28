const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto=require('crypto');

const UserSchema = new Schema({
    firstName : {
        type: String, 
        unique: true,
        required: 'First Name is required',
        trim: true
    },
    lastName: {
        type: String, 
        unique: true,
        required: 'Last Name is required',
        trim: true
    },
    gender: {
        type:String,
        enum:['male','female']
    },
    phone: String,
    username: {
        type: String, 
        unique: true,
        required: 'Username is required',
        trim: true
    },
    email:{
        type: String, 
        index: true,
        required: 'Email is required'
    },
    password: {
        type:String,
        required: 'Password is required'
    },
    role:{
        type:String,
        enum:['Admin','User','Manager']
    },
    salt:{type: String},
    provider:{
        type: String,
        required:'Provider is required'
    },
    providerId: String,
    providerData:{},
    created:{
        type:Date,
        default:Date.now
    }
});

UserSchema.methods.validPassword = function(password){
    return this.password === password;
}

UserSchema.statics.findUniqueUsrename = function(username, suffix, callback){
    const _this = this;
    const possibleUsername = username + (suffix || '');

    _this.findOne({
        username: possibleUsername
    },function(err, user){
        if(!err){
            if(!user) callback(possibleUsername);
            else return _this.findUniqueUsername(username,(suffix || 0) + 1,callback);
        } else{
            callback(null);
        }
    });
}

mongoose.model('User',UserSchema);