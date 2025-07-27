const express = require('express');
const adminController = require('../controllers/adminController'); // importation du controller admin
const adminRouter = express.Router(); // création du router admin


// FORMULAIRE D'AJOUT
adminRouter.get('/admin/ajouter', adminController.getSignup);

// FORMULAIRE DE CONNEXION
adminRouter.get('/admin/login', adminController.getLogin);

// PAGE DES STATISTIQUES
adminRouter.get('/admin/statistique', adminController.getStatistique);

// AJOUT
adminRouter.post('/admin/ajouter', adminController.postSignup);

// CONNEXION
adminRouter.post('/admin/login', adminController.postLogin);

// DECONNEXION
adminRouter.get('/deconnexion', (req, res) => {
    res.redirect('/admin/login');
});


module.exports = adminRouter;