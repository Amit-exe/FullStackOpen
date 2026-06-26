const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PG_HOST,
  port: 5432,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false } // RDS requires SSL
      : false,
});

module.exports = pool;
