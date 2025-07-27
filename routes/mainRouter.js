const express = require('express');
const mainController = require('../controllers/mainController'); // importation du controlleur principal
const mainRouter = express.Router(); // création du router principal


// PAGE D'ACCUEIL
mainRouter.get('/', mainController.getIndex);

// PAGE D'ACCUEIL
mainRouter.get('/landing', mainController.getLanding);

// DECOUVERTE
mainRouter.get('/decouvrir', mainController.getDecouverte);

// CONTACT
mainRouter.get('/contact', mainController.getContact);

// DOSSIER
mainRouter.get('/dossier', mainController.getDossier);

// DO
mainRouter.get('/do', mainController.getDo);

// DO
mainRouter.get('/rendezvous', mainController.getRendezvous);




module.exports = mainRouter;