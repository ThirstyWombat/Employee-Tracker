// create three tables, department, roles, and employees
//initial inquirer prompt is a list of the questions
//show the database info using ui.log.write?
//use the when type to loop into another question if the user selects add role, add department, add employee, update employee role
// after picking from the list, it will display the relevant info and a .then to run inquirer again?
//concat(employees.first_name, ' ',employees.last_name)
//on init, execute a query that pulls the contents of the department column from departmets, and puts it in an array to be used as the choices for a prompt
const inquirer = require("inquirer");
require("dotenv").config();
const {
  showDepartments: showDepartments,
  showRoles: showRoles,
  showEmployees: showEmployees,
  addDepartment: addDepartment,
  generateDepartments: generateDepartments,
} = require("./db/queries");

async function init() {
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
        "Add Role",
        "Quit",
      ],
    },
    {
      type: "input",
      name: "department",
      message: "Enter a name for the department you wish to add.",
      when: (answers) => answers.option === "Add Department",
    },
    {
      type: "input",
      name: "roleName",
      message: "Enter a name for the role you wish to add.",
      when: (answers) => answers.option === "Add Role",
    },
    {
      type: "number",
      name: "roleSalary",
      message: "Enter a salary for the role you wish to add.",
      when: (answers) => answers.option === "Add Role",
    },
    {
      type: "list",
      name: "roleDepartment",
      message: "Which department does the role belong to?",
      choices: await generateDepartments(),
      when: (answers) => answers.option === "Add Role",
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    let department = answers.department;

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
    }
  });
}

init();
