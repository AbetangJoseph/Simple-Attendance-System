let BaseURL = 'http://127.0.0.1:3000/'
let $tbody = $('#tbody');

let list = [];

//fetch all users from db
let FetchAllEmployees = () => {
    $.ajax({
        type: 'GET',
        url: `${BaseURL}employees`,
        success: (res) => {
            let response = '';
            $.each(res, (i, employees) => {
                list = res;
                response += ` 
            <tr>
               <td>${employees.firstname}</td>
               <td>${employees.lastname}</td>
               <td>${employees.position}</td>
               <td>${employees.gender}</td>
               <td>${employees.phone}</td>
               <td><span><div class="custom-control custom-checkbox">
                   <input type="checkbox" class="custom-control-input" id="${employees.id}" value="">
                   <label class="custom-control-label" for="${employees.id}">attended</label>
                 </div></span></td>
               <td><span><button class="btn btn-secondary" onclick=getUser(${employees.id}) data-toggle="modal" data-target="#employeeDetials"><i class="fas fa-eye"></i></button> <button class="btn btn-primary"><i class="fas fa-pencil-alt"></i></button> <button onclick ="removeEmployee(${employees.id})" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></span></td>
            </tr>
             `

            })
            $tbody.html(response);
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
}

//end fetch all

const getUser = (id) => {
    const user = list.find(element => element.id === id);
    console.log(user);
    $("#user").html(
        `<div>
        <span><p>First Name : ${user.firstname}</p><p>Last Name : ${user.firstname}</p></span>
            
        </div>`
    )
}


let removeEmployee = (emp_id)=>{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((remove) => {
        if (remove.value) {

            $.ajax({
                type: 'DELETE',
                url: `${BaseURL}employees/${emp_id}`,
                success: () => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000
                    });
                    FetchAllEmployees();
    
                    Toast.fire({
                        type: 'success',
                        title: 'employee record deleted'
                    })
                    
                },
                error: () => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000
                    });
                    FetchAllEmployees();
    
                    Toast.fire({
                        type: 'error',
                        title: 'record could not be deleted'
                    })
                }
            })

        }
      })
}
$(document).ready(() => {

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
                   
                    // let response = '';
                    // response += ` 
                    // <tr>
                    //    <td>${employees.firstname}</td>
                    //    <td>${employees.lastname}</td>
                    //    <td>${employees.position}</td>
                    //    <td>${employees.gender}</td>
                    //    <td>${employees.phone}</td>
                    //    <td><span><div class="custom-control custom-checkbox">
                    //        <input type="checkbox" class="custom-control-input" id="${employees.id}">
                    //        <label class="custom-control-label" for="${employees.id}">attended</label>
                    //      </div></span></td>
                    //    <td><span><button class="btn btn-secondary" data-toggle="modal" data-target="#employeeDetials"><i class="fas fa-eye"></i></button> <button class="btn btn-primary"><i class="fas fa-pencil-alt"></i></button> <button onclick = "removeEmployee(${employees.id})" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></span></td>
                    // </tr>
                    //  `

                    // $tbody.append(response);
                    
                    FetchAllEmployees();
                     

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













});