exports.index = function(req,res){
    res.json({"userName":req.user.userName});
}