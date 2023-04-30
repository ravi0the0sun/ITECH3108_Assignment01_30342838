import { renderLogin } from './render/renderLogin.js';
import { fetchThread, renderHome } from './render/renderHome.js';
import { renderSignOut } from './render/renderSignOut.js';
import { generalErrorHandler } from './handler/errorHandler.js';
import Thread, { fetchPost } from './class/thread.js';
import Post from './class/post.js';
import { renderProfileThreads } from './render/renderProfile.js';

let mainDiv = document.querySelector('.main');

const userStore = JSON.parse(localStorage.getItem('userStore'));

if (!userStore) {
	mainDiv.appendChild(renderLogin('login'));
} else {
	try {
		mainDiv.append(renderSignOut(), await renderHome(userStore));
	} catch (e) {
		generalErrorHandler();
	}
}

window.setInterval(() => renderLogic(userStore), 10000);

function renderLogic(user) {
	const threadBody = document.querySelector('.threadBody');
	const posts = document.querySelector('.posts');
	const error = document.getElementById('error');
	const h4Text = document.querySelector('h4')?.textContent;

	if (!threadBody && !error) {
		fetchThreadData();
	} else if (error) {
		completeRender(user);
	} else if (h4Text === 'Threads From You') {
		renderProfileNewData(user.username, posts);
	} else if (posts) {
		renderNewData(posts, user.username);
	} else {
		completeRender(user);
	}
}

async function completeRender(user) {
	const main = document.querySelector('.main');
	const children = main.children;
	for (let c = 0; c <= children.length; c++) {
		children[0].remove();
	}
	try {
		mainDiv.append(renderSignOut(), await renderHome(user));
	} catch (e) {
		generalErrorHandler();
	}
}

async function fetchThreadData() {
	try {
		Thread.Threads = [];
		const threads = await fetchThread();
		threads.forEach(
			({ thread_title, icon, user, id }) =>
				new Thread(id, thread_title, icon, user)
		);
	} catch (e) {
		generalErrorHandler();
	}
}

async function renderNewData(posts, user) {
	try {
		await renderThreads(user);
		//updating posts nodes
		await renderPosts(posts);
	} catch (e) {
		console.log(e);
		generalErrorHandler();
	}
}

async function renderThreads(user) {
	try {
		const threads = document.querySelector('.threads');
		await fetchThreadData();
		// rendering new threads
		Thread.Threads.forEach(thread => {
			const threadNode = document.querySelector(`#thread_${thread._id}`);
			if (!threadNode) {
				threads.append(thread.toDOM(user));
				return;
			}
		});
		const threadNodeId = [];
		const children = threads.childNodes;
		for (let c = 0; c < children.length; c++) {
			threadNodeId.push(parseInt(children[c].id.split('_')[1]));
		}

		//removing deleted thread node
		const deleteThread = threadNodeId.filter(id => {
			if (!Thread.Threads.find(thread => thread._id === id)) return true;
		});
		deleteThread.forEach(id => {
			const thread = document.querySelector(`#thread_${id}`);
			if (thread) {
				thread.remove();
			}
		});
	} catch (e) {
		generalErrorHandler();
	}
}

async function renderPosts(posts) {
	try {
		const parentId = posts.parentNode.id.split('_')[1];

		const postsData = await fetchPost(parentId);
		const postObjs = postsData.map(post => new Post(post.user, post.text));

		posts.childNodes[0].remove();

		const postCollection = document.createElement('div');
		postCollection.className = 'postCollection';

		postObjs.forEach(post => postCollection.append(post.toDOM(username)));
		posts.prepend(postCollection);
	} catch (e) {
		console.log(e);
		generalErrorHandler();
	}
}

async function renderProfileNewData(user, posts) {
	try {
		await fetchThreadData();
		if (!posts) {
			const threadBody = document.querySelector('.threadBody');
			const backBtn = document.querySelector('#backBtn');
			threadBody.children[1].remove();
			threadBody.insertBefore(renderProfileThreads(user), backBtn);
			// console.log(renderProfileThreads(user));
		} else {
			renderPosts(posts);

			const threads = document.querySelector('.threads');
			await fetchThreadData();
			// rendering new threads
			const threadNodeId = [];
			const children = threads.childNodes;
			for (let c = 0; c < children.length; c++) {
				threadNodeId.push(parseInt(children[c].id.split('_')[1]));
			}

			//rendering new threads from users
			const userThreads = Thread.Threads.filter(thread => thread.user === user);

			userThreads.forEach(thread => {
				const threadNode = document.querySelector(`#thread_${thread._id}`);
				if (!threadNode) {
					threads.append(thread.toDOM(user));
					return;
				}
			});
			const deleteThread = threadNodeId.filter(id => {
				if (!userThreads.find(thread => thread._id === id)) return true;
			});
			deleteThread.forEach(id => {
				const thread = document.querySelector(`#thread_${id}`);
				if (thread) {
					thread.remove();
				}
			});
		}
	} catch (e) {
		console.log(e);
	}
}
