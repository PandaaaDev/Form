const email = document.querySelector('#email');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const password1 = document.querySelector('#password1');
const singIn = document.querySelector('.singin-btn');
const popup = document.querySelector('.popup');
const popupBtn = document.querySelector('.close-btn');

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.error-text');
	formBox.classList.add('error');
	errorMsg.textContent = msg;
};
// Funkcja showError pobiera dwa argumenty input oraz msg
// argument input to tabela z funckji singIn [username, password, password1, email]
// msg to argument el.placeholder np. username.placeholder
// zadanie funkcj polega na dodaniu classy error do elementu pobranego z tabeli

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove('error');
};
// Funkcja clearError pobiera jeden argument z tabeli z funkcji singIn [username, password, password1, email]
// zadanie funkcji to usuniecie classy error z elementu pobranego z tabeli

const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value === '') {
			showError(el, el.placeholder);
		} else clearError(el);
	});
};
//Zdaniem funkcji jest literacja tabeli pobranej jako argument. Validacja poprawności dancyh  w formularzu oraz przesłanie informacji zwrotnej!

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.innerText} is to short. Please enter at least ${min} characters`
		);
	}
};

const checkPassword = (pass, pass1) => {
	if (pass.value !== pass1.value)
		showError(pass1, `Hasła do siebie nie pasują`);
};
const checkEmail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, 'Email is incorrect');
	}
};
const checkErrors = () => {
	const allItems = document.querySelectorAll('.form-box');
	let errorCount = 0;
	allItems.forEach((e) => {
		if (e.classList.contains('error')) {
			errorCount++;
		}
	});
	if (errorCount === 0) {
		popup.classList.add('show-popup');
	}
};

singIn.addEventListener('click', (e) => {
	e.preventDefault();
	checkForm([username, password, password1, email]);
	checkLength(username, 3);
	checkLength(password, 8);
	checkPassword(password, password1);
	checkEmail(email);
	checkErrors();
});
