const express = require("express");
const mysql = require("mysql2");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
const { error } = require("console");



app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname,"./public/css")));
app.use(express.static(path.join(__dirname,"./public/js")));

//Admin Login Middleware import 
 const AdminLogin_M = require("./middleware/AdminLogin.js");   

//Doctor Login Middleware import
const DoctorLogin_M = require("./middleware/DoctorLogin.js");

// Patient Middleware 
const Patient_M = require("./middleware/Patient.js");

//Doctor Middleware
const Doctor_M = require("./middleware/Doctor.js");

//Nurse Middleware
const Nurse_M = require("./middleware/Nurse.js");

//Appointment Middleware
const Appointment_M = require("./middleware/Appointment.js");

//Employee Middleware
const Employee_M = require("./middleware/Employee.js");

//Room Middleware
const Room_M = require("./middleware/Room.js");

//Lab Test Middleware
const LabTest_M = require("./middleware/LabTest.js");

//Ambulance Middleware
const Ambulance_M = require("./middleware/Ambulance.js");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'HMSystem',
    password:"1234"
  });


app.listen(7000,()=>{
    console.log(`App is listing at port: 7000`);
});



app.get("/",(req,res) =>{
    res.render("MainHome.ejs");
});

//Doctor Login
app.get('/dlogin', DoctorLogin_M.renderDoctorLoginPage);

app.post('/dlogin', DoctorLogin_M.doctorLogin);


//patient_chekcing Done 
app.post('/:patient_id/:doctor_id/patient_done', Patient_M.patientCheckingDone);



//Patient Status
app.get('/patient/status', Patient_M.renderStatusForm );

app.post('/patient/status',Patient_M.patientStatus);

//for admin login
app.get("/login", AdminLogin_M.renderAdminLoginPage);

app.post("/admin_login", AdminLogin_M.adminLogin); 





//Doctor
// all doctor list
app.get('/Doctors/all', Doctor_M.allDoctorList);



app.get("/all_doctor_list",Doctor_M.allDoctorAdmin);

// Edit Information of doctor
app.get("/doctor/:id/edit", Doctor_M.renderDoctorEditForm);

app.patch("/doctor/:id/edit", Doctor_M.editDoctor);

//Delete
app.delete("/doctor/:id/", Doctor_M.deleteDoctor);
  

// Add new doctor
app.get("/doctor/add_new_doctor", Doctor_M.renderAddNewDoctorForm);

app.post("/doctor/add_new_doctor", Doctor_M.addNewDoctor); 

//PATIENT  START

// ALL PATIENT LIST
app.get("/all_patient_list", Patient_M.allPatientList);

//ADD NEW PATIENT

app.get("/patient/add_new_patient", Patient_M.renderAddNewPatientForm);

app.post("/patient/add_new_patient", Patient_M.addNewPatient);

// EDIT INFORMATION

app.get("/patient/:id/edit", Patient_M.renderPatientEditForm);

app.patch("/patient/:id/edit", Patient_M.editPatient);

//DELETE
app.delete("/patient/:id", Patient_M.deletePatient);

//NURSE-------------------------------------------
// Retrieve all nurses
app.get("/all_nurse_list",Nurse_M.allNurseList);

// Edit nurse information
app.get("/nurse/:id/edit", Nurse_M.renderNurseEditForm);

app.patch("/nurse/:id/edit", Nurse_M.editNurse);

// Delete nurse
app.delete("/nurse/:id/", Nurse_M.deleteNurse);

// Add new nurse
app.get("/nurse/add_new_nurse", Nurse_M.renderAddNewNurseForm);
  
app.post("/nurse/add_new_nurse", Nurse_M.addNewNurse);

  //-------Appointment---------------------------//
// List all appointments
app.get("/all_appointments", Appointment_M.allAppointment);

// Add new appointment--------------------
app.get("/appointment/add_new_appointment", Appointment_M.renderNewAppointmentForm);
  
  app.post("/appointment/add_new_appointment", Appointment_M.newAppointment);

  //-----------EMPLOYEE----------//
//ALL EMPLOYEE LIST
app.get("/employees", Employee_M.allEmployee);

//---------------Add new Employee-----------------///

app.get("/employee/add_new_employee", Employee_M.renderNewEmployeeForm);

app.post("/employee/add_new_employee", Employee_M.addNewEmployee);



//--------ROOM---------//
app.get('/room_information', Room_M.roomInformation);
//----admit patient in room----///

app.get('/admit_into_room', Room_M.admitIntoRoom);


//----sHOW ALL ROOMS---//
app.get('/all_rooms', Room_M.showAllRooms);


//----DELETE PATIENCE FROM ROOM--------//
app.delete("/icu/:id/", Room_M.deletePatientFromICU);
app.delete("/cabin/:id/", Room_M.deletePatientFromCabin);
app.delete("/ot/:id/", Room_M.deletePatientFromOT);

//INSERT
app.get('/insert-rooms', Room_M.renderInsertRoomForm);

// Insert data for Room admission
app.post('/insert-room', Room_M.insertPatientRoom);

//Employee

app.get("/all_employee",Employee_M.allEmployee);

//Edit
// Edit employee information
app.get("/employee/:id/edit", Employee_M.renderEmployeeEditForm);

app.patch("/employee/:id/edit", Employee_M.editEmployee);


///lab_test /


app.get('/lab_tests/home', (req, res) => {
  res.render('lab_tests_home.ejs');
});



//-- all lab test
app.get("/all_lab_tests", LabTest_M.allLabTest);

//Edit
app.get("/lab_test/:id/edit", LabTest_M.renderLabTestEditForm);

//update
app.patch("/lab_test/:id/edit", LabTest_M.editLabTest);

//delete
app.delete("/lab_test/:id/", LabTest_M.deleteLabTest);

//insert
app.get("/lab_test/add_new_test", (req, res) => {
  res.render("add_new_lab_test.ejs");
});

app.post("/lab_test/add_new_test", LabTest_M.addNewLabTest);

//ambulance
app.get("/all_ambulance_record", Ambulance_M.allAmbulanceRecord);
//Hire ambulance
app.get("/ambulance/add_new_record", (req, res) => {
  res.render("add_new_ambulance_record.ejs");
});

app.post("/ambulance/add_new_record", Ambulance_M.addNewAmbulanceRecord);

//DELETE
app.delete("/ambulance/:patient_id", Ambulance_M.deleteAmbulanceRecord);