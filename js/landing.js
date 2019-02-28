let baseURL = 'http://localhost:3000/';
let adminResponse = [];

$(document).ready(() => {
    
    $('.message a').click(function () {
        $('form').animate({
            height: "toggle",
            opacity: "toggle"
        }, "slow");
    });


    //Admin Login
    $('#loginButton').on('click', () => {

        //login fields
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
                success: res => {
                    if (res.username === $username && res.username === $password) {
                        window.location = 'index.html';

                    } else {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 4000
                        });

                        Toast.fire({
                            type: "error",
                            title: "Incorrect Login Details"
                        });
                    }
                    $("form :input").val("");
                }
            });
        }
    })


    //Change Password
    $('#changePasswordButton').on('click', () => {

        

        console.log(adminResponse);


        //changepassword fields
        let $currentPassword = $('#currentPassword').val()
        let $newPassword = $('#newPassword').val()
        let $confirmPassword = $('#confirmPassword').val()



    })





})