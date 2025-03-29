const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

async function init() {
  const connection = await mysql.createConnection({
    host: 'db',           
    user: 'user',
    password: 'password',
    database: 'mydb'
  });

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `);

  await connection.execute('INSERT INTO users (name) VALUES (?)', ['Le Don Chung']);

  app.get('/', async (req, res) => {
    try {
      const [rows] = await connection.execute('SELECT * FROM users');
      res.json(rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
  });
}

init().catch(console.error);