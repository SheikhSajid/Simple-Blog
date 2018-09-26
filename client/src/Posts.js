import React from 'react';
import Post from './Post';

export default class Posts extends React.Component {
  render() {
    return (
      <div className="posts">
        {this.props.posts.map(post => {
          return <Post key={post._id} {...post} />;
        })}
      </div>
    );
  }
}
