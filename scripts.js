let heroesData = [
    {
        name: 'Superman',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum possimus laudantium a esse corrupti provident temporibus natus labore expedita vel.',
        image: 'superman.jpg',
        price: '3500',
        isAvailable: true
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
                <button id="${[i]}" class="modal__button">Dodaj do koszyka</button>
            </div>
        </div>
    </div>
    `;

    const modalClose = document.querySelector('.modal__close');
    modalClose.addEventListener('click', function(){
        modalSection.classList.remove('modal--visible');
    });
}

