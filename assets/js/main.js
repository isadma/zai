const menuBtn = document.querySelector("#hamburger-menu");
const headerModal = document.querySelector("#header-modal");
const modalClose = document.querySelector("#modal-close");
const goFilter = document.querySelector("#go-filter");
const modalFilter = document.querySelector("#modal-filter");
const closeFilter = document.querySelector("#close-filter");
const dropdown = document.querySelector(".my-profile-dropdown");
const addToCartBtn = document.querySelector("#add-to-cart");
const productImgs = document.querySelectorAll(".cloth-img");
const categoriesAsideItems = document.querySelectorAll(
  ".categories-aside-item-dropdown"
);
const pseudoUserInfo = {
  firstName: 'John',
  lastName: 'Mayer',
  userEmail: 'johnmayer@gamil.com',
  accountPassword: '*********',
  cards: [
    {
      cardNumber: '*********9008',
      expirationDate: '02/28'
    }
  ],
}
if (localStorage.getItem('pseudoUserInfo')) {

} else {
  localStorage.setItem('pseudoUserInfo', JSON.stringify(pseudoUserInfo))
}
window.addEventListener('load', function (params) {
  if (this.localStorage.getItem('cartQty')) {
    for (let dot of document.querySelectorAll('.red-dot')) {
      dot.querySelector('span').innerText = this.localStorage.getItem('cartQty')
    }
  }
})
if (categoriesAsideItems) {
  for (let categoriesAsideItem of categoriesAsideItems) {
    categoriesAsideItem
      .querySelector(".categories-aside-item-title")
      .addEventListener("click", function () {
        categoriesAsideItem.classList.toggle(
          "categories-aside-item-dropdown-active"
        );
      });
    categoriesAsideItem
      .querySelector(".filter-category-dropdown")
      .querySelector(".title")
      .addEventListener("click", function () {
        categoriesAsideItem
          .querySelector(".filter-category-dropdown")
          .classList.toggle("filter-category-active");
      });
  }
}
let totalPrice = 0;
let cartList = [];
let addedProducts = [];
let wishlist = [];
let addedToWishlist = [];
const productPage = document.querySelector(".product");
const categories = document.querySelector(".categories-body");
const mainPage = document.querySelector(".clothes");

//    *----------------------------------collect information from the selected product

if (categories || mainPage) {
  for (let productImg of productImgs) {
    productImg.addEventListener("click", function (e) {
      let clickedProductDetails = {};
      let clickedProduct = e.target.closest(".clothes__list-item");
      clickedProductDetails.img =
        clickedProduct.querySelector(".cloth-img").src;
      clickedProductDetails.name =
        clickedProduct.querySelector(".cloth-name").innerText;
      clickedProductDetails.collection =
        clickedProduct.querySelector(".cloth-collection").innerText;
      clickedProductDetails.price =
        clickedProduct.querySelector(".cloth-price").innerText;
      let clothColors = clickedProduct.querySelector(".cloth-colors");
      if (clothColors) {
        clickedProductDetails.colors = [];
        for (let color of clothColors.querySelectorAll(".color")) {
          clickedProductDetails.colors.push(color.className);
        }
      }
      localStorage.setItem(
        "clickedProductDetails",
        JSON.stringify(clickedProductDetails)
      );
    });
  }
}

//  *---------------------------------------------adding Cart 

if (addToCartBtn) {
  window.addEventListener('load', function name(params) {
    let clickedProductDetails = JSON.parse(
      localStorage.getItem("clickedProductDetails")
    );
    productPage.querySelector('.mySlides').querySelector('img').src = clickedProductDetails.img
    productPage.querySelector(".dress").src = clickedProductDetails.img;
    productPage.querySelector(".cloth-collection").innerText =
      clickedProductDetails.collection;
    productPage.querySelector(".cloth-name").innerText =
      clickedProductDetails.name;
    productPage.querySelector(".cloth-price").innerText =
      clickedProductDetails.price;
    if (clickedProductDetails.colors) {
      let clothColors = productPage.querySelector(".cloth-colors").children;
      for (let i = 0; i < 3; i++) {
        clothColors[i].className = clickedProductDetails.colors[i];
      }
    }
    addChosenProduct();
    if (JSON.parse(localStorage.getItem('addedProducts')).indexOf(document.querySelector('.cloth-name').innerText) + 1) {
      addToCartBtn.innerText = 'Added to cart'
      return
    }
    if (JSON.parse(localStorage.getItem('addedToWishlist')).indexOf(document.querySelector('.cloth-name').innerText) + 1) {
      this.document.querySelector('#add-to-wishlist').innerText = 'Added to Wishlist'
      return
    }
  })
  let productDetails = {};
  function addCart() {
    const product = document.querySelector(".product");

    let chosenImg = product.querySelector(".chosen-product");
    productDetails.img = chosenImg.querySelector(".active").src;

    let clothColors = product.querySelector(".cloth-colors");
    productDetails.color = clothColors.querySelector(".active").className;

    let clothSizes = product.querySelector(".cloth-sizes");
    productDetails.size = clothSizes.querySelector(".active").innerText;

    productDetails.collection =
      product.querySelector(".cloth-collection").innerText;
    productDetails.name = product.querySelector(".cloth-name").innerText;
    productDetails.price = product.querySelector(".cloth-price").innerText;
    productDetails.description = product.querySelector(
      ".cloth__description"
    ).innerText;
  }
  addToCartBtn.addEventListener("click", function () {
    addCart()

    if (localStorage.getItem("addedProducts")) {
      addedProducts = JSON.parse(localStorage.getItem("addedProducts"));
      if (addedProducts.indexOf(productDetails.name) + 1) {
        return;
      } else {
        let cartPrice = parseInt(productDetails.price)
        totalPrice = localStorage.getItem('totalPrice')
        totalPrice = Number(totalPrice) + cartPrice
        localStorage.setItem('totalPrice', totalPrice)
        totalPrice += productDetails.price
        addedProducts.push(productDetails.name);
        localStorage.setItem("addedProducts", JSON.stringify(addedProducts));
        cartList = JSON.parse(localStorage.getItem('cartList'))
        cartList.push(productDetails);
        localStorage.setItem("cartList", JSON.stringify(cartList));
      }
    } else {
      let cartPrice = parseInt(productDetails.price)
      localStorage.setItem('totalPrice', cartPrice)
      addedProducts.push(productDetails.name);
      cartList.push(productDetails);
      localStorage.setItem("addedProducts", JSON.stringify(addedProducts));
      localStorage.setItem("cartList", JSON.stringify(cartList));
    }

    addToCartBtn.innerText = "Added to Cart";
    for (let dot of document.querySelectorAll('.red-dot')) {
      dot.querySelector('span').innerText = Number(dot.querySelector('span').innerText) + 1
    }
    localStorage.setItem('cartQty', document.querySelector('.red-dot').querySelector('span').innerText)
  });
  document.querySelector('#add-to-wishlist').addEventListener('click', function () {
    addCart()
    if (localStorage.getItem("addedToWishlist")) {
      addedToWishlist = JSON.parse(localStorage.getItem("addedToWishlist"));
      if (addedToWishlist.indexOf(productDetails.name) + 1) {
        return;
      } else {
        addedToWishlist.push(productDetails.name);
        localStorage.setItem("addedToWishlist", JSON.stringify(addedToWishlist));
        wishlist = JSON.parse(localStorage.getItem('wishlist'))
        wishlist.push(productDetails);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      }
    } else {
      addedToWishlist.push(productDetails.name);
      wishlist.push(productDetails);
      localStorage.setItem("addedToWishlist", JSON.stringify(addedToWishlist));
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
    document.querySelector('#add-to-wishlist').innerText = "Added to Wishlist";
  })
}

const wishlistPage = document.querySelector('.wishlist')

if (wishlistPage) {
  window.onload = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (wishlist) {
      if (wishlist.length == 0) {
        this.document.querySelector('.emptyWishlist').classList.remove('hidden')
      } else {
        this.document.querySelector('.emptyWishlist').classList.add('hidden')
      }
      for (let cartDetailsItem of wishlist) {
        let youCartTitle = document.querySelector(".your__cart-title");
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
        youCartTitle.insertAdjacentHTML("afterend", cart);
      }


    } else {
      this.document.querySelector('.emptyWishlist').classList.remove('hidden')
    }
    const cartDeleteBtns = document.querySelectorAll('.cart-right-top')
    for (let cartDeleteBtn of cartDeleteBtns) {
      cartDeleteBtn.addEventListener('click', function (e) {
        wishlist = JSON.parse(localStorage.getItem('wishlist'))
        addedToWishlist = JSON.parse(localStorage.getItem('addedToWishlist'))
        let deleteIndex;
        wishlist.forEach((item, index) => {
          if (item.name == e.target.closest('.cart-item').querySelector('.cloth-name').innerText) {
            deleteIndex = index
          }
        })
        wishlist.splice(deleteIndex, 1)
        addedToWishlist.splice(addedToWishlist.indexOf(e.target.closest('.cart-item').querySelector('.cloth-name').innerText))
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
        localStorage.setItem('addedToWishlist', JSON.stringify(addedToWishlist))
        location.reload()
      })
    }

    for (let element of document.querySelectorAll('.wishlist-add-to-cart')) {
      element.addEventListener("click", function (e) {
        let clickedProductDetails = {};
        let clickedProduct = e.target.closest(".cart-item");
        clickedProductDetails.img =
          clickedProduct.querySelector(".cart-img").src;
        clickedProductDetails.name =
          clickedProduct.querySelector(".cloth-name").innerText;
        clickedProductDetails.collection =
          clickedProduct.querySelector(".cloth-collection").innerText;
        clickedProductDetails.price =
          clickedProduct.querySelector(".cart-right-bottom").innerText;
        let clothColors = clickedProduct.querySelector(".cloth-colors");
        if (clothColors) {
          clickedProductDetails.colors = [];
          for (let color of clothColors.querySelectorAll(".color")) {
            clickedProductDetails.colors.push(color.className);
          }
        }
        localStorage.setItem(
          "clickedProductDetails",
          JSON.stringify(clickedProductDetails)
        );
      });
    }
  }

}
const youCart = document.querySelector(".your__cart-main");

if (youCart) {
  window.onload = () => {
    let cartList = JSON.parse(localStorage.getItem("cartList"));
    if (cartList) {
      if (cartList.length == 0) {
        this.document.querySelector('.emptycart').classList.remove('hidden')
      } else {
        this.document.querySelector('.emptycart').classList.add('hidden')
      }
    } else {
      this.document.querySelector('.emptycart').classList.remove('hidden')
    }
    for (let cartDetailsItem of cartList) {
      let youCartTitle = document.querySelector(".your__cart-title");
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
      youCartTitle.insertAdjacentHTML("afterend", cart);
    }
    const decList = document.querySelectorAll(".dec-btn");
    const incList = document.querySelectorAll(".inc-btn");
    if (incList) {
      for (let inc of incList) {
        inc.addEventListener("click", function () {
          inc.previousSibling.innerText =
            Number(inc.previousSibling.innerText) + 1;
        });
      }
      for (let dec of decList) {
        dec.addEventListener("click", function () {
          if (dec.nextSibling.innerText > 1) {
            dec.nextSibling.innerText -= 1;
          }
        });
      }
    }
    const cartDeleteBtns = youCart.querySelectorAll('.cart-right-top')
    for (let cartDeleteBtn of cartDeleteBtns) {
      cartDeleteBtn.addEventListener('click', function (e) {
        totalPrice = localStorage.getItem('totalPrice')
        cartList = JSON.parse(localStorage.getItem('cartList'))
        addedProducts = JSON.parse(localStorage.getItem('addedProducts'))
        let deleteIndex;
        cartList.forEach((item, index) => {
          if (item.name == e.target.closest('.cart-item').querySelector('.cloth-name').innerText) {
            deleteIndex = index
          }
        })
        totalPrice = Number(totalPrice) - parseInt(e.target.closest('.cart-item').querySelector('.cart-right-bottom').innerText)
        cartList.splice(deleteIndex, 1)
        addedProducts.splice(addedProducts.indexOf(e.target.closest('.cart-item').querySelector('.cloth-name').innerText))
        let cartQty = localStorage.getItem('cartQty')
        cartQty -= 1
        localStorage.setItem('totalPrice', totalPrice)
        localStorage.setItem('cartQty', cartQty)
        localStorage.setItem('cartList', JSON.stringify(cartList))
        localStorage.setItem('addedProducts', JSON.stringify(addedProducts))
        location.reload()
      })
    }
  };
}
const youOrder = document.querySelector('.my__orders-body')

if (youOrder) {
  window.addEventListener('load', function () {
    let cartList = JSON.parse(this.localStorage.getItem('cartList'))
    if (cartList) {
      if (cartList.length == 0) {
        this.document.querySelector('.my__orders-main').classList.add('notOrder-wrapper')
        this.document.querySelector('.notOrder').classList.remove('hidden')
      } else {
        this.document.querySelector('.my__orders-main').classList.remove('notOrder-wrapper')
        this.document.querySelector('.notOrder').classList.add('hidden')
      }
    } else {
      this.document.querySelector('.my__orders-main').classList.add('notOrder-wrapper')
      this.document.querySelector('.notOrder').classList.remove('hidden')
    }
    for (let cartDetailsItem of cartList) {
      let cart = `   <div class="my__order-item">
      <img src="${cartDetailsItem.img}" class="order-img" alt="Product Image" />
      <div class="order-info">
        <div class="order-top">
          <img src="${cartDetailsItem.img}" class="order-img-mobile" alt="Product Image" />
          <div class="order-top-left">
            <div class="order-name">
              <div class="">
                <div class="cloth-collection">${cartDetailsItem.collection}</div>
                <div class="cloth-name">${cartDetailsItem.name}</div>
              </div>
              <div class="">
                <div class="order-num">#001</div>
                <div class="order-id">IDL7761899</div>
              </div>
            </div>
            <div class="order-address">
              <div class="delivery-title">Delivery to</div>
              <div class="user-address">
                Apt 3, Floor 2, Building 3, Block A, Street Salama, Kuwait
                City Kuwait
              </div>
            </div>
          </div>
        </div>
        <div class="order-bottom">
          <div class="order-bottom-left">
            <div class="order-quantity">Quantity: <span class="dec-btn qty-btn">-</span><span id="qty">1</span><span
                class="inc-btn qty-btn">+</span></div>
            <div class="order-size">
              <div>Size:</div>
              <div class="size active">${cartDetailsItem.size}</div>
            </div>
            <div class="order-color">
              <div>Color Selected:</div>
              <div class="${cartDetailsItem.color}"></div>
            </div>
          </div>
          <div class="order-price">
            <div class="cloth-price">${cartDetailsItem.price}</div>
          </div>
        </div>
      </div>
    </div>`
      youOrder.insertAdjacentHTML('afterbegin', cart)
      const decList = document.querySelectorAll(".dec-btn");
      const incList = document.querySelectorAll(".inc-btn");
      if (incList) {
        for (let inc of incList) {
          inc.addEventListener("click", function () {
            inc.previousSibling.innerText =
              Number(inc.previousSibling.innerText) + 1;
          });
        }
        for (let dec of decList) {
          dec.addEventListener("click", function () {
            if (dec.nextSibling.innerText > 1) {
              dec.nextSibling.innerText -= 1;
            }
          });
        }
      }
    }
  })
}

const reviewBody = document.querySelector('.review-body')

if (reviewBody) {
  window.addEventListener('load', function () {
    let cartList = JSON.parse(this.localStorage.getItem('cartList'))
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
    </div>`
      reviewBody.insertAdjacentHTML('afterbegin', cart)
      const decList = document.querySelectorAll(".dec-btn");
      const incList = document.querySelectorAll(".inc-btn");
      if (incList) {
        for (let inc of incList) {
          inc.addEventListener("click", function () {
            inc.previousSibling.innerText =
              Number(inc.previousSibling.innerText) + 1;
          });
        }
        for (let dec of decList) {
          dec.addEventListener("click", function () {
            if (dec.nextSibling.innerText > 1) {
              dec.nextSibling.innerText -= 1;
            }
          });
        }
      }
    }
    const checkInfo = JSON.parse(this.localStorage.getItem('checkInfo'))
    reviewBody.querySelector('.user-name').innerText = checkInfo.userName
    reviewBody.querySelector('.user-address').innerText = checkInfo.userAddress
    const paymentInfo = this.document.querySelector('.payment-info')
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
        </div>`
      paymentInfo.insertAdjacentHTML('afterbegin', cardDetails)
    } else if (checkInfo.paymentType == 'delivery-cash') {
      this.document.querySelector('.delivery-cash').classList.remove('hidden')
    } else if (checkInfo.paymentType == 'knet') {
      this.document.querySelector('.knet').classList.remove('hidden')
    }
  })

}

const confirmationBodyBottom = document.querySelector('.confirmation-body-bottom')

if (confirmationBodyBottom) {
  window.addEventListener('load', function () {
    let cartList = JSON.parse(this.localStorage.getItem('cartList'))
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
    </div>`
      confirmationBodyBottom.insertAdjacentHTML('afterbegin', cart)
      const decList = document.querySelectorAll(".dec-btn");
      const incList = document.querySelectorAll(".inc-btn");
      if (incList) {
        for (let inc of incList) {
          inc.addEventListener("click", function () {
            inc.previousSibling.innerText =
              Number(inc.previousSibling.innerText) + 1;
          });
        }
        for (let dec of decList) {
          dec.addEventListener("click", function () {
            if (dec.nextSibling.innerText > 1) {
              dec.nextSibling.innerText -= 1;
            }
          });
        }
      }
    }
    const checkInfo = JSON.parse(this.localStorage.getItem('checkInfo'))
    this.document.querySelector('.user-name').innerText = checkInfo.userName
    this.document.querySelector('.user-address').innerText = checkInfo.userAddress
  })

}
// *---------------------------------------calc summary
const summary = document.querySelector('.summary')

if (summary) {
  totalPrice = localStorage.getItem('totalPrice')
  if (totalPrice) {
    summary.querySelector('.subtotal-price').innerText = `${totalPrice} KD`
  } else {
    summary.querySelector('.subtotal-price').innerText = `0 KD`
  }
}

// *------------------------------------------------qty func

const decList = document.querySelectorAll(".dec-btn");
const incList = document.querySelectorAll(".inc-btn");
if (incList) {
  for (let inc of incList) {
    inc.addEventListener("click", function () {
      inc.previousSibling.innerText =
        Number(inc.previousSibling.innerText) + 1;
    });
  }
  for (let dec of decList) {
    dec.addEventListener("click", function () {
      if (dec.nextSibling.innerText > 1) {
        dec.nextSibling.innerText -= 1;
      }
    });
  }
}
function addChosenProduct() {
  const chooseDress = document.querySelector(".choose-dress");
  let chosenDressBox = document.querySelector(".chosen-product");
  let chosenDress;

  if (chooseDress) {
    chosenDress = chooseDress.querySelector(".active").outerHTML;
    chosenDressBox.innerHTML = chosenDress;
    chosenDressBox.querySelector(".active").classList.remove("dress");
  }
}
addChosenProduct();

// * ----------------------------- dropdowns

menuBtn.addEventListener("click", function (e) {
  headerModal.classList.add("active-menu");
});
modalClose.addEventListener("click", function (e) {
  headerModal.classList.remove("active-menu");
  dropdown.classList.remove("active-dropdown");
});

if (goFilter) {
  goFilter.addEventListener("click", function () {
    modalFilter.classList.add("active-filter");
  });
  closeFilter.addEventListener("click", function (params) {
    modalFilter.classList.remove("active-filter");
  });
}

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

if (dropdown) {
  dropdown.addEventListener("click", function () {
    dropdown.classList.toggle("active-dropdown");
  });
}
// * -----------------------------item select func

const checkboxes = document.querySelectorAll(".check-box");

for (let checkbox of checkboxes) {
  checkbox.addEventListener("click", function (e) {
    if (e.target.classList.contains("check-item")) {
      if (checkbox.querySelector(".active")) {
        checkbox.querySelector(".active").classList.remove("active");
      }
      e.target.classList.add("active");
    } else if (e.target.closest(".check-item")) {
      if (checkbox.querySelector(".active")) {
        checkbox.querySelector(".active").classList.remove("active");
      }
      e.target.closest(".check-item").classList.add("active");
    }
    addChosenProduct();
  });
}

// *---------------------------------------- current year

let year = document.querySelector(".year");

if (year) {
  year.innerHTML = new Date().getFullYear();
}


// *------------------------------ user info 

const myAccMain = document.querySelector('.my__account-main')
const addNewAddress = document.querySelector('.add__address-body')

if (myAccMain) {
  window.addEventListener('load', function () {
    userInfo = JSON.parse(this.localStorage.getItem('pseudoUserInfo'));
    if (userInfo.addresses) {

      if (userInfo.addresses.length > 0) {
        userInfo.addresses.forEach((addressDetails, index) => {
          let address;
          if (addressDetails[10]) {
            address = `<div class="box-for-shadow">
        <div class="user-info-item">
            <div class="info-item">
                <div class="user-name ml-6">${addressDetails[0]} ${addressDetails[1]} (Default)</div>
    
            </div>
            <div class="user-address">
                Apt ${addressDetails[8]}, Floor ${addressDetails[7]}, Building ${addressDetails[6]}, Block ${addressDetails[5]}, Street ${addressDetails[4]}, ${addressDetails[3]} City, ${addressDetails[2]}
            </div>
            <div class="address-bottom">
                <button class="make-default btn btn-black">Make Default</button>
                <button class="delete-address btn btn-white"><img class="${index}" src="./img/icons/close.svg"
                        alt=""></button>
            </div>
        </div>
        </div>`
          } else {
            address = `<div class="box-for-shadow">
        <div class="user-info-item">
            <div class="info-item">
                <div class="user-name ml-6">${addressDetails[0]} ${addressDetails[1]}</div>
    
            </div>
            <div class="user-address">
                Apt ${addressDetails[8]}, Floor ${addressDetails[7]}, Building ${addressDetails[6]}, Block ${addressDetails[5]}, Street ${addressDetails[4]}, ${addressDetails[3]} City, ${addressDetails[2]}
            </div>
            <div class="address-bottom">
                <button class="make-default btn btn-black">Make Default</button>
                <button class="delete-address btn btn-white"><img class="${index}" src="./img/icons/close.svg"
                        alt=""></button>
            </div>
        </div>
        </div>`
          }

          myAccMain.querySelector('.address-box').insertAdjacentHTML('beforeend', address)
        })
      }
      else {
        myAccMain.querySelector('.address-box').insertAdjacentHTML('beforeend', "<div>You don't have addresses yet</div>")
      }
    } else {
      myAccMain.querySelector('.address-box').insertAdjacentHTML('beforeend', "<div>You don't have addresses yet</div>")
    }
    const elements = myAccMain.querySelectorAll('.delete-address');

    elements.forEach(element => element.addEventListener("click", event => {
      let userInfo = JSON.parse(this.localStorage.getItem('pseudoUserInfo'))
      let deleteIndex = Number(element.querySelector('img').className)
      userInfo.addresses.splice(deleteIndex, 1)
      this.localStorage.setItem('pseudoUserInfo', JSON.stringify(userInfo))
      this.location.reload()
    }));

    const makeDefaultBtns = myAccMain.querySelectorAll('.make-default');

    makeDefaultBtns.forEach(element => element.addEventListener("click", event => {
      let userInfo = JSON.parse(this.localStorage.getItem('pseudoUserInfo'))

      let index = Number(element.closest('.user-info-item').querySelector('img').className)

      let a = userInfo.addresses[index];
      userInfo.addresses[0][10] = false
      a[10] = true
      userInfo.addresses[index] = userInfo.addresses[0];
      userInfo.addresses[0] = a;

      this.localStorage.setItem('pseudoUserInfo', JSON.stringify(userInfo))
      this.location.reload()
    }));
  })
}

if (myAccMain || addNewAddress) {
  document.querySelector('.save-address').addEventListener('click', function () {
    let addressDetails = []
    for (let input of document.querySelectorAll('.block-white')) {
      addressDetails.push(input.value)
    }
    userInfo = JSON.parse(localStorage.getItem('pseudoUserInfo'))

    if (userInfo && userInfo.addresses) {
      userInfo.addresses.push(addressDetails)
      localStorage.setItem('pseudoUserInfo', JSON.stringify(userInfo))

    }
    else {
      let allAddresses = []
      allAddresses.push(addressDetails)
      pseudoUserInfo.addresses = allAddresses
      localStorage.setItem('pseudoUserInfo', JSON.stringify(pseudoUserInfo))
    }
  })
}
// * --------------------------------for profile-overview page--------------------------------------------

const userInfoBlock = document.querySelector('.my__profile-body')
if (userInfoBlock) {
  window.addEventListener('load', function () {
    let userInfo = JSON.parse(this.localStorage.getItem('pseudoUserInfo'))
    userInfoBlock.querySelector('.user-name').innerText = `${userInfo.firstName} ${userInfo.lastName}`
    userInfoBlock.querySelector('.user-email').innerText = `${userInfo.userEmail}`
    userInfoBlock.querySelector('.password').innerText = `${userInfo.accountPassword}`
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
        </div>`
          userInfoBlock.querySelector('.address-title').insertAdjacentHTML('afterend', address)
          return
        } else {

          userInfoBlock.querySelector('.address-title').insertAdjacentHTML('afterend', "<div><span>you have not selected a default address</span><a href='./address-book.html' class='edit ml-6'>Choose</div>")
        }
        return
      }
    } else {

      userInfoBlock.querySelector('.address-title').insertAdjacentHTML('afterend', "<div><span>You don't have addresses yet</span><a href='./address-book.html' class='edit ml-6'>Add</div>")
    }
  })
}

// * ---------------------------for checkout page-------------------------------------

const checkoutAddressList = document.querySelector('.checkout-address-list')

if (checkoutAddressList) {
  window.addEventListener('load', function (params) {
    let userInfo = JSON.parse(localStorage.getItem('pseudoUserInfo'))
    if (userInfo.addresses && userInfo.addresses.length > 0) {
      userInfo.addresses.forEach((element, index) => {
        if (element[10]) {
          let address = `<div class="checkout-list-item check-item active">
        <div class="address-info">
          <div class="item-number">${index + 1}</div>
    
          <div>
            <div class="user-name">${element[0]} ${element[1]} (Default)</div>
            <div class="user-address">
              Apt ${element[8]}, Floor ${element[7]}, Building ${element[6]}, Block ${element[5]}, Street ${element[4]}, ${element[3]}
              City ${element[2]}
            </div>
          </div>
        </div>
        <div class="address-check"><img src="./img/icons/check.svg" class="address-check-img" alt=""></div>
      </div>`
          checkoutAddressList.insertAdjacentHTML('afterbegin', address)
        } else {
          let address = `<div class="checkout-list-item check-item">
        <div class="address-info">
          <div class="item-number">${index + 1}</div>
    
          <div>
            <div class="user-name">${element[0]} ${element[1]}</div>
            <div class="user-address">
              Apt ${element[8]}, Floor ${element[7]}, Building ${element[6]}, Block ${element[5]}, Street ${element[4]}, ${element[3]}
              City ${element[2]}
            </div>
          </div>
        </div>
        <div class="address-check"><img src="./img/icons/check.svg" class="address-check-img" alt=""></div>
      </div>`
          checkoutAddressList.insertAdjacentHTML('beforeend', address)
        }
      });
    } else {
      checkoutAddressList.insertAdjacentHTML('beforeend', "<div>You don't have addresses yet</div>")
    }
  })
}


// * collect checkout info

if (checkoutAddressList) {
  document.querySelector('.select-address').addEventListener('click', function () {
    const chosenAddressBlock = checkoutAddressList.querySelector('.active').closest('.checkout-list-item')
    const checkInfo = {}

    checkInfo.userName = chosenAddressBlock.querySelector('.user-name').innerText
    checkInfo.userAddress = chosenAddressBlock.querySelector('.user-address').innerText
    localStorage.setItem('checkInfo', JSON.stringify(checkInfo))
  })
}

const paymentList = document.querySelector('.choose-payment')

if (paymentList) {
  const checkInfo = JSON.parse(localStorage.getItem('checkInfo'))
  for (let checkItem of paymentList.querySelectorAll('.check-item')) {
    checkItem.addEventListener('click', function () {
      if (checkItem.classList.contains('debit-credit__cards')) {
        document.querySelector('.cart__details-form').classList.remove('hidden')
        checkInfo.paymentType = 'debit-cc'
      } else if (checkItem.classList.contains('cash-on-delivery')) {
        document.querySelector('.cart__details-form').classList.add('hidden')
        checkInfo.paymentType = 'delivery-cash'
      } else if (checkItem.classList.contains('pay-by-knet')) {
        document.querySelector('.cart__details-form').classList.add('hidden')
        checkInfo.paymentType = 'knet'
      }
    })
  }
  document.querySelector('.select-payment').addEventListener('click', function () {
    if (checkInfo.paymentType == 'debit-cc') {
      checkInfo.cardData = []
      for (let input of document.querySelector('.cart__details-form').querySelectorAll('.block-white')) {
        checkInfo.cardData.push(input.value)
      }

    }
    localStorage.setItem('checkInfo', JSON.stringify(checkInfo))

  })
}

// const cartDropdownBtn = document.querySelector('.cart-dropdown-btn')

// function toggleDropdown(selectbtn, openElement) {

//   $('body').on('click', selectbtn, function (e) {
//     e.preventDefault();

//     var $this = $(this),
//       wrapp = $this.parents('body'),
//       wrapMask = $('<div / >').addClass('closeMask'),
//       cartDropdown = $(openElement);

//     if (!(cartDropdown).hasClass('open')) {
//       wrapp.addClass('open');
//       cartDropdown.addClass('open');
//       cartDropdown.parent().append(wrapMask);
//       wrapp.css({
//         'overflow': 'hidden'

//       });

//     } else {
//       removeSideMenu();
//     }

//     function removeSideMenu() {
//       wrapp.removeAttr('style');
//       wrapp.removeClass('open').find('.closeMask').remove();
//       cartDropdown.removeClass('open');
//     }

//     $('.sidebar-close, .closeMask').on('click', function () {
//       removeSideMenu();
//     });

//   });
// }

// cartDropdownBtn.addEventListener('click', () => {
//   toggleDropdown(cartDropdownBtn, document.querySelector('#cart-dropdown'))
// })

