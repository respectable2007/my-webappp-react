import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/*react入门指南-井字棋游戏*/
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
// let hs = [<h1>你好,世界!</h1>, <h2>世界，你好!我是花卷</h2>]
// ReactDOM.render(
// 	<div>{hs}</div>,
// 	document.getElementById('root')
// )

// ========================================

/*函数定义/类定义组件*/
// function Msg(props) {
// 	return (<h1>Hello,{props.name}!</h1>);
// }
// ReactDOM.render(
// 	<Msg name="huajuan"/>,
// 	document.getElementById('root')
// )

/*ES6 class定义组件*/
// class Msg extends React.Component {
// 	render() {
// 		return <h1>Hello,{this.props.name}</h1>;
// 	}
// }
// ReactDOM.render(
// 	<Msg name='huajuan'/>,
// 	document.getElementById('root')
// )

/*组件渲染*/
// function Msg(props) {
// 	return (<h1>{props.name}</h1>);
// }
// const element = <Msg name='huajuan'/>;
// ReactDOM.render(
// 	element,
// 	document.getElementById('root')
// )

/*组件名称必须以大写字母开头*/

/*组合组件，组件可以在它的输出中引用其他组件*/
// function Msg(props) {
// 	return <h1>{props.name}</h1>;
// }

// function App() {
// 	return (
// 		<div>
// 			<Msg name='huajuan1'/>
// 			<Msg name='huajuan2'/>
// 			<Msg name='huajuan3'/>
// 		</div>
// 	)
// }
// ReactDOM.render(
// 	<App/>,
// 	document.getElementById('root')
// )

/*提取组件：在大型应用中，构建可复用的组件完全是值得的*/
/*props是只读的*/

// ========================================

/*state*/
/*更新UI：方法一*/
// function tick() {
// 	const element = (
// 		<div>
// 			<h1>hello,huajuan!</h1>
// 			<h2>It is {new Date().toLocaleTimeString()}.</h2>
// 		</div>
// 	);
// 	ReactDOM.render(
// 		element,
// 		document.getElementById('root')
// 	)
// }
// setInterval(tick, 1000);

/*可重复和封装的组件的示例-clock*/
// function Clock(props) {
// 	return (
// 		<div>
// 			<h1>Hello,huajuan!</h1>
// 			<h2>It is {props.date.toLocaleTimeString()}.</h2>
// 		</div>
// 	)
// }

// function tick() {
// 	ReactDOM.render(
// 		<Clock date={new Date()}/>,
// 		document.getElementById('root')
// 	)
// }
// setInterval(tick, 1000);
/*以上组件UI更新并未有clock组件自身更新，而是由tick函数传入参数实现的
因此，需要将clock组件进行改造，改造如下：*/
// class Clock extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			date: new Date()
// 		}
// 	}
// 	componentDidMount() {
// 		this.timerID = setInterval(
// 			() => this.tick(),
// 			1000
// 		)
// 	}
// 	componentWillUnMount() {
// 		clearInterval(this.timerID);
// 	}
// 	tick() {
// 		this.setState({
// 			date: new Date()
// 		})
// 	}
// 	render() {
// 		return (
// 			<div>
// 				<h1>Hello,huajuan!</h1>
// 				<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
// 			</div>
// 		);
// 	}
// }
// ReactDOM.render(
// 	<Clock/>,
// 	document.getElementById('root')
// )

// ========================================

/*事件处理*/
// class Toggle extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			isToggleOn: true
// 		};
// 		this.handleClick = this.handleClick.bind(this);
// 	}
// 	handleClick() {
// 		this.setState(prevState => ({
// 			isToggleOn: !prevState.isToggleOn
// 		}))
// 	}
// 	render() {
// 		return (
// 			<button onClick={this.handleClick}>
// 				{this.state.isToggleOn?'on':'off'}
// 			</button>
// 		)
// 	}
// }
// ReactDOM.render(
// 	<Toggle/>,
// 	document.getElementById('root')
// )

/*注意：组件内回调函数中的this，不会默认指向类的this，若忘记绑定
类的this，则会报错。
React建议的处理方法是：
1、在constructor中bind(this);
2、使用属性初始化器语法，例如hanleClick=()=>{
	console.log(this)--this是类的this（ES6箭头函数的特性）
}*/

// ========================================

/*条件渲染*/
// function UserGreeting() {
// 	return <h1>Welcome back!</h1>;
// }

// function GuestGreeting() {
// 	return <h1>Please sign up.</h1>;
// }

// function Greeting(props) {
// 	const isLoggedIn = props.isLoggedIn;
// 	if (isLoggedIn) {
// 		return <UserGreeting/>;
// 	}
// 	return <GuestGreeting/>;
// }
// class LoginControl extends React.Component {
// 	constructor() {
// 		super()
// 		this.state = {
// 			isLoggedOn: true
// 		}
// 	}
// 	handleClick = () => {
// 		this.setState(prevState => ({
// 			isLoggedOn: !prevState.isLoggedOn
// 		}))
// 	}
// 	render() {
// 		return (
// 			<div>
// 				<button onClick={this.handleClick}>
// 					{this.state.isLoggedOn?'on':'off'}
// 				</button>
// 				<Greeting isLoggedIn={this.state.isLoggedOn}/>
// 			</div>
// 		)
// 	}
// }
// ReactDOM.render(
// 	<LoginControl/>,
// 	document.getElementById('root')
// )

// ========================================

/*与运算符&&*/
// function Mailbox(props) {
// 	const unreadMsg = props.unreadMsg;
// 	return (
// 		<div>
// 			<h1>Hello!</h1>
// 			{
// 				unreadMsg.length>0&&
// 				<h2>
// 					You have {unreadMsg.length} unread messages.
// 				</h2>
// 			}
// 		</div>
// 	)
// }
// let messages = ['React', 'Re:React', 'Re:Re:React'];
// ReactDOM.render(
// 	<Mailbox unreadMsg={messages}/>,
// 	document.getElementById('root')
// )

/*三目运算符*/
// function Box(props) {
// 	const isLoggedIn = props.isLoggedIn;
// 	return (
// 		<div>
// 			The user is <b>{isLoggedIn?'currently':'not'}</b> logged in.
// 		</div>
// 	)
// }
// ReactDOM.render(
// 	<Box isLoggedIn={false}/>,
// 	document.getElementById('root')
// )

/*阻止组件渲染：render方法返回null即可阻止组件渲染*/
// function WarningBanner(props) {
// 	if (!props.warn) {
// 		return null;
// 	}
// 	return (
// 		<div className='warning'>
// 			Warning!
// 		</div>
// 	)
// }
// class Page extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			showWarning: true
// 		}
// 	}
// 	handleClick = () => {
// 		this.setState(prevState => ({
// 			showWarning: !prevState.showWarning
// 		}))
// 	}
// 	render() {
// 		return (
// 			<div>
// 				<WarningBanner warn={this.state.showWarning}/>
// 				<button onClick={this.handleClick}>
// 					{
// 						this.state.showWarning?'Hide':'Show'
// 					}
// 				</button>
// 			</div>
// 		)
// 	}
// }
// ReactDOM.render(
// 	<Page/>,
// 	document.getElementById('root')
// )

// ========================================

/*列表&keys*/
/*渲染多样的组件*/
// const numbers = [1, 2, 3, 4, 5];
// const list = numbers.map(item =>
// 	<li>{item}</li>
// )
// ReactDOM.render(
// 	<ul>
// 		{list}
// 	</ul>,
// 	document.getElementById('root')
// )

/*基础列表组件*/
// function NumberList(props) {
// 	const numbers = props.numbers;
// 	const list = numbers.map(item =>
// 		<li key={item}>{item}</li>
// 	)
// 	return (
// 		<ul>
// 			{list}
// 		</ul>
// 	);
// }
// const numbers = [1, 2, 3, 4, 5, 6];
// ReactDOM.render(
// 	<NumberList numbers={numbers}/>,
// 	document.getElementById('root')
// )

// ========================================

/*表单：通常情况下，会构造一个处理提交表单并可访问用户输入表单数据的
函数，实现这个标准方法，react使用“受控组件”技术*/
/*受控组件:渲染表单的组件，且控制用户后续输入时所发生的变化*/

/*input表单控件，textarea表单控件与input类似*/
// class NameForm extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			value: ''
// 		};
// 		this.handleChange = this.handleChange.bind(this);
// 		this.handleSubmit = this.handleSubmit.bind(this);
// 	}
// 	handleChange(event) {
// 		this.setState({
// 			value: event.target.value
// 		})
// 	}
// 	handleSubmit(event) {
// 		alert('A name was submitted:' + this.state.value);
// 		event.preventDefault();
// 	}
// 	render() {
// 		return (
// 			<form onSubmit={this.handleSubmit}>
// 				<label>
// 					Name:
// 					<input type="text"
// 						   value={this.state.value}
// 						   onChange={this.handleChange}
// 				    />
// 				</label>
// 				<input type='submit' value='Submit'/>
// 			</form>
// 		)
// 	}
// }
// ReactDOM.render(
// 	<NameForm/>,
// 	document.getElementById('root')
// )

/*select标签*/
// class FlavorForm extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			value: 'coconut'
// 		};
// 	}
// 	handleChange = (event) => {
// 		this.setState({
// 			value: event.target.value
// 		})
// 	}
// 	handleSubmit = (event) => {
// 		alert('selected:' + this.state.value);
// 		event.preventDefault();
// 	}
// 	render() {
// 		return (
// 			<form onSubmit={this.handleSubmit}>
// 				<label>
// 					Pick your favorite La Croix flavor:
// 					<select value={this.state.value}
// 							onChange={this.handleChange}>
// 						<option value='grapefruit'>Grapefruit</option>
// 						<option value='lime'>Lime</option>
// 						<option value='coconut'>Coconut</option>
// 						<option value='mango'>Mango</option>
// 					</select>
// 				</label>
// 				<input type='submit' value='Submit'/>
// 			</form>
// 		)
// 	}
// }
// ReactDOM.render(
// 	<FlavorForm/>,
// 	document.getElementById('root')
// )

/*多个输入的解决方法*/
// class Reservation extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			isGo: true,
// 			number: 2
// 		}
// 	}
// 	handleInputChange = (event) => {
// 		let target = event.target;
// 		let value = target.type === 'checkbox' ? target.checked : target.value;
// 		const name = target.name;
// 		this.setState({
// 			[name]: value
// 		})
// 	}
// 	handleSubmit = (event) => {
// 		console.log(this.state);
// 		event.preventDefault();
// 	}
// 	render() {
// 		return (
// 			<form onSubmit={this.handleSubmit}>
// 				<label>
// 					Is going:
// 					<input type='checkbox'
// 						   name='isGo'
// 						   checked={this.state.isGo}
// 						   onChange={this.handleInputChange}/>
// 				</label>
// 				<label>
// 					Number:
// 					<input type='text'
// 						   name='number'
// 						   value={this.state.number}
// 						   onChange={this.handleInputChange}/>
// 				</label>
// 				<input type='submit'
// 					   value='Submit'/>
// 			</form>
// 		)
// 	}
// }
// ReactDOM.render(
// 	<Reservation/>,
// 	document.getElementById('root')
// )

/*受控组件实现比较繁琐，非受控组件来替代这种表单技术*/

// ========================================

/*状态提升：当多个组件共享状态数据时，可将这部分共享状态提升至他们的父组件中*/
// function BoilingVerdict(props) {
// 	if (props.celsius >= 100) {
// 		return <p>水会烧开</p>;
// 	}
// 	return <p>水不会烧开</p>;
// }
// const scaleNames = {
// 	c: 'Celsius',
// 	f: 'Fahrenheit'
// }

// function toCelsius(fahrenheit) {
// 	return (fahrenheit - 32) * 5 / 9;
// }

// function toFahrenheir(celsius) {
// 	return (celsius * 9 / 5) + 32;
// }

// function tryConvert(temperature, convert) {
// 	const input = parseFloat(temperature);
// 	if (Number.isNaN(input)) {
// 		return '';
// 	}
// 	const output = convert(input);
// 	const rounded = Math.round(output * 1000) / 1000;
// 	return rounded.toString();
// }
// class TemperatureInput extends React.Component {
// 	constructor() {
// 		super();
// 	}
// 	handleChange = (e) => {
// 		this.props.onTemperatureChange(e.target.value);
// 	}
// 	render() {
// 		const temperature = this.props.temperature;
// 		const scale = this.props.scale;
// 		return (
// 			<fieldset>
// 				<legend>Enter temperature in {scaleNames[scale]}</legend>
// 				<input value={temperature}
// 					   onChange={this.handleChange}/>
// 			</fieldset>
// 		)
// 	}
// }
// class Calculator extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			temperature: '37',
// 			scale: 'c'
// 		};
// 	}
// 	handleCelsiusChange = (temperature) => {
// 		this.setState({
// 			scale: 'c',
// 			temperature
// 		})
// 	}
// 	handleFahrenheitChange = (temperature) => {
// 		this.setState({
// 			scale: 'f',
// 			temperature
// 		})
// 	}
// 	render() {
// 		const scale = this.state.scale;
// 		const temperature = this.state.temperature;
// 		const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
// 		const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheir) : temperature;
// 		return (
// 			<div>
// 				<TemperatureInput scale='c'
// 								  temperature={celsius}
// 								  onTemperatureChange={this.handleCelsiusChange}/>
// 				<TemperatureInput scale='f'
// 								  temperature={fahrenheit}
// 								  onTemperatureChange={this.handleFahrenheitChange}/>
// 				<BoilingVerdict celsius={parseFloat(celsius)}/>
// 			</div>
// 		)
// 	}
// }
// ReactDOM.render(
// 	<Calculator/>,
// 	document.getElementById('root')
// )

// ========================================

/*组合和继承:react具有强大的组合模型，建议使用组合而不是继承来复用组件间的代码*/
/*包含关系*/
/*使用children属性将子元素直接传递到输出,
props.children代表组件的子节点*/
// function FancyBorder(props) {
// 	return (
// 		<div className={'FancyBorder FancyBorder-'+props.color}>
// 		{props.children}
// 		</div>
// 	)
// }

// function WelcomeDialog() {
// 	return (
// 		<FancyBorder color='blue'>
// 			<h1 className='Dialog-title'>
// 				Welcome
// 			</h1>
// 			<p className='Dialog-message'>
// 				Thank you for visiting our spacecraft!
// 			</p>
// 		</FancyBorder>
// 	)
// }
// ReactDOM.render(
// 	<WelcomeDialog/>,
// 	document.getElementById('root')
// )
/*多入口，可以使用其他属性进行搭建*/
// function Contacts() {
// 	return (
// 		<h1>left</h1>
// 	)
// }

// function Chat() {
// 	return (
// 		<h1>right</h1>
// 	)
// }

// function SplitPane(props) {
// 	return (
// 		<div className='SplitPane'>
// 			<div className='SplitPane-left'>
// 				{props.left}
// 			</div>
// 			<div className='SplitPane-right'>
// 				{props.right}
// 			</div>
// 		</div>
// 	)
// }

// function App() {
// 	return (
// 		<SplitPane left={<Contacts/>}
// 				    right={<Chat/>}/>
// 	)
// }
// ReactDOM.render(
// 	<App/>,
// 	document.getElementById('root')
// )
/*特殊实例*/
// function FancyBorder(props) {
// 	return (
// 		<div className='SplitPane'>
// 			{props.children}
// 		</div>
// 	)
// }

// function Dialog(props) {
// 	return (
// 		<FancyBorder>
// 			<h1>
// 				{props.title}
// 			</h1>
// 			<p>
// 				{props.messages}
// 			</p>
// 			{props.children}
// 		</FancyBorder>
// 	)
// }
// class SignUpDialog extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			login: ''
// 		}
// 	}
// 	handleChange = (e) => {
// 		this.setState({
// 			login: e.target.value
// 		})
// 	}
// 	handleSignUp = (e) => {
// 		alert(`Welcome aboard,${this.state.login}!`)
// 	}
// 	render() {
// 		return (
// 			<Dialog title = 'Mars Exploration Program'
// 						messages = 'How should we refer to you?' >
// 				<input value={this.state.login}
// 					   onChange={this.handleChange}/>
// 				<button onClick={this.handleSignUp}>
// 					Sign Me Up!
// 				</button>
// 			</Dialog>
// 		)
// 	}
// }
// ReactDOM.render(
// 	<SignUpDialog/>,
// 	document.getElementById('root')
// )

// ========================================

/*React理念-可搜索的产品数据表格*/
let PRODUCTS = [{
	category: 'Sporting Goods',
	price: '$49.99',
	stocked: true,
	name: 'Football'
}, {
	category: 'Sporting Goods',
	price: '$9.99',
	stocked: true,
	name: 'Baseball'
}, {
	category: 'Sporting Goods',
	price: '$29.99',
	stocked: false,
	name: 'Basketball'
}, {
	category: 'Electronics',
	price: '$99.99',
	stocked: true,
	name: 'iPod Touch'
}, {
	category: 'Electronics',
	price: '$399.99',
	stocked: false,
	name: 'iPhone 5'
}, {
	category: 'Electronics',
	price: '$199.99',
	stocked: true,
	name: 'Nexus 7'
}];
class SearchBar extends React.Component {
	handleChange = (e) => {
		this.props.onFilterTextInput(e.target.value)
	}
	handleCheckChange = (e) => {
		this.props.onStockedInput(e.target.checked)
	}
	render() {
		return (
			<div >
				<input type='text'
					   value={this.props.filterText}
					   placeholder='Searching'
					   onChange={this.handleChange}/>
				<br/>
			    <label for='stocked'>
			    	<input type='checkbox'
			    		   name='stocked'
			    		   checked={this.props.isStockOnly}
			    		   onChange={this.handleCheckChange}/>
			    	Only show products in stock
			    </label>
			</div>
		)
	}
}
class ProductCategoryRow extends React.Component {
	render() {
		return (
			<tr>
				<td colSpan='2'>{this.props.category}</td>
			</tr>
		)
	}
}
class ProductRow extends React.Component {
	render() {
		let name = this.props.product.stocked ?
			this.props.product.name :
			<span style={{color:'red'}}>
				   {this.props.product.name}
				   </span>;
		return (
			<tr>
				<td>{name}</td>
				<td>{this.props.product.price}</td>
			</tr>
		)
	}
}
class ProductTable extends React.Component {
	render() {
		let rows = [];
		let lastCategory = null;
		this.props.products.forEach((item) => {
			if (item.name.indexOf(this.props.filterText) === -1 ||
				(!item.stocked && this.props.isStockOnly)) {
				return;
			}
			if (item.category !== lastCategory) {
				rows.push(<ProductCategoryRow category={item.category}
											  key={item.category}/>)
			}
			rows.push(<ProductRow product={item} key={item.name}/>)
			lastCategory = item.category;
		})
		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			</div>
		)
	}
}
class FilterableProductTable extends React.Component {
	constructor() {
		super();
		this.state = {
			filterText: 'ball',
			isStockOnly: false
		}
	}
	handleFilterTextInput = (filterText) => {
		this.setState({
			filterText: filterText
		})
	}
	handleStockedInput = (isStockOnly) => {
		this.setState({
			isStockOnly: isStockOnly
		})
	}
	render() {
		return (
			<div>
				<SearchBar
					filterText={this.state.filterText}
					isStockOnly={this.state.isStockOnly}
					onFilterTextInput={this.handleFilterTextInput}
					onStockedInput={this.handleStockedInput}
				/>
				<ProductTable 
					products={this.props.products}
					filterText={this.state.filterText}
					isStockOnly={this.state.isStockOnly}
				/>
			</div>
		)
	}
}
ReactDOM.render(
		<FilterableProductTable products={PRODUCTS}/>,
		document.getElementById('root')
	)
	/*找出应用的最小可变状态集
	  判断方法如下：
	  1、是通过props从父级传来的吗？如果是，它可能不是state
	  2、随着时间推移不变吗？如果是，它可能不是state
	  3、可根据组件中任何其他的state或props把它计算出来？如果是，它不是state
	*/