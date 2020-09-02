const step = document.querySelectorAll(".step");
const lastStep = document.querySelector("#lastStep");
const form = document.querySelector('#regForm');
const output = document.querySelector('#output');
const clearStorage = document.querySelector('#cancel');
const save = document.querySelector('#save');
let currentStep = 0;

function showStep(n) {
  step[n].style.display = "block";
}

function nextStep() {
  if (!validateForm()) return false;
  step[currentStep].style.display = "none";
  currentStep = ++currentStep;

  if (currentStep >= step.length) {
    form.submit();
    return false;
  }

  showStep(currentStep);
}

showStep(currentStep);
/* Choose department and fill vacancy */

let departmensJson = `{
    "Sales" : [
        "Sales Manager",
        "Account Manager" 
    ],
    "Marketing" : [
        "Creative Manager",
        "Marketing Coordinator",
        "Content Writer" 
    ],
    "Technology" : [
        "Project Manager",
        "Software Developer", 
        "PHP programmer", 
        "Front End",
        "Quality Assurance"
        ] 
}`;
let departmens = JSON.parse(departmensJson);
let departmentSelect = document.querySelector('#departments');
let vacanciesSelect = document.querySelector('#vacancies');

const departmentList = list => {
  for (key in list) {
    option = new Option(key, key);
    departmentSelect.append(option);
  }
};

departmentList(departmens);

const vacancyList = (list, val) => {
  for (i = 0; i < list[val].length; i++) {
    option = new Option(list[val][i], list[val][i]);
    vacanciesSelect.append(option);
  }
};

const clearVacancyList = () => {
  let length = vacanciesSelect.options.length;

  for (i = length - 1; i >= 0; i--) {
    vacanciesSelect.options[i] = null;
  }
};

var departmentChoose = "";

const chooseDepartment = () => {
  let departmentChoose = departmentSelect.value;
  vacanciesSelect.disabled = "";
  clearVacancyList();
  vacancyList(departmens, departmentChoose);
};

function toJSONString(form) {
  var obj = {};
  var elements = form.querySelectorAll("input, select");

  for (var i = 0; i < elements.length; ++i) {
    var element = elements[i];
    var name = element.name;
    var value = element.value;

    if (name) {
      obj[name] = value;
    }
  }

  localStorage.setItem('formReg', JSON.stringify(obj));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  toJSONString(this);
  let objj = JSON.parse(localStorage.getItem('formReg'));
  output.innerHTML = "";

  for (key in objj) {
    output.innerHTML += "<div class='col-key'>" + key + "</div><div class='col-value'>" + objj[key] + "</div>";
  }
});
clearStorage.addEventListener("click", function (el) {
  localStorage.clear();
  document.querySelectorAll('input, select').forEach(el => el.value = '');
  output.innerHTML = "";
  currentStep = 0;
  showStep(currentStep);
});
save.addEventListener("click", function (el) {
  //e.preventDefault();
  //localStorage.clear();
  //document.querySelectorAll('input, select').forEach(el=>el.value = '');
  output.innerHTML = ""; // currentStep = 0;
  // showStep(currentStep);

  output.innerHTML += "<div>Congratulation! <br/>Your registration was successful!</div>";
});
/* Form validation */
const firstName = form.querySelector('#firstName');
const lastName = form.querySelector('#lastName');
const email = form.querySelector('#email');
const password = form.querySelector('#password');
const passwordConfirmation = form.querySelector('#passwordConfirmation');
const fields = form.querySelectorAll('input[required]');
const fieldsSelect = form.querySelectorAll('select[required]');
let valid = true;

const generateError = text => {
  let error = document.createElement('div');
  error.className = 'error';
  error.innerHTML = text;
  return error;
};

const removeValidation = () => {
  let errors = form.querySelectorAll('.error');

  for (i = 0; i < errors.length; i++) {
    errors[i].remove();
  }

  valid = true;
  return valid;
};

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
};

const checkFieldsSelectValue = () => {
  for (i = 0; i < fieldsSelect.length; i++) {
    if (!fieldsSelect[i].value) {
      let error = generateError('This field is required');
      fieldsSelect[i].insertAdjacentElement("afterend", error);
      valid = false;
    }
  }

  return valid;
};

const checkLettersOnly = e => {
  let format = /^[A-Za-z]+$/;

  if (e.value && !e.value.match(format)) {
    let error = generateError('Must be letters only');
    e.insertAdjacentElement("afterend", error);
    e.focus();
    valid = false;
  }
};

const checkEmail = () => {
  let format = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  if (email.value && !email.value.match(format)) {
    let error = generateError('Must be valid email address');
    email.insertAdjacentElement("afterend", error);
    email.focus();
    valid = false;
  }
};

const checkPassword = () => {
  let format = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;

  if (password.value && !password.value.match(format)) {
    let error = generateError('Required at least one number (0-9), uppercase and lowercase letters (a-Z) and at least one special character(!@#$%^&*~)');
    password.insertAdjacentElement("afterend", error);
    password.focus();
    valid = false;
  }
};

const checkPasswordMatch = () => {
  if (password.value && passwordConfirmation.value && password.value !== passwordConfirmation.value) {
    console.log('not equals');
    var error = generateError('Must be equal to password');
    passwordConfirmation.insertAdjacentElement("afterend", error);
    valid = false;
    passwordConfirmation.focus();
  }
};

const validateForm = () => {
  removeValidation();
  checkFieldsValue();
  checkLettersOnly(firstName);
  checkLettersOnly(lastName);
  checkEmail();
  checkPassword();
  checkPasswordMatch();
  if (currentStep > 0) checkFieldsSelectValue();
  return valid;
};