const { Pool } = require('pg');
require('dotenv').config();

const connectionObj = {
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBNAME,
  password: process.env.DBPASSWORD,
};

if (
  !process.env.DBUSER &&
  !process.env.DBHOST &&
  !process.env.DBNAME &&
  !process.env.DBPASSWORD
) {
  throw new Error('Configuration credentials are missing');
}

module.exports = new Pool(connectionObj);
