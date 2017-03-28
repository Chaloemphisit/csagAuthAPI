const config = require('./config');
const mongoose = require('mongoose')

/**
 You can Config setting in ./config/env/development.js or ./config/env/production.js
 */

module.exports = function(){
    mongoose.set('debug',config.debug);
    mongoose.Promise = global.Promise;
    const db = mongoose.connect(config.mongoUri);
    db.Collection(config.mongoName,function(err, collection) {});

    /* insert your Models here */
    require('../app/models/userModel');
    
    return db;
}