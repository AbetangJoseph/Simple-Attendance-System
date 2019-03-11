const BaseURL = "http://127.0.0.1:3000/";
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
               <td><input type="text" id="${employees.id}" class="datetext" onmousedown=picDate(event) placeholder="pick attendance date"> <button class="btn btn-outline-dark" onclick=updateEmployeeStatus(${employees.id})>update</button></td>            
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

//TRIGGER DATEPICKER
const picDate = (event) => {
  $(`#${event.target.id}`).datepicker({maxDate: new Date});
}
//END DATETRIGGER

//LOOPING THROUGH DATA GOTTEN FROM ArrayOfEmployees ARRAY AND PICKING OUT EACH USER FOR THE VIEW A SPECIFIC USER MODAL
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

      <div id="datepicker"></div>
  </div> 
    `
  );

  $(function () {
    const eventDates = {};
    employee.attendance.forEach( element => {
      eventDates[ new Date( element )] = new Date( element );
    });
    $("#datepicker").datepicker({
      beforeShowDay: function( date ) {
        var highlight = eventDates[date];
        if( highlight ) {
             return [true, "event", 'Employee attended meeting on this day'];
        } else {
             return [true, '', ''];
        }
      }
    });
  });
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
          notify("success", "employee record deleted");
        },
        error: () => {
          notify("error", "record could not be deleted")
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
 `);
 
 $("#update-emmployee-btn").html(`<button type="button" class="btn btn-primary" id="saveCHangesButton" onclick=updateBtn(${employee.id})>Save changes</button>`);

}

const updateBtn = async (id) => {
  let $firstname = $("#updatefirstname").val().trim();
  let $lastname =  $("#updatelastname").val().trim();
  let $gender = $("#updategender").val().trim();
  let $position =  $("#updateposition").val().trim();
  let $phone = $("#updatephone").val().trim();

  //CHECKING INPUT FIELD FOR CONTENT BEFORE SENDING DATA
  if (
    $firstname == "" ||
    $lastname == "" ||
    $gender == "" ||
    $position == "" ||
    $phone == ""
  ) { 
    notify("info", "please fill all fields");
  } else {
   
    let payload = {
      firstname : $firstname,
      lastname : $lastname,
      gender : $gender,
      position : $position,
      phone : $phone   
    };
    
    const res = await request('patch', `employees/${id}`, payload);
    if(res.status === 'success'){
      FetchAllEmployees();
      $('#updateEmployee').modal('hide');
      notify(res.status, res.message);
    }else{
      $('#updateEmployee').modal('hide');
      notify(res.status, res.message);
    }    
  }
}

const updateEmployeeStatus = async (id) => {
  const attendance = ArrayOfEmployees.find(element => element.id === id).attendance;
  const dateVal = $(`#${id}`).val();

  if(dateVal.trim() === ''){
    notify("info", "please pick a date");

  }else{
    attendance.push(dateVal);
  const response = await request('patch', `employees/${id}`, { attendance })
  if (response.status === 'success') {
      FetchAllEmployees();
      notify("success", "employee meeting status updated");
    } else {
      notify("error", "employee meeting status could not be updated");
    }
  } 
}



$(document).ready(() => {
  //FETCH ALL USERS ON PAGE LOAD
  FetchAllEmployees();

  //ADDING AN EMPLOYEE (POST METHOD)
  $("#saveButton").on("click", async () => {
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
      attendance: []
    };

    //CHECKING INPUT FIELD FOR CONTENT BEFORE SENDING DATA
    if (
      $firstname.trim() == "" ||
      $lastname.trim() == "" ||
      $position.trim() == "" ||
      $gender == "" ||
      $phone.trim() == ""
    ) {
     notify('info', 'please fill all fields')
    } else {
      const res = await request('post', 'employees', payload);
      $("form :input").val("");
      notify(res.status, res.message);     
    }
  });

});