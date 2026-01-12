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

module.exports = router;
