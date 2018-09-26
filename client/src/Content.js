import React, { Component } from 'react';
import NewPost from './NewPost';
import Posts from './Posts';
import Error from './Error';

import { Provider } from './AppContext';

export default class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      error: '',
      removeComment: this.removeComment.bind(this),
      addComment: this.addComment.bind(this),
      removePost: this.removePost.bind(this),
      updateErrorMessage: this.updateErrorMessage.bind(this),
      addPost: this.addPost.bind(this)
    };
  }

  componentDidMount() {
    const apiCall = fetch('/api/posts');

    apiCall
      .then(res => res.json())
      .then(jsonData => this.setState({ posts: jsonData.reverse() }))
      .catch(err =>
        this.setState({ error: 'Could not fetch blog posts. Server error.' })
      );
  }

  removeComment(commentId, postId) {
    const post = this.state.posts.find(post => post._id === postId);

    post.comments = post.comments.filter(comment => {
      if (comment._id != commentId) return true;
    });

    this.setState({ posts: [...this.state.posts] });
  }

  addComment(comment, postId) {
    const post = this.state.posts.find(post => post._id === postId);
    post.comments.push(comment);
    this.setState({ posts: [...this.state.posts] });
  }

  removePost(id) {
    const posts = this.state.posts.filter(post => post._id !== id);
    this.setState({ posts });
  }

  addPost(post) {
    this.state.posts.unshift(post);
    this.setState({ posts: [...this.state.posts] });
  }

  updateErrorMessage(error) {
    this.setState({ error });
  }

  render() {
    return (
      <div className="content">
        <Provider value={this.state}>
          {this.state.error && <Error message={this.state.error} />}
          <NewPost />
          <Posts posts={this.state.posts} />
        </Provider>
      </div>
    );
  }
}
