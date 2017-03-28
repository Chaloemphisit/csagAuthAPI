module.exports={   
    debug:true,
    sessionSecret: 'dev_secret_key',

    mongoUri: 'mongodb://localhost/csagAuth',
    mongoName:'csagAuth',

    facebook:{
        clientID: '1643795242316351',
        clientScret: '5d57a2973a9d996367a8efde87c1a651',
        callbackURL: 'http://localhost:1337/oauth/facebook/callback'
    }
    

}