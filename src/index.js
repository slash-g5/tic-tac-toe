import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props){
  return (
     <button 
        className="square"
        onClick={props.onClick}
      >
          {props.value}
        </button> 
  );
}
  
  class Board extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        squares: Array(9).fill(null),
        xToPlay: true,
        gameOver: false,
        winner: null,
      };
    }

    gameIsNowOver(currentStateOfSquares){
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (currentStateOfSquares[a] && currentStateOfSquares[a] === currentStateOfSquares[b] && currentStateOfSquares[a] === currentStateOfSquares[c]) {
          return true;
        }
      }
      return false;
    }

    handleClick(i) {
      const squares = this.state.squares.slice();
      const newXToPlay = !this.state.xToPlay;
      if((this.state.squares[i] != null) || (this.state.gameOver)){
        return;
      }
      if(this.state.xToPlay){
        squares[i] = 'X';
      }
      else{
        squares[i] = 'O';
      } 
      if(this.gameIsNowOver(squares)){
        this.setState({
          gameOver: true,
          winner: this.state.xToPlay ? 'X' : 'O',
          squares: squares
        })
        return;
      }
      this.setState({squares: squares, xToPlay: newXToPlay})
    }

    renderSquare(i) {
      return(
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        xToPlay={this.state.xToPlay}
      />
      );
    }
  
    render() {
      var status;
      if(!this.state.gameOver)
        status = 'Next player: ' + (this.state.xToPlay ? 'X' : 'O');
      else status = 'Winner is: ' + this.state.winner;
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  