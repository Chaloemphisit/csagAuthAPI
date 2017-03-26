const User =require('mongoose').model('User');

exports.login = function(req,res){
    res.json({"IsLogin":"true"});
}
exports.loguot = function(req,res){
    res.json({"IsLogin":"false"});
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