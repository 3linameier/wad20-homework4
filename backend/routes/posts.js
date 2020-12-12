const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const PostModel = require('../models/PostModel');


router.get('/', authorize, (request, response) => {

    // Endpoint to get posts of people that currently logged in user follows or their own posts

    PostModel.getAllForUser(request.currentUser.id, (postIds) => {
        if (postIds.length) {
            PostModel.getByIds(postIds, request.currentUser.id, (posts) => {
                response.status(201).json(posts)
            });
            return;
        }
        response.json([])
    })
});

router.post('posts/', authorize,  (request, response) => {

    // Endpoint to create a new post
    //Siit alla poole ei tööta hetkel see post meetod
    let params = {
        text: request.post.text,
        url: request.post.media.url,
        type: request.post.media.type
    };

    UserModel.create(params, () => {
        response.status(201).json()
    });

});


router.put('/:postId/likes', authorize, (request, response) => {

    // Endpoint for current user to like a post
});

router.delete('/:postId/likes', authorize, (request, response) => {

    // Endpoint for current user to unlike a post

});

module.exports = router;
