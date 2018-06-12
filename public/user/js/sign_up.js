function UserSignUp(e){
    e.preventDefault();
    let email = $('#inputEmailSU').val();
    let passWord = $('#inputPasswordSU').val();
    let userName = $('#inputName').val();
    let isGenderMale = $('#gender-male-checkbox').prop('checked');
    let dob = $('#inputDOB').val();
    let address = $('#inputAddressSU').val();
    let province = $('#inputProvince').val();

    console.log(userName);
    var url = "/sign-up";
    $.ajax({
        url: url,
        type: 'POST',
        cache: false,
        data: { email: email, password: passWord },
        success: function (data) {
            if (data.status == 0) {
                alert(data.msg);
            }
            else if(data.status == 1){
                location.reload(false);
            }
        }
    });
}