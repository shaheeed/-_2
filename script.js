/*  Filter Section الى بختار منه العناصر */

const filterItems = document.querySelectorAll('.filter-item');
const filterBtns = document.querySelectorAll('.filter-btn');

// الفانكشن الى بتلوب على كل الفانكشنز الى متعرفه تحت

function onload(){
    var removeCartItemButton = document.getElementsByClassName('btn-danger');
    for (var i = 0 ; i < removeCartItemButton.length; i++){
        var button = removeCartItemButton[i];
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0 ;i < quantityInputs.length ; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    
    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for(var i = 0; i< addToCartButtons.length; i++){
        var button = addToCartButtons[i];
        button.addEventListener('click',addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
 }
    onload();

    // زرار ال purchase
 function purchaseClicked(){
     alert('Thank you for your purchase!!!');
     var cartItems = document.getElementsByClassName('cart-items')[0];
     while(cartItems.hasChildNodes()){
         cartItems.removeChild(cartItems.firstChild)
     }
     updateCartTotal();
 }
// زرار ال remove

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
    
}
// لما بزود عدد من نفس العنصر

function  quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0 ){
        input.value = 1;
    }
    updateCartTotal();
}

    //بيبني مكان للعنصر فى الكارت و بيضيف العنصر فى الكارت 

function addToCartClicked(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title,price,imageSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('tr');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemTitles = cartItems.getElementsByClassName('cart-item-title');

    for (i = 0; i< cartItemTitles.length ; i++){
        if(cartItemTitles[i].innerText == title){
            alert('This item already has added to the cart!');
            return
        }
    }

    // بيبنى المكان
    
    var cartContent = `

        <td class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="50" height="50">
            <span class="cart-item-title">${title}</span>                  
        </td>
        <td class="cart-item cart-column">
            <span class="cart-price cart-column">${price}</span>
        </td>
        <td class="cart-item cart-column">
            <input class="cart-quantity-input" type="number" value="1" style="width: 50px">
            <button class="btn btn-danger" type="button">Remove</button>
        </td>        
    `;
    
    cartRow.innerHTML = cartContent;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}
// فانكشن عشان يعدل السعر فى كل مره

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0 ; i< cartRows.length ; i++){
        var cartRow =cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('LE' , ''))
        var quantity = quantityElement.value;
        total = total + (price * quantity);
         
    }

    // يكتب السعر فى خانة التوتال
    
    document.getElementsByClassName('cart-total-price')[0].innerText = 'LE '+ total + '.00';
 
}