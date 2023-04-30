import { renderLogin } from './render/renderLogin.js';
import { renderHome } from './render/renderHome.js';
let mainDiv = document.querySelector('.main');

const userStore = JSON.parse(localStorage.getItem('userStore'));

if (!userStore) {
	mainDiv.appendChild(renderLogin('login'));
} else {
	console.log(userStore);
	mainDiv.appendChild(await renderHome(userStore));
}
