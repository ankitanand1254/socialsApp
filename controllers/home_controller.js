const Post = require('../models/post');


module.exports.home = function(req, res){
    /*console.log(req.cookies);
    res.cookie('user_id', 25);
    return res.render('home', {
        title: "Home"
    });*/


 //populate the user of each post
 Post.find({})
 .populate('user')
 .populate({
    path: 'comments',
    populate: {
        path: 'user'
    }
 })
 .exec(function(err, posts){
    return res.render('home', {
        title: "Home",
        posts: posts
    });
 });
}

// module.exports.actionName = function(req, res){}