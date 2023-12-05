const mysql = require('mysql2');
require('dotenv').config();


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'funko_store',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = {
    conn: pool.promise()
};