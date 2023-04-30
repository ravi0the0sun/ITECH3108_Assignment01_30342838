export function loginErrorHandler(e) {
	const errors = document.querySelectorAll('.error');
	if (errors) {
		errors.forEach(error => error.remove());
	}

	const loginDiv = document.querySelector('.loginDiv');
	const errorMessage = document.createElement('p');
	errorMessage.className = 'error';
	errorMessage.style.fontWeight = 'bold';
	switch (e.message) {
		case 'EmptyValue':
			errorMessage.textContent = 'Please Enter Username!!!';
			loginDiv.appendChild(errorMessage);
			break;
		case 'NoMatchingUser':
			errorMessage.textContent = 'Wrong Username!!!';
			loginDiv.appendChild(errorMessage);
			break;
		default:
			generalErrorHandler();
			break;
	}
	console.log(e);
}

export function generalErrorHandler() {
	const main = document.querySelector('.main');
	const children = main.children;
	if (children.length) {
		for (let c = 0; c <= children.length; c++) {
			children[0].remove();
		}
	}
	const error = document.createElement('p');
	error.setAttribute('id', 'error');
	error.textContent = `Server Error: Cannot connect to the server \n Please check later`;
	main.append(error);
}
