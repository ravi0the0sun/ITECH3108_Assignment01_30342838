import Thread from '../class/thread.js';

export async function renderProfile(user) {
	let mainBody = document.querySelector('.mainBody');
	mainBody.remove();

	const main = document.querySelector('.main');

	mainBody = document.createElement('div');
	mainBody.className = 'mainBody';

	const threadBody = document.createElement('div');
	threadBody.className = 'threadBody';

	const h4 = document.createElement('h4');
	h4.textContent = 'Threads From You';

	const threads = document.createElement('div');
	threads.className = 'threads';

	const userThreads = Thread.Threads.filter(
		thread => thread.user === user.username
	);

	mainBody.append(user.toDOM());
	threadBody.append(h4);

	console.log(user, userThreads.length);

	if (!userThreads.length) {
		const p = document.createElement('p');
		p.textContent = 'There are no threads from you!!!';
		threadBody.append(p);
		mainBody.append(threadBody);
		main.append(mainBody);
		return;
	}
	userThreads.forEach(thread =>
		threads.appendChild(thread.toDOM(user.username))
	);
	threadBody.append(threads);
	mainBody.append(threadBody);
	main.append(mainBody);
}
