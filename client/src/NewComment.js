import React from 'react';
import { Consumer } from './AppContext';

class NewComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: '' };

    this.handleBodyChange = this.handleBodyChange.bind(this);
  }

  handleBodyChange(event) {
    this.setState({
      body: event.target.value
    });
  }

  handleSubmission(event, addCommentToState, updateErrorMessage) {
    event.preventDefault();
    const { body } = this.state;

    if (!body) {
      updateErrorMessage('Comment cannot be empty.');
      return;
    }

    fetch(`/api/comment/${this.props.postId}`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ body })
    })
      .then(res => {
        if (res.status === 500)
          throw Error('Server Error. Could not add comment.');
        this.setState({ body: '' });
        return res.json();
      })
      .then(json => {
        addCommentToState(
          { _id: json._id, body, timestamp: Date.now() },
          this.props.postId
        );
      })
      .catch(e => {
        updateErrorMessage(e.message);
      });
  }

  render() {
    return (
      <Consumer>
        {appContext => (
          <div className="comment">
            <form
              className="comment-form"
              onSubmit={event => {
                this.handleSubmission(
                  event,
                  appContext.addComment,
                  appContext.updateErrorMessage
                );
              }}
            >
              <textarea
                id="headline-input"
                value={this.state.body}
                placeholder="Comment"
                onChange={this.handleBodyChange}
              />
              <input type="submit" value="Comment" className="comment-button" />
            </form>
          </div>
        )}
      </Consumer>
    );
  }
}

export default NewComment;
