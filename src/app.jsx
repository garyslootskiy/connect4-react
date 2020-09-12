import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <h1><span className="tred">Conn</span>ect<span className="tred">4</span></h1>
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
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
      ],
      currentPlayer: 1,
    }

    this.dropPuck = this.dropPuck.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
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
  }

  componentDidUpdate() {
    setTimeout(()=>{
    this.checkWinnner();
    if(boardCopy.includes[0] === -1) {
      alert("Theres a draw!!!!");
      this.clearBoard;
    }
  }, 10
    );
  }

  clearBoard() {
    this.setState({
      board: [
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
      ],
      currentPlayer: 1,
    })
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
    let currentLines = [[],[],[],[],[],[],[],[],[],[]]
    for(let i = 0; i < 6; ++i) {
      currentLines[0].push(board[i][i]);
      currentLines[1].push(board[i][5-i]);
    }
    
    // add next diagonal
    for(let i = 0; i < 5; ++i) {
      currentLines[2].push(board[i][i+1]);
      currentLines[3].push(board[i+1][i]);
      currentLines[4].push(board[i][4-i]);
      currentLines[5].push(board[5-i][i+1]);
    }
    
    // add next diagonal
    for(let i = 0; i < 4; ++i) {
      currentLines[6].push(board[i][i+2]);
      currentLines[7].push(board[i+2][i]);
      currentLines[8].push(board[i][3-i]);
      currentLines[9].push(board[5-i][i+2]);
    }
    lines = lines.concat(currentLines);

    // check for 5 of a kind
    for(let i = 0; i < lines.length; ++i) {
      const line = lines[i];
      let counter = 0;
      let lastElem;
      for (let j=0; j < line.length; ++j) {
        const cell = line[j];
        if (cell === 0) {
          lastElem = 0;
          counter = 0;
        } else if(counter === 0) {
          lastElem = cell;
          counter += 1;
        } else if (cell === lastElem) {
          counter += 1;
          if (counter === 4) {
            alert (`${lastElem} wins!!!!`);
            return;
          }
        } else {
          lastElem = cell;
          counter = 1;
        }
      }
    }
  }

  render() {
    return (
  // state: 3D board array with columns and cells, current player
  // methods: drop puck passes down column array
  <div className="secclass">
    <div className="board">
      <Column column={this.state.board[0]} onClick={() => this.dropPuck(0)}/>
      <Column column={this.state.board[1]} onClick={() => this.dropPuck(1)}/>
      <Column column={this.state.board[2]} onClick={() => this.dropPuck(2)}/>
      <Column column={this.state.board[3]} onClick={() => this.dropPuck(3)}/>
      <Column column={this.state.board[4]} onClick={() => this.dropPuck(4)}/>
      <Column column={this.state.board[5]} onClick={() => this.dropPuck(5)}/>
    </div>
    <span className="currentplayer">Current Player: {this.state.currentPlayer}</span>
    <button onClick={this.clearBoard}>Reset Board</button>
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

function getAllDiagnols(cells, v = 1, minLength = 0) {
  const diagnols = [];

  const stopCondition = v > 0 ? (val) => val < cells.length : (val) => val >= 0;
  const start = v > 0 ? 0 : cells.length - 1;

  // push the middle diagnol so that it doesn't get pushed twice in the loop
  const diagMiddle = getDiagnol(cells, [start, start], [v, v]);
  diagnols.push(diagMiddle);

  for (let xy = start + v; stopCondition(xy); xy += v) {
    if (xy < minLength - 1) continue;
    const diag = getDiagnol(cells, [start, xy], [v, v]);
    const diagMirrored = getDiagnol(cells, [xy, start], [v, v]);
    diagnols.push(diag, diagMirrored);
  }
  return diagnols;
}

// function getDiagnol(cells, [originX, originY], [vx, vy]) {
//   // Set up our for loop conditions based on our xy vector components
//   const stopConditionX =
//     vx > 0 ? (val) => val < cells.length : (val) => val >= 0;
//   const stopConditionY =
//     vy > 0 ? (val) => val < cells[0].length : (val) => val >= 0;

//   let diagnol = [];
//   for (
//     let x = originX, y = originY;
//     stopConditionX(x) && stopConditionY(y);
//     x += vx, y += vy
//   ) {
//     diagnol.push(cells[x][y]);
//   }

//   return diagnol;
// }
