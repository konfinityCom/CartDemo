window.onload = function(){
    loadEventHandlers();
}

function loadEventHandlers(){
    var itemImages = document.getElementsByClassName('item_image');
    var cart = document.getElementById('cart');
    var cartList = document.getElementById('cart_list');
    var listItems = document.getElementsByClassName('listing_item');
    
    var count = 0;

    console.log(itemImages);
    console.log(cart);
    for(let i=0; i<itemImages.length; i++){
        itemImages[i].addEventListener('dragstart', function(ev){
            ev.dataTransfer.effectAllowed = 'copy';
            ev.dataTransfer.setData('id', this.getAttribute('id'));
        },false);
    }

    cart.addEventListener('dragover', function(ev){
        if(ev.preventDefault){
            ev.preventDefault();
        }
        ev.dataTransfer.dropEffect = 'copy';
        return false;
    }, false);

    cart.addEventListener('drop', function(ev){
        if(ev.preventDefault){
            ev.preventDefault();
        }
        if(ev.stopPropagation){
            ev.stopPropagation();
        }

        var id = ev.dataTransfer.getData('id');
        var item = document.getElementById(id);
        fillDropDataToCart(id, item, cartList, listItems, ++count);
        ev.stopPropagation();
        return false;
    }, false);
}

function fillDropDataToCart(id, item, cartList, listItems, count){

    var position = item.getAttribute('position');
    var nameElement = listItems[position].getElementsByClassName('name_container')[0];
    var productName = nameElement.innerHTML;
    console.log('product name ' + productName);
    var html = "<div class='cart_item_container'><div class='cart_item_img_container'>"+
                                "<img src='"+ item.getAttribute('src') + "' alt='product cart image' class='cart_image'></div>"+
                            "<div class='cart_item_content_container'>"+
                                "<div class='product_name'>"+ productName  +"</div>"+
                                "<div class='product_price'>Rs " + item.getAttribute('item-price') + "</div></div></div>";
    var liItem = document.createElement('li');
    liItem.innerHTML = html;
    cartList.appendChild(liItem);

    var footerMsg = document.getElementById('footer_msg');
    var totalPrice = document.getElementById('total_price');

    footerMsg.innerHTML = 'TOTAL (' + count + ' )';

    var totalPriceNumber = parseInt(totalPrice.innerHTML) + parseInt(item.getAttribute('item-price'));
    totalPrice.innerHTML = totalPriceNumber; 
}

