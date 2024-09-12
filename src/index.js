// scripts.js
import "./styles.css";

const bands = ['Radiohead', 'King Gizzard and the Lizard Wizard', 'Loscil', 'Stetsasonic', 'trentmoller', 'Kings of Convenience', 'Louis Cole', 'Amon Tobin'];

const body = document.querySelector('body');
const formElement = document.createElement('div');
formElement.classList.add('formElement')
const label = document.createElement('label');
label.innerText = 'Favorite Band:'
const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Please select your favorite band...';
const options = document.createElement('ul');
for (let i = 0 ; i < bands.length ; i++) {
    let option = document.createElement('li');
    option.innerText = bands[i];
    options.appendChild(option);
}
formElement.appendChild(label);
formElement.appendChild(input);
formElement.appendChild(options);

body.appendChild(formElement);

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    })
}

const showDropdown = function() {
    options.classList.remove('hidden')
}

const hideDropdown = function() {
    setTimeout(() => {
        options.classList.add('hidden')
    }, 150); // Delay hiding the dropdown
}

const insertValue = function() {
    let selectedValue = event.target.innerText;
    input.value = selectedValue;
}


addGlobalEventListener('focusin', 'input', showDropdown);
addGlobalEventListener('focusout', 'input', hideDropdown);
addGlobalEventListener('click', 'li', insertValue);
options.classList.add('hidden');