const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'HMSystem',
    password:"1234"
  })
module.exports.allAmbulanceRecord =(req, res) => {
    q = "SELECT * FROM ambulance";
    try {
        connection.query(q, (err, ambulanceRecords) => {
            if (err) throw err;
            res.render("ambulance_record_list.ejs", { ambulanceRecords });
        });
    } catch (err) {
        res.status(500).send("Error fetching ambulance records");
    }
  }


module.exports.addNewAmbulanceRecord = (req, res) => {
    let { patient_id, destination, cost } = req.body;
  
    let q = `INSERT INTO ambulance (patient_id, destination, cost) VALUES ('${patient_id}', '${destination}', ${cost})`;
  
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            res.redirect("/all_ambulance_record");
        });
      // });
  
    } catch (err) {
        res.status(500).send("Error adding new ambulance record");
    }
  }


module.exports.deleteAmbulanceRecord = (req, res) => {
    let { patient_id } = req.params;
  
    let q1 = `DELETE FROM ambulance WHERE patient_id='${patient_id}'`;
  
    try {
        connection.query(q1, (err, result) => {
            if (err) throw err;
           
            res.redirect("/all_ambulance_record");
        });
    } catch (err) {
        res.status(500).send("Error deleting ambulance record");
    }
  }