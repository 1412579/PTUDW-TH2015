
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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function addCart(e,_proId){
    e.preventDefault();

    let Quantity = $('#quantity_input').val();
    // let url = "/addCart";
    // $.ajax({
    //     url: url,
    //     type: 'POST',
    //     cache: false,
    //     data: { quantity: Quantity, proId: _proId},
    //     success: function (data) {
    //         // console.log(data);
    //         // if (data.status == 0) {
    //         //     alert(data.msg);
    //         // }
    //         // else if(data.status == 1){
    //         //     location.reload(false);
    //         // }
    //     }
    // });

    let item = {
        ProId: _proId,
        Quantity: Quantity
    }
   
    let productsAddToCart =[];
    if(getCookie("cart")===""){
        productsAddToCart.push(item);
        document.cookie = "cart = " +  JSON.stringify(productsAddToCart) +  "; path=/cart";
    }
    else{
        productsAddToCart = JSON.parse(getCookie("cart"));
        for(let i = 0; i < productsAddToCart.length; i++){
            if(productsAddToCart[i].ProId === item.ProId){
                productsAddToCart[i].Quantity = (parseInt(productsAddToCart[i].Quantity) + parseInt(item.Quantity)).toString();
            }
        }
        productsAddToCart.push(item);
        // document.cookie = "cart = ; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie = "cart = " +  JSON.stringify(productsAddToCart) + "; path=/cart";
    }
}