const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Ensures the body is parsed
app.use(cors({
    origin: 'http://localhost:3001', // Adjust this if your React app runs on a different port
  }));
// Mock Data
let locations = [ /* Your locations data */ ];
let branches = [ /* Your branches data */ ];

// API Endpoints
app.get('/locations', (req, res) => {
  res.json(locations);
});

app.get('/branches', (req, res) => {
  res.json(branches);
});

// Delete Row Endpoint
app.delete('/delete', (req, res) => {
  console.log(req.body); // Log to verify incoming request
  const { type, location } = req.body;
  if (type === 'location') {
    locations = locations.filter((loc) => loc.location !== location);
  } else if (type === 'branch') {
    branches = branches.filter((branch) => branch.location !== location);
  }
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
