import { CHAT_SERVER } from '../env.js';
import Thread from '../class/thread.js';
import User from '../class/user.js';

export async function renderHome(data) {
	try {
		Thread.Threads = [];
		const threads = await fetchThread();
		threads.forEach(
			({ thread_title, icon, user, id }) =>
				new Thread(id, thread_title, icon, user)
		);

		const user = new User(data.username, data.name);
		const div = document.createElement('div');
		div.className = 'mainBody';

		const div2 = document.createElement('div');
		div2.className = 'threadBody';

		const h4 = document.createElement('h4');
		h4.textContent = 'Threads';

		div2.append(h4, Thread.renderTitles(data.username));

		div.append(user.toDOM(), div2);
		// p.textContent = JSON.stringify(Thread.Threads);
		return div;
	} catch (e) {
		console.log('error from renderHome', e.message);
		throw new Error(e.message);
	}
}

export async function fetchThread() {
	try {
		const data = await fetch(`${CHAT_SERVER}/api/threads`);

		return await data.json();
	} catch (e) {
		console.log('error from fetchThread', e.message);
		throw new Error(e.message);
	}
}
