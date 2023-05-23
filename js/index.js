const documentTitle = document.title;

//--------------GETTING THE NAME OF THE DOCUMENT
switch (documentTitle) {
  case 'Menu':
    (function() {
      fetch('http://localhost:8080/api/dishes?dividedByType=true').then(res => res.json())
        .then(data => Object.entries(data).forEach(entry => {
          const [key, value] = entry;
          const section = createSection(key);
    
          value.forEach(
            card => {
              section.append(createCard(card.price, card.name, card.photoLink, card.positionId, card.weight));
            }
          )
        }
        ));
    })();
    (function() {
      fetch('http://localhost:8080/api/drinks?dividedByType=true').then(res => res.json())
        .then(data => Object.entries(data).forEach(entry => {
          const [key, value] = entry;
          const section = createSection(key);
    
          value.forEach(
            card => {
              section.append(createCard(card.price, card.name, card.photoLink, card.positionId, card.volume, card.typeOfDrink));
            }
          )
        }
        ));
    })();
    break;
  case 'Wines':
    (function(){
      fetch('http://localhost:8080/api/wines?dividedByCountry=true').then(res => res.json())
        .then(data => Object.entries(data).forEach(entry => {
          const [key, value] = entry;
          const section = createSection(key);
    
          value.forEach(
            card => {
              section.append(createWinesCard(card.price, card.name, card.photoLink, card.positionId, card.regionName, card.country, card.typeOfWine));
            }
          )
        }
        ));
  })();
    break;
  default:
    console.log(`Sorry, we are out of ${expr}.`);
}


const menu = document.querySelector('.menu');


//----------------ORDER FORM LOGIC
const orderBtn = document.querySelector('.btn-buy');
orderBtn.addEventListener('click', toggleOrderForm);

function toggleOrderForm() {
  console.log('Toggle order');
  document.querySelector('.order-form').style.display = 'block';
  document.querySelector('.modal-wrapper').style.display = 'block';

  const close = document.querySelector('#order-close');
  close.addEventListener('click', () => {
    document.querySelector('.order-form').style.display = 'none';
    document.querySelector('.modal-wrapper').style.display = 'none';
  })
}

const deliveryHome = document.querySelector('#delivery-home');
deliveryHome.addEventListener('click', toggleAddress);


function toggleAddress() {
  document.querySelector('.date-label').style.display = 'none';
  document.querySelector('#date-select').style.display = 'none';
  document.querySelector('.tables-label').style.display = 'none';
  document.querySelector('#tables').style.display = 'none';

  document.querySelector('.address-label').style.display = 'block';
  document.querySelector('#address').style.display = 'block';
}

const eatInside = document.querySelector('#eat-inside');
eatInside.addEventListener('click', toggleTables);

function toggleTables() {

  document.querySelector('.address-label').style.display = 'none';
  document.querySelector('#address').style.display = 'none';

  document.querySelector('.date-label').style.display = 'block';
  document.querySelector('#date-select').style.display = 'block';
  document.querySelector('#date-select').valueAsDate = new Date();

  document.querySelector('.tables-label').style.display = 'block';
  document.querySelector('#tables').style.display = 'block';

  fillSelect();
}

function fillSelect() {
  const select = document.querySelector("#tables");
  removeFromSelect(select);

  fetch('http://localhost:8080/api/tables').then(res => res.json())
    .then(element => {
      element.forEach(item => {
        const option = document.createElement("option");
        option.value = item.description;
        option.id ="id" + item.tableNumber;
        option.innerHTML = item.description;
        select.appendChild(option);
      })
    });
}

function removeFromSelect(select) {
  while (select.options.length > 0) {
    select.remove(0);
  }
}

const btnSent = document.querySelector('.order-btn');
btnSent.addEventListener('click', () => {
  form.style.display = 'none';
  document.querySelector('.modal-wrapper').style.display = 'none';
  alert("Ваше замовлення було надіслано");
});


//-------------------CREATING SECTIONS
function createSection(title) {
  const section = document.createElement('section');
  section.classList.add('menu-section');
  section.setAttribute("id", title);

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


//--------------------------CREATING CARDS
function createCard(price, name, photoLink, positionId, weight) {

  const card = document.createElement('div');
  card.classList.add('card');

  card.setAttribute('id', positionId);

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

  const cardWeight = document.createElement('p');
  cardWeight.classList.add('card-weight');
  cardWeight.append(weight + " гр.")
  card.append(cardWeight);
  
  const cardPrice = document.createElement('span');
  cardPrice.classList.add('card-price');
  cardPrice.append(price + " грн");
  card.append(cardPrice);

  const cartIcon = document.createElement('ion-icon');
  cartIcon.classList.add('add-cart');
  cartIcon.name = 'cart';
  cartIcon.addEventListener('click', addCart);

  card.append(cartIcon);

  return card;
}

//-------------------CREATING DRINKS CARDS

function createDrinksCard(price, name, photoLink, positionId, volume, typeOfDrink) {

  const card = document.createElement('div');
  card.classList.add('card');

  card.setAttribute('id', positionId);

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

  const drinkType = document.createElement('p');
  drinkType.classList.add('drink-type');
  drinkType.append("Type: "+ typeOfDrink);
  card.append(drinkType);

  const cardVolume = document.createElement('p');
  cardVolume.classList.add('card-volume');
  cardVolume.append(volume + " ml");
  card.append(cardVolume);

  const cardPrice = document.createElement('span');
  cardPrice.classList.add('card-price');
  cardPrice.append(price + " грн");
  card.append(cardPrice);

  const cartIcon = document.createElement('ion-icon');
  cartIcon.classList.add('add-cart');
  cartIcon.name = 'cart';
  cartIcon.addEventListener('click', addCart);

  card.append(cartIcon);

  return card;
}

//-------------------CREATING WINE CARDS

function createWinesCard(price, name, photoLink, positionId, regionName, country, typeOfWine) {

  const card = document.createElement('div');
  card.classList.add('card');

  card.setAttribute('id', positionId);

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

  const wineType = document.createElement('p');
  wineType.classList.add('wine-type');
  wineType.append("Type: "+ typeOfWine);
  card.append(wineType);

  const region = document.createElement('p');
  region.classList.add('region-name');
  region.append(country + ", Region of " + regionName);
  card.append(region);



  const cardPrice = document.createElement('span');
  cardPrice.classList.add('card-price');
  cardPrice.append(price + " грн");
  card.append(cardPrice);

  const cartIcon = document.createElement('ion-icon');
  cartIcon.classList.add('add-cart');
  cartIcon.name = 'cart';
  cartIcon.addEventListener('click', addCart);

  card.append(cartIcon);

  return card;
}



//------------------SENDING ORDER FORM
const form = document.querySelector('.order-form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const checkedOption = document.querySelector('input[name="delivery-option"]:checked').value;

  const order = {
    dateOfOrder: new Date(),
  }
  const client = {
    phoneNumber: document.querySelector("#tel").value,
    name: document.querySelector("#name").value
  }
  order.client = client;

  let positionsInOrders = [];
  switch (checkedOption) {
    case 'delivery':

      positionsInOrders = [];

      itemList.forEach((product) => {
        const item = {};
        item.menuPostionId = product.positionId.substring(2);
        const productQuantity = document.querySelector("#" + product.positionId);
        const quantity = productQuantity.querySelector(".cart-quantity").value;
        item.quantity = Number(quantity);
        item.comment = null;
        positionsInOrders.push(item);
      })

      order.positionsInOrders = positionsInOrders;
      order.address = document.querySelector("#address").value;

      fetch('http://localhost:8080/api/orders/delivery', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      })
        .then((response) => response.json())
        .then(data => console.log(data))
        .catch((error) => console.log(error));

      break;

    case 'eatInside':

      positionsInOrders = [];

      itemList.forEach((product) => {
        const item = {};
        item.menuPostionId = product.positionId.substring(2);
        const productQuantity = document.querySelector("#" + product.positionId);
        const quantity = productQuantity.querySelector(".cart-quantity").value;
        item.quantity = Number(quantity);
        item.comment = null;
        positionsInOrders.push(item);
      })

      order.positionsInOrders = positionsInOrders;

      const select = document.getElementById('tables');
      const tableNumber = select.options[select.selectedIndex].id.substring(2);

      order.tableNumber = Number(tableNumber);

      fetch('http://localhost:8080/api/orders/inrestaurant', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      })
        .then((response) => response.json())
        .then(data => console.log(data))
        .catch((error) => console.log(error));

      break;
    default:
      alert("Choose delivery method");
  }
});


//-------------------------CART LOGIC

const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

btnCart.addEventListener('click', () => {
  cart.classList.add('cart-active');
});

btnClose.addEventListener('click', () => {
  cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded', loadContent);

function loadContent() {
  //Remove Food Items  From Cart
  let btnRemove = document.querySelectorAll('.cart-remove');
  btnRemove.forEach((btn) => {
    btn.addEventListener('click', removeItem);
  });

  //Product Item Change Event
  let qtyElements = document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input) => {
    input.addEventListener('change', changeQty);
  });

  updateTotal();
}


//Remove Item
function removeItem() {
  if (confirm('Are Your Sure to Remove')) {
    let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemList = itemList.filter(el => el.title != title);
    this.parentElement.remove();
    loadContent();
  }
}

//Change Quantity
function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadContent();
}

let itemList = [];

//Add Cart
function addCart() {
  let food = this.parentElement;
  let title = food.querySelector('.card-title').innerHTML;
  let price = food.querySelector('.card-price').innerHTML;
  let imgSrc = food.querySelector('.food-img').src;
  let positionId = "id" + food.id;
  console.log(positionId);

  let newProduct = { title, price, imgSrc, positionId };

  //Check Product already Exist in Cart
  if (itemList.find((el) => el.title == newProduct.title)) {
    alert("Product Already added in Cart");
    return;
  } else {
    itemList.push(newProduct);
  }


  let newProductElement = createCartProduct(title, price, imgSrc, positionId);
  let element = document.createElement('div');
  element.innerHTML = newProductElement;
  let cartBasket = document.querySelector('.cart-content');
  cartBasket.append(element);
  loadContent();
}


function createCartProduct(title, price, imgSrc, positionId) {

  return `
  <div class="cart-box" id="${positionId}">
  <img src="${imgSrc}" class="cart-img">
  <div class="detail-box">
    <div class="cart-food-title">${title}</div>
    <div class="price-box">
      <div class="cart-price">${price}</div>
       <div class="cart-amt">${price}</div>
   </div>
    <input type="number" value="1" class="cart-quantity">
  </div>
  <ion-icon name="trash" class="cart-remove"></ion-icon>
</div>
  `;
}

function updateTotal() {
  const cartItems = document.querySelectorAll('.cart-box');
  const totalValue = document.querySelector('.total-price');

  let total = 0;

  cartItems.forEach(product => {
    let priceElement = product.querySelector('.cart-price');
    let price = parseFloat(priceElement.innerHTML.replace("грн.", ""));
    let qty = product.querySelector('.cart-quantity').value;
    total += (price * qty);
    product.querySelector('.cart-amt').innerText = "грн." + (price * qty);

  });

  totalValue.innerHTML = 'грн.' + total;


  // Add Product Count in Cart Icon

  const cartCount = document.querySelector('.cart-count');
  let count = itemList.length;
  cartCount.innerHTML = count;

  if (count < 0) {
    cartCount.style.display = 'none';
  } else {
    cartCount.style.display = 'block';
  }

}
