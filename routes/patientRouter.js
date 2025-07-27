const express = require('express');
const patientController = require('../controllers/patientController'); // importation du controlleur
const patientRouter = express.Router(); // Création du router

// Page d'ajout de patient
const brouillon = require('../brouillon');

// FORMULAIRE D'AJOUT
patientRouter.get('/patient/ajouter', patientController.getSignup);

// AJOUT
patientRouter.post('/patient/ajouter', patientController.postSignup);

// LISTE
patientRouter.get('/patients/liste', patientController.getListe);

// RECHERCHER
patientRouter.post('/patient/trouver', patientController.postRechercher);

// FORMULAIRE DE MISE A JOUR
patientRouter.get('/patient/modifier/:id', patientController.getMiseAJour);

// MISE A JOUR
patientRouter.post('/patient/modifier/:id', patientController.postMiseAJour);

// SUPPRESSION
patientRouter.get('/patient/supprimer/:id', patientController.getSuppression);


// EXPORTATION DU ROUTER
module.exports = patientRouter;