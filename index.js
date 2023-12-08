// create three tables, department, roles, and employees
//initial inquirer prompt is a list of the questions
//show the database info using ui.log.write?
//use the when type to loop into another question if the user selects add role, add department, add employee, update employee role
// after picking from the list, it will display the relevant info and a .then to run inquirer again?
//concat(employees.first_name, ' ',employees.last_name)
//on init, execute a query that pulls the contents of the department column from departmets, and puts it in an array to be used as the choices for a prompt
//for the addRole function, create an initial query which selects the id associated with the department name parameter and saves it to a variable
//use that use that id variable as the department_id when insterting into the roles table
// await generateDepartments(),
const inquirer = require("inquirer");
require("dotenv").config();
const {
  showDepartments: showDepartments,
  showRoles: showRoles,
  showEmployees: showEmployees,
  addDepartment: addDepartment,
  generateDepartments: generateDepartments,
  addRole: addRole,
  generateRoles: generateRoles,
  generateManagers: generateManagers,
  addEmployee: addEmployee,
  updateRole: updateRole,
} = require("./db/queries");

async function managerList() {
  let list = await generateManagers();
  list.push({ value: null, name: "None" });
  return list;
}
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
        "Add Employee",
        "Update Employee Role",
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
    {
      type: "input",
      name: "employeeFirst",
      message: "Enter a fist name for the employee you wish to add.",
      when: (answers) => answers.option === "Add Employee",
    },
    {
      type: "input",
      name: "employeeLast",
      message: "Enter a last name for the employee you wish to add.",
      when: (answers) => answers.option === "Add Employee",
    },
    {
      type: "list",
      name: "employeeRole",
      message: "What role does the employee belong to?",
      choices: await generateRoles(),
      when: (answers) => answers.option === "Add Employee",
    },
    {
      type: "list",
      name: "employeeManager",
      message: "Who is the employee's manager?",
      choices: await managerList(),
      when: (answers) => answers.option === "Add Employee",
    },
    {
      type: "list",
      name: "employeeToUpdate",
      message: "Which employee's role do you wish to update?",
      choices: await generateManagers(),
      when: (answers) => answers.option === "Update Employee Role",
    },
    {
      type: "list",
      name: "employeeNewRole",
      message: "Which role do you want to assign the selected employee?",
      choices: await generateRoles(),
      when: (answers) => answers.option === "Update Employee Role",
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
        break;
      case "Add Role":
        addRole(answers.roleName, answers.roleDepartment, answers.roleSalary);
        break;
      case "Add Employee":
        addEmployee(
          answers.employeeFirst,
          answers.employeeLast,
          answers.employeeRole,
          answers.employeeManager
        );
        break;
      case "Update Employee Role":
        updateRole(answers.employeeNewRole, answers.employeeToUpdate);
    }
  });
}

init();
