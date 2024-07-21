// db.js

const mysql = require('mysql2');
const dotenv = require('dotenv');

// Tải các biến môi trường từ tệp .env
dotenv.config();

// Tạo kết nối đến cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Export kết nối để sử dụng trong các phần khác của ứng dụng
module.exports = connection;
