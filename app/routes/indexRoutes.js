module.exports = function(app){
    /*Start include Controller file*/
        const index = require('../controllers/indexController');
    /* end include*/


    /*Start web router*/
        app.get('/',index.index);

    /*end web router*/
}