import React from 'react';

const AppContext = React.createContext({
  removeComment() {
    throw Error('Pass removeComment to AppContext!');
  },
  addComment() {
    throw Error('Pass addComment to AppContext!');
  },
  removePost() {
    throw Error('Pass removePost to AppContext!');
  },
  updateErrorMessage() {
    throw Error('Pass updateErrorMessage to AppContext!');
  },
  addPost() {
    throw Error('Pass addPost to AppContext!');
  }
});

export const Provider = AppContext.Provider;
export const Consumer = AppContext.Consumer;
