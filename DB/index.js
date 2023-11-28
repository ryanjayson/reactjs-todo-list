const mysql = require("mysql2/promise");
const fs = require("fs");
require("dotenv").config();

const seedQuery = fs.readFileSync("script/seed.sql", {
  encoding: "utf-8",
});

const mysqlConnection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  multipleStatements: true,
});

const queryTransaction = async (sql, param) => {
  try {
    const dbConnection = await mysqlConnection.getConnection();
    console.log("Seeding database...");
    // Run a query using the connection
    const result = await dbConnection.query(seedQuery, param);

    // Release the connection
    dbConnection.release();
    console.log(
      "Database mydbtask and 2 Tables (user and todos) created successfully"
    );

    return result;
  } catch (error) {
    console.error("Error executing query:", error);
  }
};

queryTransaction(seedQuery);
