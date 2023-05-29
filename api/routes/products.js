const Product = require("../models/Product.js");
const express = require("express");
const router = express.Router();

//VERİLERİ ÇEK
router.get("/get-all-product", async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(500).json(error)
    }
})

// VERİ EKLE
router.post("/add-product", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(200).json("İtem added succesfully.");
    } catch (error) {
        res.status(500).json(error)
    }
})

//VERİ GÜNCELLE
router.put("/update-product", async (req, res) => {
    try {
        await Product.findOneAndUpdate({ _id: req.body.productId }, req.body)
        res.status(200).json("Updated succesfully.");
    } catch (error) {
        res.status(500).json(error)
    }
})

//VERİ SİL
router.delete("/delete-product", async (req, res) => {
    try {
        await Product.findOneAndDelete({ _id: req.body.productId })
        res.status(200).json("Deleted succesfully.");
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;