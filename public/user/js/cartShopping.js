
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

function addCart(e,_proId){
    e.preventDefault();

    let Quantity = $('#quantity_input').val();
    
    let item = {
        ProId: _proId,
        Quantity: Quantity
    }
   
    let productsAddToCart =[];
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
}

function checkout(){
    
    var url = "/checkout/payment";
    $.ajax({
        url: url,
        type: 'POST',
        cache: false,
        data: { email: userName, password: passWord },
        success: function (data) {
            console.log(data);
            if (data.status == 0) {
                alert(data.msg);
            }
            else if(data.status == 1){
                location.reload(false);
            }
        }
    });
}