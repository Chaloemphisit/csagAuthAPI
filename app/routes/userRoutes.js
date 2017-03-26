module.exports = function(app){
    const user = require('../controllers/userController');

    app.post('/login',user.login);
    app.post('/signup',user.signup);
    app.post('/logout',user.loguot);
    app.route('/user')
        .post(user.create)
        .get(user.list);
    app.route('/user/:username')
        .get(user.read)
        .put(user.update)
        .delete(user.delete);
    app.param('username',user.userByUsername);
}