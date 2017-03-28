const User =require('mongoose').model('User');

//logout function
exports.loguot = function(req,res){
    res.json({"redir":"/","message":"Logout successful"});
    req.logout();
   
}

exports.saveOAuthUserProfile = function(req, profile, done){
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    },function(err,user){
        if(err) return done(err);
        else{
            if(!user){
                const possibleUsername = profile.username || (profile.email ? profile.email.sprit('@')[0]:'');
                User.findUniqueUsername(possibleUsername, null, function(availableUsername){
                    profile.username = availableUsername;
                    user = new User(profile);

                    if(err){
                        res.json({"redir":"/signup","message":getErrorMesage(err)})
                    }
                    return done(err, user);
                });
            }else{
                return done(err,user);
            }
        }
        return done(err,user);
    });

}

exports.signup = function(req,res,next){
    if(!req.user){
        const user =new User(req.body);
        user.provider='local';

        user.save(function(err){
            if(err) {
                return res.json({"redir":"/signup","message":getErrorMesage(err)});
            }else{
                //res.json(user);
                res.json({"redir":"/login","message":"Signup succesful"});
            }
            // req.login(user,function(err){
            //     if(err) return next(err);
            //     return res.json({"redir":"/users","userName":user.username,"message":"Signup successful and Login complete"});
            // })
        });
    }
}

exports.list = function(req,res,next){
    User.find({},function(err,users){
        if(err){
            return next(users);
        }else{
            res.json(users);
        }
    });
}

exports.create = function(req,res,next){
    const user = new User(req.body);

    user.save(function(err){
        if(err){
            return next(err);
        }else{
            res.json(user);
        }
    });
}

exports.read = function(req,res){
    res.json(req.user);
}

exports.update = function(req, res, next){
    User.findOneAndUpdate({username:req.user.username},req.body,function(err,user){
        if(err){
            return next(err);
        }else{
            res.json(user);
        }
    })
}

exports.delete = function(req,res,next){
    req.user.remove(function(err){
        if(err){
            return next(err);
        }else{
            res.json(req.user);
        }
    });
}

exports.userByUsername = function(req, res, next, username){
    User.findOne({
        username:username
    },function(err,user){
        if(err){
            next(err);
        }else{
            req.user = user;
            next();
        }
    });
}

var getErrorMesage = function(err){
    var message='';

    if(err.code){
        switch(err.code){
            case 11000:
            case 11001:{
                message = 'Username already exists';
                break;    
            }
            default :{
                message = 'Somthing went wrong';
                break;
            }
        }
    }else{
        for(const errName in err.errors){
            if(err.errors[errName].message){
                message = err.errors[errName].message;
            }
        }
    }
    return message;
}