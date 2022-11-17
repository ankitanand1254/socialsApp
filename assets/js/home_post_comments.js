const { $__insertMany } = require("mongoose/lib/model");
const { toggleLike } = require("../../controllers/likes_controller");
const { notify } = require("../../routes");
{
let createComment=function(postId){
    let pSelf=this;
    this.newCommentForm.submit(function(e){
        e.preventDefault();
        let self = this;

        $.ajax({
            type:'post',
            url:'/comments/create',
            data: $(self).serialize(),
            success: function(data){
                let newComment= pSelf.newCommentDom(data.data.comment);
                $(`#post-comments-${postId}`).prepend(newComment);
                pSelf.deleteComment($(' .deleted-comment-button', newComment));

                new ToggleLike($(' .toggle-like-button',newComment));
                new Noty({
                    theme: 'relax',
                    text: "Comment published",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500

                }).show();

            }, error: function(error){
                console.log(error.responseText);
            }
        });
    });
}
let newCommentDom=function(comment){
    return $(`<li id="comment-${comment._id}">
    <p>    
            ${ comment.content }
        <br>
        <small>
            ${ comment.user.name }
        </small>
        <small>
            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                0 Likes
            </a>    
            
            <a class="delete=comment-button"href="/comments/destroy/${comment._id }">delete</a>
        </small>
    </p>
</li>`)
}

let deleteComment = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                $(`#post-${data.data.comment_id}`).remove();
           },error: function(error){
            console.log(error.responseText);
           }
        });
    });
}
createComment();
}