DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(30)
);
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INTEGER
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL
    FOREIGN KEY (manager_id) REFERENCES role(id) ON DELETE SET NULL
);
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    title varchar(30),
    salary decimal(10,2) NOT NULL,
    department_id INTEGER NOT NULL
    FOREIGN KEY (role_id) REFERENCES employee (id) ON DELETE SET NULL
) ;