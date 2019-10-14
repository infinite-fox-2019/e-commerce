const Post = require('../models/post')

module.exports = (req, res, next) => {
    const postId = req.params.id
    const id = req.decode.id
    Post.findById(postId)
        .then((result) => {
            if (result) {
                if (result.owner == id) {
                    next()
                } else {
                    next({ status: 403, message: "You are not the owner of this post." })
                }
            } else {
                next({ status: 404, message: "Post not found" })
            }
        }).catch(next);
}