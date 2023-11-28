const mysql = require("mysql2/promise");

const mysqlConnection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const queryTransaction = async (sql, param) => {
  try {
    const dbConnection = await mysqlConnection.getConnection();

    // Run a query using the connection
    const [result] = await dbConnection.query(sql, param);

    // Release the connection
    dbConnection.release();

    return result;
  } catch (error) {
    console.error("Error executing query:", error);
  }
};

module.exports = queryTransaction;
