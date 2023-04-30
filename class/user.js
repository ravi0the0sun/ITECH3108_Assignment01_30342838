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
		button.addEventListener('click', () => console.log('hello'));

		div.append(a, button);

		return div;
	}
}
