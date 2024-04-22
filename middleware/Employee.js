const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'HMSystem',
    password:"1234"
  })

module.exports.allEmployee = (req,res) =>{
    let q = "SELECT * FROM employees";
    try{
        connection.query(q, (err, employees) =>{
            if(err) throw err;
            res.render("show_all_employee_list.ejs", { employees });
        });
    } catch(err){
        res.status(500).send("Error retrieving nurses");
    }
  }

module.exports.renderNewEmployeeForm = (req, res) => {
    res.render("add_new_employee.ejs");
  }

module.exports.addNewEmployee = (req, res) => {
    let { employee_id, name, emp_type,salary,phone_num,address,date_of_birth, contract,NID } = req.body;
  
    let q = `INSERT INTO employees (employee_id, name, emp_type, salary, phone_num,address, date_of_birth,contract,NID) 
             VALUES ('${employee_id}', '${name}', '${emp_type}','${salary}', '${phone_num}','${address}', '${date_of_birth}','${NID}','${contract}')`;
  
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            res.redirect("/employees"); 
        });
    } catch (err) {
        res.send("Error occurred while adding a new employee");
    }
  }

module.exports.renderEmployeeEditForm = (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM employees WHERE employee_id='${id}'`;
  
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let employee = result[0];
            res.render("employee_info_edit.ejs", { employee });
        });
    } catch (err) {
        res.status(500).send("Error fetching employee data");
    }
  }


module.exports.editEmployee = (req, res) => {
    const { id } = req.params;
    const { contract,nid, address, salary } = req.body;
  
    const q = `UPDATE employees SET contract='${contract}',nid='${nid}', address='${address}', salary='${salary}' WHERE employee_id='${id}'`;
  
    connection.query(q, (err, result) => {
        if (err) {
            res.status(500).send("Error updating employee information");
        } else {
            res.redirect("/all_employee"); 
        }
    });
  }
