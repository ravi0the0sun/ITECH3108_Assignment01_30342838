import Post from './post.js';
import { CHAT_SERVER } from '../env.js';
import { renderHome } from '../render/renderHome.js';
import { generalErrorHandler } from '../handler/errorHandler.js';

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
			() => deleteThread(username, this._id),
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

		// Checking if the draft post's Thread still exist, if not it will be deleted
		const keys = Object.keys(localStorage).filter(key => {
			return key.slice(0, 5) === 'draft' ? true : false;
		});
		if (keys) {
			keys.forEach(key => {
				const id = JSON.parse(localStorage.getItem(key)).id;
				const result = Thread.Threads.filter(thread => thread._id === id);

				if (!result.length) {
					deleteDraft(id);
				}
			});
		}

		return div;
	}
}

export async function renderPost(id, username) {
	const postsDivs = document.querySelectorAll('.posts');
	if (postsDivs) {
		postsDivs.forEach(postsDiv => postsDiv.remove());
	}

	const postDiv = document.createElement('div');
	postDiv.className = 'posts';

	const postCollection = document.createElement('div');
	postCollection.className = 'postCollection';
	const threadDiv = document.querySelector(`#thread_${id}`);

	const postsFoot = document.createElement('div');
	postsFoot.className = 'postsFoot';

	const textInput = document.createElement('input');
	textInput.setAttribute('type', 'text');
	textInput.setAttribute('placeholder', 'Post');

	if (localStorage.getItem(`draft${id}`)) {
		textInput.value = JSON.parse(localStorage.getItem(`draft${id}`)).text;
	}

	textInput.addEventListener(
		'input',
		() => draftHandler(id, textInput.value),
		false
	);

	const button = document.createElement('button');
	button.textContent = 'Send ?';
	button.addEventListener(
		'click',
		() => {
			textInput.value = postText(id, username, textInput.value, postCollection)
				? ''
				: textInput.value;
		},
		false
	);

	postsFoot.append(textInput, button);
	try {
		const posts = await fetchPost(id);
		const postList = posts.map(({ text, user }) => new Post(user, text));
		const postElement = postList.map(postOjb => postOjb.toDOM(username));

		postElement.forEach(post => postCollection.appendChild(post));
		postDiv.append(postCollection, postsFoot);
		threadDiv.append(postDiv);
	} catch (e) {
		generalErrorHandler();
	}
}

export async function deleteThread(username, id) {
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

		/*FIXME:
		 * sometimes the thread list is not re-rendered leaving
		 * deleted thread on screen causing 404 error
		 */

		const mainBody = document.querySelector('.mainBody');
		mainBody.remove();

		const main = document.querySelector('.main');
		main.append(
			await renderHome(JSON.parse(localStorage.getItem('userStore')))
		);
	} catch (e) {
		throw new Error(e.message);
	}
}

async function postText(id, user, text, postCollection) {
	if (!text) {
		return false;
	}

	try {
		const res = await fetch(`${CHAT_SERVER}/api/threads/${id}/posts`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user: user,
				text: text,
			}),
		});
		const data = await res.json();

		if (data?.error) {
			throw new Error(data.error);
		}

		const post = new Post(data.user, data.text);
		postCollection.append(post.toDOM(data.user));
		deleteDraft(id);

		return true;
	} catch (e) {
		generalErrorHandler();
	}
}

function draftHandler(id, text) {
	localStorage.setItem(`draft${id}`, JSON.stringify({ id: id, text: text }));
}

function deleteDraft(id) {
	localStorage.removeItem(`draft${id}`);
}

export async function fetchPost(id) {
	try {
		const res = await fetch(`${CHAT_SERVER}/api/threads/${id}`);
		const { posts } = await res.json();
		return posts;
	} catch (e) {
		generalErrorHandler();
	}
}
