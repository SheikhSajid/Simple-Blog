const mongoClient = require('mongodb').MongoClient;

const url = 'mongodb://test_user:z0MP|1@ds113003.mlab.com:13003/blog';
// const url = 'mongodb://localhost:27017/blog';

const connection = mongoClient.connect(
  url,
  { useNewUrlParser: true }
);

// Export the Promise returned by MongoClient
module.exports = connection;
