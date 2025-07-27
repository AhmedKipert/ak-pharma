const Patient = require('../models/Patient');

// FORMULAIRE D'AJOUT
exports.getSignup = (req, res) => {
    res.render('add_patient');
}

// AJOUT
exports.postSignup = async (req, res) => {
    const informations = req.body;
    console.log(informations);
    
    const i = 1;

    try {
        // Vérification du mot de passe et de sa confirmation
        if (informations.password === informations.cpassword) {
            const hash = await bcrypt.hash(informations.password, 10); // Hachage du mot de passe
            console.log('Mot de passe haché: ', hash);

            await brouillon.genererPatient();
            // const newPatient = await new Patient({
            //     numero: parseInt(await Patient.countDocuments()) + 1,
            //     nom: informations.nom,
            //     prenom: informations.prenom,
            //     email: informations.email,
            //     age: informations.age,
            //     sexe: informations.sexe,
            //     fonction: informations.fonction,
            //     dateConsultation: informations.dateConsultation,
            //     password: hash
            // });

            // await newPatient.save();


            console.log('Patient ajouté avec succès');
            res.redirect('/patients/liste');
        } else {
            console.log('Les mots de passe ne sont pas identiques');
            res.redirect('/signup');
        }


    } catch (error) {
        console.log(error)
        res.json(error);
    }
}

// LISTE
exports.getListe =  async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 99;
        const skip = (page - 1) * limit;
        const sortBy = req.query.sortBy || 'dateConsultation';
        const order = req.query.order || 'desc'

        const totalPatients = await Patient.countDocuments();
        const totalPages = Math.ceil(totalPatients / limit);

        const patients = await Patient.find().sort({[sortBy]:order}).skip(skip).limit(limit);


        res.render('list_patient', {
            patients,
            currentPage: page,
            totalPages,
            sortBy,
            order
        });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

// RECHERCHER
exports.postRechercher= async (req, res) => {
    const id = req.body.id;
    console.log(id);
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 100;
        const skip = (page - 1) * limit;

        const totalPatients = await Patient.countDocuments();
        const totalPages = Math.ceil(totalPatients / limit);

        // const patients = await Patient.find()

        const { order = 'asc' } = req.query;
        const sortOrder = order === 'desc' ? -1 : 1;
        console.log('ID:', id)
        const patients = await Patient.find({ numero: id });

        console.log(patients);

        // const patientTrouve = await Patient.findOne({numero: id});
        if (patients) {
            res.render('list_patient', {
                patients,
                currentPage: page,
                totalPages,
                order,
                sortOrder
            });
        } else {
            res.send('Aucun resultat');
        }
    } catch (error) {
        res.json(error);
    }
}

// FORMULAIRE DE MISE A JOUR
exports.getMiseAJour = async (req, res) => {
    const id = req.params.id;
    try {
        const patient = await Patient.findById(id);
        res.render('edit_patient', { patient });
    } catch (error) {
        console.log(error)
    }
}

// MISE A JOUR
exports.postMiseAJour= async (req, res) => {
    try {
        await Patient.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.status(300).redirect('/');
    } catch (error) {
        res.json(error);
    }
}

// SUPPRESSION
exports.getSuppression = async (req, res) => {
    console.log("Identifiant: ", req.params.id);
    try {
        await Patient.deleteOne({ _id: req.params.id });
        res.status(300).redirect('/patients/liste');
    } catch (error) {
        res.json(error);
    }
}