const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'HMSystem',
    password:"1234"
  });

module.exports.renderDoctorLoginPage =  (req, res) => {
    res.render('dlogin.ejs');
}


module.exports.doctorLogin =  (req, res) => { 
    let { doctor_id, password } = req.body;
    let q = `SELECT * FROM doctors WHERE doctor_id='${doctor_id}' AND password='${password }'`;      
    connection.query(q, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            // res.send('Doctor Logged In Successfully');

            q = `SELECT * FROM appointment A, patients P WHERE A.doctor_id='${doctor_id}' AND A.patient_id=P.patient_id `;
            connection.query(q, (err, appointments) => {
                if (err) throw err;
                res.render('doctor_appointments.ejs', { appointments, doctor_id });
            });
        } else {
            res.send('Invalid username or password');
        }
    }); 
}