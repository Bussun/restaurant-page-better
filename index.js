const menuBtn = document.querySelector('.menuBtn');
const aboutBtn = document.querySelector('.aboutBtn');
const presBtn = document.querySelector('.presBtn');

function removeActiveClass(element) {
    if (element.classList.contains('menu') === true) {
        menuBtn.classList.remove('active');
    }
    if (element.classList.contains('header') === true) {
        presBtn.classList.remove('active');
    }
    if (element.classList.contains('about') === true) {
        aboutBtn.classList.remove('active');
    }
}

let observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
};

let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting === false) {
            removeActiveClass(entry.target);
        }
        else {
            if (entry.target.classList.contains('menu') === true) {
                menuBtn.classList.add('active');
            }
            if (entry.target.classList.contains('header') === true) {
                presBtn.classList.add('active');
            }
            if (entry.target.classList.contains('about') === true) {
                aboutBtn.classList.add('active');
            }
        }
    });
}, observerOptions);

observer.observe(document.querySelector('.header'));
observer.observe(document.querySelector('.menu'));
observer.observe(document.querySelector('.about'));

// Carte

let map = L.map('map').setView([45.752965, 4.849762], 17);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
let restPos = L.marker([45.752965, 4.849762]).addTo(map);
restPos.bindPopup('SlowFood (ou presque)');


// Menu
const mainDishesContainer = document.querySelector('.mainDishes');
const dessertsContainer = document.querySelector('.dessertsDishes');
const otherContainer = document.querySelector('.otherDishes');

fetch('./res/menu.json')
.then(res => res.json())
.then(dishes => {
    for (let i = 0; i < dishes["Dishes"].length; i++) {
        const dishDiv = document.createElement('div');
        dishDiv.classList.add('dish');
    
        //Dish name
        const dishName = document.createElement('h4');
        dishName.classList.add('dishName');
        dishName.innerText = dishes["Dishes"][i].name;
        dishDiv.appendChild(dishName);
    
        //Dish description
        const dishDesc = document.createElement('p');
        dishDesc.classList.add('dishDesc');
        dishDesc.innerText = dishes["Dishes"][i].description;
        dishDiv.appendChild(dishDesc);
    
        //Ingredients
        const dishIngredients = document.createElement('p');
        dishIngredients.classList.add('dishIngredients');
        dishIngredients.innerText = '';
        for (let j = 0; j < dishes["Dishes"][i].ingredients.length; j++) {
            dishIngredients.innerText += dishes["Dishes"][i].ingredients[j];
            if (j !== dishes["Dishes"][i].ingredients.length - 1) {
                dishIngredients.innerText += ' | '
            }
        };
        dishDiv.appendChild(dishIngredients);
    
        switch (dishes["Dishes"][i].type) {
            case 'main':
                mainDishesContainer.appendChild(dishDiv);
                break;
            
            case 'dessert':
                dessertsContainer.appendChild(dishDiv);
                break;
    
            case 'other':
            default:
                otherContainer.appendChild(dishDiv);
                break;
        }
    }
});