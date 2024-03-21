const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  user: 'admin',
  host: 'shrimpo.ddns.net',
  database: 'ses',
  password: 'enrollment',
  port: 5432,
});

app.use(express.json());

// Get all data
app.get('/api/courseSchedule', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM ses."courseSchedule"');
    const records = result.rows;
    client.release();
    res.json(records);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all items with the same course code
app.get('/api/courseSchedule/:courseCode', async (req, res) => {
  const courseCode = req.params.courseCode;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM ses."courseSchedule" WHERE coursecode = $1', [courseCode]);
    const records = result.rows;
    client.release();
    if (records.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(records);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a item using course code and section number
app.get('/api/courseSchedule/:courseCode/:sectionNumber', async (req, res) => {
  const { courseCode, sectionNumber } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM ses."courseSchedule" WHERE coursecode = $1 AND section = $2', [courseCode, sectionNumber]);
    const record = result.rows[0];
    client.release();
    if (!record) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(record);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new entry
app.post('/api/courseSchedule', async (req, res) => {
  const { coursecode, section, credits, meetings, professor, status } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO ses."courseSchedule" (coursecode, section, credits, meetings, professor, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [coursecode, section, credits, meetings, professor, status]);
    const newRecord = result.rows[0];
    client.release();
    res.status(201).json(newRecord);
  } catch (error) {
    console.error('Error adding record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a item using course code and section number
app.put('/api/courseSchedule/:courseCode/:sectionNumber', async (req, res) => {
  const { courseCode, sectionNumber } = req.params;
  const { credits, meetings, professor, status } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE ses."courseSchedule" SET credits = $1, meetings = $2, professor = $3, status = $4 WHERE coursecode = $5 AND section = $6 RETURNING *', [credits, meetings, professor, status, courseCode, sectionNumber]);
    const updatedRecord = result.rows[0];
    client.release();
    if (!updatedRecord) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(updatedRecord);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a item
app.delete('/api/courseSchedule/:courseCode', async (req, res) => {
  const courseCode = req.params.courseCode;
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM ses."courseSchedule" WHERE coursecode = $1', [courseCode]);
    client.release();
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a item using course code and section number
app.delete('/api/courseSchedule/:courseCode/:sectionNumber', async (req, res) => {
  const { courseCode, sectionNumber } = req.params;
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM ses."courseSchedule" WHERE coursecode = $1 AND section = $2', [courseCode, sectionNumber]);
    client.release();
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
