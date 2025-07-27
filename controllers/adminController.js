const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// FORMULAIRE D'AJOUT
exports.getSignup = (req, res) => {
    res.render('add_admin');
};

// AJOUT
exports.postSignup = async (req, res) => {
    const { nom, email, password, confirmPassword, role } = req.body;
    console.log("INFORMATION DE L'ADMIN", req.body)

    // Vérification des champs
    if (!nom || !email || !password || !role) {
        console.log('Veuillez remplir tous les champs');
        return res.redirect('/admin/ajouter');
    };

    // Vérification des mots de passe.
    if (password !== confirmPassword) {
        console.log('Les mots de passe ne sont pas identiques');
        return res.redirect('/admin/ajouter')
    };

    try {
        // Vérifier si l'email existe déjà
        const adminExistant = await Admin.findOne({ email });
        if (adminExistant) {
            console.log("L'adresse email existe déjà.")
            return res.redirect('/admin/ajouter');
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer l'administrateur
        const newAdmin = new Admin({
            nom,
            email,
            password: hashedPassword,
            role
        });

        await newAdmin.save();
        console.log('Administrateur ajouté avec succès.')

        const admins = await Admin.find();
        return res.render('liste_admin', { admins });

    } catch (err) {
        console.error(err);
        return res.status(500).redirect('/admin/ajouter');
    }
}

// FORMULAIRE DE CONNEXION
exports.getLogin = (req, res) => {
    res.render('admin_login', { error: '' });
};

// CONNEXION
exports.postLogin = async (req, res) => {

    const { email, password } = req.body;
    console.log("Infos: ", email, password);

    try {
        if (!email && !password) {
            console.log('Veuillez fournir vos informations de compte');
            return res.render('admin_login', { error: "Veuillez fournir vos informations de compte" });
        }

        // Trouver l'admin dans la BDD
        const admin = await Admin.findOne({ email });

        // Si l'admin n'existe pas
        if (!admin) {
            console.log('Adresse email ou mot de passe incorrecte.')
            return res.render('admin_login', { error: "Adresse email ou mot de passe incorrecte." });
        }

        await bcrypt.compare(password, admin.password, async (err, ok) => {
            if (!ok) {
                console.log('Erreur de vérification du mot de passe')
                return res.render('admin_login', { error: "Adresse email ou mot de passe incorrecte." });
            }
            const page = parseInt(req.query.page) || 100;
            const limit = 2;
            const skip = (page - 1) * limit;

            const totalPatients = await Patient.countDocuments();
            const totalPages = Math.ceil(totalPatients / limit);

            const patients = await Patient.find().skip(skip).limit(limit);



            const token = jwt.sign(
                { email: admin.email },
                SECRET_KEY = 'Sackoyaya',
                { expiresIn: '1h' }
            );
            res.render('list_patient', {
                patients,
                currentPage: page,
                totalPages,
                token
            });
        });

    } catch (error) {
        console.log(error)
    }
}

// STATISTIQUES
exports.getStatistique = (req, res) => {
    res.render('stats');
};


