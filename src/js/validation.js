/* Form validation */

const firstName = form.querySelector('#firstName');
const lastName = form.querySelector('#lastName');
const email = form.querySelector('#email');
const password = form.querySelector('#password');
const passwordConfirmation = form.querySelector('#passwordConfirmation');
const fields = form.querySelectorAll('input[required]');
const fieldsSelect = form.querySelectorAll('select[required]');
let valid = true;


const generateError = (text) => {
    let error = document.createElement('div');
    error.className = 'error';
    error.innerHTML = text;
    return error;
}

const removeValidation = () => {
    let errors = form.querySelectorAll('.error');

    for (i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
    valid = true;
    return valid;
}

const checkFieldsValue = () => {
    for (i = 0; i < fields.length; i++) {
        if (!fields[i].value) {
            let error = generateError('This field is required');
            fields[i].insertAdjacentElement("afterend", error);
            fields[i].classList.add('invalid');
            valid = false;
        }
    }
    
    return valid;
}

const checkFieldsSelectValue = () => {
    for (i = 0; i < fieldsSelect.length; i++) {
        if (!fieldsSelect[i].value) {
            let error = generateError('This field is required');
            fieldsSelect[i].insertAdjacentElement("afterend", error);
            valid = false;
        }
    }
    return valid;
}
const checkLettersOnly = (e) => {
    let format = /^[A-Za-z]+$/;
    if(e.value && !e.value.match(format)){
        let error = generateError('Must be letters only');
        e.insertAdjacentElement("afterend", error);
        e.focus();
        valid = false;
    }
}
const checkEmail = () => {
    let format = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if(email.value && !email.value.match(format)){
        let error = generateError('Must be valid email address');
        email.insertAdjacentElement("afterend", error);
        email.focus();
        valid = false;
    }
}
const checkPassword = () => {
    let format = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
    if(password.value && !password.value.match(format)){
        let error = generateError('Required at least one number (0-9), uppercase and lowercase letters (a-Z) and at least one special character(!@#$%^&*~)');
        password.insertAdjacentElement("afterend", error);
        password.focus();
        valid = false;
    }
}
const checkPasswordMatch = () => {
  if (password.value && passwordConfirmation.value && password.value !== passwordConfirmation.value) {
    console.log('not equals');
    var error = generateError('Must be equal to password');
    passwordConfirmation.insertAdjacentElement("afterend", error);
    valid = false;
    passwordConfirmation.focus();
  }
}

const validateForm = () => {
    removeValidation();
    checkFieldsValue();
    checkLettersOnly(firstName);
    checkLettersOnly(lastName);
    checkEmail();
    checkPassword();
    checkPasswordMatch();
    if(currentStep>0) checkFieldsSelectValue();
    return valid; 
}