const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'HMSystem',
    password:"1234"
  })


module.exports.allAppointment = (req, res) => {
    const q = "SELECT * FROM appointment";
    try {
      connection.query(q, (err, appointments) => {
        if (err) throw err;
        res.render("appointment_list.ejs", { appointments });
      });
    } catch (err) {
      res.status(500).send("Error fetching appointments");
    }
  }


module.exports.renderNewAppointmentForm = (req, res) => {
    const patientsQuery = "SELECT * FROM patients";
    const doctorsQuery = "SELECT * FROM doctors";
  
    try {
      connection.query(patientsQuery, (err, patients) => {
        if (err) throw err;
  
        connection.query(doctorsQuery, (err, doctors) => {
          if (err) throw err;
  
          res.render("add_new_appointment.ejs", { patients, doctors });
        });
      });
    } catch (err) {
      res.status(500).send("Error fetching patients and doctors");
    }
  }

module.exports.newAppointment = (req, res) => {
    const { patient_id, doctor_id, date,time, visiting_fee } = req.body;
  
    const q = `INSERT INTO appointment (patient_id, doctor_id, date, time,visiting_fee)
               VALUES ('${patient_id}', '${doctor_id}', '${date}','${time}', ${visiting_fee})`;
  
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        
        res.redirect("/all_appointments");
      
    });
   } catch (err) {
      res.status(500).send("Error occurred while adding a new appointment");
    }
  }