// create three tables, department, roles, and employees
//initial inquirer prompt is a list of the questions
//show the database info using ui.log.write?
//use the when type to loop into another question if the user selects add role, add department, add employee, update employee role
// after picking from the list, it will display the relevant info and a .then to run inquirer again?
const inquirer = require("inquirer");
const {
  showDepartments: showDepartments,
  showRoles: showRoles,
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
      "Quit",
    ],
  },
];

function init() {
  inquirer.prompt(questions).then((answers) => {
    if (answers.option === "View All Departments") {
      showDepartments();
    } else if (answers.option === "View All Roles") {
      showRoles();
    } else {
      process.exit();
    }
  });
}

init();
