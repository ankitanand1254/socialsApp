const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    //the user who sent the request
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //the user who accepted this request, the naming is just to understand, the users won't see a difference
    to_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    },
},{
    timestamps: true
});

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;