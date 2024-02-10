const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const ipAddress = '0.0.0.0';

let maintenanceMode = false;
let createdData = null;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  if (maintenanceMode) {
    res.status(503).json({
      code: 3,
      message: 'Maintenance Mode: The server is currently undergoing maintenance.'
    });
  } else {
    res.status(200).json({
      code: 1,
      message: 'Hello, this is your API!'
    });
  }
});

app.get('/loading', (req, res) => {
  if (maintenanceMode) {
    res.status(503).json({
      code: 3,
      message: 'Maintenance Mode: The server is currently undergoing maintenance.'
    });
  } else {
    res.status(200).json({
      code: 3,
      message: 'Service is running'
    });
  }
});

app.get('/getData', (req, res) => {
  if (maintenanceMode) {
    res.status(503).json({
      code: 3,
      message: 'Maintenance Mode: The server is currently undergoing maintenance.'
    });
  } else {
    res.status(200).json({
      code: 1,
      message: 'Data retrieved successfully',
      data: createdData
    });
  }
});

app.post('/toggleMaintenance', (req, res) => {
  toggleMaintenance();
  const maintenanceStatus = maintenanceMode ? 'Enabled' : 'Disabled';
  res.status(200).json({
    code: 1,
    message: `Maintenance Mode ${maintenanceStatus}`
  });
});

app.post('/createData', (req, res) => {
  createdData = req.body.data;
  res.status(200).json({
    code: 1,
    message: 'Data created successfully'
  });
});
