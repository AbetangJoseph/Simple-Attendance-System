$(document).ready(() => {
    let BaseURL = 'http://127.0.0.1:3000/'

    let $tbody = $('#tbody'); //target html table

    //fetch all users from db
    let FetchAllEmployees = () => {
        $.ajax({
            type: 'GET',
            url: `${BaseURL}employees`,
            success: (res) => {
                // console.log(res);

                let response = '';
                $.each(res, (i, employees) => {
                    response += ` 
                <tr>
                   <td>${employees.firstname}</td>
                   <td>${employees.lastname}</td>
                   <td>${employees.position}</td>
                   <td>${employees.gender}</td>
                   <td>${employees.phone}</td>
                   <td><span><div class="custom-control custom-checkbox">
                       <input type="checkbox" class="custom-control-input" id="${employees.id}">
                       <label class="custom-control-label" for="${employees.id}">attended</label>
                     </div></span></td>
                   <td><span><button class="btn btn-secondary" data-toggle="modal" data-target="#employeeDetials"><i class="fas fa-eye"></i></button> <button class="btn btn-primary"><i class="fas fa-pencil-alt"></i></button> <button id="${employees.id}" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></span></td>
                </tr>
                 `

                })
                $tbody.append(response);
                $('#example').DataTable();


            },
            error: () => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000
                });

                Toast.fire({
                    type: 'error',
                    title: 'content could not be retrieved'
                })
            }
        })
        //end fetch all.
    }

    FetchAllEmployees();



    //post to db




    $('#saveButton').on('click', () => {
        $firstname = $('#firstname').val();
        $lastname = $('#lastname').val();
        $gender = $('#gender').val();
        $position = $('#position').val();
        $phone = $('#phone').val();

        let payload = {
            firstname: $firstname,
            lastname: $lastname,
            gender: $gender,
            position: $position,
            phone: $phone,
            attended: []
        };

        if ($firstname.trim() == '' || $lastname.trim() == '' || $position.trim() == '' || $gender == '' || $phone.trim() == '') {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000
            });

            Toast.fire({
                type: 'info',
                title: 'please fill all fields!'
            })
        } else {
            $.ajax({
                type: 'POST',
                url: `${BaseURL}employees`,
                data: payload,
                success: (employees) => {
                    console.log(employees);
                    let response = '';
                    response += ` 
                    <tr>
                       <td>${employees.firstname}</td>
                       <td>${employees.lastname}</td>
                       <td>${employees.position}</td>
                       <td>${employees.gender}</td>
                       <td>${employees.phone}</td>
                       <td><span><div class="custom-control custom-checkbox">
                           <input type="checkbox" class="custom-control-input" id="${employees.id}">
                           <label class="custom-control-label" for="${employees.id}">attended</label>
                         </div></span></td>
                       <td><span><button class="btn btn-secondary" data-toggle="modal" data-target="#employeeDetials"><i class="fas fa-eye"></i></button> <button class="btn btn-primary"><i class="fas fa-pencil-alt"></i></button> <button id="${employees.id}" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></span></td>
                    </tr>
                     `

                    $tbody.append(response);

                    $('#example').DataTable();

                    //alert if employee add successful
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000
                    });

                    Toast.fire({
                        type: 'success',
                        title: 'employee added successfully!'
                    })

                    $('form :input').val('');
                },
                error: () => {
                      //alert if employee add unsuccessful
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000
                    });

                    Toast.fire({
                        type: 'error',
                        title: 'employee could not be added!'
                    })
                }
            })
        }




    })











    $('#form').submit((e) => {
        e.preventDefault();

    })



});