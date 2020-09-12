import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Tic Tac Toe</h1>
      </div>
    );
  }
}

render(<App />, document.querySelector('#root'));
