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

// Get all professors' office hours
app.get('/api/profOfficeHours', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM ses."profOHspring2024"');
      const records = result.rows;
      client.release();
      res.json(records);
    } catch (error) {
      console.error('Error fetching professors\' office hours:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Add a new professor's office hours
  app.post('/api/profOfficeHours', async (req, res) => {
    const { professor, officeHours, officeLocation } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query('INSERT INTO ses."profOHspring2024" (professor, officeHours, officeLocation) VALUES ($1, $2, $3) RETURNING *', [professor, officeHours, officeLocation]);
      const newRecord = result.rows[0];
      client.release();
      res.status(201).json(newRecord);
    } catch (error) {
      console.error('Error adding professor\'s office hours:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Update a professor's office hours by id
  app.put('/api/profOfficeHours/:id', async (req, res) => {
    const id = req.params.id;
    const { professor, officeHours, officeLocation } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query('UPDATE ses."profOHspring2024" SET professor = $1, officeHours = $2, officeLocation = $3 WHERE id = $4 RETURNING *', [professor, officeHours, officeLocation, id]);
      const updatedRecord = result.rows[0];
      client.release();
      if (!updatedRecord) {
        return res.status(404).json({ error: 'Professor\'s office hours not found' });
      }
      res.json(updatedRecord);
    } catch (error) {
      console.error('Error updating professor\'s office hours:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Delete a professor's office hours by id
  app.delete('/api/profOfficeHours/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const client = await pool.connect();
      await client.query('DELETE FROM ses."profOHspring2024" WHERE id = $1', [id]);
      client.release();
      res.json({ message: 'Professor\'s office hours deleted successfully' });
    } catch (error) {
      console.error('Error deleting professor\'s office hours:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

 // Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
