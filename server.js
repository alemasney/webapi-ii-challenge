const express = require('express');
const BlogPosts = require('./data/db.js');
const BlogPostsRouter = require('./blogPosts/blogPosts-router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', BlogPostsRouter);

server.get('/', (req, res) => {
    console.log('Server running on port 4000.');
})

module.exports = server;