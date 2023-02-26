//Cart

let cartIcon = document.querySelector("#cart-icon");

let myCart = document.querySelector(".my-cart");

let closeCart = document.querySelector("#close-cart");

let form=document.getElementById("form")



//Open Cart

cartIcon.onclick = () => {
    myCart.classList.add('cart-active');
};

//Close Cart

closeCart.onclick = () =>{
    myCart.classList.remove("cart-active");
};



//Making function

    //Remove Items from Cart
    let removeCartButtons = document.getElementsByClassName("cart-remove");
    // console.log(removeCartButtons);
    for(let i=0; i<removeCartButtons.length; i++){
        let button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    //Quantity Changes
    let quantityInputs = document.getElementsByClassName("cart-quantity");
    for(let i=0; i<quantityInputs.length; i++){
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //Add to cart
    let addCart = document.getElementsByClassName("cart");
    for(let i=0; i<addCart.length; i++){
        let button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    //buy button working
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
    

    //form
    function formopen(){
        alert("Form-Filled");
    }

//Buy Button
function buyButtonClicked(){
    alert("Your Order is Placed");
    let cartContent = document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

//Remove Items from cart
function removeCartItem(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}


//Quantity Changes
function quantityChanged(event){
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value=1;
    }
    updatetotal();
}

//Add to cart
function addCartClicked(event){
    let button = event.target;
    let featuredProducts = button.parentElement;
    let title = featuredProducts.getElementsByClassName("productTitle")[0].innerText;
    let price = featuredProducts.getElementsByClassName("productPrice")[0].innerText;
    let productImg = featuredProducts.getElementsByClassName("productImg")[0].src;
    // console.log(productImg);
    // console.log(price);
    // console.log(title);
    addProductToCart(title, price, productImg);
    updatetotal();
}
function addProductToCart(title, price, productImg){
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box')
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (let i=0; i<cartItemsNames.length; i++){
        if(cartItemsNames[i].innerHTML === title){
            alert('You have already added this item to cart');
            return
        }
    }
    let cartBoxContent = `<img src="${productImg}" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity"> 
                        </div>
                        <i class="fa-solid fa-trash cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}





//Update Total
function updatetotal(){
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;
    for(let i=0; i<cartBoxes.length; i++){
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName("cart-price")[0];
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        // let price = priceElement.innerText.replace("$", "");                     //price value in string form
        let price = parseInt(priceElement.innerText.replace("$", ""));              //price value in number form
        // console.log(price);
        let quantity = quantityElement.value;
        total = total + price * quantity;
    }

        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    
}


