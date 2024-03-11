const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001; // Port.

app.use(cors());
app.use(bodyParser.json());

app.post('/saveToFile', (req, res) => {
  const { text } = req.body;

  try {
    fs.appendFileSync('./dumbdata.csv', text);
    res.status(200).send('File saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving file');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
