USE employeeTracker_db;
INSERT INTO department(name)
VALUES("Sales"),("Legal"),("Finance"),("Engineering"),("Human Resources");
INSERT INTO role (title,salary,department_id)
VALUES ("Sales Lead", 40000, 1),
("Salesrep", 50000, 1),
("Legal Aid", 50000, 2),
("Accountant", 59000, 3),
("Engineering", 69000, 4),
("Lawyer", 70000,2),
("Accounts Manager", 85000,3),
("Human Resources", 55000, 5);
INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES("Mary","Brown",1, null),
("John","Brown",2, 1),
( "Keven", "Allen",3,NULL),
( "Keven", "Brown",4,3),
("Sarah", "Lin",5,null),
( "Malia", "Brown",6,3),
("Tom", "Lin",7,7),
("Sarah","Lourd", 8,7)