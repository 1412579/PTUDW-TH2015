function UserSignUp(e){
    e.preventDefault();
    let email = $('#inputEmailSU').val();
    let passWord = $('#inputPasswordSU').val();
    let userName = $('#inputName').val();
    let isGenderMale = $('#gender-male-checkbox').prop('checked');
    let dob = $('#inputDOB').val();
    let address = $('#inputAddressSU').val();
    let province = $('#inputProvince').val();
    let sexual;
    (isGenderMale) ? sexual = 'male' : sexual ='female';

    // if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    //     return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
    //   }
    // let isCheckRecaptcha = $
    // // let secretKey ='';
    var url = "/sign-up";
    $.ajax({
        url: url,
        type: 'POST',
        cache: false,
        data: { email: email, password: passWord, fullname: userName, address: address, birth: dob, sexual: sexual, province: province  },
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