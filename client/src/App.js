import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav';
import Content from './Content';

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <Content />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
