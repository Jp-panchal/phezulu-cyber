require('dotenv').config();
const sql = require('mssql');

const config = {
  server: process.env.AZURE_SQL_SERVER,
  database: process.env.AZURE_SQL_DATABASE,
  port: Number(process.env.AZURE_SQL_PORT) || 1433,
  user: process.env.AZURE_SQL_USER,
  password: process.env.AZURE_SQL_PASSWORD,
  options: {
    encrypt: true,
    enableArithAbort: true
  }
};

(async () => {
  try {
    console.log('Connecting to Azure SQL...');
    await sql.connect(config);
    const result = await sql.query`SELECT 1 AS connected`;
    console.log('✅ Connected:', result.recordset[0]);
    await sql.close();
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  }
})();
