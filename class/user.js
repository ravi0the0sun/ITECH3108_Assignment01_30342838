import { renderNewThread } from '../render/renderNewThread.js';

export default class User {
	constructor(username, name) {
		this.username = username;
		this.name = name;
	}

	toDOM() {
		const div = document.createElement('div');
		div.className = 'header';

		const a = document.createElement('a');
		a.setAttribute('id', 'username');
		a.textContent = `${this.name}`;

		const button = document.createElement('button');
		button.textContent = 'New Thread';
		button.setAttribute('id', 'newThreadBtn');
		button.addEventListener('click', () => renderNewThread(this));

		div.append(a, button);

		return div;
	}
}
