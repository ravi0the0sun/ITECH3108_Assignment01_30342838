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
        div.className = 'threads'
        const anchorArray = Thread.Threads.map(thread => {

            const anchorDiv = document.createElement('div');
            anchorDiv.className = 'threadDiv';
            anchorDiv.setAttribute('id', `thread_${thread._id}`);

            const anchor = document.createElement('a');
            anchor.text = `${thread.thread_title} ${thread.icon}`;
            anchor.href = '#';
            anchor.className = `thread_text`;
            anchor.addEventListener('click', renderPost, false)

            anchorDiv.appendChild(anchor);
            
            return anchorDiv;
        })
        anchorArray.forEach(anchor => {
            div.appendChild(anchor);
        })
        return div;
    }
    
}

function renderPost() {
    const div = document.querySelectorAll('#thread_1');
    div.remove();
}