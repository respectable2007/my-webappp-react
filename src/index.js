import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// class Square extends React.Component {
// 	// constructor() {
// 	// 	super();
// 	// 	this.state = {
// 	// 		value: null
// 	// 	}
// 	// }
// 	render() {
// 		return (
// 			<button className="square"
// 				onClick={()=>this.props.onClick()}>
//         {this.props.value}
//       	</button>
// 		);
// 	}
// }
function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}
//函数定义组件-组件内仅有render方法
function Square(props) {
	return (
		<button 
			className="square"
			onClick={props.onClick}>
		{props.value}
		</button>
	);
}
class Board extends React.Component {
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		squares: Array(9).fill(null),
	// 		xIsNext: true,
	// 	};
	// }

	// handleClick(i) {
	// 	const squares = this.state.squares.slice();
	// 	if (calculateWinner(squares) || squares[i]) {
	// 		return;
	// 	}
	// 	squares[i] = this.state.xIsNext ? 'X' : '0';
	// 	this.setState({
	// 		squares: squares,
	// 		xIsNext: !this.state.xIsNext,
	// 	});
	// }

	renderSquare(i) {
		return <Square value={this.props.squares[i]}
					   onClick={()=>this.props.onClick(i)}/>;
	}

	render() {
		// const winner = calculateWinner(this.state.squares);
		// let status;
		// if (winner) {
		// 	status = 'Winner: ' + winner;
		// } else {
		// 	status = 'Next player: ' + (this.state.xIsNext ? 'X' : '0');
		// }

		return (
			<div>
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
	constructor() {
		super();
		this.state = {
			history: [{
				squares: Array(9).fill(null)
			}],
			stepNumber: 0,
			xIsNext: true,
		}
	}
	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : '0';
		this.setState({
			history: history.concat([{
				squares: squares
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		});
	}
	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) ? false : true
		});
	}
	render() {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);
		const moves = history.map((step, move) => {
			const desc = move ? 'Move #' + move : 'Game start';
			return (
				<li key={move}>
					<a href="#" 
					   onClick={()=>this.jumpTo(move)}>
					   {desc}
				    </a>
				</li>
			);
		})
		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : '0');
		}
		return (
			<div className="game">
	        <div className="game-board">
	          <Board squares={current.squares}
	          		 onClick={(i) => this.handleClick(i)}/>
	        </div>
	        <div className="game-info">
	          <div>{status}</div>
	          <ol>{moves}</ol>
	        </div>
	      </div>
		);
	}
}

// ========================================
/*JSX语法*/
// var names = ['Alice', 'Emily', 'Kate'];
// ReactDOM.render(
// 	<ul>{
// 		names.map((name)=>{
// 			return(
// 				<li key={name}>
// 					Hello,{name}!
// 				</li>
// 			)
// 		})
// 	}</ul>,
// 	document.getElementById('root')
// );

/*JSX允许直接在模版插入js变量，若变量为数组，则会展开数组的所有成员*/
// let hs = [<h1>你好,世界!</h1>, <h2>世界，你好!，我是花卷</h2>]
// ReactDOM.render(
// 	<div>{hs}</div>,
// 	document.getElementById('root')
// )

/*组件*/