
const LABELS = {
    childSurname: "Nom de l'enfant - Surname of the child",
    childGivenName: "Prénoms de l'enfant - Given names of the child",
    childDateBirth: "Né(e) le - Born on the",
    childPlaceBirth: "A - At",
    childSex: "De sexe - Sex",

    fatherName: "De - Of",
    fatherBornAt: "Né à - Born At",
    fatherBornOn: "Le - On the" ,
    fatherResidence: "Domicilié à - Resident at",
    fatherOccupation: "Profession - Occupation",
    fatherNationality: "Nationalité - Nationality",
    fatherDocument: "Document de référence - Reference Document" ,  

    motherName: "Et de - And of",
    motherBornAt: "Née à - Born at",
    motherBornOn: "Le - On the" ,
    motherResidence: "Domiciliée à - Resident at",
    motherOccupation: "Profession - Occupation",
    motherNationality: "Nationalité - Nationality",
    motherDocument: "Document de référence - Reference Document" ,  

    declarer: "Sur la déclaration de - In accordance with the declaration of",
    registrationDate: "Dressé le - Drawn up on the",
    regitrationCenter: "CENTRE D'ETAT-CIVIL - CIVIL STATUS REGISTRATION CENTRE",
    officer: "Officier d'Etat-Civil - Civil Status Registrar",
    secretary: "Secretaire d'Etat-Civil - Secretary",
    document: "ACTE DE NAISSANCE / BIRTH CERTIFICATE",

    status: "STATUT / STATUS",
    observations: "OBSERVATIONS",

}

 const  STATUS ={
        ENROLLED: 'enrolled',
        NEW: 'new',
        REVOCATED: 'revocated'
    }


const ROLES = {
    ADMIN: 'admin',
        SECRETARY: 'secretary',
        VISITOR: 'visitor'
}


export default {
    STATUS,
    ROLES,
    LABELS
};