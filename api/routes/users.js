const User = require("../models/User.js");
const express = require("express");
const router = express.Router();

//TÜM KULLANICILARI LİSTELE
router.get("/get-all-users", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).json(error)
    }
})

//ARANANI LİSTELE get a user
router.get("/", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;