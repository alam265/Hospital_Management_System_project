const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'HMSystem',
    password:"1234"
  })


module.exports.patientCheckingDone =  (req, res) => { 
  const { patient_id, doctor_id } = req.params;
  
  
   
    q1 = `Delete from appointment where patient_id = '${patient_id}'`;
    connection.query(q1, ( err, result) => {
      if (err) throw err;
      q2 = `SELECT * FROM appointment A, patients P WHERE A.doctor_id='${doctor_id}' AND A.patient_id=P.patient_id `;
      connection.query(q2, (err, appointments) => {
          if (err) throw err;
          res.render('doctor_appointments.ejs', { appointments });
      });
    }); }


module.exports.renderStatusForm = (req, res) => {
  res.render('patient_status.ejs');   
}

module.exports.patientStatus =  (req, res) => {
  let { patient_id } = req.body;
  let q1 = `SELECT * FROM appointment A,  Doctors D WHERE A.patient_id='${patient_id}' AND A.doctor_id=D.doctor_id`;      
  let q2 = `SELECT * FROM testdata WHERE patient_id='${patient_id}'`;
  connection.query(q1, (err, result) => {
      if (err) throw err;

  connection.query(q2, (err, labTest) => {
      if (err) throw err;
      res.render('Show_patient_status.ejs', { result, labTest });
  });
  });
}

module.exports.allPatientList =  (req, res) => {
  q = "SELECT * FROM patients";
  try {
      connection.query(q, (err, patients) => {
          if (err) throw err;
          res.render("patient_list.ejs", { patients });
      });
  } catch (err) {
      res.status(500).send("Error fetching patients list");
  }
}

module.exports.renderAddNewPatientForm = (req, res) => {
  res.render("add_new_patient.ejs");
}

module.exports.addNewPatient =  (req, res) => {
  let { patient_id, name, date_of_birth, gender, phone_num, email, address, history } = req.body;

  let q = `INSERT INTO patients (patient_id, name, date_of_birth, gender, phone_num, email, address, history) 
           VALUES ('${patient_id}', '${name}', '${date_of_birth}' ,'${gender}', '${phone_num}', '${email}', '${address}', '${history}')`;

  try {
      connection.query(q, (err, result) => {
          if (err) throw err;
          res.redirect("/all_patient_list"); 
      });
  } catch (err) {
      res.send("Error occurred while adding a new patient");
  }
}

module.exports.renderPatientEditForm = (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM patients WHERE patient_id='${id}'`;

  try {
      connection.query(q, (err, result) => {
          if (err) throw err;
          let patient = result[0];
          res.render("patient_info_edit.ejs", { patient });
      });
  } catch (err) {
      res.status(500).send("Error fetching patient data");
  }
}

module.exports.editPatient = (req, res) => {
  let { id } = req.params;
  let { phone_num: n_phone_num, email: n_email, date_of_birth:n_date_of_birth, address: n_address, history: n_history } = req.body;

  let q = `UPDATE patients SET phone_num='${n_phone_num}', email='${n_email}', date_of_birth ='${n_date_of_birth}',
           address='${n_address}', history='${n_history}' WHERE patient_id='${id}'`;

  try {
      connection.query(q, (err, result) => {
          if (err) throw err;
          res.redirect("/all_patient_list");
      });
  } catch (err) {
      res.status(500).send("Error updating patient information");
  }
}


module.exports.deletePatient =  (req, res) => {
  let { id } = req.params;
  let q = `DELETE FROM patients WHERE patient_id='${id}'`;

  try {
      connection.query(q, (err, result) => {
          if (err) throw err;
          res.redirect("/all_patient_list");
      });
  } catch (err) {
      res.status(500).send("Error deleting patient");
  }
}