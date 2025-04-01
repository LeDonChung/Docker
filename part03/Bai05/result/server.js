const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'postgres',
    password: 'postgres',
    port: 5432
});

app.get('/', async (req, res) => {
    const result = await pool.query('SELECT option, COUNT(*) AS votes FROM votes GROUP BY option');
    res.json(result.rows);
});

app.listen(5001, () => {
    console.log('Results app running on port 5001');
});
