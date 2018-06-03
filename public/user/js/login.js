function UserLogin(e){
    e.preventDefault();
    var userName = $('#inputEmail').val();
    var passWord = $('#inputPassword').val();
    if(!userName || !passWord){
        alert('Vui lòng nhập username và password');
        return false;
    }
    var url = "/login";
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