const Post = require('../models/post');

module.exports.posts = function(req,res){
    return res.end('<h1>Posts</h1>');
}
module.exports.create = function(req,res){
    Post.create({
        content: req.body.content, 
        user: req.user._id
    }, function(err, post){
        if(err){
            console.log('error in creating post');
            return;
        }
        return res.redirect('back');
    });
}