const api = require('express').Router();
const ObjectId = require('mongodb').ObjectId;
const db = require('../connection');

/* API endpoints for retrieving, creating and deleting Blog Posts */

// Get all blog posts
api.get('/posts', async (req, res) => {
  try {
    const client = await db;
    const postsCollection = client.db('blog').collection('posts');
    const posts = await postsCollection.find().toArray();

    res.json(posts);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Create a new blog post
api.post('/post', async (req, res) => {
  const post = {
    headline: req.body.headline,
    body: req.body.body,
    timestamp: Date.now(),
    comments: []
  };

  try {
    const client = await db;
    const postsCollection = client.db('blog').collection('posts');
    await postsCollection.insertOne(post);
    console.log(JSON.stringify(post, null, 2));
    res.status(201).send({ _id: post._id });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

// Delete a blog post by handling a HTTP DELETE request
api.delete('/post/:id', async (req, res) => {
  try {
    const client = await db;
    const postsCollection = client.db('blog').collection('posts');

    await postsCollection.deleteOne({ _id: ObjectId(req.params.id) });
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
});

/* 
  API endpoints for creating and deleting comments. Each Blog Post document
  in the 'posts' collection has a 'comments' array that stores the comments
  for that particular Blog Post.
*/

// Add a new comment to a blog post
api.post('/comment/:post_id', async (req, res) => {
  const comment = {
    _id: new ObjectId(),
    body: req.body.body,
    timestamp: Date.now()
  };

  try {
    const client = await db;
    const postsCollection = client.db('blog').collection('posts');

    const query = { _id: ObjectId(req.params.post_id) };
    var newComment = { $push: { comments: comment } };

    await postsCollection.updateOne(query, newComment);
    res.status(201).send({ _id: comment._id });
  } catch (err) {
    res.sendStatus(500);
  }
});

// Delete a comment from a blog post
api.delete('/comment/:post_id/:comment_id', async (req, res) => {
  try {
    const client = await db;
    const postsCollection = client.db('blog').collection('posts');

    const query = { _id: ObjectId(req.params.post_id) };
    const commentToDelete = {
      $pull: {
        comments: { _id: new ObjectId(req.params.comment_id) }
      }
    };

    await postsCollection.updateOne(query, commentToDelete);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = api;
