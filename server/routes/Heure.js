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

module.exports = router;
