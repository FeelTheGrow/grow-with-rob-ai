import { Pool } from 'pg';

const pool = new Pool({
  user: 'uplo8ijbo2gjg',
  host: '35.214.251.158',
  database: 'db74s3hbdjhfej',
  password: 'qhs2KcdCsPmdFokwx8eVvkiv3gwCMGph',
  port: 5432,
});

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error executing query', { text, error });
    throw error;
  }
};

export default pool; 