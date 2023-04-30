import { CHAT_SERVER } from '../env.js';
import { loginErrorHandler } from './errorHandler.js';
import { renderHome } from '../render/renderHome.js';

export async function loginHandler(value) {
	try {
		if (!value) {
			throw new Error('EmptyValue');
		}
		const res = await fetch(`${CHAT_SERVER}/api/users/${value}`);
		const user = await res.json();

		if (user?.error) {
			throw new Error('NoMatchingUser');
		}

		localStorage.setItem('userStore', JSON.stringify(user));

		// removing login HTML elements
		const loginDiv = document.querySelector('.loginDiv');
		loginDiv.remove();

		const mainDiv = document.querySelector('.main');

		mainDiv.appendChild(await renderHome(user));
	} catch (e) {
		loginErrorHandler(e);
	}
}
