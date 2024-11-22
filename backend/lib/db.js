import pg from 'pg';
const { Pool } = pg;
import * as dotenv from 'dotenv'
import errorHandler from '../middleware/errorHandler.js';

dotenv.config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

const testDbConnection = async () => {
  try {
    await pool.query('SELECT NOW()')
    console.log('Connected to the database on port :', process.env.DB_PORT )
  } catch (err) {
    errorHandler(err)
  }
};
testDbConnection()

export default pool;