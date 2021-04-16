const UPDATE_EMPLOYEE_ROLE = "Update An Employee's Info";

async function promptEmployeeToUpdate() {
    try {
        employee = await inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the ID of the employee that you would like to update?',
                    name: 'id',
                  }
                ]);

        return employee;
    } catch (error) {
        console.log(error);
    }
};

module.exports = [
    UPDATE_EMPLOYEE_ROLE,
    promptEmployeeToUpdate,
];