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

function checkout(e){

    var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        // form.addEventListener('submit', function(event) {
          
        // }, false);
      });
    console.log("da vao check out");
    
    e.preventDefault();

    var fullName = $('#firstName').val() +" " + $('#lastName').val();
    var email = $('#email').val();
    var address =$('#address').val();
    // var dataUser = {
    //     fullName: fullName,
    //     email: email,
    //     address: address,
    //     phone: "012345689",
    // }
    var dataUser = {
        fullName: 'fullName',
        email: 'email@gmail.com',
        address: 'address',
        phone: "012345689",
    }
    let isLogIn = getCookie('isLogIn');
    console.log(isLogIn)
    if(isLogIn === ''){
        return
    }

    let productsAddToCart =[];
        productsAddToCart = JSON.parse(getCookie('cart'));
    
    var url = "/checkout/payment";
    $.ajax({
        url: url,
        type: 'POST',
        cache: false,
        data: { dataUser: dataUser, dataCart: productsAddToCart },
        success: function (data) {
            console.log(data);
            if (data.status == 0) {
                alert(data.msg);
            }
            else if(data.status == 1){
                // location.reload(false);
            }
        }
    });
}

function startSelect2(){
    $('select').select2();
    // res.cookie('isLogIn', 'true');
    
  }