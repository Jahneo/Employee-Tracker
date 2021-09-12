const fs = require ('fs');
const inquirer = require('inquirer');
const server = require('./server.js');
const mysql = require('mysql2');



// Connecting to database 
//using login credentials
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Pass@Word1',
      database: 'employeeTracker_db'
    },
    //test to see if connected then commented out
    //console.log('Connected to the Employee Tracker database.')
    
  );
  // initail test to query database later commented out
  //db.query(`SELECT * FROM employee where id = 5`, (err, rows) => 
  {
    //console.table(rows);
    //after connecting promting user with function that gives options
    welcome();
  };

//get user input and storing in an array
// with array different instances of variables can be used

function welcome() {
    inquirer
      .prompt({
        type: "list",
        name: "userChoice",
        // message to start application
        message: "welcome to my Application" + "\n" + "what would you like to do ?",
        // user choices
        choices: [
            "view all departments",
            "view all roles", 
            "view all employees", 
            "add a department", 
            "add a role", 
            "add an employee", 
            "update an employee role",
            "Quit"
        ],
        // using input to modify or diplay database
      })
      .then(answer =>{
        console.log("You entered: " + answer.userChoice);
        //the choice determines the next step
        // capturing choice in a switch statment
        switch (answer.userChoice) {
          case "view all departments":
            viewAllDepartment();
            break;
          case "view all roles":
            viewAllRoles();
            break;
          case "view all employees":
            viewAllEmployees();
            break;
          case "add a department":
            addDepartment();
            break;
          case "add a role":
            addRole();
            break;
          case "add an employee":
            addEmployee();
            break;
          case "update an employee role":
            updateEmployeeRole();
            break;
            default:
            //end process 
            quit();
        }
      });
  }
  
  
  //Function to view Departments
  
  function viewAllDepartment() {
    db.query(`SELECT * FROM department`, (err, rows) => 
    {
        console.table(rows);
        welcome();
    });
    
  }
  //Function to view all roles
  function viewAllRoles () {
    db.query(`SELECT * FROM role`, (err, rows) => 
    {
        console.log(rows);
       welcome();
    });
    }
    function viewAllEmployees (){
        db.query('SELECT * FROM employee', (err, rows) => 
        {
            console.table(rows);
           welcome();
        });
        }
        
  //Function to add a new Department
  function addDepartment() {
  
  
      inquirer
      .prompt ({
        type: "input",
        message: "Please enter the new Department's name",
        name: "addedDepartment"

    })
    .then(function(answer){
   
        db.query('INSERT INTO department (name)VALUES ("${addedDepartment}")', (err, rows) =>    
             
        {
            console.table(rows);
           welcome();
        }       
        )}
    )}
  
  
  //Function to add a new role
  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Please enter the new role?",
          name: "addedRole"
        },
        {
          type: "input",
          message: "What is the salary for this role?",
          name: "newSalary"
        },
        {
          type: "input",
          message: "What is the department id number?",
          name: "newDeptID"
        }
      ])
      .then(addRole =>{
                    
        db.query('INSERT INTO role (title,salary,department_id)VALUES ("${addedRole}","${newSalary}","${newDeptID}")', (err, rows) => 
        
        {
           console.table(rows);
           console.log("addedRole");
           welcome();
        }       
        )}
        )};
  
  //Function to add a new Employee
  function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What's the first name of the employee?",
          name: "addedFs_name"
        },
        {
          type: "input",
          message: "What's the last name of the employee?",
          name: "addedL_name"
        },
        {
          type: "input",
          message: "Please enter the role id number?",
          name: "roleId"
        },
        {
          type: "input",
          message: "Please enter the new employees manager id?",
          name: "aMan_id"
        }
      ])
      .then(addEmployee =>{
                        
        db.query('INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES ("${addedFs_name}","${addedL_name}","${roleId}","${aMan_id}")', (err, rows) => 
        
        {
            console.table(rows);
           welcome();
        }       
        )}
        )};
  
  
  
  //Function to update an Employee
  function updateEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Which employee would you like to update?",
          name: "updateWorker"
        },
  
        {
          type: "input",
          message: "Enter the new role ID for employees",
          name: "updateRole"
        }
      ])
      .then(updateEmployee => {
        db.query ('UPDATE employee SET role_id = "${updateRole}" WHERE id = "${updateWorker}"')  
        {
          console.table(rows);
         welcome();
      }       
      });
  
  
  
 
  }
   
  //Function to exit the program
  function quit() {
    // close the connecting since db was defined as open connection
    db.end();
    // exit thr program
    process.exit();
  }