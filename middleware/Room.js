const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'HMSystem',
    password:"1234"
  })

module.exports.roomInformation = (req, res) => {
    res.render('room.ejs');
  }


module.exports.admitIntoRoom = (req, res) => {
    res.render('admit_into_room.ejs');
  }

module.exports.showAllRooms = (req, res) => {
  
    connection.query('SELECT * FROM cabins', (error1, result1) => {
      if (error1) throw error1;
  
      
      connection.query('SELECT * FROM icu', (error2, result2) => {
        if (error2) throw error2;
  
        
        connection.query('SELECT * FROM operation_theatre', (error3, result3) => {
          if (error3) throw error3;
  
          
          res.render('all_rooms', { result1, result2, result3 });
        });
      });
    });
  }


module.exports.deletePatientFromICU = (req, res) => {
    let { id } = req.params;
    let q1 = `DELETE FROM icu WHERE patient_id='${id}'`;
  
    try {
        connection.query(q1, (err, result) => {
            if (err) throw err;
            res.redirect("/all_rooms");
        });
    } catch (err) {
        res.send("Error deleting ");
    }
  }
module.exports.deletePatientFromCabin = (req, res) => {
    let { id } = req.params;
    let q1 = `DELETE FROM cabins WHERE patient_id='${id}'`;
  
    try {
        connection.query(q1, (err, result) => {
            if (err) throw err;
            res.redirect("/all_rooms");
        });
    } catch (err) {
        res.send("Error deleting ");
    }
  }
module.exports.deletePatientFromOT = (req, res) => {
    let { id } = req.params;
    let q1 = `DELETE FROM operation_theatre WHERE patient_id='${id}'`;
  
    try {
        connection.query(q1, (err, result) => {
            if (err) throw err;
            res.redirect("/all_rooms");
        });
    } catch (err) {
        res.send("Error deleting ");
    }
  }


module.exports.renderInsertRoomForm = (req, res) => {
    res.render('insert-rooms');
  }


module.exports.insertPatientRoom = (req, res) => {
    const {room_type, room_no, patient_id, doctor_id, cost, admit_date } = req.body;
    let q 
    let values; 
    if(room_type === 'Cabin'){
  
     q = `INSERT INTO cabins (room_no, patient_id, doctor_id, cost, admit_date) VALUES (?, ?, ?, ?, ?)`;
     values = [room_no, patient_id, doctor_id, cost, admit_date]; 
    } else if(room_type === 'ICU'){
       q = `INSERT INTO icu (room_no, patient_id, doctor_id, cost, admit_date) VALUES (?, ?, ?, ?, ?)`;
       values = [room_no, patient_id, doctor_id, cost, admit_date];
    }
    else if(room_type === 'Operation Theatre'){
       q = `INSERT INTO operation_theatre (room_no, patient_id, doctor_id, cost, admit_date) VALUES (?, ?, ?, ?, ?)`;
       values = [room_no, patient_id, doctor_id, cost, admit_date];
    }
  
    try {
      connection.query(q, values, (err, result) => {
        if (err) throw err;  
  
  
          
        res.redirect("/all_rooms");
        });
      
    } catch (err) {
      res.status(500).send('Error occurred while processing request');
      console.log(err);
    }
  }