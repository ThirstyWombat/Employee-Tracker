const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "",
    database: "employees_db",
  },
  console.log("connected to database")
);

function showDepartments() {
  db.query("SELECT * FROM departments", function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });
}
function showRoles() {
  const sql = `SELECT roles.id AS id, roles.title AS title, departments.department_name as Department, roles.salary as Salary
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
// showDepartments();

module.exports = { showDepartments: showDepartments, showRoles: showRoles };
