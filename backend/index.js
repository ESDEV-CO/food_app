const express = require('express')
const mongoose = require('mongoose');

const app = express()
const port = 5000
const mongoDB = require('./db')


mongoDB()

const foodItemSchema = new mongoose.Schema({
    CategoryName: String,
    name: String,
    img: String,
    options: {
        type: Array
    },
    description: String,
});
const FoodItem = mongoose.model('food_items', foodItemSchema);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-Width,Content-Type,Accept"
    )
    next();
})
app.use(express.json())
app.use('/api', require("./Routes/CreateUser"))

app.get('/', async (req, res) => {
    try {
        const data = await FoodItem.find()
        // console.log('Data:', data);
        res.json(data);
    } catch (err) {
        // console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred' });
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})