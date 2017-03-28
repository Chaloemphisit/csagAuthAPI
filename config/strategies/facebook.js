const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config =require('../config');
const user =require('../../app/controllers/userController');

module.exports = function(){
        passport.use('facebook',new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: 'http://localhost:1337/oauth/facebook/callback',
        profilefileFields: ['id', 'email', 'name'],
        passReqToCallBack: true,
        enableProof: true
    }),function(req, accessToken, refreshToken, profile, done){
        const providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        const providerUserProfile = {
            firstName: profile.name.givenName,
            lastName: profile.name.familyname,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'facebook',
            providerId: profile.id,
            providerData: providerData 
        }
        user.saveOAuthUserProfile(req, providerUserProfile, done);
    });
}