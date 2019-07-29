const express = require('express');
const BlogPosts = require('../data/db.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await BlogPosts.find();
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'The posts information could not be retrieved.',
        });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = await BlogPosts.findById(req.params.id);

        if(id) {
             res.status(200).json(id);
        } else {
             res.status(404).json({ message: 'The post with the specified ID does not exist.'})
        }
    } catch (error) {
        res.status(500).json({ message: 'error retrieving post.'})
    }
})

router.post('/', async (req, res) => {
    try {
        const addedPost = await BlogPosts.insert(req.body);
        
        if(req.body.title && req.body.contents) {
            return res.status(201).json(addedPost);
        } else {
            return res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
        }
    } catch (error) {
        res.status(500).json({ message: 'There was an error while saving the post to the database'})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await BlogPosts.remove(req.params.id);

        if(deletedPost) {
            res.status(200).json({ message: 'successfully deleted!'})
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    } catch (error) {
        res.status(500).json({ error: "The post could not be removed"})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await BlogPosts.update(req.params.id, req.body);

        if(updatedPost) {
            if(req.body.title && req.body.contents) {
                res.status(200).json(updatedPost);
            } else {
                res.status({ errorMessage: "Please provide title and contents for the post." })
            }
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    } catch (error) {
        res.status(500).json({ error: "The post information could not be modified."})
    }
})

router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await BlogPosts.findPostComments(req.params.id);
        
        if (comments) {
            res.status(201).json(comments);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    } catch (error) {
        res.status(400).json({ error: "Please provide text for the comment." })
    }
})

router.post('/:id/comments', async (req, res) => {
    try {
        const newComment = await BlogPosts.insertComment(req.body);
        console.log(req.body)
        if(newComment) {
            res.status(201).json(newComment);
        } else {
            res.status(400).json({ errorMessage: "Please provide text for the comment."})
        }
    } catch (error) {
        res.status(404).json({error: "The post with the specified ID does not exist." })
    }
})

module.exports = router;