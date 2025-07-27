const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  motif: String,
  diagnostic: String,
  traitement: String,
  observations: String
});

const OrdonnanceSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  medicaments: [
    {
      nom: String,
      posologie: String,
      duree: String
    }
  ],
  remarques: String
});

const ExamenSchema = new mongoose.Schema({
  type: String,
  date: { type: Date, default: Date.now },
  resultats: String,
  fichier: String
});

const DossierMedicalSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  numeroDossier: { type: String, unique: true },
  dateCreation: { type: Date, default: Date.now },
  medecinResponsable: { type: String },

  antecedents: {
    allergies: [String],
    maladiesChroniques: [String],
    chirurgies: [String],
    famille: [String]
  },

  consultations: [ConsultationSchema],
  ordonnances: [OrdonnanceSchema],
  examens: [ExamenSchema],

  rendezVous: [
    {
      date: Date,
      motif: String
    }
  ]
});

// 🔐 Génération automatique du numéro de dossier
DossierMedicalSchema.pre('save', function (next) {
  if (!this.numeroDossier) {
    const now = new Date();
    const formattedDate = now
      .toISOString()
      .replace(/[-:.TZ]/g, '') // Format compact
      .slice(0, 14); // YYYYMMDDHHMMSS
    const random = Math.floor(1000 + Math.random() * 9000); // 4 chiffres aléatoires
    this.numeroDossier = `DOS-${formattedDate}-${random}`;
  }
  next();
});

module.exports = mongoose.model('DossierMedical', DossierMedicalSchema);
