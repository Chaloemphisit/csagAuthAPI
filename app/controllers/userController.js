const User =require('mongoose').model('User');

exports.login = function(req,res){
    res.json({"IsLogin":"true"});
}
exports.loguot = function(req,res){
    res.json({"IsLogin":"false"});
}

exports.signup = function(req,res,next){
    if(!req.user){
        const user =new User(req.body);
        user.provider='local';

        user.save(function(err){
            if(err) {
                return res.json({"redir":"localhost"});
            }
            req.loin(user,function(err){
                if(err) return next(err);
                return this.res.json({"redir":"/"})
            })
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