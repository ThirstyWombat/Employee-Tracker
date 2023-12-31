const mysql = require("mysql2");

require("dotenv").config({ path: "../.env" });

// console.log("---->", process.env.DB_NAME);

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log("connected to database")
);

function showDepartments() {
  db.query("SELECT * FROM departments", function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
      // console.log(results.map((test) => test.department));
    }
  });
}
function showRoles() {
  const sql = `SELECT roles.id AS id, roles.title AS Title, departments.department as Department, roles.salary as Salary
   FROM roles 
   JOIN departments ON roles.department_id = departments.id`;
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });
}

function showEmployees() {
  const sql = `SELECT employees.id AS id, employees.first_name AS first_name, employees.last_name AS last_name, roles.title AS Title,
  departments.department as Department, roles.salary as Salary, concat(manager.first_name, ' ',manager.last_name) as Manager
  FROM roles
  JOIN employees ON roles.id = employees.role_id
  JOIN departments ON roles.department_id = departments.id
 LEFT  JOIN employees manager ON employees.manager_id = manager.id
  `;

  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });
}

function addDepartment(department) {
  db.query(
    `INSERT INTO departments (department)
  VALUES ("${department}")`,
    function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("New department added to the database");
    }
  );
}

async function addRole(name, department, salary) {
  let sql = `INSERT INTO roles (title, department_id, salary)
   VALUES ("${name}",${department},${salary})`;
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log("New role added to the database");
    }
  });
}

async function addEmployee(first_name, last_name, role_id, manager_id) {
  let sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES ("${first_name}","${last_name}",${role_id},${manager_id})`;
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(`${first_name} ${last_name} added to database`);
    }
  });
}

async function generateDepartments() {
  const results = await db.promise().query("SELECT * FROM departments");
  return results[0].map((table) => ({
    value: table.id,
    name: table.department,
  }));
}

async function generateRoles() {
  const results = await db.promise().query("SELECT * FROM roles");
  return results[0].map((table) => ({ value: table.id, name: table.title }));
}

async function generateManagers() {
  const results = await db.promise().query("SELECT * FROM employees");
  return results[0].map((table) => ({
    value: table.id,
    name: `${table.first_name} ${table.last_name}`,
  }));
}

async function updateRole(role_id, employee_id) {
  let sql = `UPDATE employees 
SET role_id = ${role_id}
WHERE id = ${employee_id}`;
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(`Updated employee's role.`);
    }
  });
}

module.exports = {
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
};
