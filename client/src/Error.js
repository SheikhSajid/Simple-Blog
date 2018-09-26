import React from 'react';
import { Consumer } from './AppContext';

class Error extends React.Component {
  hideErrorMessageAfterDelay(delay, updateErrorState) {
    this.hideError = setTimeout(updateErrorState, delay, '');
  }

  componentWillUnmount() {
    clearTimeout(this.hideError);
  }

  render() {
    return (
      <Consumer>
        {appContext => {
          this.hideErrorMessageAfterDelay(10000, appContext.updateErrorMessage);
          return <div className="error">{this.props.message}</div>;
        }}
      </Consumer>
    );
  }
}

export default Error;
