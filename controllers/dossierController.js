const DossierMedical = require('../models/DossierMedical');
const Patient = require('../models/Patient');

// Créer un nouveau dossier médical
exports.creerDossier = async (req, res) => {
  try {
    const { patientId, medecinResponsable, antecedents } = req.body;

    // Vérifier si le patient existe
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient non trouvé" });
    }

    const dossier = new DossierMedical({
      patient: patientId,
      medecinResponsable,
      antecedents
    });

    await dossier.save();
    res.status(201).json({ message: 'Dossier médical créé avec succès', dossier });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création du dossier" });
  }
};

// Obtenir tous les dossiers
exports.getAllDossiers = async (req, res) => {
  try {
    const dossiers = await DossierMedical.find().populate('patient');
    res.status(200).json(dossiers);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Obtenir un dossier par ID
exports.getDossierById = async (req, res) => {
  try {
    const dossier = await DossierMedical.findById(req.params.id).populate('patient');
    if (!dossier) {
      return res.status(404).json({ message: "Dossier non trouvé" });
    }
    res.status(200).json(dossier);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Supprimer un dossier
exports.supprimerDossier = async (req, res) => {
  try {
    const result = await DossierMedical.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Dossier introuvable" });
    }
    res.status(200).json({ message: "Dossier supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Ajouter une consultation
exports.ajouterConsultation = async (req, res) => {
  try {
    const dossier = await DossierMedical.findById(req.params.id);
    if (!dossier) {
      return res.status(404).json({ message: "Dossier introuvable" });
    }

    dossier.consultations.push(req.body);
    await dossier.save();
    res.status(200).json({ message: "Consultation ajoutée", dossier });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Ajouter une ordonnance
exports.ajouterOrdonnance = async (req, res) => {
  try {
    const dossier = await DossierMedical.findById(req.params.id);
    if (!dossier) {
      return res.status(404).json({ message: "Dossier introuvable" });
    }

    dossier.ordonnances.push(req.body);
    await dossier.save();
    res.status(200).json({ message: "Ordonnance ajoutée", dossier });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Ajouter un examen
exports.ajouterExamen = async (req, res) => {
  try {
    const dossier = await DossierMedical.findById(req.params.id);
    if (!dossier) {
      return res.status(404).json({ message: "Dossier introuvable" });
    }

    dossier.examens.push(req.body);
    await dossier.save();
    res.status(200).json({ message: "Examen ajouté", dossier });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
