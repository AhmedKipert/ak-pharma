const prenomFemmes = ['Esther', 'Mariame', 'Oumou', "M'ballou", 'Hawa', 'Djenaba', 'Rouguiatou', 'Fatoumata', 'Safiatou', 'Sonna', 'Tahirou', 'Fanta', 'Saran', 'Stepha', 'Pauline', 'Aïcha', 'Bountouraby', 'Mamaïssata', 'Marie', 'Agnès', 'Eveline', 'Antoinette', 'Seny', 'Nantènè', 'Catherine', 'Micheline', 'Cecile', 'Antoinette', 'Jeannette', 'Angeline'];
const prenomHommes = ['Ahmed', 'Sidya', 'Oumar', 'Fodé', 'Bana', 'Mamadou', 'Alpha', 'Seydouba', 'Lounceny', 'Salifou', 'Bakary', 'Mohammed', 'Robert', 'Jean', 'André', 'Antoine', 'Tony', 'Jules', 'Abdoulaye', 'Mamady', 'Amara', 'Bangaly', 'Francis', 'Fassou', 'Michel', 'Fodéba', 'Elhadj', 'Jacques', 'Ibrahima', 'Youssouf', 'Marcel', 'Marcelin', 'Joseph', 'Elie'];
const noms = ['Kipertino', 'Camara', 'Oularé', 'Condé', 'Konaté', 'Sacko', 'Touré', 'Diallo', 'Bah', 'Barry', 'Dabo', 'Traoré', 'Konaté', 'Doré', 'Haba', 'Loua', 'Lamah', 'Tolno', 'Sidibé', 'Kanté', 'Soumah', 'Keîta', 'Touré', 'Doumbouya', 'Nabé', 'Kourouma', 'Conté', 'Diré', 'Yansané', 'Fofana', 'Diaré', 'Milimono', 'Guilavogui', 'Bilivogui', 'Gamy', 'Mamy', 'Diané'];
const fonctions = ['Maçon', 'Infirmier', 'Docteur', 'Mécanicien', 'Informaticien', 'Chauffeur', 'Sapeur', 'Vendeuse', 'Ménagère', 'Aide maçon', 'Sociologue', 'Biologiste', 'Pêcheur', 'Taximan'];
const sexes = ['Homme', 'Femme'];
const annees = [2023, 2024, 2025];
const Patient = require('./models/Patient')

// for (let i = 0; i <= 100; i++) {
//     const choix = (Math.floor(Math.random() * 100 + 1)) % 2 === 0 ? { prenom: prenomFemmes, num: 1 } : { prenom: prenomHommes, num: 0 };

//     const preno = choix.prenom[Math.floor(Math.random() * choix.prenom.length)];

//     const no = noms[Math.floor(Math.random() * noms.length)];
//     const age = Math.max(10, Math.floor(Math.random() * 103));
//     const addEmail = preno.toLocaleLowerCase() + no.toLocaleLowerCase() + i + 821 + '@gmail.com';
//     const fonc = fonctions[Math.floor(Math.random() * fonctions.length)];
//     let sexe = sexes[choix.num];
//     console.log('SEXE NUMBER:', choix.num);

//     let jour = (Math.floor(Math.random() * 30 + 1)).toString().padStart(2, '0');
//     let mois = (Math.floor(Math.random() * 11 + 1)).toString().padStart(2, '0');
//     let annee = annees[Math.floor(Math.random() * annees.length)];

//     // let newPatient = {
//     //     nom: no,
//     //     prenom: preno,
//     //     email: addEmail,
//     //     age: age,
//     //     sexe: sexe,
//     //     fonction: fonc,
//     //     dateConsultation: jour + '/' + mois + '/' + annee
//     // };

//     let newPatient = await new Patient({
//         numero: parseInt(await Patient.countDocuments()) + 1,
//         nom: no,
//         prenom: preno,
//         email: addEmail,
//         age: age,
//         sexe: sexe,
//         fonction: fonc,
//         dateConsultation: jour + '/' + mois + '/' + annee,
//         password: hash
//     });
// }

exports.genererPatient = async() => {
    for (let i = 0; i <= 1000; i++) {
        const choix = (Math.floor(Math.random() * 100 + 1)) % 2 === 0 ? { prenom: prenomFemmes, num: 1 } : { prenom: prenomHommes, num: 0 };

        const preno = choix.prenom[Math.floor(Math.random() * choix.prenom.length)];

        const no = noms[Math.floor(Math.random() * noms.length)];
        const age = Math.max(10, Math.floor(Math.random() * 103));
        const addEmail = preno.toLocaleLowerCase() + no.toLocaleLowerCase() + i + 821 + '@gmail.com';
        const fonc = fonctions[Math.floor(Math.random() * fonctions.length)];
        let sexe = sexes[choix.num];
        console.log('SEXE NUMBER:', choix.num);

        let jour = (Math.floor(Math.random() * 30 + 1)).toString().padStart(2, '0');
        let mois = (Math.floor(Math.random() * 11 + 1)).toString().padStart(2, '0');
        let annee = annees[Math.floor(Math.random() * annees.length)];

        // let newPatient = {
        //     nom: no,
        //     prenom: preno,
        //     email: addEmail,
        //     age: age,
        //     sexe: sexe,
        //     fonction: fonc,
        //     dateConsultation: jour + '/' + mois + '/' + annee
        // };

        let newPatient = await new Patient({
            numero: parseInt(await Patient.countDocuments()) + 1,
            nom: no,
            prenom: preno,
            email: addEmail,
            age: age,
            sexe: sexe,
            fonction: fonc,
            dateConsultation: jour + '/' + mois + '/' + annee,
            password: 'hash'
        });

        newPatient.save();
    }
}

