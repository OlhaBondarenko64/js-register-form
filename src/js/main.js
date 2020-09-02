let currentStep = 0;
const step = document.querySelectorAll(".step");
const lastStep = document.querySelector("#lastStep");
const form = document.querySelector('#regForm');
const output = document.querySelector('#output');
const clearStorage = document.querySelector('#cancel');
const save = document.querySelector('#save');


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

const departmentList = (list) => {
  for (key in list) {
    option = new Option(key, key);
    departmentSelect.append(option);
  }
};

departmentList(departmens); 

const vacancyList = (list, val) => {
  for (i=0; i < list[val].length; i++) {
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


form.addEventListener(
    "submit",
    function (e) {
        e.preventDefault();
        toJSONString(this);
        let objj = JSON.parse(localStorage.getItem('formReg'));
        output.innerHTML = "";
        for (key in objj) {
            output.innerHTML += "<div class='col-key'>" + key + "</div><div class='col-value'>" + objj[key] + "</div>";  
        }
        
});
clearStorage.addEventListener(
    "click",
    function (el){
        localStorage.clear();
        document.querySelectorAll('input, select').forEach(el=>el.value = '');
        output.innerHTML = "";
        currentStep = 0;
        showStep(currentStep);
});    
save.addEventListener(
    "click",
    function (el){
        //e.preventDefault();
        //localStorage.clear();
        //document.querySelectorAll('input, select').forEach(el=>el.value = '');
        output.innerHTML = "";
        // currentStep = 0;
        // showStep(currentStep);
        output.innerHTML += "<div>Congratulation! <br/>Your registration was successful!</div>";  
});    


