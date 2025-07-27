const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    numero: Number,
    nom: String,
    prenom: String,
    email: String,
    age: Number,
    sexe: String,
    fonction: String,
    password: String,
    dateConsultation: {
        type: String,
        required: true,
        default: new Date().toLocaleDateString()
    }
});

module.exports = new mongoose.model('Patient', schema);