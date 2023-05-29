const Bill = require("../models/Bill.js");
const express = require("express");
const router = express.Router();

//VERİLERİ ÇEK
router.get("/get-all-bills", async (req, res) => {
    try {
        const bills = await Bill.find();
        res.send(bills);
    } catch (error) {
        res.status(500).json(error)
    }
})

// VERİ EKLE
router.post("/add-bill", async (req, res) => {
    try {
        const newBill = new Bill(req.body);
        await newBill.save();
        res.status(200).json("İtem added succesfully.");
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router;