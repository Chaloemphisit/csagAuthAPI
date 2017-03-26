const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto=require('crypto');

const UserSchema = new Schema({
    firstName : String,
    lastName: String,
    gender: String,
    phone: String,
    username: {
        type: String, 
        unique: true,
        required: true ,//'Username is required',
        trim: true
    },
    email:{
        type: String, 
        index: true
    },
    password: {
        type:String,
    },
    role:{
        type:String,
        enum:['Admin','User','Manager']
    },
    salt:{type: String},
    provider:{
        type: String,
        required:true //Provider is required'
    },
    providerId: String,
    providerData:{},
    created:{
        type:Date,
        default:Date.now
    }
});

UserSchema.pre('save',function(next){
    if(this.password){
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
        this.password = this.hashPassword(this.password);
    }
});

UserSchema.methods.hashPassword = function(password){
    return crypto.pbkdf2Sync(password,this.salt,10000,64,'sha1').toString('base64');
}

UserSchema.methods.authenticate = function(password){
    return this.pass === this.hashPassword(password);
}

mongoose.model('User',UserSchema);