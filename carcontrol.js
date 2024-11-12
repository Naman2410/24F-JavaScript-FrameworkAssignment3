const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

// Reading sampledata.json
function getData() {
    const rawData = fs.readFileSync('./data/sampledata.json', 'utf-8');
    return JSON.parse(rawData);
}

// root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Car API! Use http://localhost:3000/cars to interact with car data.');
});

// POST Request
app.post('/cars', (req, res) => {
    const data = getData();  // Read current data
    const newCar = req.body;
    data.push(newCar);

    // Add to the file
    fs.writeFileSync('./data/sampledata.json', JSON.stringify(data, null, 2));
    res.status(201).send('New car added to the list');
});

// GET Request
app.get('/cars', (req, res) => {
    const data = getData(); // Read current data
    res.json(data);
});

// PUT Request
app.put('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = getData(); // Read current data
    const car = data.find(car => car.id === id);

    if (car) {
        Object.assign(car, req.body); // Update sampledata.json
        fs.writeFileSync('./data/sampledata.json', JSON.stringify(data, null, 2));
        res.send('Car details updated!');
    } else {
        res.status(404).send('Car not found in the list');
    }
});

// DELETE Request
app.delete('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = getData(); // Read current data
    const index = data.findIndex(car => car.id === id);

    if (index !== -1) {
        data.splice(index, 1); // Remove the car
        fs.writeFileSync('./data/sampledata.json', JSON.stringify(data, null, 2));
        res.send('Car details deleted!');
    } else {
        res.status(404).send('Car not found in the list');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
