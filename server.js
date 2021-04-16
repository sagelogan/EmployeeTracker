// importing mysql
const mysql = require("mysql2");


// add in all of the switch cases for views
const [ VIEW_ALL_EMPLOYEES,
    VIEW_ALL_ROLE,
    VIEW_ALL_DEPARTMENTS,
    ADD_DEPARTMENT,
    ADD_EMPLOYEE,
    ADD_ROLE,
    UPDATE_EMPLOYEE_INFO] = require('./lib/const');


// add alll the questions/choices in
const {
    promptChoices, 
    promptAddDepartment,
    promptAddEmployee,
    promptAddEmployeeRole,
    promptAddRole,
    promptAddRoleDept,
    promptEmployeeInfo,
    promptEmployeeToUpdate,
    promptManager
} = require('./lib/prompts');


// make sure to add in all the question functions
const  {
    viewAllEmployees,
    viewAllDepartments,
    viewAllRoles,
    addDepartment,
    addEmployee,
    addRole,
    updateRole,
    updateManager
    } = require('./lib/queries');


//create/run connection to local server and database
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "14690",
    database: "EmployeeTracker_DB"
  });

  connection.connect(async (err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    await runPrompt();
    connection.end();
});


// create function to ask initial user all the auestions
async function runPrompt() {

    let answer, employee, role, department, info;

    answer = await promptChoices();
    console.table(answer.name);
 
    switch (answer.name) {
        case VIEW_ALL_EMPLOYEES:

            await viewAllEmployees(connection);
            await runPrompt();
            break;

        case VIEW_ALL_DEPARTMENTS:
   
            await viewAllDepartments(connection);
            await runPrompt();
            break;

        case VIEW_ALL_ROLE:
        
            await viewAllRoles(connection);
            await runPrompt();
            break;

        case ADD_DEPARTMENT:
   
            await viewAllDepartments(connection);
            department = await promptAddDepartment();
            addDepartment(connection, department.name);
            await viewAllDepartments(connection);
            await runPrompt();
            break;
            
        case ADD_EMPLOYEE:

            employee = await promptAddEmployee();
            await viewAllRoles(connection);
            role = await promptAddEmployeeRole();
            addEmployee(connection, employee.first_name , employee.last_name,role.id);
            await viewAllEmployees(connection);
            await runPrompt();
            break;

        case ADD_ROLE:

            await viewAllRoles(connection);
            role = await promptAddRole();
            await viewAllDepartments(connection);
            department = await promptAddRoleDept();
            addRole(connection,role.title,role.salary,department.id)
            await viewAllRoles(connection);
            await runPrompt();

        case UPDATE_EMPLOYEE_INFO:
            
            info = await promptEmployeeInfo();
            if(info.name === "Role"){
                await viewAllEmployees(connection);
                employee = await promptEmployeeToUpdate();
                await viewAllRoles(connection);
                role = await promptAddEmployeeRole();
                await updateRole(connection, role.id , employee.id);
                await viewAllEmployees(connection);
                await runPrompt();

            };
            if(info.name === "Manager ID"){
                await viewAllEmployees(connection);
                employee = await promptEmployeeToUpdate();
                await viewAllEmployees(connection);
                manager = await promptManager();
                await updateManager(connection, manager.id, employee.id);
                await viewAllEmployees(connection);
                await runPrompt();

            }
        case "EXIT":
            break;
    }
}