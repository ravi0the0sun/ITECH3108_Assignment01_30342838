import { CHAT_SERVER } from '../env.js';
import { loginErrorHandler } from './errorHandler.js';

export async function loginHandler(data) {
	try {
		if (!data) {
			throw new Error('EmptyValue');
		}
		const res = await fetch(`${CHAT_SERVER}/api/users/${data}`);
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
