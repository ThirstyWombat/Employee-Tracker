// create three tables, department, roles, and employees
//initial inquirer prompt is a list of the questions
//show the database info using ui.log.write?
//use the when type to loop into another question if the user selects add role, add department, add employee, update employee role
// after picking from the list, it will display the relevant info and a .then to run inquirer again?
//concat(employees.first_name, ' ',employees.last_name)
const inquirer = require("inquirer");
require("dotenv").config();
const {
  showDepartments: showDepartments,
  showRoles: showRoles,
  showEmployees: showEmployees,
  addDepartment: addDepartment,
} = require("./db/queries");
const questions = [
  {
    type: "list",
    name: "option",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add Department",
      "Quit",
    ],
  },
  {
    type: "input",
    name: "department",
    message: "Enter a name for the department you wish to add.",
    when: (answers) => answers.option === "Add Department",
  },
];

function init() {
  inquirer.prompt(questions).then((answers) => {
    let department = answers.department;
    console.log(department);
    switch (answers.option) {
      case "View All Departments":
        showDepartments();
        break;
      case "View All Roles":
        showRoles();
        break;
      case "View All Employees":
        showEmployees();
        break;
      case "Quit":
        process.exit();
      case "Add Department":
        addDepartment(department);

      // console.log(answers.department);
    }
  });
}

init();
