import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_NAME || 'timefruit',
  user: process.env.DB_USER || 'timefruit_user',
  password: process.env.DB_PASSWORD || 'timefruit_password',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;