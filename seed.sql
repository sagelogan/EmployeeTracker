drop database if exists EmployeeTracker_DB;

create database EmployeeTracker_DB;

use EmployeeTracker_DB;

create table department(
    id INT NOT NULL auto_increment,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

create table role(
    id INT NOT NULL auto_increment,
    title VARCHAR(30),
    salary DECIMAL(20,3),
    department_id INT NOT NULL,
    PRimARY KEY (id)
);

create table employee(
    id INT NOT NULL auto_increment,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);