import { renderLogin } from '../render/renderLogin.js';

export function signOutHandler() {
	const main = document.querySelector('.main');
	const children = main.children;
	for (let c = 0; c <= children.length; c++) {
		children[0].remove();
	}

	localStorage.clear();

	main.append(renderLogin('login'));
}
