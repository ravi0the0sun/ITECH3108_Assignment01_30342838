import Post from './post.js';
import { CHAT_SERVER } from '../env.js';

export default class Thread {
	static Threads = [];

	constructor(_id, thread_title, icon, user) {
		this._id = _id;
		this.thread_title = thread_title;
		this.icon = icon;
		this.user = user;
		this.constructor.Threads.push(this);
	}

	static renderTitles(username) {
		const div = document.createElement('div');
		div.className = 'threads';
		const anchorArray = Thread.Threads.map(thread => {
			const anchorDiv = document.createElement('div');
			anchorDiv.className = 'threadDiv';
			anchorDiv.setAttribute('id', `thread_${thread._id}`);

			const anchor = document.createElement('a');
			anchor.text = `${thread.thread_title} ${thread.icon}`;
			anchor.className = `thread_text`;
			anchor.addEventListener(
				'click',
				() => renderPost(thread._id, username),
				false
			);

			anchorDiv.appendChild(anchor);

			return anchorDiv;
		});
		anchorArray.forEach(anchor => {
			div.appendChild(anchor);
		});
		return div;
	}
}

async function renderPost(id, username) {
	const postsDivs = document.querySelectorAll('.posts');
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
	if (postsDivs) {
		postsDivs.forEach(postsDiv => postsDiv.remove());
	}

	try {
		//TODO: needs refactoring
		const res = await fetch(`${CHAT_SERVER}/api/threads/${id}`);
		const { posts } = await res.json();
		const postList = posts.map(({ text, user }) => new Post(user, text));
		const postElement = postList.map(postOjb => postOjb.toDOM(username));

		postElement.forEach(post => postDiv.appendChild(post));

		threadDiv.append(postDiv, postsFoot);
	} catch (error) {
		console.log(error);
	}
}
