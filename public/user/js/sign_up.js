function UserSignUp(e){
    // var forms = document.getElementsByClassName('needs-validation');
    // //   Loop over them and prevent submission
    //   var validation = Array.prototype.filter.call(forms, function(form) {
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //       }
    //       form.classList.add('was-validated');
    //       return;
    //   });
    e.preventDefault();
    let email = $('#inputEmailSU').val();
    let passWord = $('#inputPasswordSU').val();
    let userName = $('#inputName').val();
    if(!email || !passWord || !userName){
        alert("Vui lòng nhập đủ họ tên, emai, password!")
        return false;
    }
    
    let isGenderMale = $('#gender-male-checkbox').prop('checked');
    let dob = $('#inputDOB').val();
    let address = $('#inputAddressSU').val();
    let province = $('#inputProvince').val();
    let sexual;
    (isGenderMale) ? sexual = 'male' : sexual ='female';
    const captcha = $('#g-recaptcha-response').val();

    console.log(captcha);    
    var url = "/sign-up";
    $.ajax({
        url: url,
        type: 'POST',
        cache: false,
        data: { email: email, password: passWord, fullname: userName, address: address, birth: dob, sexual: sexual, province: province,captcha: captcha  },
        success: function (data) {
            if (data.status === 0 || data.status === 3 || data.status === 4) {
                alert(data.msg);
            }
            else if(data.status == 1){
                location.reload(false);
            }
        }
    });
}