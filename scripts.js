let heroesData = [
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
        image: 'superman.jpg',
        price: '25000',
        isAvailable: true
     },
     {
        name: 'Thor',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum possimus laudantium a esse corrupti provident temporibus natus labore expedita vel.',
        image: 'superman.jpg',
        price: '55000',
        isAvailable: true
     },
     {
        name: 'Ironman',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum possimus laudantium a esse corrupti provident temporibus natus labore expedita vel.',
        image: 'superman.jpg',
        price: '75000',
        isAvailable: true
     },
     {
        name: 'Potter',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum possimus laudantium a esse corrupti provident temporibus natus labore expedita vel.',
        image: 'superman.jpg',
        price: '125000',
        isAvailable: true
     },
     {
        name: 'Batman',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum possimus laudantium a esse corrupti provident temporibus natus labore expedita vel.',
        image: 'superman.jpg',
        price: '2000',
        isAvailable: true
    },
]

let price = 0;
let cartPrice = document.querySelector('.cart__price span');

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
    if (window.pageYOffset > sticky) {
        header.classList.add("header--fixed");

        if (window.innerWidth > 760) {
            header.classList.remove("header--fixed");
        }
    } else {
        header.classList.remove("header--fixed");
    }
}

const sectionHeroes = document.querySelector('#heroes');

function addHero() {
	for(let hero of heroesData) {
        let div = document.createElement('div');
        div.classList.add("hero");
		sectionHeroes.appendChild(div);
		div.innerHTML = `
            <img src="./images/${hero.image}" alt="${hero.name}" class="hero__image">
            <h2 class="hero__name">${hero.name}</h2>
            <p class="hero_price">Cena wynajmu: ${hero.price} zł/h</p>`;
    }
    saveAllToLocalStorage('heroes', heroesData);
}
(sectionHeroes !=  null) ? addHero() : '';

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
    modalSection.innerHTML = `
    <div class="modal__container">
        <div class="modal__header">
            <span class="modal__close">X</span>
        </div>
        <div class="modal__content">
            <img src="./images/${heroesData[i].image}" alt="${heroesData[i].name}" class="modal__image">
        
            <div class="modal__details">
                <h2 class="modal__title">I'm the ${heroesData[i].name}</h2>
                <p class="modal__desc">
                ${heroesData[i].description}
                </p>
                <p class="modal__price">Wynajem: <span>${heroesData[i].price} zł/h</span></p>
                ${ (!document.querySelector(`#${heroesData[i].name}`) ? 
                (heroesData[i].isAvailable === true) ? 
                    (`<button id="modal__button" class="btn btn--green">Dodaj do koszyka</button>`) : 
                    `<p>Hero jest obecnie niedostępny.` 
                : `<p>Hero jest już w Twoim koszyku.`)}
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
    (document.querySelector('#cart__empty')) ? document.querySelector('#cart__empty').remove() :'';
    cartSection.innerHTML += `
    <div id="${heroesData[i].name}" class="hero">
        <div class="item__content">
            <img src="./images/${heroesData[i].image}" alt="${heroesData[i].name}" class="item__image">
        
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
cartPrice.innerHTML = `${price.toFixed(2)} zł`;

function saveAllToLocalStorage(name, element){
    localStorage.setItem(name, JSON.stringify(element));
}

function saveToLocalStorage(name, element){
    let existingItem = JSON.parse(localStorage.getItem(name)) || [];
    existingItem.push(element);
    localStorage.setItem(name, JSON.stringify(existingItem));
}