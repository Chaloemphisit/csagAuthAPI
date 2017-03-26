const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('mongoose').model('User');

module.exports  = function(){
    passport.use(new LocalStrategy(function(username,password,done){
        User.findOne({username:username},function(err,user){
            if(err){
                return done(err);
            }
            if(!user || !user.authenticate(password)){
                return done(null,false,{
                    massage:'Invalid user name or password'
                })
            }
            return done(null,user)
        })
    }))
}