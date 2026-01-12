const express = require("express");
const router = express.Router();
const { Heure } = require("../models");

router.get("/", async (req, res) => {
    try {
        const listAllHeures = await Heure.findAll();
        res.json(listAllHeures);
    } catch (error) {
        console.error('Error fetching all heures:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get("/:Id_Heure", async (req, res) => {
    try {
        const { Id_Heure } = req.params;
        const heure = await Heure.findByPk(Id_Heure);
        if (!heure) {
            res.status(404).json({ error: 'Heure not found' });
        } else {
            res.json({ heure: heure.Heure });
        }
    } catch (error) {
        console.error('Error fetching heure by Id_Heure:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post("/", async (req, res) => {
    try {
        const { Heure: heureValue } = req.body;
        if (!heureValue) {
            return res.status(400).json({ error: 'Heure time is required' });
        }
        const newHeure = await Heure.create({ Heure: heureValue });
        res.status(201).json(newHeure);
    } catch (error) {
        console.error('Error creating heure:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put("/:Id_Heure", async (req, res) => {
    try {
        const { Id_Heure } = req.params;
        const { Heure: heureValue } = req.body;

        const heure = await Heure.findByPk(Id_Heure);
        if (!heure) {
            return res.status(404).json({ error: 'Heure not found' });
        }

        await heure.update({ Heure: heureValue });
        res.json(heure);
    } catch (error) {
        console.error('Error updating heure:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete("/:Id_Heure", async (req, res) => {
    try {
        const { Id_Heure } = req.params;
        const heure = await Heure.findByPk(Id_Heure);

        if (!heure) {
            return res.status(404).json({ error: 'Heure not found' });
        }

        await heure.destroy();
        res.json({ message: 'Heure deleted successfully' });
    } catch (error) {
        console.error('Error deleting heure:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post("/generate/slots", async (req, res) => {
    try {
        const { duration } = req.body;

        if (!duration || duration <= 0) {
            return res.status(400).json({ error: 'Duration must be a positive number' });
        }

        const startHour = 8;
        const endHour = 17;
        const slots = [];

        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += duration) {
                const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;
                slots.push(timeString);
            }
        }

        await Heure.destroy({ where: {} });

        await Heure.bulkCreate(
            slots.map(time => ({ Heure: time }))
        );

        const createdHeures = await Heure.findAll();
        res.status(201).json({
            message: `Generated ${slots.length} time slots with ${duration} minute duration`,
            slots: createdHeures,
        });
    } catch (error) {
        console.error('Error generating heures:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
