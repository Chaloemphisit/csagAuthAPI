const   express = require('express'),
        morgan = require('morgan'),
        compression = require('compression'),
        bodyParser = require('body-parser'),
        session = require('express-session'),
        config = require('./config'),
        passport = require('passport');
        flash = require('connect-flash');

module.exports = function(){
    const app = express();

    app.use(session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true
    }));

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    //check NODE_ENV is Development or production
    if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'))
    }else{
        app.use(compression);
    }
    
    app.use(bodyParser.urlencoded({
        extended:true
    }));
    app.use(bodyParser.json());

    /*insert your router files here*/
        require('../app/routes/indexRoutes')(app);
        require('../app/routes/userRoutes')(app);

    /*return  app() for use express in other file*/
    return app;
}