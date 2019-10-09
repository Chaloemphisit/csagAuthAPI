const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config');
const passport = require('passport');

module.exports = function(){
    const app = express();

    app.use(session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    //check NODE_ENV is Development or production
    process.env.NODE_ENV === 'development' ? app.use(morgan('dev')) : app.use(compression);
    
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
