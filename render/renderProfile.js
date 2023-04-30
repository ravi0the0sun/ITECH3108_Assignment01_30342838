import Thread from '../class/thread.js';
import { backHandler } from './renderNewThread.js';

export function renderProfile(user) {
	let mainBody = document.querySelector('.mainBody');
	mainBody.remove();

	const main = document.querySelector('.main');

	mainBody = document.createElement('div');
	mainBody.className = 'mainBody';

	const threadBody = document.createElement('div');
	threadBody.className = 'threadBody';

	const h4 = document.createElement('h4');
	h4.textContent = 'Threads From You';

	mainBody.append(user.toDOM());
	threadBody.append(h4);

	const backBtn = document.createElement('button');
	backBtn.setAttribute('id', 'backBtn');
	backBtn.textContent = '⬅️ Back';
	backBtn.addEventListener('click', () => backHandler());

	threadBody.append(renderProfileThreads(user.username), backBtn);
	mainBody.append(threadBody);
	main.append(mainBody);
}

export function renderProfileThreads(username) {
	const userThreads = Thread.Threads.filter(thread => thread.user === username);
	if (!userThreads.length) {
		const p = document.createElement('p');
		p.textContent = 'There are no threads from you!!!';
		return p;
	}

	const threads = document.createElement('div');
	threads.className = 'threads';
	userThreads.forEach(thread => threads.appendChild(thread.toDOM(username)));
	return threads;
}
