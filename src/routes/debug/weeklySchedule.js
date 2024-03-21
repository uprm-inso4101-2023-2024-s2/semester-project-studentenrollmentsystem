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

// Get all events
app.get('/api/weeklySchedule', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM ses."weeklySchedule"');
    const events = result.rows;
    client.release();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single event by id
app.get('/api/weeklySchedule/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM ses."weeklySchedule" WHERE id = $1', [id]);
    const event = result.rows[0];
    client.release();
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new event
app.post('/api/weeklySchedule', async (req, res) => {
  const { title, start, end, allDay } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO ses."weeklySchedule" (title, start, end, allDay) VALUES ($1, $2, $3, $4) RETURNING *', [title, start, end, allDay]);
    const newEvent = result.rows[0];
    client.release();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an event by id
app.put('/api/weeklySchedule/:id', async (req, res) => {
  const id = req.params.id;
  const { title, start, end, allDay } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE ses."weeklySchedule" SET title = $1, start = $2, end = $3, allDay = $4 WHERE id = $5 RETURNING *', [title, start, end, allDay, id]);
    const updatedEvent = result.rows[0];
    client.release();
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an event by id
app.delete('/api/weeklySchedule/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM ses."weeklySchedule" WHERE id = $1', [id]);
    client.release();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
