const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Get all field data
app.get('/api/v1/field-data', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM field_data');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create field data
app.post('/api/v1/field-data', async (req, res) => {
  const {
    id,
    title,
    description,
    timestamp,
    height,
    weight,
    bloodPressureSystolic,
    bloodPressureDiastolic,
    age,
    gender,
    location,
    smokingStatus,
    stressScore,
    consent,
    participantId,
  } = req.body;
  try {
    await db.query(
      'INSERT INTO field_data (id, title, description, timestamp, height, weight, blood_pressure_systolic, blood_pressure_diastolic, age, gender, location, smoking_status, stress_score, consent, participant_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        title,
        description,
        timestamp,
        height,
        weight,
        bloodPressureSystolic,
        bloodPressureDiastolic,
        age,
        gender,
        location,
        smokingStatus,
        stressScore,
        consent,
        participantId,
      ]
    );
    res.status(201).json({ message: 'Data saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete all field data
app.delete('/api/v1/field-data', async (req, res) => {
  try {
    await db.query('DELETE FROM field_data');
    res.json({ message: 'Data cleared' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));