export default class Post {
	constructor(user, text) {
		this.user = user;
		this.text = text;
	}

	toDOM(username) {
		const postDiv = document.createElement('div');
		postDiv.className = 'post';

		const div = document.createElement('div');
		div.className = 'postText';

		const a = document.createElement('a');
		a.textContent = '🗑';
		a.className = 'delete';
		a.addEventListener('click', () => deletePost(), false);

		const postText = document.createElement('p');
		postText.className = 'postText';
		postText.textContent = this.text;

		const postUser = document.createElement('p');
		postUser.className = 'postUser';
		postUser.textContent = `- @${this.user}`;
		if (!(username === this.user)) {
			div.append(postText);
		} else {
			div.append(postText, a);
		}

		postDiv.append(div, postUser);
		return postDiv;
	}
}

async function deletePost() {
	console.log('should have read the API');
}

