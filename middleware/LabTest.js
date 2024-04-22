const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'HMSystem',
    password:"1234"
  })



module.exports.allLabTest = (req, res) => {
    q = "SELECT * FROM testdata";
    try {
        connection.query(q, (err, labTests) => {
            if (err) throw err;
            res.render("lab_test_list.ejs", { labTests });
        });
    } catch (err) {
        res.status(500).send("Error fetching lab tests");
    }
  }


module.exports.renderLabTestEditForm = (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM testdata WHERE test_id='${id}'`;
  
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let test = result[0];
            res.render("lab_test_info_edit.ejs", { test });
        });
    } catch (err) {
        res.status(500).send("Error editing lab test");
    }
  }


module.exports.editLabTest = (req, res) => {
    let { id } = req.params;
    let { test_name, cost, description } = req.body;
  
    let q1 = `UPDATE testdata SET test_name='${test_name}', cost=${cost}, description='${description}' WHERE test_id='${id}'`;
  
    try {
        connection.query(q1, (err, result) => {
            if (err) throw err;
            res.redirect("/all_lab_tests");
        });
    } catch (err) {
        res.status(500).send("Error updating lab test");
    }
  }

module.exports.deleteLabTest = (req, res) => {
    let { id } = req.params;
  
    let q1 = `DELETE FROM testdata WHERE test_id='${id}'`;
  
    try {
        connection.query(q1, (err, result) => {
            if (err) throw err;
            res.redirect("/all_lab_tests");
        });
    } catch (err) {
        res.status(500).send("Error deleting lab test");
    }
  }


module.exports.addNewLabTest = (req, res) => {
    let { test_id, patient_id, test_name, cost, description } = req.body;
  
    let q = `INSERT INTO testdata (test_id, patient_id, test_name, cost, description) VALUES ('${test_id}', '${patient_id}', '${test_name}', ${cost}, '${description}')`;
  
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
  
  
            res.redirect("/all_lab_tests");
        
        });
    } catch (err) {
        res.status(500).send("Error adding new lab test");
    }
  }