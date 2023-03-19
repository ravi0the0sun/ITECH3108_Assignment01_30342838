const CHAT_SERVER = 'http://pi.local:7777'; 
//Change CHAT_SERVER to 'http://localhost:7777' when using a computer
let mainDiv = document.querySelector('.main');
let p = document.createElement('p');
p.textContent = 'loaded';
mainDiv.appendChild(p);
fetching();

// FIXME: find a place to see the console.log() for the error
async function fetching() {
    try {
        const data = await fetch(`${CHAT_SERVER}/api/threads/1`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const thread = await data.json();
    p.textContent = JSON.stringify(thread);
    mainDiv.appendChild(p);
    
    } catch(e) {
        p.textContent = 'error';
        mainDiv.appendChild(p);
    }
}