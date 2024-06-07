const express = require("express");
const router = express.Router();
const { Medcin , RendezVous} = require("../models");

// GET all medcins
router.get("/", async (req, res) => {
    try {
        const listAllMedcins = await Medcin.findAll();
        res.json(listAllMedcins);
    } catch (error) {
        console.error('Error fetching medcins:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST a new medcin
router.post("/", async (req, res) => {
    try {
        const medcin = req.body;
        await Medcin.create(medcin);
        res.status(201).json(medcin); // 201 Created status code
    } catch (error) {
        console.error('Error creating medcin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.delete("/:Id_Medcin", async (req, res) => {
    try {
        const medcinId = req.params.Id_Medcin;
        // Delete all appointments associated with the doctor
        await RendezVous.destroy({ where: { Id_Medcin: medcinId } });
        // Delete the doctor
        const deletedMedcin = await Medcin.destroy({ where: { Id_Medcin: medcinId } });
        if (deletedMedcin === 0) {
            res.status(404).json({ error: 'Medcin not found' });
        } else {
            res.status(204).json(); // 204 No Content status code
        }
    } catch (error) {
        console.error('Error deleting medcin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get("/:Id_Medcin", async (req, res) => {
    try {
        const { Id_Medcin } = req.params;
        const medcin = await Medcin.findByPk(Id_Medcin);
        if (!medcin) {
            res.status(404).json({ error: 'Medcin not found' });
        } else {
            res.json({ nomMedcin: medcin.nomMedcin });
        }
    } catch (error) {
        console.error('Error fetching medcin by Id_Medcin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;
