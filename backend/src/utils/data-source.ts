import { DataSource } from 'typeorm';
import { TimeRecord } from '../models/TimeRecord';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'timefruit_user',
  password: process.env.DB_PASSWORD || 'timefruit_password',
  database: process.env.DB_NAME || 'timefruit',
  synchronize: false,
  logging: false,
  entities: [TimeRecord],
  migrations: [],
  subscribers: [],
});