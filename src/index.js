import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

function calculateWinner(squares) {
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
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			currentPlayer: 0,
			nextPlayer: 1,
			players: ['X','O'],
		};
	}
	handleClick(i) {
		const squares = this.state.squares.slice();
		if(calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.players[this.state.currentPlayer];
		this.setState({squares: squares, currentPlayer: this.state.nextPlayer, nextPlayer: this.state.currentPlayer,});
	}
	renderSquare(i) {
		return <Square 
			value={this.state.squares[i]}
			onClick={() => this.handleClick(i)}
		/>;
	}
	renderReset() {
		if(calculateWinner(this.state.squares) || this.state.squares.indexOf(null) === -1) {
			return (
			
				<button className='func-button' onClick={() => {this.setState({squares: Array(9).fill(null), currentPlayer: 0, nextPlayer: 1})}}>
				Reset
				</button>
			);
		}
	}

	render() {
		const winner = calculateWinner(this.state.squares);
		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			if(this.state.squares.indexOf(null) === -1)
				status = 'No winner';
			else 
				status = 'Next player: '+(this.state.players[this.state.currentPlayer === 0 ? 0 : 1]);
		}

		return (
			<div>
				<div className="status">{status}&nbsp;&nbsp;&nbsp;{this.renderReset()}</div>
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
			<div className="game-area">
				<div><h1>Tic-Tac-Toe</h1></div>
				<div className="game">
					<div className="game-board">
						<Board />
					</div>
				</div>
			</div>
		);
	}
}


// Now render it all at the root div

ReactDOM.render(
<Game />,
document.getElementById('root')
);
