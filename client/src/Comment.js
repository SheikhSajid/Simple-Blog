import React, { Component } from 'react';
import { Consumer } from './AppContext';

class Comment extends Component {
  deleteComment(removeCommentFromLocalState, updateErrorMessage) {
    const { comment, postId } = this.props;

    fetch(`/api/comment/${postId}/${comment._id}`, { method: 'DELETE' })
      .then(res => {
        if (res.status === 500)
          throw Error('Server Error. Comment Could Not Be Deleted.');
        removeCommentFromLocalState(comment._id, postId);
      })
      .catch(e => {
        updateErrorMessage(e.message);
      });
  }

  render() {
    const { comment } = this.props;

    return (
      <Consumer>
        {appContext => (
          <div className="comment">
            <span>{comment.body}</span>
            <small className="comment-timestamp">
              {new Date(comment.timestamp).toString()}
            </small>
            <button
              onClick={() =>
                this.deleteComment(
                  appContext.removeComment,
                  appContext.updateErrorMessage
                )
              }
            >
              <small>Remove comment</small>
            </button>
          </div>
        )}
      </Consumer>
    );
  }
}

export default Comment;
