const heroesArray = [
    {
        name: 'Superman',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum possimus laudantium a esse corrupti provident temporibus natus labore expedita vel.',
        image: 'superman.jpg',
        price: '3500',
        isAvailable: false
     },
     {
        name: 'Hulk',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum possimus laudantium a esse corrupti provident temporibus natus labore expedita vel.',
        image: 'hulk.jpg',
        price: '25000',
        isAvailable: true
     },
     {
        name: 'Thor',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum possimus laudantium a esse corrupti provident temporibus natus labore expedita vel.',
        image: 'thor.jpg',
        price: '55000',
        isAvailable: true
     },
     {
        name: 'Ironman',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum possimus laudantium a esse corrupti provident temporibus natus labore expedita vel.',
        image: 'ironman.jpg',
        price: '75000',
        isAvailable: true
     },
     {
        name: 'Potter',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum possimus laudantium a esse corrupti provident temporibus natus labore expedita vel.',
        image: 'potter.jpg',
        price: '125000',
        isAvailable: true
     },
     {
        name: 'Batman',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum possimus laudantium a esse corrupti provident temporibus natus labore expedita vel.',
        image: 'batman.jpg',
        price: '2000',
        isAvailable: true
    },
];

let heroesData = JSON.parse(localStorage.getItem('heroes')) || (
    heroesArray, saveAllToLocalStorage('heroes', heroesArray));


let price = 0;
let cartPrice = document.querySelector('.cart__price span');
(cartPrice !== null) ? cartPrice.innerHTML = `${price.toFixed(2)} zł` :'';

// Hamburger
const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation')
hamburger.addEventListener('click', function(){
    this.classList.toggle("hamburger--active");
    navigation.classList.toggle("navigation__mobile");
});

// Scroll site
const header = document.querySelector(".header");
const sticky = header.offsetTop;

window.onscroll = function() {
    scrollSite();
}

function scrollSite() {
    if (window.pageYOffset > sticky + 5) {
        header.classList.add("header--fixed");

        if (window.innerWidth > 760) {
            header.classList.remove("header--fixed");
        }
    } else {
        header.classList.remove("header--fixed");
    }
}

const sectionHeroes = document.querySelector('#heroes');

function showHeroes() {
    let reg = /(\w+:\/\/)([^/]+)([^#?]*)([^?]*)\?*(.+)*/;
    let heroesData = JSON.parse(localStorage.getItem('heroes')) || 
    ( heroesArray, saveAllToLocalStorage('heroes', heroesArray));
    for(let hero of heroesData) {
        let div = document.createElement('div');
        div.classList.add("hero");
        sectionHeroes.appendChild(div);
        div.innerHTML = `
            ${(reg.test(hero.image))
            ? `<img src="${hero.image}" alt="${hero.name}" class="hero__image" />`
            : `<img src="./images/${hero.image}" alt="${hero.name}" class="hero__image" />`}
            <h2 class="hero__name">${hero.name}</h2>
            <p class="hero_price">Cena wynajmu: ${hero.price} zł/h</p>`;
    }
}
showHeroes();

// Heroes
const heroes = document.querySelectorAll('.hero');

heroes.forEach(function(hero, i){
    hero.addEventListener('click', function(){
        modalSection.classList.add('modal--visible');
        modal(i);
    });
});

// Modal
let modalSection = document.querySelector('#modal');
function modal(i) {
    let reg = /(\w+:\/\/)([^/]+)([^#?]*)([^?]*)\?*(.+)*/;
    let heroesData = JSON.parse(localStorage.getItem('heroes')) || (
        heroesArray, saveAllToLocalStorage('heroes', heroesArray));
    modalSection.innerHTML = `
    <div class="modal__container">
        <div class="modal__header">
            <span class="modal__close">X</span>
        </div>
        <div class="modal__content">
        ${(reg.test(heroesData[i].image))
            ? `<img src="${heroesData[i].image}" alt="${heroesData[i].name}" class="modal__image" />`
            : `<img src="./images/${heroesData[i].image}" alt="${heroesData[i].name}" class="modal__image" />`}
        
            <div class="modal__details">
                <h2 class="modal__title">I'm the ${heroesData[i].name}</h2>
                <p class="modal__desc">
                ${heroesData[i].description}
                </p>
                <p class="modal__price">Wynajem: <span>${heroesData[i].price} zł/h</span></p>
                ${ (!document.querySelector(`#${heroesData[i].name}`) ? 
                (heroesData[i].isAvailable === true) ? 
                    (`<button id="modal__button" class="btn btn--green">Dodaj do koszyka</button>`) : 
                    `<p>Hero jest obecnie niedostępny.</p>` 
                : `<p>Hero jest już w Twoim koszyku.</p>`)}
            </div>
        </div>
    </div>
    `;

    const modalButton = document.querySelector('#modal__button');
    (modalButton) ?
        (modalButton.addEventListener('click', function(){
        addToCart(i);
        cartPrice.innerHTML = `${countPrice(heroesData[i].price)} zł`;
        modalButton.remove();
        document.querySelector('.modal__details').innerHTML += ('<p>Hero jest już w Twoim koszyku.</p>');
    })) : '';

    const modalClose = document.querySelector('.modal__close');
    modalClose.addEventListener('click', function(){
        modalSection.classList.remove('modal--visible');
    });
}

let cartSection = document.querySelector('#cart__items');
function addToCart(i) {
    let reg = /(\w+:\/\/)([^/]+)([^#?]*)([^?]*)\?*(.+)*/;
    let heroesData = JSON.parse(localStorage.getItem('heroes')) || (
        heroesArray, saveAllToLocalStorage('heroes', heroesArray));
    (document.querySelector('#cart__empty')) ? document.querySelector('#cart__empty').remove() :'';
    cartSection.innerHTML += `
    <div id="${heroesData[i].name}" class="item hero">
        <div class="item__content">
        ${(reg.test(heroesData[i].image))
            ? `<img src="${heroesData[i].image}" alt="${heroesData[i].name}" class="item__image" />`
            : `<img src="./images/${heroesData[i].image}" alt="${heroesData[i].name}" class="item__image" />`}  
            <div class="item__details">
                <h2 class="item__title">${heroesData[i].name}</h2>
                <p class="item__desc">
                ${heroesData[i].description}
                </p>
                <button onclick='removeItem(${heroesData[i].name}, ${heroesData[i].price} )' id='remove__${heroesData[i].name}' class="btn btn--red">Usuń z koszyka</button>
            </div>
        </div>
    </div>`;

    saveToLocalStorage('cartItem', heroesData[i]);
}

function removeItem(name, price) {
    cartPrice.innerHTML = `${countPrice(-price)} zł`;
    name.remove();
}

function countPrice(i) {
    price = (parseFloat(price) + parseFloat(i));
    return price;
}

function saveAllToLocalStorage(name, element){
    localStorage.setItem(name, JSON.stringify(element));
}

function saveToLocalStorage(name, element){
    let existingItem = JSON.parse(localStorage.getItem(name)) || [];
    existingItem.push(element);
    localStorage.setItem(name, JSON.stringify(existingItem));
}

const addHeroButton = document.querySelector('#hero__add');
(addHeroButton) ? (addHeroButton.addEventListener('click', addHero)) : '';

// Add new Hero
function addHero(e) {
    e.preventDefault();
    let name = formCheckEmpty(document.querySelector('#hero__name'));
    let photo = formCheckEmpty(document.querySelector('#hero__photo'));
    let price = formCheckEmpty(document.querySelector('#hero__price')) && formCheckPrice(document.querySelector('#hero__price'));
    let desc = formCheckEmpty(document.querySelector('#hero__desc'));
    const isAvailable = true;

    if ((name !== undefined) && (photo !== undefined) &&
    (price !== undefined) && (desc !== undefined)) {
        let obj = 
        {
            name: name,
            description: desc,
            image: photo,
            price: price,
            isAvailable: isAvailable
        };
        
        heroesData.push(obj);
        saveToLocalStorage('heroes', obj);

        let inputs = document.querySelectorAll('.form > input');
        inputs.forEach(function(input){
            input.value = '';
        });
        let textarea = document.querySelector('.form > textarea');
        textarea.value = '';
    }
}

function formCheckEmpty(name) {
    let label = document.querySelector(`[for="${name.id}"]`);
    let labelSpan = document.querySelector(`[for="${name.id}"] span`) || null;

    if(name.value === '' || name.value === null) {
        if (labelSpan === null)
            label.innerHTML += ` <span>To pole musi zostać wypełnione</span>`; 

    } else {
        if (labelSpan !== null) 
            labelSpan.remove(); 
            return name.value;
    }
}

function formCheckPrice(name) {
    let label = document.querySelector(`[for="${name.id}"]`);
    let labelSpan = document.querySelector(`[for="${name.id}"] span`) || null;

    if(!isFinite(name.value)) {
        if (labelSpan === null)
            label.innerHTML += ` <span>To pole musi być liczbą</span>`;
    } else {
        if (labelSpan !== null) 
            labelSpan.remove();
            return name.value;
    }
}