
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function addCart(_proId, price){

    let Quantity = $('#quantity_input').val();
    if(Quantity === undefined){
        Quantity = 1;
    }
    let item = {
        ProId: _proId,
        Quantity: Quantity
    }
    let productsAddToCart =[];
    let TotalProducts =0;
    if(getCookie("cart")===""){
        productsAddToCart.push(item);
        document.cookie = "cart = " +  JSON.stringify(productsAddToCart) +  "; path=/";
    }
    else{
        productsAddToCart = JSON.parse(getCookie("cart"));
        for(let i = 0; i < productsAddToCart.length; i++){
            if(productsAddToCart[i].ProId === item.ProId){
                productsAddToCart[i].Quantity = (parseInt(productsAddToCart[i].Quantity) + parseInt(item.Quantity)).toString();
                document.cookie = "cart = " +  JSON.stringify(productsAddToCart) + "; path=/";                 
                return
            }
        }
        productsAddToCart.push(item);
        document.cookie = "cart = " +  JSON.stringify(productsAddToCart) + "; path=/"; 
    }

    for(let i =0; i < productsAddToCart.length; i++){
        TotalProducts+=parseInt(productsAddToCart[i].Quantity);            
    }
    document.cookie = "QuantityProductInCart = " +  JSON.stringify(TotalProducts) + "; path=/"; 
    location.reload(true);
}

function removeProduct(ProId){
    let productsAddToCart =[];
    productsAddToCart = JSON.parse(getCookie("cart"));
    for (var i = productsAddToCart.length - 1; i >= 0; i--) {
        if (parseInt(ProId) === parseInt(productsAddToCart[i].ProId)) {
            productsAddToCart.splice(i, 1);
        }
    }
    
    document.cookie = 'cart = ' + JSON.stringify(productsAddToCart) +"; path=/";
    
    let TotalProducts =0;    
    for(let i =0; i < productsAddToCart.length; i++){
        TotalProducts+=parseInt(productsAddToCart[i].Quantity);            
    }
    document.cookie = "QuantityProductInCart = " +  JSON.stringify(TotalProducts) + "; path=/";     
    // $('.cart_counts').text(TotalProducts.toString());
    location.reload(true);
}

function update(ProId,price, SubTotal){
    console.log(SubTotal);
    
    $(":input").bind('keyup mouseup', function () {
        var Quantity = $(".qtyPro").val();
        if(Quantity === ""){
            
            var Quantity = $("#quantity_input").val();
        }
        let productsAddToCart =[];
        var Total = 0;
        productsAddToCart = JSON.parse(getCookie("cart"));
        for (var i = productsAddToCart.length - 1; i >= 0; i--) {
            if (parseInt(ProId) === parseInt(productsAddToCart[i].ProId)) {
                SubTotal = SubTotal - parseInt(productsAddToCart[i].Quantity)*price;
                productsAddToCart[i].Quantity = Quantity.toString();
                document.cookie = 'cart = ' + JSON.stringify(productsAddToCart) +"; path=/";
                Total = parseInt(Quantity)*price;
                SubTotal = SubTotal + parseInt(Quantity)*price
                // console.log(SubTotal);
                // $('#total').text(Total.toString());
                // $('#subtotal').text(SubTotal.toString());
                let TotalProducts =0;      
                for(let i =0; i < productsAddToCart.length; i++){
                    TotalProducts+=parseInt(productsAddToCart[i].Quantity);            
                }
                document.cookie = "QuantityProductInCart = " +  JSON.stringify(TotalProducts) + "; path=/"; 
                //location.reload(true);
                
                return
            }
        }
      })
      
    
}
