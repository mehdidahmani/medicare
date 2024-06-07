const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");

app.use(cors({
    allowedHeaders: ['Content-Type', 'accessToken'], 
    origin: ['http://localhost:3000']
  }));
app.use(express.json());

// Routers
const MedcinsRouter = require("./routes/Medcins");
const RendezVousRouter = require("./routes/RendezVous");
const UsersRouter = require("./routes/Users");
const HeuresRouter = require("./routes/Heure");
const ConsultationsRouter = require("./routes/Consultations");
app.use("/rendezvous", RendezVousRouter);
app.use("/medcins", MedcinsRouter);
app.use("/auth", UsersRouter);
app.use("/heures",HeuresRouter);
app.use("/consultations",ConsultationsRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
}).catch((error) => {
    console.error("Database synchronization error:", error);
});
