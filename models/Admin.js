const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Veuillez entrer un email valide']
  },
  password: String,
  role: {
    type: String,
    enum: ['admin', 'medecin', 'superadmin'],
    default: 'admin',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
