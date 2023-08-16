const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "app-programing",
    port: 3306,
});

connection.connect();

module.exports = connection;
