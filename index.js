import Thread from './class/thread.js';
import {CHAT_SERVER} from './env.js';
let mainDiv = document.querySelector('.main');

fetching();

// FIXME: find a place to see the console.log() for the error
async function fetching() {
    try {
        const data = await fetch(`${CHAT_SERVER}/api/threads`);
    
    const threads = await data.json();
    threads.forEach(({thread_title, icon, user, id}) => new Thread(id, thread_title, icon, user));
    // p.textContent = JSON.stringify(Thread.Threads);
    mainDiv.appendChild(Thread.renderTitles());
    
    } catch(e) {
        let p = document.createElement('p');
        mainDiv.appendChild(p);
        p.textContent = e;
        mainDiv.appendChild(p);
    }
}