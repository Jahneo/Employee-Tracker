
const mysql = require('mysql2');
const express = require('express');
const index = require('./index.js');
const PORT = process.env.PORT || 3001;
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Pass@Word1',
      database: 'employeeTracker_db'
    },
    console.log('Connected to the Employee Tracker database.')
  );
  /*
  db.query(`SELECT * FROM employee where id = 5`, (err, rows) => {
    console.log(rows);
    //promptUser();
  });
  
  db.query(`DELETE FROM employee WHERE id = ?`, 100, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
  
 // Create a employee
const sql = `INSERT INTO employee ( first_name, last_name, role_id,manager_id) 
VALUES (?,?,?,?)`;
const params = [ 'Ronald', 'Firbank', 1, 2];

db.query(sql, params, (err, result) => {
if (err) {
console.log(err);
}
console.log(result);
});
*/
app.get('/api/employeeTracker_db', (req, res) => {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

  app.get('/api/employeeTracker_db/:id', (req, res) => {
    const sql = `SELECT * FROM employee WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });
  // Delete a candidate
app.delete('/api/employeeTracker_db/:id', (req, res) => {
    const sql = `DELETE FROM employee WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found in Database'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });
   // Create a employee
  app.post('/api/employeeTracker_db', ({ body }, res) => {
   // const errors = inputCheck(body, 'first_name', 'last_name', 'role_id','manager_id');
    //if (errors) {
        const sql = `INSERT INTO employee (id,first_name, last_name,role_id,manager_id)
  VALUES (?,?,?,?,?)`;
const params = [body.id,body.first_name, body.last_name, body.role_id,body.manager_id];

db.query(sql, params, (err, result) => {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success',
    data: body
  });
});
     // res.status(400).json({ error: errors });
      //return;
    
  });

  // Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });