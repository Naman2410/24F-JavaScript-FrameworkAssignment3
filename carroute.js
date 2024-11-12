const express = require('express');
const app = express();
const data = require('./data/sampledata.json'); // Assuming your JSON file is in the data folder
const port = 3000;

app.get('/cars', (req, res) => {
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/cars`);
});

