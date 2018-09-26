var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://localhost:27017/';

MongoClient.connect(
  url,
  function(err, db) {
    if (err) throw err;
    var dbo = db.db('blog');

    var query = { _id: new ObjectId('5ba794bf6407a4d4b629e186') };
    var newComment = {
      $push: {
        comments: {
          body: 'Comment through node driver 1',
          timestamp: 5464564564,
          _id: new ObjectId()
        }
      }
    };

    var deleteComment = {
      $pull: {
        comments: { _id: new ObjectId('5ba88a5447c59a00fe5373cc') }
      }
    };

    // dbo
    //   .collection('posts')
    //   .updateOne(query, newComment)
    //   .then(res => {
    //     console.log('Comment pushed');
    //     db.close();
    //   });

    dbo
      .collection('posts')
      .updateOne(query, deleteComment)
      .then(res => {
        console.log('Comment deleted');
        db.close();
      });

    // dbo.collection("posts").find(query).toArray(function(err, result) {
    //   if (err) throw err;
    //   console.log(result);
    //   db.close();
    // });
  }
);
