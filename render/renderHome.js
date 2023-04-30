import { CHAT_SERVER } from '../env.js';
import Thread from '../class/thread.js';
import User from '../class/user.js';

export async function renderHome(data) {
	try {
		const threads = await fetchThread();
		threads.forEach(
			({ thread_title, icon, user, id }) =>
				new Thread(id, thread_title, icon, user)
		);

		const user = new User(data.username, data.name);
		const div = document.createElement('div');
		const h4 = document.createElement('h4');
		h4.textContent = 'Threads';

		div.append(user.toDOM(), h4, Thread.renderTitles(data.username));
		// p.textContent = JSON.stringify(Thread.Threads);
		return div;
	} catch (e) {
		console.log(e);
	}
}

async function fetchThread() {
	try {
		const data = await fetch(`${CHAT_SERVER}/api/threads`);

		return await data.json();
	} catch (e) {
		console.log(e);
	}
}
