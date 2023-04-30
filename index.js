import { renderLogin } from './render/renderLogin.js';
import { renderHome } from './render/renderHome.js';
import { renderSignOut } from './render/renderSignOut.js';
let mainDiv = document.querySelector('.main');

const userStore = JSON.parse(localStorage.getItem('userStore'));

if (!userStore) {
	mainDiv.appendChild(renderLogin('login'));
} else {
	try {
		console.log(userStore);
		mainDiv.append(renderSignOut(), await renderHome(userStore));
	} catch (e) {
		console.log('error', e.message);
		const error = document.createElement('p');
		error.textContent = `Server Error: Cannot connect to the server \n Please check later`;
		mainDiv.append(error);
	}
}
