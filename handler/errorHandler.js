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

function generalErrorHandler() {}
