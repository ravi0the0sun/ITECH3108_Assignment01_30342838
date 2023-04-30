import Post from './post.js';
import { CHAT_SERVER } from '../env.js';
import { renderHome } from '../render/renderHome.js';

export default class Thread {
	static Threads = [];

	constructor(_id, thread_title, icon, user) {
		this._id = _id;
		this.thread_title = thread_title;
		this.icon = icon;
		this.user = user;
		this.constructor.Threads.push(this);
	}

	toDOM(username) {
		const anchorDiv = document.createElement('div');
		anchorDiv.className = 'threadDiv';
		anchorDiv.setAttribute('id', `thread_${this._id}`);

		const anchorDelete = document.createElement('a');
		anchorDelete.textContent = '🗑';
		anchorDelete.className = 'delete';
		anchorDelete.addEventListener(
			'click',
			() => deletePost(username, this._id),
			false
		);

		const threadTitle = document.createElement('a');
		threadTitle.text = `${this.thread_title} {${this.icon}}`;
		threadTitle.className = `thread_text`;
		threadTitle.addEventListener(
			'click',
			() => renderPost(this._id, username),
			false
		);

		anchorDiv.append(
			threadTitle,
			!(this.user === username) ? '' : anchorDelete
		);

		return anchorDiv;
	}

	static renderTitles(username) {
		const div = document.createElement('div');
		div.className = 'threads';
		const anchorArray = Thread.Threads.map(thread => thread.toDOM(username));
		anchorArray.forEach(anchorThread => {
			div.appendChild(anchorThread);
		});
		return div;
	}
}

export async function renderPost(id, username) {
	const postsDivs = document.querySelectorAll('.posts');
	if (postsDivs) {
		postsDivs.forEach(postsDiv => postsDiv.remove());
	}

	const threadDiv = document.querySelector(`#thread_${id}`);

	const postsFoot = document.createElement('div');
	postsFoot.className = 'postsFoot';

	const textInput = document.createElement('input');
	textInput.setAttribute('type', 'text');
	textInput.setAttribute('placeholder', 'Post');
	textInput.addEventListener('input', () => console.log(textInput.value));

	const button = document.createElement('button');
	button.textContent = 'Send ?';
	button.addEventListener('click', () => console.log('post'));

	postsFoot.append(textInput, button);

	const postDiv = document.createElement('div');
	postDiv.className = 'posts';

	const postCollection = document.createElement('div');
	postCollection.className = 'postCollection';

	try {
		//TODO: needs refactoring
		const res = await fetch(`${CHAT_SERVER}/api/threads/${id}`);
		const { posts } = await res.json();
		const postList = posts.map(({ text, user }) => new Post(user, text));
		const postElement = postList.map(postOjb => postOjb.toDOM(username));

		postElement.forEach(post => postCollection.appendChild(post));
		postDiv.append(postCollection, postsFoot);
		threadDiv.append(postDiv);
	} catch (error) {
		console.log(error);
	}
}

export async function deletePost(username, id) {
	try {
		const res = fetch(`${CHAT_SERVER}/api/threads/${id}`, {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user: username }),
		});

		if (!res) {
			throw new Error('404');
		}
		const mainBody = document.querySelector('.mainBody');
		mainBody.remove();

		const main = document.querySelector('.main');
		main.append(
			await renderHome(JSON.parse(localStorage.getItem('userStore')))
		);
	} catch (e) {
		console.log(e);
	}
}
