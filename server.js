'use strict';

/* Since the beginning We Assume your product is 'development'
   And You can set development or production in this way
     1) Windows 
        - Open  cmd.
        - enter "set NODE_ENV=development" or "set NODE_ENV=production" in cmd
        -finished
    2) Linux/Mac
        - Open Teminal
        - enter "export NODE_ENV=development" or "export NODE_ENV=production" in Terminal
    3) Or you can set development or production in below code
*/
process.env.NODE_ENV=process.env.NODE_ENV || 'development';

const mongoose = require('./config/mongoose');
const express = require('./config/express');
const passport = require('./config/passport');

const port = process.env.port || 1337;

const db = mongoose();
const app = express();
passport();

app.listen(port,function(){
    console.log('Starting Node.js on port '+port);
});

module.exports=app;