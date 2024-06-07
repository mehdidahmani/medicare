const express = require("express");
const router = express.Router();
const { Consultations } = require("../models");

router.get("/", async (req, res) => {
    try {
        const listAllConsultations = await Consultations.findAll();
        res.json(listAllConsultations);
    } catch (error) {
        console.error('Error fetching consultations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post("/", async (req, res) => {
    const CNS = req.body;
    try {
        const newConsultation = await Consultations.create(CNS);
        res.json(newConsultation);
    } catch (error) {
        console.error('Error creating consultation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
