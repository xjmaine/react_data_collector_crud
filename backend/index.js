require('dotenv').config();
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// GET /api/v1/field-data
app.get('/api/v1/field-data', (req, res) => {
  const query = 'SELECT * FROM field_data';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// POST /api/v1/field-data
app.post('/api/v1/field-data', (req, res) => {
  const fieldData = req.body;
  // Convert ISO 8601 timestamp to MySQL DATETIME format (YYYY-MM-DD HH:MM:SS)
  const timestamp = new Date(fieldData.timestamp).toISOString().slice(0, 19).replace('T', ' ');

  const query = `
    INSERT INTO field_data (
      id, title, description, timestamp, height, weight,
      blood_pressure_systolic, blood_pressure_diastolic, age, gender,
      location, smoking_status, stress_score, consent, participant_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    fieldData.id,
    fieldData.title,
    fieldData.description,
    timestamp,
    fieldData.height,
    fieldData.weight,
    fieldData.bloodPressureSystolic,
    fieldData.bloodPressureDiastolic,
    fieldData.age,
    fieldData.gender,
    fieldData.location,
    fieldData.smokingStatus || null,
    fieldData.stressScore || null,
    fieldData.consent,
    fieldData.participantId,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    console.log('Data inserted successfully:', fieldData.id);
    res.status(201).json({ message: 'Data saved', id: fieldData.id });
  });
});

// DELETE /api/v1/field-data
app.delete('/api/v1/field-data', (req, res) => {
  const query = 'DELETE FROM field_data';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Data cleared' });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});