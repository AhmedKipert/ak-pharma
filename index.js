require('dotenv').config();
require('ejs');
const express = require('express');
const mongoose = require('mongoose'); // importation de mongoose
const mainRouter = require('./routes/mainRouter'); // routeur principal
const adminRouter = require('./routes/adminRouter'); // routeur admin
const patientRouter = require('./routes/patientRouter'); // routeur patient
const PORT = process.env.PORT || 3000;
const app = express(); // création du serveur


app.set('view engine', 'ejs'); // Définition du moteur de visualisation
app.set('views', './views'); // Dossier contenant les vues

// MIDDLEWARES
app.use(express.static('./public')); // Servir les fichiers statiques
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // encodage des données du formulaire

app.use(mainRouter)
app.use(adminRouter);
app.use(patientRouter);


// CONNEXION A LA BASE DE DONNEES
(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connexion réussie à MongoDB Atlas');
})();


// LANCEMENT DU SERVEUR
app.listen(PORT, () => {
    console.log("Serveur en écoute au port " + PORT + '...');
});