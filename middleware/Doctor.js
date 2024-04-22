const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'HMSystem',
    password:"1234"
  })

module.exports.allDoctorList =  (req, res) => { 
    const q = 'SELECT * FROM doctors'; 
    connection.query(q, (err, doctors) => {
        if (err) throw err;
        res.render('all_doctors.ejs', { doctors });
    } );  
}

module.exports.allDoctorAdmin = (req,res) =>{
    q="SELECT * FROM doctors";
    try{
        connection.query(q,(err,doctors) =>{
            if(err) throw err;
            res.render("doctor_list.ejs",{doctors});
        });


    }catch(err){
        res.status(500).send("Error deleting doctor");
    }

}

module.exports.renderDoctorEditForm = (req,res) =>{
    let {id} = req.params;
    let q = `SELECT * FROM doctors WHERE doctor_id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("doctor_info_edit.ejs", { user });
    });
  } catch (err) {
    res.status(500).send("Error deleting doctor");
  }
}

module.exports.editDoctor =  (req, res) => {
    let { id } = req.params;
    console.log(id);
    let { phone_num:n_phone_num, email:n_email ,charge: n_charge } = req.body;  //n=new

    let q1 = `UPDATE doctors  SET phone_num='${n_phone_num}', email='${n_email}', 
    charge= ${n_charge} WHERE doctor_id='${id}'`;
  
    try {
      connection.query(q1, (err, result) => {
        if (err) throw err;
        res.redirect("/all_doctor_list");
      });


    }catch(err){
        res.status(500).send("Error deleting doctor");
    }

}

module.exports.deleteDoctor =  (req, res) => {
    let { id } = req.params;
  
    let q1 = `DELETE FROM doctors WHERE doctor_id='${id}'`;
  
    try {
      connection.query(q1, (err, result) => {
        if (err) throw err;
        res.redirect("/all_doctor_list");
      });
    } catch (err) {
      res.send("Error found");
    }
  }

module.exports.renderAddNewDoctorForm = (req,res) =>{
    res.render("add_new_doctor.ejs");
  
  }


module.exports.addNewDoctor =  (req, res) => {
    let {
        doctor_id,
        name,
        gender,
        phone_num,
        email,
        specialization,
        qualification,
        charge
    } = req.body;
  
    let q = `INSERT INTO doctors (doctor_id, name, gender, phone_num, email, specialization, qualification, charge, password) 
             VALUES ('${doctor_id}', '${name}', '${gender}', '${phone_num}', '${email}', '${specialization}', '${qualification}', ${charge} , 'Doc123')`;
  
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
  
            let employeeQ = `INSERT INTO employees (employee_id, name, emp_type, phone_num, address, date_of_birth, nid, contract) 
                            VALUES ('${doctor_id}', '${name}', 'Doctor', '${phone_num}', '', '', '', '')`;
  
            connection.query(employeeQ, (err, empResult) => {
                if (err) throw err;
  
                res.redirect("/all_doctor_list");
            });
        });
    } catch (err) {
        res.send("error found");
    }
  }