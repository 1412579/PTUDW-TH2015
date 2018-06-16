function addCart(e,_proId){
    e.preventDefault();

    let Quantity = $('#quantity_input').val();
    let url = "/addCart";
    $.ajax({
        url: url,
        type: 'POST',
        cache: false,
        data: { quantity: Quantity, proId: _proId},
        success: function (data) {
            // console.log(data);
            // if (data.status == 0) {
            //     alert(data.msg);
            // }
            // else if(data.status == 1){
            //     location.reload(false);
            // }
        }
    });
}