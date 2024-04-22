const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'HMSystem',
    password:"1234"
  })


module.exports.allNurseList =  (req,res) =>{
    let q = "SELECT * FROM nurses";
    try{
        connection.query(q, (err, nurses) =>{
            if(err) throw err;
            res.render("nurse_list.ejs", { nurses });
        });
    } catch(err){
        res.status(500).send("Error retrieving nurses");
    }
  }

module.exports.renderNurseEditForm = (req,res) =>{
    let { id } = req.params;
    let q = `SELECT * FROM nurses WHERE nurse_id='${id}'`;
  
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let nurse = result[0];
            res.render("nurse_info_edit.ejs", { nurse });
        });
    } catch (err) {
        res.status(500).send("Error editing nurse");
    }
  }


module.exports.editNurse = (req, res) => {
    let { id } = req.params;
    let {nurse_id, name, duty_floor, duty_day, duty_time,phone_num,address } = req.body; 
  
    let q1 = `UPDATE nurses SET nurse_id= '${nurse_id}', name = '${name}',  duty_floor='${duty_floor}', duty_day='${duty_day}', duty_time='${duty_time}',
              phone_num='${phone_num}',address='${address}' WHERE nurse_id='${id}'`;
  
    try {
        connection.query(q1, (err, result) => {
            if (err) throw err;
            res.redirect("/all_nurse_list");
        });
    } catch(err){
        res.status(500).send("Error updating nurse");
    }
  }

module.exports.deleteNurse = (req, res) => {
    let { id } = req.params;
    let q1 = `DELETE FROM nurses WHERE nurse_id='${id}'`;
  
    try {
        connection.query(q1, (err, result) => {
            if (err) throw err;
            res.redirect("/all_nurse_list");
        });
    } catch (err) {
        res.send("Error deleting nurse");
    }
  }


module.exports.renderAddNewNurseForm = (req, res) => {
    res.render("add_new_nurse.ejs"); // 
  }

module.exports.addNewNurse = (req, res) => {
    let {
        nurse_id,
        name,
        duty_floor,
        duty_day,
        duty_time,
        phone_num,
        address
    } = req.body;

    let q = `INSERT INTO nurses (nurse_id, name, duty_floor, duty_day, duty_time, phone_num, address) 
             VALUES ('${nurse_id}', '${name}', '${duty_floor}', '${duty_day}', '${duty_time}', '${phone_num}', '${address}')`;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;

            let employeeQ = `INSERT INTO employees (employee_id, name, emp_type, phone_num, address, date_of_birth,  contract) 
                            VALUES ('${nurse_id}', '${name}', 'Nurse', '${phone_num}', '', '', '')`;

            connection.query(employeeQ, (err, empResult) => {
                if (err) throw err;

                res.redirect("/all_nurse_list");
            });
        });
    } catch (err) {
        res.send("Error occurred while adding a new nurse");
    }
}