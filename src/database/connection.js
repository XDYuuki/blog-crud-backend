const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "blog-assignment",
    port: 3306,
});

connection.connect();

module.exports = connection;
