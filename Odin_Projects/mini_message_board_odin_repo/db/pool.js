require('dotenv').config();


const { Pool } = require("pg");


module.exports = new Pool({
    connectionString: `postgres://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}?sslmode=require`
});