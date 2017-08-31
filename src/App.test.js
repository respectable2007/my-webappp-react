import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
});

function formatName(user) {
	return user.firstName + '•' + user.lastName;
}

const user = {
	firstName: 'Harper',
	lastName: 'Perez'
}

const element = {
	<h1>
		Hello, {formatName(user)}!
	</h1>
};

ReactDOM.render(
	element,
	document.getElementById('root')
)