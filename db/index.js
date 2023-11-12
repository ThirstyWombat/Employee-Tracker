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

db.query("SELECT * FROM roles", function (err, results) {
  if (err) {
    console.log(err);
  }
  console.log(results);
});
