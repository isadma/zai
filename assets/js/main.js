const menuBtn = document.querySelector("#hamburger-menu");
const headerModal = document.querySelector("#header-modal");
const modalClose = document.querySelector("#modal-close");
const goFilter = document.querySelector("#go-filter");
const modalFilter = document.querySelector("#modal-filter");
const closeFilter = document.querySelector("#close-filter");
const dropdown = document.querySelector(".my-profile-dropdown");
const addToCartBtn = document.querySelector("#add-to-cart");
let wishlist = [];
const categories = document.querySelector(".categories-body");
const categoriesAsideItems = document.querySelectorAll(
    ".categories-aside-item-dropdown"
);


function setCardQuantity(){
    let cart = getCartItems();
    let total = 0;
    cart.forEach(function (item){
        total += parseInt(item.quantity);
    });
    for (let dot of document.querySelectorAll('.red-dot')) {
        dot.querySelector('span').innerText = total;
    }
}

function getCartItems(){
    let cart = Cookies.get("cart");
    if (cart){
        cart = JSON.parse(cart);
    }else{
        cart = [];
    }
    return cart;
}


function getWishlistItems(){
    let items = Cookies.get("wishlist");
    if (items && items.length > 0){
        items = items.split(",");
    }
    else{
        items = [];
    }
    return items;
}

function addItemToCard(){
    let cart = getCartItems();
    const product_id = $("#product_id").val();
    const variant_id = $("#variant_id").val();

    let newItem = true;
    cart.forEach(function (item, index){
         if (parseInt(item.product_id) === parseInt(product_id) && parseInt(item.variant_id) === parseInt(variant_id)){
             cart[index].quantity = cart[index].quantity + 1;
             newItem = false;
         }
    });
    if (newItem){
        cart.push({
            "product_id": product_id,
            "variant_id": variant_id,
            "quantity": 1
        });
    }

    Cookies.set("cart", JSON.stringify(cart));

    addToCartBtn.innerText = "Added to Cart";
    setCardQuantity();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Product added to Cart',
        showConfirmButton: false,
        timer: 1500
    });
}

function addItemToWishlist(product_id){
    let items = getWishlistItems();
    if (!items.includes(product_id)){
        items.push(product_id);
    }
    Cookies.set("wishlist", items.join());

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Product added to Wishlist',
        showConfirmButton: false,
        timer: 1500
    })
    document.querySelector('#add-to-wishlist').innerText = "Added to Wishlist";
}

if (addToCartBtn){
    addToCartBtn.addEventListener("click", function () {
        addItemToCard();
    });
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
            expirationDate: '02/28'
        }
    ],
}
if (localStorage.getItem('pseudoUserInfo')) {

} else {
    localStorage.setItem('pseudoUserInfo', JSON.stringify(pseudoUserInfo))
}

// * ------------------------------------------write cartQty------------------------------------------

window.addEventListener('load', function (params) {
    if (this.localStorage.getItem('cartQty')) {
        for (let dot of document.querySelectorAll('.red-dot')) {
            dot.querySelector('span').innerText = this.localStorage.getItem('cartQty')
        }
    }
})
// *---------------------------- dropdown for categories page filter

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

// * checking if item was added to wishlist
window.addEventListener('load', function name(params) {
    let items = getWishlistItems();
    const product_id = $("#product_id").val();
    if (items.includes(product_id)){
        this.document.querySelector('#add-to-wishlist').innerText = 'Added to Wishlist';
    }
});

document.querySelector('#add-to-wishlist')?.addEventListener('click', function (event) {
    const product_id = event?.target?.dataset?.id;
    if (product_id){
        addItemToWishlist(product_id);
    }
});


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

// * add chosen products img to page in product details page
function addChosenProductImg() {
    const chooseDress = document.querySelector(".choose-dress");
    let chosenDressBox = document.querySelector(".chosen-product");
    let chosenDress;

    if (chooseDress) {
        chosenDress = chooseDress.querySelector(".active").outerHTML;
        chosenDressBox.innerHTML = chosenDress;
        chosenDressBox.querySelector(".active").classList.remove("dress");
    }
}
addChosenProductImg();

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
            const id = e?.target?.dataset?.id;
            const variantId = $("#variant_id");
            if (variantId){
                variantId.val(id);
            }
            const selected_address_id = $("#selected_address_id");
            if (selected_address_id){
                selected_address_id.val(id);
            }
            e.target.classList.add("active");
        } else if (e.target.closest(".check-item")) {
            if (checkbox.querySelector(".active")) {
                checkbox.querySelector(".active").classList.remove("active");
            }
            const id = e?.target?.dataset?.id;
            const variantId = $("#variant_id");
            if (variantId){
                variantId.val(id);
            }
            const selected_address_id = $("#selected_address_id");
            if (selected_address_id){
                selected_address_id.val(id);
            }
            e.target.closest(".check-item").classList.add("active");
        }
        addChosenProductImg();
    });
}

// *---------------------------------------- current year

let year = document.querySelector(".year");

if (year) {
    year.innerHTML = new Date().getFullYear();
}

$(document).ready(function() {
    setCardQuantity();
});

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
