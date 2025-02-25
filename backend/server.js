const express = require('express');
const { Pool } = require('pg');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'chandlerwiggins', // Your Mac username—adjust if different
  host: 'localhost',
  database: 'todos',
  password: '',           // Leave blank unless you set a password
  port: 5432,             // Default Postgres port
});

// Test route
app.get('/todos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM todos');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));