const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.posts = function(req,res){
    return res.end('<h1>Posts</h1>');
}
module.exports.create = async function(req,res){
    try{
        await Post.create({
        content: req.body.content, 
        user: req.user._id
    });
    req.flash('success', 'Post added Successfully');
    return res.redirect('back');
        }catch(err){
            console.log('Error', err);
            return;
        }
}

module.exports.destroy = async function (req, res){
    
    try{
        let post = await Post.findById(req.params.id);
        
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            req.flash('success', 'Post deleted successfully');
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }

    }catch(err){
            console.log('Error',err);
            req.flash('error', 'Can not be deleted');
            return;
        }
}