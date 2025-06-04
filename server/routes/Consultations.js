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
        // Check if consultation already exists
        const existingConsultation = await Consultations.findOne({
            where: {
                Id_Medcin: CNS.Id_Medcin,
                Id_Heure: CNS.Id_Heure,
                Date: CNS.Date,
                Id_Patient: CNS.Id_Patient
            }
        });

        if (existingConsultation) {
            return res.status(400).json({ error: 'This appointment has already been consulted' });
        }

        const newConsultation = await Consultations.create(CNS);
        res.json(newConsultation);
    } catch (error) {
        console.error('Error creating consultation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;