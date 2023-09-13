const express = require('express')
const router = express.Router()
const food_items = require('../models/FoodItems')

router.get("/food-items", async (req, res) => {
    try {
        const data = await food_items.find()
        // console.log('Data:', data);
        res.json(data);
    } catch (err) {
        // console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router