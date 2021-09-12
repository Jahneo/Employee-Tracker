DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(30)
);
CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    title varchar(30),
    salary decimal(10,2) NOT NULL,
    department_id INTEGER ,
    FOREIGN KEY (department_id) 
    REFERENCES department(id)
    ON DELETE SET NULL
) ;
CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
 
  CONSTRAINT fk_role 
  FOREIGN KEY (role_id) 
  REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT ,
 
  CONSTRAINT fk_manager 
  FOREIGN KEY (manager_id) 
  REFERENCES employee(id)
   ON DELETE SET NULL
);

