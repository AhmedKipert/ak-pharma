const Patient = require('../models/Patient');


// ACCUEIL
exports.getIndex = async (req, res) => {
    try {
        res.redirect('/landing');
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};

// LANDING
exports.getLanding = (req, res) => {
    res.render('landing');
};

// DECOUVERTE
exports.getDecouverte = (req, res) => {
    res.render('decouvrir');
};

// CONTACT
exports.getContact = (req, res) => {
    res.render('contact2');
}

// DOSSIER PATIENT
exports.getDossier = async(req, res) => {
    const patient = await Patient.findOne({numero: 55});
    res.render('dossierPatient', {patient});
}
// DOSSIER PATIENT
exports.getDossier = async(req, res) => {
    const patient = await Patient.findOne({numero: 55});
    res.render('dossierPatient', {patient});
}

// DOSSIER PATIENT
exports.getDo = async(req, res) => {
    const patient = await Patient.findOne({numero: 55});
    res.render('dossier', {patient});
}

// RENDEZ-VOUS PATIENT
exports.getRendezvous = async(req, res) => {
    const patient = await Patient.findOne({numero: 55});
    res.render('rendezvous', {patient});
}

exports.getDemo = (req, res) => {
    res.render('demo');
}