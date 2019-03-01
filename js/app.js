let BaseURL = "http://127.0.0.1:3000/";
let $tbody = $("#tbody"); //the body of the table where all table values are appended

let ArrayOfEmployees = []; //an array to later collect employee data




//fetch all users from db
let FetchAllEmployees = () => {
  $.ajax({
    type: "GET",
    url: `${BaseURL}employees`,
    success: res => {
      let response = "";
      $.each(res, (i, employees) => {
        ArrayOfEmployees = res; //ASSINING ALL EMPLOYEES INTO THE ArrayOfEmployees
        response += ` 
            <tr>
               <td>${employees.firstname}</td>
               <td>${employees.lastname}</td>
               <td>${employees.position}</td>
               <td>${employees.gender}</td>
               <td>${employees.phone}</td>
               <td><input type="text" id="datepicker"> <button class="btn btn-outline-dark">update</button></td>
              
               <td><span><button class="btn btn-outline-secondary" onclick=getEmployee(${
                 employees.id
               }) data-toggle="modal" data-target="#employeeDetials"><i class="fas fa-eye"></i></button> <button class="btn btn-outline-primary" data-toggle="modal" data-target="#updateEmployee" onclick= "updateEmployee(${
                employees.id
              })"><i class="fas fa-pencil-alt"></i></button> <button onclick ="removeEmployee(${
          employees.id
        })" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button></span></td>
            </tr>
             `;
      });
      $tbody.html(response);



      $("#example").DataTable();
    },
    error: () => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000
      });

      Toast.fire({
        type: "error",
        title: "content could not be retrieved"
      });
    }
  });
};

//END FETCH ALL


//LOOPING THROUGH DATA GOTTEN FROM list ARRAY AND PICKING OUT EACH USER FOR THE VIEW A SPECIFIC USER MODAL
const getEmployee = id => {
  const employee = ArrayOfEmployees.find(element => element.id === id);
  $("#employee").html(
    `
  <div class="row mb-3" >
      <div class="col-sm ">
        <p><b>Position</b></p>
        <p>${employee.position}</p>
      </div>
  </div>
     
  <div class="row">
      <div class="col-sm ">
          <p><b>First Name</b></p>
          <p>${employee.firstname}</p>
      </div>

      <div class="col-sm ">
        <p><b>Last Name</b></p>
        <p>${employee.lastname}</p>
      </div>

      <div class="col-sm ">
        <p><b>Gender</b></p>
        <p>${employee.gender}</p>
      </div>
     
    </div>
</div> 
    `
  );
};




//DELETING A SINGLE EMPLOYEE RECORD
let removeEmployee = emp_id => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete"
  }).then(remove => {
    if (remove.value) {
      $.ajax({
        type: "DELETE",
        url: `${BaseURL}employees/${emp_id}`,
        success: () => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 4000
          });
          FetchAllEmployees();

          Toast.fire({
            type: "success",
            title: "employee record deleted"
          });
        },
        error: () => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 4000
          });
          FetchAllEmployees();

          Toast.fire({
            type: "error",
            title: "record could not be deleted"
          });
        }
      });
    }
  });
};
//END OF DELETIING AN EMPLOYEE

//UPDATING A SINGLE USER
let updateEmployee = emp_id => {
  const employee = ArrayOfEmployees.find(element => element.id === emp_id);
 $('#updateEmployeeBody').html(`
 
 <form id="updateEmployeeForm">
                  <div class="form-group">
                    <label for="formGroupExampleInput">First Name</label>
                    <input
                      type="text"
                      class="form-control form-control-warning"
                      placeholder="Firstname"
                      id="updatefirstname" 
                      value="${employee.firstname}" 
                    >
                    
                  </div>
                  <div class="form-group">
                      <label for="formGroupExampleInput">Last Name</label>
                      <input
                        type="text"
                        class="form-control form-control-warning"
                        placeholder="Lastname" 
                        id="updatelastname"
                        value="${employee.lastname}"
                      >
                     
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput">Position</label>
                        <input
                          type="text"
                          class="form-control form-control-warning"
                          placeholder="Position"
                          id="updateposition"
                          value="${employee.position}"  
                        >
                        
                      </div>
                      
                      <div class="form-group">
                          <label for="formGroupExampleInput">Phone</label>
                          <input
                            type="tel"
                            class="form-control form-control-warning"
                            placeholder="Phone No."
                            minlength="14"
                            maxlength="12"
                            id="updatephone"
                            value="${employee.phone}"  
                          >
                          
                        </div>
                        <div class="form-group">
                          
                        </div>
                        <select class="custom-select custom-select-sm" id="updategender">
                            
                            <option selected>${employee.gender}</option> 
                            <option value="Male">Male</option> 
                            <option value="Female">Female</option>             
                        </select>
                </form>
 `)


//UPDATE BUTTON
$("#saveCHangesButton").on("click", () => {

  let payload = {
    firstname: $("#updatefirstname").val(),
    lastname: $("#updatelastname").val(),
    gender: $("#updategender").val(),
    position: $("#updateposition").val(),
    phone: $("#updatephone").val(),
  };
  //CHECKING INPUT FIELD FOR CONTENT BEFORE SENDING DATA
  if (
    $("#updatefirstname").val() == "" ||
    $("#updatelastname").val() == "" ||
    $("#updategender").val() == "" ||
    $("#updateposition").val() == "" ||
    $("#updatephone").val() == ""
  ) {
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
      type: "PUT",
      url: `${BaseURL}employees/${employee.id}`,
      data: payload,
      success: employees => {

        FetchAllEmployees();

        //alert if employee add successful
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000
        });

        Toast.fire({
          type: "success",
          title: "employee record Updated!"
        });

        $('#updateEmployee').modal('hide');
      },
      error: () => {
        //alert if employee add unsuccessful
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000
        });

        Toast.fire({
          type: "error",
          title: "update was not successful!"
        });
      }
    });
  }
});
//END OF UPDATE EMPLOYEE
}



$(document).ready(() => {
  //FETCH ALL USERS ON PAGE LOAD
  FetchAllEmployees();

  $(function () {
    $("#datepicker").datepicker();
  });

  //ADDING AN EMPLOYEE (POST METHOD)
  $("#saveButton").on("click", () => {
    $firstname = $("#firstname").val();
    $lastname = $("#lastname").val();
    $gender = $("#gender").val();
    $position = $("#position").val();
    $phone = $("#phone").val();

    let payload = {
      firstname: $firstname,
      lastname: $lastname,
      gender: $gender,
      position: $position,
      phone: $phone,
      attended: []
    };

    //CHECKING INPUT FIELD FOR CONTENT BEFORE SENDING DATA
    if (
      $firstname.trim() == "" ||
      $lastname.trim() == "" ||
      $position.trim() == "" ||
      $gender == "" ||
      $phone.trim() == ""
    ) {
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
        type: "POST",
        url: `${BaseURL}employees`,
        data: payload,
        success: employees => {

          FetchAllEmployees();

          //alert if employee add successful
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 4000
          });

          Toast.fire({
            type: "success",
            title: "employee added successfully!"
          });

          $("form :input").val("");
        },
        error: () => {
          //alert if employee add unsuccessful
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 4000
          });

          Toast.fire({
            type: "error",
            title: "employee could not be added!"
          });
        }
      });
    }
  });


});