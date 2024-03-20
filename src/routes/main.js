const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 5000;

const pool = new Pool({
  user: 'admin',
  host: 'shrimpo.ddns.net',
  database: 'ses',
  password: 'enrollment',
  port: 5432,
});

app.use(express.json());

// Get all data in courses table
app.get('/api/courses', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM courses');
    const records = result.rows;
    client.release();
    res.json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single item by courseCode of courses table
app.get('/api/courses/:courseCode', async (req, res) => {
    const courseCode = req.params.courseCode;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM courses WHERE coursecode = $1', [courseCode]);
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

// Get all data in the coursesections table
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

// Get all items with the same course code in coursesections table
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

// Get a item using course code and section number of coursesections table
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

// Get all events of the dailySchedule table
app.get('/api/dailySchedule', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM ses."dailySchedule"');
    const events = result.rows;
    client.release();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single event by id of the dailySchedule table
app.get('/api/dailySchedule/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM ses."dailySchedule" WHERE id = $1', [id]);
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

// Get all events of the monthlySchedule table
app.get('/api/monthlySchedule', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM ses."monthlySchedule"');
    const events = result.rows;
    client.release();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single event by id of the monthlySchedule table
app.get('/api/monthlySchedule/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM ses."monthlySchedule" WHERE id = $1', [id]);
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

//Get all the courseGrades in the courseGrades table
app.get('/api/courseGrades', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM ses."courseGrades"');
    const records = result.rows;
    client.release();
    res.json(records);
  } catch (error) {
    console.error('Error fetching course grades:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all data of the courseSchedule table
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

// Get all events in the weeklySchedule table
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

// Get a single event by id in the weeklySchedule table
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

// Add a new entry in courses table
app.post('/api/courses', async (req, res) => {
  const { coursecode, coursename, credits, prerequisites, corequisites } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO courses (coursecode, coursename, credits, prerequisites, corequisites) VALUES ($1, $2, $3, $4, $5) RETURNING *', [coursecode, coursename, credits, prerequisites, corequisites]);
    const newRecord = result.rows[0];
    client.release();
    res.status(201).json(newRecord);
  } catch (error) {
    console.error('Error adding record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new entry in coursesections table
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

// Add a new entry for course grades
app.post('/api/courseGrades', async (req, res) => {
  const { courseCode, exam1, exam2, exam3, exam4, exam5, finalExam } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO ses."courseGrades" (course, exam1, exam2, exam3, exam4, exam5, finalexam) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [courseCode, exam1, exam2, exam3, exam4, exam5, finalExam]);
    const newRecord = result.rows[0];
    client.release();
    res.status(201).json(newRecord);
  } catch (error) {
    console.error('Error adding course grade:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new entry in the courseSchedule table
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

// Add a new event in the dailySchedule table
app.post('/api/dailySchedule', async (req, res) => {
  const { title, start, end, allDay } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO ses."dailySchedule" (title, start, end, allDay) VALUES ($1, $2, $3, $4) RETURNING *', [title, start, end, allDay]);
    const newEvent = result.rows[0];
    client.release();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new event in the monthlySchedule table
app.post('/api/monthlySchedule', async (req, res) => {
  const { title, start, end, allDay } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO ses."monthlySchedule" (title, start, end, allDay) VALUES ($1, $2, $3, $4) RETURNING *', [title, start, end, allDay]);
    const newEvent = result.rows[0];
    client.release();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new event in the weeklySchedule table
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

// Update a item in courses table
app.put('/api/courses/:courseCode', async (req, res) => {
    const courseCode = req.params.courseCode;
    const { coursename, credits, prerequisites, corequisites } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query('UPDATE courses SET coursename = $1, credits = $2, prerequisites = $3, corequisites = $4 WHERE coursecode = $5 RETURNING *', [coursename, credits, prerequisites, corequisites, courseCode]);
      const updatedRecord = result.rows[0];
      client.release();
      res.json(updatedRecord);
    } catch (error) {
      console.error('Error updating record:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Update a item using course code and section number in the coursesections table
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

  // Update course grades by course code
app.put('/api/courseGrades/:courseCode', async (req, res) => {
    const courseCode = req.params.courseCode;
    const { exam1, exam2, exam3, exam4, exam5, finalExam } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query('UPDATE ses."courseGrades" SET exam1 = $1, exam2 = $2, exam3 = $3, exam4 = $4, exam5 = $5, finalexam = $6 WHERE course = $7 RETURNING *', [exam1, exam2, exam3, exam4, exam5, finalExam, courseCode]);
      const updatedRecord = result.rows[0];
      client.release();
      if (!updatedRecord) {
        return res.status(404).json({ error: 'Course grade not found' });
      }
      res.json(updatedRecord);
    } catch (error) {
      console.error('Error updating course grade:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a item using course code and section number in the courseSchedule table
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

// Update an event by id in the dailySchedule table
app.put('/api/dailySchedule/:id', async (req, res) => {
  const id = req.params.id;
  const { title, start, end, allDay } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE ses."dailySchedule" SET title = $1, start = $2, end = $3, allDay = $4 WHERE id = $5 RETURNING *', [title, start, end, allDay, id]);
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

// Update an event by id in the monthlySchedule table 
app.put('/api/monthlySchedule/:id', async (req, res) => {
  const id = req.params.id;
  const { title, start, end, allDay } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE ses."monthlySchedule" SET title = $1, start = $2, end = $3, allDay = $4 WHERE id = $5 RETURNING *', [title, start, end, allDay, id]);
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

// Update an event by id in the weeklySchedule table
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

// Delete a item in the courses table
app.delete('/api/courses/:courseCode', async (req, res) => {
  const courseCode = req.params.courseCode;
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM courses WHERE coursecode = $1', [courseCode]);
    client.release();
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a item using course code and section number in the coursesections table
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

// Delete course grades by course code in the courseGrades table
app.delete('/api/courseGrades/:courseCode', async (req, res) => {
    const courseCode = req.params.courseCode;
    try {
      const client = await pool.connect();
      await client.query('DELETE FROM ses."courseGrades" WHERE course = $1', [courseCode]);
      client.release();
      res.json({ message: 'Course grade deleted successfully' });
    } catch (error) {
      console.error('Error deleting course grade:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a item using course code and section number in the courseSchedule table
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

// Delete an event by id in the dailySchedule table
app.delete('/api/dailySchedule/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM ses."dailySchedule" WHERE id = $1', [id]);
    client.release();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an event by id in the monthlySchedule table
app.delete('/api/monthlySchedule/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM ses."monthlySchedule" WHERE id = $1', [id]);
    client.release();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an event by id in the weeklySchedule table
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
