import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'timefruit',
  user: process.env.DB_USER || 'timefruit_user',
  password: process.env.DB_PASSWORD || 'timefruit_password',
});

export default pool;