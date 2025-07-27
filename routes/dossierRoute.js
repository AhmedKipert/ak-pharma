const express = require('express');
const router = express.Router();
const dossierCtrl = require('../controllers/dossierController');

// Créer un dossier
router.post('/dossiers', dossierCtrl.creerDossier);

// Tous les dossiers
router.get('/dossiers', dossierCtrl.getAllDossiers);

// Dossier par ID
router.get('/dossiers/:id', dossierCtrl.getDossierById);

// Supprimer un dossier
router.delete('/dossiers/:id', dossierCtrl.supprimerDossier);

// Ajouter consultation
router.post('/dossiers/:id/consultation', dossierCtrl.ajouterConsultation);

// Ajouter ordonnance
router.post('/dossiers/:id/ordonnance', dossierCtrl.ajouterOrdonnance);

// Ajouter examen
router.post('/dossiers/:id/examen', dossierCtrl.ajouterExamen);

module.exports = router;
