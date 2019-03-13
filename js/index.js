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
    $('#loginButton').on('click', (e) => {
        e.preventDefault();
        
        //login fields
        let $username = $('#username').val().trim();
        let $password = $('#password').val();

        if ($username == '' || $password == '') {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 4000
            });

            Toast.fire({
                type: "info",
                title: "Please fill all feilds"
            });
           

        } else {
            let payload = {
                username: $username,
                password: $password
            }
            
            $.ajax({
                type: "GET",
                url: `${baseURL}adminCredentials`,
                data: payload,
                success: (res) => {
                    if (res.username === $username && res.username === $password) {
                        /*if login credentials match with those in db.json, save 
                        login credentials as a json object with the name 'admin' to localstorage */
                        
                        localStorage.setItem('admin', JSON.stringify(payload));
                        location.replace('dashboard.html');

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
                },
                error: ()=>{
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 4000
                    });

                    Toast.fire({
                        type: "error",
                        title: "json server is down"
                    });

                }
            });
        }
    })


    //Change Password
    $('#changePasswordButton').on('click', () => {
        //changepassword fields
        let $currentPassword = $('#currentPassword').val()
        let $newPassword = $('#newPassword').val()
        let $confirmPassword = $('#confirmPassword').val()
    })
})