const menu = document.querySelector('.menu');

function createSection(title) {
  const section = document.createElement('section');
  section.classList.add('menu-section');

  const sectionTitle = document.createElement('h2');
  sectionTitle.classList.add('menu-section__title');
  sectionTitle.append(title);
  section.append(sectionTitle);

  const wrapper = document.createElement('div');
  wrapper.classList.add('menu-section__wrapper');
  section.append(wrapper);

  menu.append(section);

  return wrapper;
}

function createCard(price, name, photoLink) {

  const card = document.createElement('div');
  card.classList.add('card');

  const cardImg = document.createElement('div');
  cardImg.classList.add('card-img');

  const foodImg = document.createElement('img');
  foodImg.classList.add('food-img');
  foodImg.src = photoLink;

  cardImg.append(foodImg);
  card.append(cardImg);

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title');
  cardTitle.append(name);
  card.append(cardTitle);

  const cardPrice = document.createElement('span');
  cardPrice.classList.add('card-price');
  cardPrice.append(price);
  card.append(cardPrice);

  const cartIcon = document.createElement('ion-icon');
  cartIcon.classList.add('add-cart');
  cartIcon.name = 'cart';

  card.append(cartIcon);

  return card;
}

function getData() {
  fetch('http://localhost:8080/api/dishes?dividedByType=true').then(res => res.json())
    .then(data => Object.entries(data).forEach(entry => {
      const [key, value] = entry;
      const section = createSection(key);

      value.forEach(
        card => {
          section.append(createCard(card.price, card.name, card.photoLink));
        }
      )
    }
    ));
}

getData();