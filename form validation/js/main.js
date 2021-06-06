const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const c_password = document.getElementById("c_password");

//check field required
function checkRequired(inputArray) {
	inputArray.forEach(function(input){
		if (input.value === '') {
			showError(input, `${getFieldLabel(input)} is required.`)
		}
		else{
			showSuccess(input)
		}
	})
}

function checkLength(input, min, max) {
	if (input.value.length < min) {
		showError(input, `${getFieldLabel(input)} needs to be at least ${min} characters.`)
	}else if (input.value.length > max) {
		showError(input, `${getFieldLabel(input)} needs to be less than ${max} characters.`)	
	}else{
		showSuccess(input)
	}
}

function checkPasswordmatch(input1, input2) {
	if (input1.value !== input2.value) {
		showError(input2, "Password don't match.")
	}else{
		showSuccess(input2)	
	}
}

//email validation
function validateEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
    	showSuccess(input)
    }
    else{
    	showError(input, 'Please provide a valid email.')
    }
}

function getFieldLabel(input) {
	const formControl = input.parentElement;
	const label = formControl.querySelector("label").innerHTML;
	return label;
}

//shaow error message
function showError(input, message) {
	const formControl = input.parentElement;
	formControl.classList.add("error");
	const small = formControl.querySelector("small");
	small.innerText = message;
}

//showsuccess message
function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.classList.remove("error")
	formControl.classList.add("success");
}

//crate event lisner for submit button
form.addEventListener('submit', function(e) {
	
	e.preventDefault();
	checkRequired([username, email, password, c_password])
	checkLength(username, 3, 10)
	checkLength(password, 6, 30)
	validateEmail(email)
	checkPasswordmatch(password, c_password)

});