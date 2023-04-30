export async function backHandler() {
	const mainBody = document.querySelector('.mainBody');
	const main = document.querySelector('.main');

	mainBody.remove();
	try {
		main.append(
			await renderHome(JSON.parse(localStorage.getItem('userStore')))
		);
	} catch (e) {
		generalErrorHandler();
	}
}
