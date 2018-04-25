$(document).ready(function(){
    $('.del').click(function(){
        var _ = $(this).parent().parent();
        var total = _.find("#total").text().slice(1);
        var subTotal = $('#subtotal').text().slice(1);
        _.fadeOut(300,function(){
            _.remove();
        });
        $('#subtotal').text('$' + (subTotal - total));
    });
    $('.qtyPro').on('change paste keyup',function(){
        var _ = $(this);
        var val = _.val();
        var parent = _.parents().eq(3);
        var price = parent.find('#price').text().slice(1);
        if(!Number.isInteger(parseInt(val)) || val < 1){
            _.val(1);
        }
		parent.find("#total").text('$' + (val * price))
		var subTotal = 0;
        $('.cart_item_total .total').each(function () {
            subTotal += parseInt($(this).text().slice(1));
		});
        $('#subtotal').text('$' + subTotal);
        return false;
    })
});