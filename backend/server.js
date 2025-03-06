const express = require('express');
const { Pool } = require('pg');
const app = express();

app.use(express.json());

const pool = new Pool({
  user: 'chandlerwiggins',
  host: 'localhost',
  database: 'todos',
  password: '',
  port: 5432,
});

// GET all todos
app.get('/todos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM todos');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// PUT update todo completed status
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *',
      [completed, id]
    );
    if (rows.length === 0) {
      return res.status(404).send('Todo not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));