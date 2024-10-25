#! /usr/bin/env node

require('dotenv').config();
const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255),
  text VARCHAR(255),
  added DATE DEFAULT CURRENT_DATE
);

INSERT INTO messages (username,text,added)
VALUES
  ('Amando','Hi there!',CURRENT_DATE),
  ('Charles','Hello World!',CURRENT_DATE)
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgres://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}?sslmode=require`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();