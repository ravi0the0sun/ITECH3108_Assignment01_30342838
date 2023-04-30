import { signOutHandler } from '../handler/signOutHandler.js';

export function renderSignOut() {
	const signOut = document.createElement('a');
	signOut.setAttribute('id', 'signOut');
	signOut.textContent = 'Sign Out';
	signOut.addEventListener('click', () => signOutHandler(), false);

	const signOutDiv = document.createElement('div');
	signOutDiv.className = 'signOutDiv';
	signOutDiv.append(signOut);

	return signOutDiv;
}
