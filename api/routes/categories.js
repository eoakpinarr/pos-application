const Category = require("../models/Category.js");
const express = require("express");
const router = express.Router();

//VERİLERİ ÇEK
router.get("/get-all-category", async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (error) {
        res.status(500).json(error)
    }
})

// VERİ EKLE
router.post("/add-category", async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(200).json("İtem added succesfully.");
    } catch (error) {
        res.status(500).json(error)
    }
})

//VERİ GÜNCELLE
router.put("/update-category", async (req, res) => {
    try {
        await Category.findOneAndUpdate({ _id: req.body.categoryId }, req.body)
        res.status(200).json("Updated succesfully.");
    } catch (error) {
        res.status(500).json(error)
    }
})

//VERİ SİL
router.delete("/delete-category", async (req, res) => {
    try {
        await Category.findOneAndDelete({ _id: req.body.categoryId })
        res.status(200).json("Deleted succesfully.");
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;