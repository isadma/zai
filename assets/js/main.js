const menuBtn = document.querySelector('#hamburger-menu');
const headerModal = document.querySelector('#header-modal');
const modalClose = document.querySelector('#modal-close');
const goFilter = document.querySelector('#go-filter');
const modalFilter = document.querySelector('#modal-filter');
const closeFilter = document.querySelector('#close-filter');
const dropdown = document.querySelector('.my-profile-dropdown');
const addToCartBtn = document.querySelector('#add-to-cart');
const productImgs = document.querySelectorAll('.cloth-img');
let totalPrice = 0;
let cartList = [];
let addedProducts = [];
let wishlist = [];
let addedToWishlist = [];
const productPage = document.querySelector('.product');
const categories = document.querySelector('.categories-body');
const mainPage = document.querySelector('.clothes');
const categoriesAsideItems = document.querySelectorAll('.categories-aside-item-dropdown');

function addPrice(productDetails, empty) {
  if (empty) {
    let cartPrice = parseInt(productDetails.price);
    localStorage.setItem('totalPrice', cartPrice);
  } else {
    let cartPrice = parseInt(productDetails.price);
    totalPrice = localStorage.getItem('totalPrice');
    totalPrice = Number(totalPrice) + cartPrice;
    localStorage.setItem('totalPrice', totalPrice);
    totalPrice += productDetails.price;
  }
}

function addCart() {
  let productDetails = {};
  // * add product details to variable
  const product = document.querySelector('.product');
  let chosenImg = product.querySelector('.chosen-product');
  productDetails.img = chosenImg.querySelector('.active').src;

  let clothColors = product.querySelector('.cloth-colors');
  productDetails.color = clothColors.querySelector('.active').className;

  let clothSizes = product.querySelector('.cloth-sizes');
  productDetails.size = clothSizes.querySelector('.active').innerText;

  productDetails.collection = product.querySelector('.cloth-collection').innerText;
  productDetails.name = product.querySelector('.cloth-name').innerText;
  productDetails.price = product.querySelector('.cloth-price').innerText;
  productDetails.description = product.querySelector('.cloth__description').innerText;
  return productDetails;
}
// *----------------------------------- add preudoUserInfo to localStorage---------------------------------
const pseudoUserInfo = {
  firstName: 'John',
  lastName: 'Mayer',
  userEmail: 'johnmayer@gamil.com',
  accountPassword: '*********',
  cards: [
    {
      cardNumber: '*********9008',
      expirationDate: '02/28',
    },
  ],
};
if (localStorage.getItem('pseudoUserInfo')) {
} else {
  localStorage.setItem('pseudoUserInfo', JSON.stringify(pseudoUserInfo));
}

// * ------------------------------------------write cartQty------------------------------------------

window.addEventListener('load', function (params) {
  if (this.localStorage.getItem('cartQty')) {
    for (let dot of document.querySelectorAll('.red-dot')) {
      dot.querySelector('span').innerText = this.localStorage.getItem('cartQty');
    }
  }
});
// *---------------------------- dropdown for categories page filter

if (categoriesAsideItems) {
  for (let categoriesAsideItem of categoriesAsideItems) {
    categoriesAsideItem
      .querySelector('.categories-aside-item-title')
      .addEventListener('click', function () {
        categoriesAsideItem.classList.toggle('categories-aside-item-dropdown-active');
      });
    categoriesAsideItem
      .querySelector('.filter-category-dropdown')
      .querySelector('.title')
      .addEventListener('click', function () {
        categoriesAsideItem
          .querySelector('.filter-category-dropdown')
          .classList.toggle('filter-category-active');
      });
  }
}

//    *----------------------------------collect information from the selected product

if (categories || mainPage) {
  for (let productImg of productImgs) {
    productImg.addEventListener('click', function (e) {
      let clickedProductDetails = {};
      let clickedProduct = e.target.closest('.clothes__list-item');
      clickedProductDetails.img = clickedProduct.querySelector('.cloth-img').src;
      clickedProductDetails.name = clickedProduct.querySelector('.cloth-name').innerText;
      clickedProductDetails.collection =
        clickedProduct.querySelector('.cloth-collection').innerText;
      clickedProductDetails.price = clickedProduct.querySelector('.cloth-price').innerText;
      let clothColors = clickedProduct.querySelector('.cloth-colors');
      if (clothColors) {
        clickedProductDetails.colors = [];
        for (let color of clothColors.querySelectorAll('.color')) {
          clickedProductDetails.colors.push(color.className);
        }
      }
      localStorage.setItem('clickedProductDetails', JSON.stringify(clickedProductDetails));
    });
  }
}

//  *---------------------------------------------adding product to cart----------------------------------------------

if (addToCartBtn) {
  window.addEventListener('load', function name(params) {
    // * take data from clicked Product
    let clickedProductDetails = JSON.parse(localStorage.getItem('clickedProductDetails'));
    productPage.querySelector('.mySlides').querySelector('img').src = clickedProductDetails.img;
    productPage.querySelector('.dress').src = clickedProductDetails.img;
    productPage.querySelector('.cloth-collection').innerText = clickedProductDetails.collection;
    productPage.querySelector('.cloth-name').innerText = clickedProductDetails.name;
    productPage.querySelector('.cloth-price').innerText = clickedProductDetails.price;
    if (clickedProductDetails.colors) {
      let clothColors = productPage.querySelector('.cloth-colors').children;
      for (let i = 0; i < 3; i++) {
        clothColors[i].className = clickedProductDetails.colors[i];
      }
    }
    addChosenProductImg();
    // * checking if item was added to cart
    if (
      JSON.parse(localStorage.getItem('addedProducts')).indexOf(
        document.querySelector('.cloth-name').innerText,
      ) + 1
    ) {
      addToCartBtn.innerText = 'Added to cart';
      return;
    }
    // * checking if item was added to wishlist
    if (
      JSON.parse(localStorage.getItem('addedToWishlist')).indexOf(
        document.querySelector('.cloth-name').innerText,
      ) + 1
    ) {
      this.document.querySelector('#add-to-wishlist').innerText = 'Added to Wishlist';
      return;
    }
  });

  // * ---------------------------------------add to cart

  addToCartBtn.addEventListener('click', function () {
    // * collect data
    let productDetails = addCart();
    // * сheck if localstorage empty
    if (localStorage.getItem('addedProducts')) {
      addedProducts = JSON.parse(localStorage.getItem('addedProducts'));
      if (addedProducts.indexOf(productDetails.name) + 1) {
        //  * if product already exists
        return;
      } else {
        addPrice(productDetails, false);
        // * add cart to localstorage
        addedProducts.push(productDetails.name);
        localStorage.setItem('addedProducts', JSON.stringify(addedProducts));
        cartList = JSON.parse(localStorage.getItem('cartList'));
        cartList.push(productDetails);
        localStorage.setItem('cartList', JSON.stringify(cartList));
      }
    } else {
      // * if localstorage empty
      addPrice(productDetails, true);
      // * add cart to localstorage
      addedProducts.push(productDetails.name);
      cartList.push(productDetails);
      localStorage.setItem('addedProducts', JSON.stringify(addedProducts));
      localStorage.setItem('cartList', JSON.stringify(cartList));
    }

    addToCartBtn.innerText = 'Added to Cart';
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Product added to Cart',
      showConfirmButton: false,
      timer: 1500,
    });
    // * increment cartQty
    for (let dot of document.querySelectorAll('.red-dot')) {
      dot.querySelector('span').innerText = Number(dot.querySelector('span').innerText) + 1;
    }
    localStorage.setItem(
      'cartQty',
      document.querySelector('.red-dot').querySelector('span').innerText,
    );
  });

  // * ---------------------------------------add to wishlist all the same

  document.querySelector('#add-to-wishlist').addEventListener('click', function () {
    let productDetails = addCart();
    if (localStorage.getItem('addedToWishlist')) {
      addedToWishlist = JSON.parse(localStorage.getItem('addedToWishlist'));
      if (addedToWishlist.indexOf(productDetails.name) + 1) {
        return;
      } else {
        addedToWishlist.push(productDetails.name);
        localStorage.setItem('addedToWishlist', JSON.stringify(addedToWishlist));
        wishlist = JSON.parse(localStorage.getItem('wishlist'));
        wishlist.push(productDetails);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
      }
    } else {
      addedToWishlist.push(productDetails.name);
      wishlist.push(productDetails);
      localStorage.setItem('addedToWishlist', JSON.stringify(addedToWishlist));
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Product added to Wishlist',
      showConfirmButton: false,
      timer: 1500,
    });
    document.querySelector('#add-to-wishlist').innerText = 'Added to Wishlist';
  });
}

const wishlistPage = document.querySelector('.wishlist');
// * insert carts to wishlist page
if (wishlistPage) {
  window.onload = () => {
    // * take wishlist from localstorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist'));
    if (wishlist) {
      if (wishlist.length == 0) {
        this.document.querySelector('.emptyWishlist').classList.remove('hidden');
      } else {
        this.document.querySelector('.emptyWishlist').classList.add('hidden');
      }
      // * add cart to page
      for (let cartDetailsItem of wishlist) {
        let youCartTitle = document.querySelector('.your__cart-title');
        let cart = `            <div class="cart-item">
        <div class="wishlist-item">
            <div class="basic-info">
                <img src="${cartDetailsItem.img}" class="cart-img" alt="" />
                <div class="">
                    <div class="cloth-collection">${cartDetailsItem.collection}</div>
                    <div class="cloth-name">${cartDetailsItem.name}</div>
                    <div class="cloth__description">
                        ${cartDetailsItem.description}
                    </div>
                    <div class="order-id">IDL7761899</div>
                </div>
            </div>
            <div class="cart-center">
                <div class="order-size">
                    <div>Size:</div>
                    <div class="size active">${cartDetailsItem.size}</div>

                </div>
                <div class="order-color">
                    <div>Color Selected:</div>
                    <div class="${cartDetailsItem.color}"></div>

                </div>
            </div>
            <div class="cart-right">
                <div class="cart-right-top">
                    <img src="./img/icons/close.svg" alt="" />
                </div>
                <div class="cart-right-bottom">${cartDetailsItem.price}</div>
            </div>
        </div>
        <a href="./product-page.html" class="wishlist-add-to-cart btn-black btn">Add to cart</a>
    </div>`;
        youCartTitle.insertAdjacentHTML('afterend', cart);
      }
    } else {
      this.document.querySelector('.emptyWishlist').classList.remove('hidden');
    }
    // * cartDeleteBtn
    const cartDeleteBtns = document.querySelectorAll('.cart-right-top');
    for (let cartDeleteBtn of cartDeleteBtns) {
      cartDeleteBtn.addEventListener('click', function (e) {
        wishlist = JSON.parse(localStorage.getItem('wishlist'));
        addedToWishlist = JSON.parse(localStorage.getItem('addedToWishlist'));
        let deleteIndex;
        wishlist.forEach((item, index) => {
          if (item.name == e.target.closest('.cart-item').querySelector('.cloth-name').innerText) {
            deleteIndex = index;
          }
        });
        wishlist.splice(deleteIndex, 1);
        addedToWishlist.splice(
          addedToWishlist.indexOf(
            e.target.closest('.cart-item').querySelector('.cloth-name').innerText,
          ),
        );
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        localStorage.setItem('addedToWishlist', JSON.stringify(addedToWishlist));
        location.reload();
      });
    }
    // * go to details btn
    for (let element of document.querySelectorAll('.wishlist-add-to-cart')) {
      element.addEventListener('click', function (e) {
        let clickedProductDetails = {};
        let clickedProduct = e.target.closest('.cart-item');
        clickedProductDetails.img = clickedProduct.querySelector('.cart-img').src;
        clickedProductDetails.name = clickedProduct.querySelector('.cloth-name').innerText;
        clickedProductDetails.collection =
          clickedProduct.querySelector('.cloth-collection').innerText;
        clickedProductDetails.price = clickedProduct.querySelector('.cart-right-bottom').innerText;
        let clothColors = clickedProduct.querySelector('.cloth-colors');
        if (clothColors) {
          clickedProductDetails.colors = [];
          for (let color of clothColors.querySelectorAll('.color')) {
            clickedProductDetails.colors.push(color.className);
          }
        }
        localStorage.setItem('clickedProductDetails', JSON.stringify(clickedProductDetails));
      });
    }
  };
}
const youCart = document.querySelector('.your__cart-main');

if (youCart) {
  // * same as wishlist
  window.onload = () => {
    let cartList = JSON.parse(localStorage.getItem('cartList'));
    if (cartList) {
      if (cartList.length == 0) {
        this.document.querySelector('.emptycart').classList.remove('hidden');
      } else {
        this.document.querySelector('.emptycart').classList.add('hidden');
      }
    } else {
      this.document.querySelector('.emptycart').classList.remove('hidden');
    }
    for (let cartDetailsItem of cartList) {
      let youCartTitle = document.querySelector('.your__cart-title');
      let cart = `<div class="cart-item">
<div class="basic-info">
  <img src="${cartDetailsItem.img}" class="cart-img" alt="" />
  <div class="">
    <div class="cloth-collection">${cartDetailsItem.collection}</div>
    <div class="cloth-name">${cartDetailsItem.name}</div>
    <div class="cloth__description">
    ${cartDetailsItem.description}
    </div>
    <div class="order-id">IDL7761899</div>
  </div>
</div>
<div class="cart-center">
  <div class="order-quantity">
    Quantity: <span class="dec-btn qty-btn" >-</span><span id="qty" >1</span><span class="inc-btn qty-btn" >+</span>
  </div>
  <div class="order-size">
    <div>Size:</div>
    <div class="size active">${cartDetailsItem.size}</div>
    
  </div>
  <div class="order-color">
    <div>Color Selected:</div>
    <div class="${cartDetailsItem.color}"></div>
    
  </div>
</div>
<div class="cart-right">
  <div class="cart-right-top">
    <img src="./img/icons/close.svg" alt="" />
  </div>
  <div class="cart-right-bottom">${cartDetailsItem.price}</div>
</div>
</div>`;
      youCartTitle.insertAdjacentHTML('afterend', cart);
    }
    // * qty dec-inc functions
    const decList = document.querySelectorAll('.dec-btn');
    const incList = document.querySelectorAll('.inc-btn');
    if (incList) {
      for (let inc of incList) {
        inc.addEventListener('click', function () {
          inc.previousSibling.innerText = Number(inc.previousSibling.innerText) + 1;
        });
      }
      for (let dec of decList) {
        dec.addEventListener('click', function () {
          if (dec.nextSibling.innerText > 1) {
            dec.nextSibling.innerText -= 1;
          }
        });
      }
    }
    // * delete btn
    const cartDeleteBtns = youCart.querySelectorAll('.cart-right-top');
    for (let cartDeleteBtn of cartDeleteBtns) {
      cartDeleteBtn.addEventListener('click', function (e) {
        totalPrice = localStorage.getItem('totalPrice');
        cartList = JSON.parse(localStorage.getItem('cartList'));
        addedProducts = JSON.parse(localStorage.getItem('addedProducts'));
        let deleteIndex;
        cartList.forEach((item, index) => {
          if (item.name == e.target.closest('.cart-item').querySelector('.cloth-name').innerText) {
            deleteIndex = index;
          }
        });
        totalPrice =
          Number(totalPrice) -
          parseInt(e.target.closest('.cart-item').querySelector('.cart-right-bottom').innerText);
        cartList.splice(deleteIndex, 1);
        addedProducts.splice(
          addedProducts.indexOf(
            e.target.closest('.cart-item').querySelector('.cloth-name').innerText,
          ),
        );
        let cartQty = localStorage.getItem('cartQty');
        cartQty -= 1;
        localStorage.setItem('totalPrice', totalPrice);
        localStorage.setItem('cartQty', cartQty);
        localStorage.setItem('cartList', JSON.stringify(cartList));
        localStorage.setItem('addedProducts', JSON.stringify(addedProducts));
        location.reload();
      });
    }
  };
}

const reviewBody = document.querySelector('.review-body');
// * add cart to order review page
if (reviewBody) {
  window.addEventListener('load', function () {
    // * take carts from localstorage
    let cartList = JSON.parse(this.localStorage.getItem('cartList'));
    // * add them to page
    for (let cartDetailsItem of cartList) {
      let cart = `<div class="cart-item">
      <div class="basic-info">
        <img src="${cartDetailsItem.img}" class="cart-img" alt="" />
        <div class="">
          <div class="cloth-collection">${cartDetailsItem.collection}</div>
          <div class="cloth-name">${cartDetailsItem.name}</div>
          <div class="cloth__description">
          ${cartDetailsItem.description}
          </div>
          <div class="order-id">IDL7761899</div>
        </div>
      </div>
      <div class="cart-center">
        <div class="order-quantity">
          Quantity: <span class="dec-btn qty-btn">-</span><span id="qty">1</span><span
            class="inc-btn qty-btn">+</span>
        </div>
        <div class="order-size">
          <div>Size:</div>
          <div class="size active">${cartDetailsItem.size}</div>
        </div>
        <div class="order-color">
          <div>Color Selected:</div>
          <div class="${cartDetailsItem.color}"></div>
        </div>
      </div>
      <div class="cart-right">
        <div class="cart-right-bottom">${cartDetailsItem.price}</div>
      </div>
    </div>`;
      reviewBody.insertAdjacentHTML('afterbegin', cart);
      const decList = document.querySelectorAll('.dec-btn');
      const incList = document.querySelectorAll('.inc-btn');
      if (incList) {
        for (let inc of incList) {
          inc.addEventListener('click', function () {
            inc.previousSibling.innerText = Number(inc.previousSibling.innerText) + 1;
          });
        }
        for (let dec of decList) {
          dec.addEventListener('click', function () {
            if (dec.nextSibling.innerText > 1) {
              dec.nextSibling.innerText -= 1;
            }
          });
        }
      }
    }

    // * add user info to page
    const checkInfo = JSON.parse(this.localStorage.getItem('checkInfo'));
    reviewBody.querySelector('.user-name').innerText = checkInfo.userName;
    reviewBody.querySelector('.user-address').innerText = checkInfo.userAddress;
    const paymentInfo = this.document.querySelector('.payment-info');
    // * if payment type credit card add form
    if (checkInfo.paymentType == 'debit-cc') {
      const cardDetails = `<div class="user-info-title">Card details</div>
        <div class="user-info-item">
          <div class="info-item">
            <div class="card-info cart__details-review">
              <div>
                Credit Number:
                <span class="card-number">${checkInfo.cardData[1]}</span>
              </div>
              <div>
                Expiration Date:
                <span class="card-number">${checkInfo.cardData[2]}</span>
              </div>
              <div>
                Cardholder name:
                <span class="card-number">${checkInfo.cardData[0]}</span>
              </div>
              <div>
                Security code: <span class="card-number">${checkInfo.cardData[3]}</span>
              </div>
            </div>
          </div>
        </div>`;
      paymentInfo.insertAdjacentHTML('afterbegin', cardDetails);
    } else if (checkInfo.paymentType == 'delivery-cash') {
      this.document.querySelector('.delivery-cash').classList.remove('hidden');
    } else if (checkInfo.paymentType == 'knet') {
      this.document.querySelector('.knet').classList.remove('hidden');
    }
  });
}

const confirmationBodyBottom = document.querySelector('.confirmation-body-bottom');

if (confirmationBodyBottom) {
  window.addEventListener('load', function () {
    // * add card to order confirmation page
    let cartList = JSON.parse(this.localStorage.getItem('cartList'));
    for (let cartDetailsItem of cartList) {
      let cart = `<div class="confirmation-order-item">
      <img src="${cartDetailsItem.img}" class="confirmation-product-img" alt="" />
      <div class="confirmation-item-content">
        <div class="cloth-collection">${cartDetailsItem.collection}</div>
        <div class="cloth-name">${cartDetailsItem.name}</div>

        <div class="cloth__description">
        LOW-TOP LACED SNEAKERS FEATURING A GOLD-TONE SAINT LAURENT
        </div>
        <div class="confirmation-cart-bottom">
          <div class="order-id">IDL7761899</div>
          <div class="product-price">${cartDetailsItem.price}</div>
        </div>
      </div>
    </div>`;
      confirmationBodyBottom.insertAdjacentHTML('afterbegin', cart);
      const decList = document.querySelectorAll('.dec-btn');
      const incList = document.querySelectorAll('.inc-btn');
      if (incList) {
        for (let inc of incList) {
          inc.addEventListener('click', function () {
            inc.previousSibling.innerText = Number(inc.previousSibling.innerText) + 1;
          });
        }
        for (let dec of decList) {
          dec.addEventListener('click', function () {
            if (dec.nextSibling.innerText > 1) {
              dec.nextSibling.innerText -= 1;
            }
          });
        }
      }
    }
    const checkInfo = JSON.parse(this.localStorage.getItem('checkInfo'));
    this.document.querySelector('.user-name').innerText = checkInfo.userName;
    this.document.querySelector('.user-address').innerText = checkInfo.userAddress;
  });
}
// *---------------------------------------calc summary--------------------
const summary = document.querySelector('.summary');

if (summary) {
  totalPrice = localStorage.getItem('totalPrice');
  if (totalPrice) {
    summary.querySelector('.subtotal-price').innerText = `${totalPrice} KD`;
  } else {
    summary.querySelector('.subtotal-price').innerText = `0 KD`;
  }
}

// *------------------------------------------------qty func

const decList = document.querySelectorAll('.dec-btn');
const incList = document.querySelectorAll('.inc-btn');
if (incList) {
  for (let inc of incList) {
    inc.addEventListener('click', function () {
      inc.previousSibling.innerText = Number(inc.previousSibling.innerText) + 1;
    });
  }
  for (let dec of decList) {
    dec.addEventListener('click', function () {
      if (dec.nextSibling.innerText > 1) {
        dec.nextSibling.innerText -= 1;
      }
    });
  }
}

// * add chosen products img to page in product details page
function addChosenProductImg() {
  const chooseDress = document.querySelector('.choose-dress');
  let chosenDressBox = document.querySelector('.chosen-product');
  let chosenDress;

  if (chooseDress) {
    chosenDress = chooseDress.querySelector('.active').outerHTML;
    chosenDressBox.innerHTML = chosenDress;
    chosenDressBox.querySelector('.active').classList.remove('dress');
  }
}
addChosenProductImg();

// * ----------------------------- dropdowns

menuBtn.addEventListener('click', function (e) {
  headerModal.classList.add('active-menu');
});
modalClose.addEventListener('click', function (e) {
  headerModal.classList.remove('active-menu');
  dropdown.classList.remove('active-dropdown');
});

if (goFilter) {
  goFilter.addEventListener('click', function () {
    modalFilter.classList.add('active-filter');
  });
  closeFilter.addEventListener('click', function (params) {
    modalFilter.classList.remove('active-filter');
  });
}

function myFunction() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

if (dropdown) {
  dropdown.addEventListener('click', function () {
    dropdown.classList.toggle('active-dropdown');
  });
}
// * -----------------------------item select func

const checkboxes = document.querySelectorAll('.check-box');

for (let checkbox of checkboxes) {
  checkbox.addEventListener('click', function (e) {
    if (e.target.classList.contains('check-item')) {
      if (checkbox.querySelector('.active')) {
        checkbox.querySelector('.active').classList.remove('active');
      }
      e.target.classList.add('active');
    } else if (e.target.closest('.check-item')) {
      if (checkbox.querySelector('.active')) {
        checkbox.querySelector('.active').classList.remove('active');
      }
      e.target.closest('.check-item').classList.add('active');
    }
    addChosenProductImg();
  });
}

// *---------------------------------------- current year

let year = document.querySelector('.year');

if (year) {
  year.innerHTML = new Date().getFullYear();
}

// *------------------------------ user info

const myAccMain = document.querySelector('.my__account-main');
const addNewAddress = document.querySelector('.add__address-body');

if (myAccMain) {
  window.addEventListener('load', function () {
    userInfo = JSON.parse(this.localStorage.getItem('pseudoUserInfo'));
    // * add addresses to page
    if (userInfo.addresses) {
      if (userInfo.addresses.length > 0) {
        userInfo.addresses.forEach((addressDetails, index) => {
          let address;
          if (addressDetails[10]) {
            address = `<div class="user-info-item">
        <div class="info-item">
            <div class="user-name">${addressDetails[0]} ${addressDetails[1]} (Default)</div>
        </div>
        <div class="user-address">
            ${addressDetails[9]}
        </div>
        <div class="user-address">
      Apt  ${addressDetails[8]}, Floor ${addressDetails[7]}, Building ${addressDetails[6]}, Block ${addressDetails[5]}, Street ${addressDetails[4]}
        </div>
        <div class="user-address">
        ${addressDetails[3]}, ${addressDetails[2]}
        </div>
        <div class="user-address-actions">
          <a class="make-default edit">Make default</a>
          <a href="./my-account.html" class="edit">Edit</a>
          <a class="delete-address edit" id="${index}" >Delete</a>
        </div>
    </div>`;
          } else {
            address = `<div class="user-info-item">
            <div class="info-item">
                <div class="user-name">${addressDetails[0]} ${addressDetails[1]}</div>
            </div>
            <div class="user-address">
                ${addressDetails[9]}
            </div>
            <div class="user-address">
          Apt  ${addressDetails[8]}, Floor ${addressDetails[7]}, Building ${addressDetails[6]}, Block ${addressDetails[5]}, Street ${addressDetails[4]}
            </div>
            <div class="user-address">
            ${addressDetails[3]}, ${addressDetails[2]}
            </div>
            <div class="user-address-actions">
              <a class="make-default edit">Make default</a>
              <a href="./my-account.html" class="edit">Edit</a>
              <a class="delete-address edit" id="${index}" >Delete</a>
            </div>
        </div>`;
          }
          // * add addresses to address book page
          myAccMain.querySelector('.address-box').insertAdjacentHTML('beforeend', address);
        });
      } else {
        myAccMain
          .querySelector('.address-box')
          .insertAdjacentHTML('beforeend', "<div>You don't have addresses yet</div>");
      }
    } else {
      myAccMain
        .querySelector('.address-box')
        .insertAdjacentHTML('beforeend', "<div>You don't have addresses yet</div>");
    }
    const elements = myAccMain.querySelectorAll('.delete-address');

    elements.forEach(element =>
      element.addEventListener('click', event => {
        // * delete address
        let userInfo = JSON.parse(this.localStorage.getItem('pseudoUserInfo'));
        let deleteIndex = element.id;
        userInfo.addresses.splice(deleteIndex, 1);
        this.localStorage.setItem('pseudoUserInfo', JSON.stringify(userInfo));
        this.location.reload();
      }),
    );

    const makeDefaultBtns = myAccMain.querySelectorAll('.make-default');

    makeDefaultBtns.forEach(element =>
      element.addEventListener('click', event => {
        // * make default
        let userInfo = JSON.parse(this.localStorage.getItem('pseudoUserInfo'));
        let index = Number(element.closest('.user-info-item').querySelector('.delete-address').id);
        let a = userInfo.addresses[index];
        userInfo.addresses[0][10] = false;
        a[10] = true;
        userInfo.addresses[index] = userInfo.addresses[0];
        userInfo.addresses[0] = a;

        this.localStorage.setItem('pseudoUserInfo', JSON.stringify(userInfo));
        this.location.reload();
      }),
    );
  });
}
// * ---------------------------------------------add new address
if (myAccMain || addNewAddress) {
  // * add new address
  document.querySelector('.save-address').addEventListener('click', function (e) {
    e.preventDefault();
    // * collect address info from form
    let addressDetails = [];
    for (let input of document.querySelectorAll('.block-white')) {
      if (input.value == '') {
        Swal.fire({
          icon: 'error',
          text: 'Fill in all the fields!',
        });
        return;
      } else {
        addressDetails.push(input.value);
      }
    }
    // * take available addresses
    userInfo = JSON.parse(localStorage.getItem('pseudoUserInfo'));
    if (userInfo && userInfo.addresses) {
      userInfo.addresses.push(addressDetails);
      localStorage.setItem('pseudoUserInfo', JSON.stringify(userInfo));
    }
    // * if there are no added addresses yet
    else {
      let allAddresses = [];
      allAddresses.push(addressDetails);
      pseudoUserInfo.addresses = allAddresses;
      localStorage.setItem('pseudoUserInfo', JSON.stringify(pseudoUserInfo));
    }
    if (myAccMain) {
      location.reload();
    }
    if (addNewAddress) {
      location.assign('./checkoutAddress.html');
    }
  });
}
// * --------------------------------for profile-overview page--------------------------------------------

const userInfoBlock = document.querySelector('.my__profile-body');
if (userInfoBlock) {
  window.addEventListener('load', function () {
    let userInfo = JSON.parse(this.localStorage.getItem('pseudoUserInfo'));
    userInfoBlock.querySelector(
      '.user-name',
    ).innerText = `${userInfo.firstName} ${userInfo.lastName}`;
    userInfoBlock.querySelector('.user-email').innerText = `${userInfo.userEmail}`;
    userInfoBlock.querySelector('.password').innerText = `${userInfo.accountPassword}`;
    if (userInfo.addresses && userInfo.addresses.length > 0) {
      for (let addressDetails of userInfo.addresses) {
        if (addressDetails[10]) {
          let address = `<div class="user-info-item">
          <div class="info-item">
            <div class="user-name ml-6">${addressDetails[0]} ${addressDetails[1]}</div>
          </div>
          <div class="user-address">
            Apt ${addressDetails[8]}, Floor ${addressDetails[7]}, Building ${addressDetails[6]}, Block ${addressDetails[5]}, Street ${addressDetails[4]}, ${addressDetails[3]} City
            ${addressDetails[2]}
          </div>
        </div>`;
          userInfoBlock.querySelector('.address-title').insertAdjacentHTML('afterend', address);
          return;
        } else {
          userInfoBlock
            .querySelector('.address-title')
            .insertAdjacentHTML(
              'afterend',
              "<div><span>you have not selected a default address</span><a href='./address-book.html' class='edit ml-6'>Choose</div>",
            );
        }
        return;
      }
    } else {
      userInfoBlock
        .querySelector('.address-title')
        .insertAdjacentHTML(
          'afterend',
          "<div><span>You don't have addresses yet</span><a href='./address-book.html' class='edit ml-6'>Add</div>",
        );
    }
  });
}

// * ---------------------------for checkout page-------------------------------------

const checkoutAddressList = document.querySelector('.checkout-address-list');

if (checkoutAddressList) {
  window.addEventListener('load', function (params) {
    let userInfo = JSON.parse(localStorage.getItem('pseudoUserInfo'));
    if (userInfo.addresses && userInfo.addresses.length > 0) {
      userInfo.addresses.forEach((element, index) => {
        if (element[10]) {
          let address = `<div class="checkout-list-item check-item active">
        <div class="address-info">
          <div class="item-number">${index + 1}</div>
    
          <div>
            <div class="user-name">${element[0]} ${element[1]} (Default)</div>
            <div class="user-address">
              Apt ${element[8]}, Floor ${element[7]}, Building ${element[6]}, Block ${
            element[5]
          }, Street ${element[4]}, ${element[3]}
              City ${element[2]}
            </div>
          </div>
        </div>
        <div class="address-check"><img src="./img/icons/check.svg" class="address-check-img" alt=""></div>
      </div>`;
          checkoutAddressList.insertAdjacentHTML('afterbegin', address);
        } else {
          let address = `<div class="checkout-list-item check-item">
        <div class="address-info">
          <div class="item-number">${index + 1}</div>
    
          <div>
            <div class="user-name">${element[0]} ${element[1]}</div>
            <div class="user-address">
              Apt ${element[8]}, Floor ${element[7]}, Building ${element[6]}, Block ${
            element[5]
          }, Street ${element[4]}, ${element[3]}
              City ${element[2]}
            </div>
          </div>
        </div>
        <div class="address-check"><img src="./img/icons/check.svg" class="address-check-img" alt=""></div>
      </div>`;
          checkoutAddressList.insertAdjacentHTML('beforeend', address);
        }
      });
    } else {
      checkoutAddressList.insertAdjacentHTML(
        'beforeend',
        "<div>You don't have addresses yet</div>",
      );
    }
  });
}

// * collect checkout info

if (checkoutAddressList) {
  document.querySelector('.select-address').addEventListener('click', function (e) {
    e.preventDefault();
    if (checkoutAddressList.querySelector('.active')) {
      const chosenAddressBlock = checkoutAddressList
        .querySelector('.active')
        .closest('.checkout-list-item');

      const checkInfo = {};

      checkInfo.userName = chosenAddressBlock.querySelector('.user-name').innerText;
      checkInfo.userAddress = chosenAddressBlock.querySelector('.user-address').innerText;
      localStorage.setItem('checkInfo', JSON.stringify(checkInfo));
      location.assign('./payment.html');
    } else {
      Swal.fire({
        title: 'you must select an address',
      });
      return;
    }
  });
}

const paymentList = document.querySelector('.choose-payment');

if (paymentList) {
  const checkInfo = JSON.parse(localStorage.getItem('checkInfo'));
  for (let checkItem of paymentList.querySelectorAll('.check-item')) {
    checkItem.addEventListener('click', function () {
      if (checkItem.classList.contains('debit-credit__cards')) {
        document.querySelector('.cart__details-form').classList.remove('hidden');
        checkInfo.paymentType = 'debit-cc';
      } else if (checkItem.classList.contains('cash-on-delivery')) {
        document.querySelector('.cart__details-form').classList.add('hidden');
        checkInfo.paymentType = 'delivery-cash';
      } else if (checkItem.classList.contains('pay-by-knet')) {
        document.querySelector('.cart__details-form').classList.add('hidden');
        checkInfo.paymentType = 'knet';
      }
    });
  }
  document.querySelector('.select-payment').addEventListener('click', function (e) {
    if (checkInfo.paymentType) {
      if (checkInfo.paymentType == 'debit-cc') {
        checkInfo.cardData = [];
        for (let input of document
          .querySelector('.cart__details-form')
          .querySelectorAll('.block-white')) {
          if (input.value == '') {
            e.preventDefault();
            Swal.fire({
              icon: 'error',
              text: 'Fill in all the Fields',
            });
            return;
          }
          checkInfo.cardData.push(input.value);
        }
      }
      localStorage.setItem('checkInfo', JSON.stringify(checkInfo));
    } else {
      e.preventDefault();
      Swal.fire({
        title: 'you must select payment method',
      });
    }
  });
}

function onHoverColors(stock, tooltip_id) {
  // here check stock
  if (!Boolean(stock)) {
    var tooltip = document.getElementById(tooltip_id);
    tooltip.style.visibility = 'visible';

    tooltip.innerHTML = 'Unavailable';
  }
}

function onMouseOutColors(tooltip_id) {
  var tooltip = document.getElementById(tooltip_id);

  tooltip.style.visibility = 'hidden';
}

document.addEventListener('DOMContentLoaded', function () {
  new Splide('#splide', {
    type: 'loop',
    perPage: 1,
    focus: 'center',
    autoplay: true,
    interval: 8000,
    // flickMaxPages: 3,
    updateOnMove: true,
    pagination: false,
    gap: '30%',
    // padding: '20%',
    throttle: 300,
    breakpoints: {
      1800: {
        padding: '18%',
        // gap: '30%',
      },
      1600: {
        padding: '17%',
        // gap: '30%',
      },
      1440: {
        padding: '15%',
        // gap: '30%',
      },
      1300: {
        padding: '11%',
        // gap: '30%',
      },
    },
  }).mount();
});
