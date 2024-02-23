import pkg from 'pg';
const  { Client } = pkg;

const client = new Client({
  host: 'shrimpo.ddns.net',
  port: 5432,
  database: 'ses',
  user: 'admin',
  password: 'enrollment',
});

client.connect()
  .then(() => {
    console.log('Connected to the database');
    return client.query('SELECT * FROM courses');
  })
  .then((result) => {
    const courses = result.rows;
    console.log('Courses:', courses);
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  })
  .finally(() => {
    client.end();
  });
