import React from 'react';
import { Consumer } from './AppContext';

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { headline: '', body: '' };

    this.handleHeadlineChange = this.handleHeadlineChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
  }

  handleHeadlineChange(event) {
    this.setState({
      headline: event.target.value
    });
  }

  handleBodyChange(event) {
    this.setState({
      body: event.target.value
    });
  }

  handleSubmission(event, addPostToAppState, updateErrorMessage) {
    event.preventDefault();
    const { headline, body } = this.state;

    if (!headline || !body) {
      updateErrorMessage('Headline/body cannot be empty');
      return;
    }

    fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ headline, body })
    })
      .then(res => {
        if (res.status === 500) throw Error('Server Error. Post not created');
        this.setState({ headline: '', body: '' });
        return res.json();
      })
      .then(json => {
        addPostToAppState({
          _id: json._id,
          headline,
          body,
          timestamp: Date.now(),
          comments: []
        });
      })
      .catch(e => {
        updateErrorMessage(e.message);
      });
  }

  render() {
    return (
      <Consumer>
        {appContext => {
          return (
            <div className="newpost-form-container">
              <h4>New Blog Post:</h4>
              <form
                className="post-form"
                onSubmit={event =>
                  this.handleSubmission(
                    event,
                    appContext.addPost,
                    appContext.updateErrorMessage
                  )
                }
              >
                <input
                  id="headline-input"
                  value={this.state.headline}
                  placeholder="Headline"
                  onChange={this.handleHeadlineChange}
                />

                <textarea
                  id="headline-input"
                  value={this.state.body}
                  placeholder="Body"
                  onChange={this.handleBodyChange}
                />
                <input type="submit" value="Post" className="comment-button" />
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default NewPost;
