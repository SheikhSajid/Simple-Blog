import React from 'react';
import Comment from './Comment';
import NewCommentForm from './NewComment';
import { Consumer } from './AppContext';

class Post extends React.Component {
  deletePost(id, removeFromState, updateErrorMessage) {
    fetch(`api/post/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.status === 500)
          throw Error('Server Error. Post could not be deleted');
        removeFromState(id);
      })
      .catch(e => {
        updateErrorMessage(e.message);
      });
  }

  render() {
    const { headline, body, comments, _id, timestamp } = this.props;
    return (
      <Consumer>
        {appContext => {
          return (
            <div className="post">
              <div className="header">
                <h3>{headline}</h3>
                <button
                  className="delete-post-link"
                  onClick={() =>
                    this.deletePost(
                      _id,
                      appContext.removePost,
                      appContext.updateErrorMessage
                    )
                  }
                >
                  <small>Delete</small>
                </button>
              </div>

              <div className="timestamp">
                <small>{new Date(timestamp).toString()}</small>
              </div>

              <div className="text">{body}</div>

              <h4>{comments.length} Comments</h4>
              {comments.map(comment => {
                return (
                  <Comment key={comment._id} postId={_id} comment={comment} />
                );
              })}
              <NewCommentForm postId={_id} />
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Post;
