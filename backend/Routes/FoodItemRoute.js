const express = require('express')
const router = express.Router()
const food_items = require('../models/FoodItems')
const Category = require("../models/FoodCategory")

router.get("/foodData", async (req, res) => {
    try {
        const foodData = await food_items.find()
        // console.log('foodData:', foodData);
        res.json(foodData);
    } catch (err) {
        // console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.post("/category", async (req, res) => {
    try {
        const { CategoryName } = req.body; // Extract the "CategoryName" from the request body

        if (!CategoryName) {
            return res.status(400).json({ error: 'CategoryName is required' });
        }

        const newCategory = new Category({ CategoryName });
        await newCategory.save();
        res.json({ success: true, category: newCategory });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.get("/categories", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({ success: true, categories });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router