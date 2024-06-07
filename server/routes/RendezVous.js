const express = require("express");
const router = express.Router();
const { RendezVous } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
    try {
        const listAllRendezVous = await RendezVous.findAll();
        res.json(listAllRendezVous);
    } catch (error) {
        console.error('Error fetching all RendezVous:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post("/", validateToken, async (req, res) => {
    try {
        const RND = req.body;
        const Id_Patient = req.user.Id_Patient;
        RND.Id_Patient = Id_Patient;
        await RendezVous.create(RND);
        res.json(RND);
    } catch (error) {
        console.error('Error creating RendezVous:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get("/:Id_RendezVous", async (req, res) => {
    try {
        const { Id_RendezVous } = req.params;
        const RND = await RendezVous.findByPk(Id_RendezVous);
        if (!RND) {
            res.status(404).json({ error: 'RendezVous not found' });
        } else {
            res.json({
                Id_RendezVous: RND.id,
                Id_Medcin: RND.Id_Medcin,
                Id_Patient: RND.Id_Patient,
                Id_Heure: RND.Id_Heure,
                Date: RND.Date
            });
        }
    } catch (error) {
        console.error('Error fetching RendezVous by Id_RendezVous:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete("/:compositeKey", async (req, res) => {
    try {
        const compositeKey = req.params.compositeKey.split("-");
        const Id_Medcin = compositeKey[0];
        const Id_Heure = compositeKey[1];
        const formattedDate = compositeKey[2]+'-'+compositeKey[3]+'-'+compositeKey[4];

        const deletedRows = await RendezVous.destroy({ where: { Id_Medcin, Id_Heure, Date: formattedDate } });
        if (deletedRows === 0) {
            res.status(404).json({ error: 'RendezVous not found' });
        } else {
            res.status(204).json(); // 204 No Content status code
        }
    } catch (error) {
        console.error('Error deleting RendezVous:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
