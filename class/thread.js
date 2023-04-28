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

	static renderTitles() {
		const div = document.createElement('div');
		div.className = 'threads';
		const anchorArray = Thread.Threads.map(thread => {
			const anchorDiv = document.createElement('div');
			anchorDiv.className = 'threadDiv';
			anchorDiv.setAttribute('id', `thread_${thread._id}`);

			const anchor = document.createElement('a');
			anchor.text = `${thread.thread_title} ${thread.icon}`;
			anchor.href = '#';
			anchor.className = `thread_text`;
			anchor.addEventListener('click', () => renderPost(thread._id), false);

			anchorDiv.appendChild(anchor);

			return anchorDiv;
		});
		anchorArray.forEach(anchor => {
			div.appendChild(anchor);
		});
		return div;
	}
}

async function renderPost(id) {
	const postsDivs = document.querySelectorAll('.posts');
	const threadDiv = document.querySelector(`#thread_${id}`);

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
		const postElement = postList.map(postOjb => postOjb.toDOM());
		postElement.forEach(post => postDiv.appendChild(post));

		threadDiv.appendChild(postDiv);
	} catch (error) {
		console.log(error);
	}
}
