import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <h1>Connect4</h1>
        <Board />
      </div>
    );
  }
}

// class Board
class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [
        [0,0,0,1,0,0],
        [0,0,1,0,0,0],
        [0,1,0,0,0,2],
        [0,0,0,0,2,0],
        [0,0,0,2,0,0],
        [0,0,0,0,0,0]
      ],
      currentPlayer: 1,
    }

    this.dropPuck = this.dropPuck.bind(this);
  }

  dropPuck(columnNum) {
    const boardCopy = this.state.board.slice();
    const columnArray = boardCopy[columnNum];
    const firstBlank = columnArray.indexOf(0);
    if (firstBlank === -1) return;

    // replace the first blank spot with teh current player
    columnArray[firstBlank] = this.state.currentPlayer;
    // change current player & update state
    this.setState({
      ...this.state,
      board: boardCopy,
      currentPlayer: (this.state.currentPlayer === 1) ? 2 : 1,
    })
    this.checkWinnner();
  }

  checkWinnner() {
    const board = this.state.board;
    // create an array of arrays that has all verticals, all horizontals and all diagonals
    let lines = [];
    // add columns
    lines = lines.concat(board);

    // add rows
    const rows = board.reduce(
      (acc, cur) => {
        return acc.map((row, i) => [...row, cur[i]]);
      },
      [[], [], [], [], [], []]
    );
    lines = lines.concat(rows);

    // add diagonals
    // add middle diagonal
    const currentLine1 = [];
    const currentLine2 = [];
    for(let i = 0; i < 6; ++i) {
      currentLine1.push(board[i][i]);
      currentLine2.push(board[i][5-i]);
    }
    lines.push(currentLine1,currentLine2);

    // add next diagonal
    const currentLine3 = [];
    const currentLine4 = [];
    const currentLine3a = [];
    const currentLine4a = [];
    for(let i = 0; i < 5; ++i) {
      currentLine3.push(board[i][i+1]);
      currentLine4.push(board[i+1][i]);
      currentLine3a.push(board[i][4-i]);
      currentLine4a.push(board[5-i][i+1]);
    }
    lines.push(currentLine3,currentLine4,currentLine3a,currentLine4a);
    
    // add next diagonal
    const currentLine5 = [];
    const currentLine6 = [];
    const currentLine5a = [];
    const currentLine6a = [];
    for(let i = 0; i < 4; ++i) {
      currentLine5.push(board[i][i+2]);
      currentLine6.push(board[i+2][i]);
      currentLine5a.push(board[i][3-i]);
      currentLine6a.push(board[5-i][i+2]);
    }
    lines.push(currentLine5,currentLine6,currentLine5a,currentLine6a);
  }

  render() {
    return (
  // state: 3D board array with columns and cells, current player
  // methods: drop puck passes down column array
  <div className="board">
    <Column column={this.state.board[0]} onClick={() => this.dropPuck(0)}/>
    <Column column={this.state.board[1]} onClick={() => this.dropPuck(1)}/>
    <Column column={this.state.board[2]} onClick={() => this.dropPuck(2)}/>
    <Column column={this.state.board[3]} onClick={() => this.dropPuck(3)}/>
    <Column column={this.state.board[4]} onClick={() => this.dropPuck(4)}/>
    <Column column={this.state.board[5]} onClick={() => this.dropPuck(5)}/>
  </div>
  );
}
}

// class Columns
class Column extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    
  // onClick method for drop puck

  const cells = this.props.column.map((value,index) => {
    return <Cell puckDrop={value} key={"cell" + index}/>
  }).reverse();
  return (
  <div className="column" onClick={this.props.onClick}>
    {cells}
  </div> 
  );
}
}

// class Cell
// current state depends on current player and puck dropped
const Cell = (props) => (
  <div className="cell">
  {(props.puckDrop === 1) && <div className="puck black"></div>}
  {(props.puckDrop === 2) && <div className="puck red"></div>}
  </div>
);



render(<App />, document.querySelector('#root'));
