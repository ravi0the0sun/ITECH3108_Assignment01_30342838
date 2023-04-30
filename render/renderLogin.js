import { loginHandler } from '../handler/loginHandler.js';
import { signupHandler } from '../handler/signupHandler.js';

export function renderLogin(state) {
	const value = state === 'login';
	const div = document.createElement('div');
	div.className = value ? 'loginDiv' : 'signupDiv';

	const heading = document.createElement('h2');
	heading.textContent = value ? 'Login!!!' : 'Sign Up!!!';

	const textInput = document.createElement('input');
	textInput.setAttribute('type', 'text');
	textInput.setAttribute('placeholder', 'Username');

	const loginButton = document.createElement('button');
	loginButton.textContent = 'Lets Go!!!';
	loginButton.addEventListener(
		'click',
		() =>
			value ? loginHandler(textInput.value) : signupHandler(textInput.value),
		false
	);

	const footer = document.createElement('div');
	footer.className = 'footer';

	const link = document.createElement('a');
	link.textContent = value ? 'Sign Up' : 'Login';
	link.addEventListener(
		'click',
		() => removeDiv(value ? 'login' : 'signup'),
		false
	);
	footer.appendChild(link);

	div.append(heading, textInput, loginButton, footer);

	return div;
}

function removeDiv(state) {
	const div = document.querySelector(
		state === 'login' ? '.loginDiv' : '.signupDiv'
	);
	div.remove();

	const mainDiv = document.querySelector('.main');

	mainDiv.appendChild(renderLogin(state === 'login' ? 'signup' : 'login'));
}
