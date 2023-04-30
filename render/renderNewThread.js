import { CHAT_SERVER } from '../env.js';
import { renderHome } from './renderHome.js';

export function renderNewThread(user) {
	const main = document.querySelector('.main');
	const mainBody = document.querySelector('.mainBody');
	const header = document.querySelector('.header');

	if (!(mainBody && header)) {
		mainBody = document.createElement('div');
		mainBody.className = 'mainDiv';
		header.append(user.toDOM());
		mainBody.append(header);
		main.append(mainBody);
	}

	const threadBody = document.querySelector('.threadBody');
	const newThreadBtn = document.querySelector('#newThreadBtn');
	if (threadBody && newThreadBtn) {
		threadBody.remove();
		newThreadBtn.remove();
	}

	const newThreadDiv = document.createElement('div');
	newThreadDiv.className = 'newThreadDiv';

	const backBtn = document.createElement('button');
	backBtn.setAttribute('id', 'backBtn');
	backBtn.textContent = '⬅️ Back';
	backBtn.addEventListener('click', () => backHandler());

	const threadIcon = document.createElement('input');
	threadIcon.setAttribute('type', 'text');
	threadIcon.setAttribute('id', 'threadIcon');
	threadIcon.setAttribute('maxlength', '1');
	threadIcon.setAttribute('placeholder', 'Icon');
	threadIcon.addEventListener('input', () => console.log(threadIcon.value));

	const threadTitle = document.createElement('input');
	threadTitle.setAttribute('type', 'text');
	threadTitle.setAttribute('id', 'threadTitle');
	threadTitle.setAttribute('placeholder', 'Thread');
	threadTitle.addEventListener('input', () => console.log(threadTitle.value));

	const threadPost = document.createElement('input');
	threadPost.setAttribute('type', 'text');
	threadPost.setAttribute('id', 'threadPost');
	threadPost.setAttribute('placeholder', 'Post');
	threadPost.addEventListener('input', () => console.log(threadPost.value));

	const postThreadBtn = document.createElement('button');
	postThreadBtn.textContent = 'Upload';
	postThreadBtn.addEventListener('click', () =>
		postThread(
			user.username,
			threadTitle.value,
			threadIcon.value,
			threadPost.value
		)
	);

	header.appendChild(backBtn);

	newThreadDiv.append(threadIcon, threadTitle, threadPost, postThreadBtn);

	mainBody.append(newThreadDiv);
}

async function postThread(username, threadTitle, icon, post) {
	if (!(username && threadTitle && icon && post)) {
		return console.log('empty string');
	}

	console.log(username, threadTitle, icon, post);

	try {
		const res = await fetch(`${CHAT_SERVER}/api/threads`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user: username,
				thread_title: threadTitle,
				icon: icon,
				text: post,
			}),
		});
		console.log(await res.json());

		const mainBody = document.querySelector('.mainBody');
		mainBody.remove();
		const main = document.querySelector('.main');
		main.append(
			await renderHome(JSON.parse(localStorage.getItem('userStore')))
		);
	} catch (e) {
		const main = document.querySelector('.main');
		const mainBody = document.querySelector('.mainBody');
		mainBody.remove();
		const error = document.createElement('p');
		error.textContent = `Server Error: Cannot connect to the server \n Please check later`;
		main.append(error);
	}
}

async function backHandler() {
	const mainBody = document.querySelector('.mainBody');
	const main = document.querySelector('.main');

	mainBody.remove();
	try {
		main.append(
			await renderHome(JSON.parse(localStorage.getItem('userStore')))
		);
	} catch (e) {
		const error = document.createElement('p');
		error.textContent = `Server Error: Cannot connect to the server \n Please check later`;
		main.append(error);
	}
}
