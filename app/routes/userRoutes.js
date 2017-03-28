const user = require('../controllers/userController');
const passport = require('passport');

module.exports = function(app){
    app.post('/login',function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.json({"redir":"/login","message":info.message}); }
            req.login(user, function(err) {
                if (err) { return next(err); }
                //return res.redirect('/users/' + user.username);
                return res.json({"redir":"/users","userName":user.username,"message":info.message});
            });
        })(req, res, next);
    });
    app.post('/logout',user.loguot);
    app.post('/signup',user.signup);
    app.get('/login',function(req, res){
        res.send('Login page');
    });

    /** Login with facebook */
        app.get('/oauth/facebook',passport.authenticate('facebook',{
            failureRedirect:'/login',
            authType: 'rerequest',
            scope: 'email'
        }))
        app.get('/oauth/facebook/callback',
            passport.authenticate('facebook', { failureRedirect: '/login' }),
            function(req, res) {
                // Successful authentication, redirect home.
                return res.json({"redir":"/users","message":"Login Successful"});
        });

    /** */

    app.route('/user')
        .post(user.create)
        .get(user.list);
    app.route('/user/:username')
        .get(user.read)
        .put(user.update)
        .delete(user.delete);
    app.param('username',user.userByUsername);
}