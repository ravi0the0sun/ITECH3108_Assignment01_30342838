import { renderNewThread } from '../render/renderNewThread.js';
import { renderProfile } from '../render/renderProfile.js';
export default class User {
	constructor(username, name) {
		this.username = username;
		this.name = name;
	}

	toDOM() {
		const div = document.createElement('div');
		div.className = 'header';

		const userAnchor = document.createElement('a');
		userAnchor.setAttribute('id', 'username');
		userAnchor.textContent = `${this.name}`;
		userAnchor.addEventListener('click', () => renderProfile(this));

		const button = document.createElement('button');
		button.textContent = 'New Thread';
		button.setAttribute('id', 'newThreadBtn');
		button.addEventListener('click', () => renderNewThread(this));

		div.append(userAnchor, button);

		return div;
	}
}
