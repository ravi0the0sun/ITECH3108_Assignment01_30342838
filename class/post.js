export default class Post {
	constructor(user, text) {
		this.user = user;
		this.text = text;
	}

	toDOM() {
		const postDiv = document.createElement('div');
		postDiv.className = 'post';

		const postText = document.createElement('p');
		postText.className = 'postText';
		postText.textContent = this.text;

		const postUser = document.createElement('p');
		postUser.className = 'postUser';
		postUser.textContent = `- @${this.user}`;

		const lineBreak = document.createElement('br');

		postDiv.append(postText, postUser);

		return postDiv;
	}
}
