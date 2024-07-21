const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Tải các biến môi trường từ tệp .env
dotenv.config();

// Tạo một đối tượng singleton cho kết nối cơ sở dữ liệu
class Database {
  constructor() {
    if (!Database.instance) {
      this.pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });

      Database.instance = this;
    }

    return Database.instance;
  }

  // Phương thức để lấy pool kết nối
  getPool() {
    return this.pool;
  }
}

// Tạo và xuất đối tượng singleton
const instance = new Database();
Object.freeze(instance);

module.exports = instance;
