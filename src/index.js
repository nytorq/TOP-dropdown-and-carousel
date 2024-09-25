// scripts.js
import "./styles.css";
import image1 from "./images/image1.jpg";
import image2 from "./images/image2.jpg";
import image3 from "./images/image3.jpg";
import image4 from "./images/image4.jpg";
import image5 from "./images/image5.jpg";
// Fundamentals
const body = document.querySelector('body');
let navAnchors = document.getElementsByTagName('a');

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    })
}

function clearUI() {
    body.innerHTML = '';
}

function setActiveLink() {
    let dropdown = document.querySelector('.formElement');
    let carousel = document.querySelector('.carousel');
    for (let i = 0 ; i < navAnchors.length ; i++) {
        navAnchors[i].classList.remove('activeLink');
    }
    if (dropdown) {
        navAnchors[0].classList.add('activeLink');
    } else if (carousel) {
        navAnchors[1].classList.add('activeLink');
    }
}

function loadComponent() {
    if(event.target.innerText === 'Dropdown') {
        clearUI();
        loadDropdown()
    } else if (event.target.innerText === 'Carousel') {
        clearUI();
        loadCarousel()
    }
    loadNav();
}

// Nav/toggle
function loadNav() {
    const nav = document.createElement('nav');
    body.appendChild(nav);
    const navContent = document.createElement('ul');
    const linkContent = ['Dropdown', 'Carousel'];
    for (let i = 0 ; i < linkContent.length ; i++) {
        let listItem = document.createElement('li');
        let anchor = document.createElement('a');
        anchor.innerText = linkContent[i];
        anchor.id = `anchor-${linkContent[i]}`;
        listItem.appendChild(anchor);
        navContent.appendChild(listItem);
    }
    nav.appendChild(navContent);
    addGlobalEventListener('click', 'a', loadComponent);
    setActiveLink()
}

// Dropdown showcase
const bands = ['Radiohead', 'King Gizzard and the Lizard Wizard', 'Loscil', 'Stetsasonic', 'trentmoller', 'Kings of Convenience', 'Louis Cole', 'Amon Tobin'];
function loadDropdown() {
    const formElement = document.createElement('div');
    formElement.classList.add('formElement')
    const label = document.createElement('label');
    label.innerText = 'Favorite Band:'
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Please select your favorite band...';
    const options = document.createElement('ul');
    options.classList.add('dropdown');
    for (let i = 0 ; i < bands.length ; i++) {
        let option = document.createElement('li');
        option.classList.add('dropdownValue')
        option.innerText = bands[i];
        options.appendChild(option);
    }
    formElement.appendChild(label);
    formElement.appendChild(input);
    formElement.appendChild(options);

    body.appendChild(formElement);

    const showDropdown = function() {
        options.classList.remove('hidden')
    }

    const hideDropdown = function() {
        options.classList.add('hidden')
    }

    const insertValue = function() {
        let selectedValue = event.target.innerText;
        input.value = selectedValue;
    }


    addGlobalEventListener('focusin', 'input', showDropdown);
    addGlobalEventListener('focusout', 'input', hideDropdown);
    addGlobalEventListener('mousedown', 'li.dropdownValue', insertValue);
    options.classList.add('hidden');
}

// Carousel showcase
// Source for future images: https://picsum.photos/
const images = [image1, image2, image3, image4, image5]

function nextImage() {
    let image = document.querySelector('img');
    // let imageURL = new URL(image.src).pathname.split('/').pop();
    // let imageURL = new URL(image.src);

    // The following currentIndex worked in dev mode but not in production
    // let currentIndex = images.indexOf(new URL(image.src).pathname.split('/').pop());
    let currentIndex = images.indexOf(image.src);
    let nextIndex = (currentIndex + 1) % images.length;
    // console.log(`imageURL = ${imageURL}`);
    // console.log('currentIndex = ' + currentIndex + ' and nextIndex = ' + nextIndex);
    // console.log(images);
    // console.log(`image.src = ${image.src}`)
    if (currentIndex === 4) {
        image.src = images[0];
    } else {
        image.src = images[currentIndex + 1];
    }
    document.querySelector(`.imageDot-${currentIndex}`).classList.remove('activeDot');
    document.querySelector(`.imageDot-${nextIndex}`).classList.add('activeDot');
}

function prevImage() {
    let image = document.querySelector('img');
    
    // The following currentIndex worked in dev mode but not in production
    // let currentIndex = images.indexOf(new URL(image.src).pathname.split('/').pop());
    let currentIndex = images.indexOf(image.src);
    let prevIndex = (currentIndex - 1 + images.length) % images.length;
    // console.log('currentIndex = ' + currentIndex + ' and prevIndex = ' + prevIndex);
    // console.log(images);
    // console.log(`image.src = ${image.src}`)
    if (currentIndex === 0) {
        image.src = images[4];
    } else {
        image.src = images[currentIndex - 1];
    }
    document.querySelector(`.imageDot-${currentIndex}`).classList.remove('activeDot');
    document.querySelector(`.imageDot-${prevIndex}`).classList.add('activeDot');
}

function autoScroll() {
    nextImage();
    setTimeout(autoScroll, 5000);
}

function goToImage() {
    let destination = event.target.classList[0].split('-')[1];
    let image = document.querySelector('img');
    image.src = images[destination];
    let imageDots = document.querySelectorAll('[class^="imageDot"]');
    console.log(imageDots);
    for (let i = 0 ; i < imageDots.length ; i++) {
        imageDots[i].classList.remove('activeDot');
    }
    document.querySelector(`.imageDot-${destination}`).classList.add('activeDot');
}

function loadCarousel() {
    const carousel = document.createElement('div');
    carousel.classList.add('carousel');
    body.appendChild(carousel);

    // Loading container and its image
    const image = document.createElement('img');
    image.src = images[0];
    
    carousel.appendChild(image)

    const paginationDots = document.createElement('div');
    paginationDots.classList.add('paginationDots');
    for ( let i = 0 ; i < images.length ; i++) {
        const imageDot = document.createElement('span');
        imageDot.classList.add(`imageDot-${i}`);
        paginationDots.appendChild(imageDot);
    }
    addGlobalEventListener('click', '[class^="imageDot"]', goToImage)

    // Creating arrows to switch image
    const leftArrow = document.createElement('span');
    leftArrow.classList.add('material-symbols-outlined', 'icon')
    leftArrow.innerText = 'chevron_left';
    const rightArrow = document.createElement('span');
    rightArrow.classList.add('material-symbols-outlined', 'icon')
    rightArrow.innerText = 'chevron_right';
    const switcherRow = document.createElement('div');
    switcherRow.classList.add('switcherRow');
    switcherRow.appendChild(leftArrow);
    switcherRow.appendChild(rightArrow);
    body.appendChild(switcherRow);
    addGlobalEventListener('click', 'span.icon', (event) => {
        if (event.target.innerText === 'chevron_right') {
            nextImage();

        } else if (event.target.innerText === 'chevron_left') {
            prevImage();
        }
    });
    body.appendChild(paginationDots);
    autoScroll();
}
// Time to load the page!

loadDropdown();
loadNav();

