const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

module.exports  = function(){
    passport.use('local',new LocalStrategy(function(username,password,done){
        User.findOne({username:username},function(err,user){
            if(err){
                return done(err);
            }
            if (!user || !user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            // if (!user.validPassword(password)) {
            //     return done(null, false, { message: 'Incorrect password.' });
            // }
            
            return done(null,user,{message:'Login successful'})
        })
    }))
}