$(document).ready(() => {
    
    
    let $tbody = $('#tbody'); //target html table

    //fetch all users from db
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/employees',
        success: (res) => {
            console.log(res);

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
               <td><span><button class="btn btn-secondary"><i class="fas fa-eye"></i></button> <button class="btn btn-primary"><i class="fas fa-pencil-alt"></i></button> <button class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></span></td>
            </tr>
             `

            })
            $tbody.append(response);
            $('#example').DataTable();
        },
        error: ()=>{
            alert('there was an error');
        }
    })


    







    $('#form').submit((e) => {
        e.preventDefault();

    })



});