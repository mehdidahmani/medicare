const express = require("express");
const router = express.Router();
const { Users,RendezVous } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
    const { Nom, Prenom, Date_Nai, Adresse, Sexe, Num_Tel, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            Nom: Nom,
            Prenom: Prenom,
            Date_Nai: Date_Nai,
            Adresse: Adresse,
            Sexe: Sexe,
            Num_Tel: Num_Tel,
            Password: hash
        })
            .then(() => {
                res.json("SUCCESS");
            })
            .catch((error) => {
                res.status(500).json({ error: error.message });
            });
    });
});

router.get("/", async (req, res) => {
    const listAllUsers = await Users.findAll();
    res.json(listAllUsers);
});


router.post("/login", async (req, res) => {
    const { Num_Tel, password } = req.body;
    const user = await Users.findOne({ where: { Num_Tel: Num_Tel } });
    if (!user) {
        return res.json({ error: "User Doesn't Exist" }); 
    }
    bcrypt.compare(password, user.Password).then((match) => {
        if (!match) {
            return res.json({ error: "Wrong Numero telephone And Password Combination" }); 
        }
        const accessToken = sign(
            { Num_Tel: user.Num_Tel, Id_Patient: user.Id_Patient},
            "importantsecret"
        );
        res.json(accessToken);
    });
});

router.delete("/:Id_Patient", async (req, res) => {
    try {
        const patientId = req.params.Id_Patient;
        // Delete all appointments associated with the user
        await RendezVous.destroy({ where: { Id_Patient: patientId } });
        // Delete the user
        const deletedUser = await Users.destroy({ where: { Id_Patient: patientId } });
        if (deletedUser === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(204).json(); // 204 No Content status code
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
