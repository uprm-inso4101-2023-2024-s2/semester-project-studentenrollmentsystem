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
app.get('/api/coursesections', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM coursesections');
    const records = result.rows;
    client.release();
    res.json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all items with the same course code
app.get('/api/coursesections/:courseCode', async (req, res) => {
    const courseCode = req.params.courseCode;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM coursesections WHERE coursecode = $1', [courseCode]);
      const records = result.rows;
      client.release();
      if (records.length === 0) {
        return res.status(404).json({ error: 'Records not found' });
      }
      res.json(records);
    } catch (error) {
      console.error('Error fetching records:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get a item using course code and section number
app.get('/api/coursesections/:courseCode/:sectionNumber', async (req, res) => {
    const { courseCode, sectionNumber } = req.params;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM coursesections WHERE coursecode = $1 AND sectionnumber = $2', [courseCode, sectionNumber]);
      const record = result.rows[0];
      client.release();
      if (!record) {
        return res.status(404).json({ error: 'Record not found' });
      }
      res.json(record);
    } catch (error) {
      console.error('Error fetching record:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  
// Add a new entry
app.post('/api/coursesections', async (req, res) => {
  const { coursecode, sectionnumber, capacity, timeslot, professor } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO coursesections (coursecode, sectionnumber, capacity, timeslot, professor) VALUES ($1, $2, $3, $4, $5) RETURNING *', [coursecode, sectionnumber, capacity, timeslot, professor]);
    const newRecord = result.rows[0];
    client.release();
    res.status(201).json(newRecord);
  } catch (error) {
    console.error('Error adding record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a item using course code and section number
app.put('/api/coursesections/:courseCode/:sectionNumber', async (req, res) => {
    const { courseCode, sectionNumber } = req.params;
    const { capacity, timeslot, professor } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query('UPDATE coursesections SET capacity = $1, timeslot = $2, professor = $3 WHERE coursecode = $4 AND sectionnumber = $5 RETURNING *', [capacity, timeslot, professor, courseCode, sectionNumber]);
      const updatedRecord = result.rows[0];
      client.release();
      if (!updatedRecord) {
        return res.status(404).json({ error: 'Record not found' });
      }
      res.json(updatedRecord);
    } catch (error) {
      console.error('Error updating record:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Delete a item
app.delete('/api/coursesections/:courseCode', async (req, res) => {
  const courseCode = req.params.courseCode;
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM coursesections WHERE coursecode = $1', [courseCode]);
    client.release();
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a item using course code and section number
app.delete('/api/coursesections/:courseCode/:sectionNumber', async (req, res) => {
    const { courseCode, sectionNumber } = req.params;
    try {
      const client = await pool.connect();
      await client.query('DELETE FROM coursesections WHERE coursecode = $1 AND sectionnumber = $2', [courseCode, sectionNumber]);
      client.release();
      res.json({ message: 'Record deleted successfully' });
    } catch (error) {
      console.error('Error deleting record:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
