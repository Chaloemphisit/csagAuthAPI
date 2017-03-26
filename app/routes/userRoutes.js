module.exports = function(app){
    const user = require('../controllers/userController');

    app.post('/login',user.login);
    app.post('/logout',user.loguot);
    app.route('/user').post(user.create).get(user.list);
}