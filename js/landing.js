let baseURL = 'http://localhost:3000/';

$(document).ready(() => {
    $('.message a').click(function () {
        $('form').animate({
            height: "toggle",
            opacity: "toggle"
        }, "slow");
    });


    //changepassword
    let $currentPassword = $('#currentPassword').val()
    let $newPassword = $('#newPassword').val()
    let $confirmPassword = $('#confirmPassword').val()


    //Admin Login
    $('#loginButton').on('click', () => {

        //login
        let $username = $('#username').val()
        let $password = $('#password').val()


        let payload = {
            username: $username,
            password: $password
        }

        if ($username.trim() == '' || $password.trim() == '') {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 4000
            });

            Toast.fire({
                type: "info",
                title: "please fill all fields!"
            });

        } else {
            $.ajax({
                type: "GET",
                url: `${baseURL}adminCredentials`,
                data: payload,
                success: function (res) {
                    console.log(res.username);
                    if (res.username === $username && res.username === $password) {
                        alert('correct')

                    }else{
                        alert("incorrect details")
                    }

                }
            });
        }
    })





})