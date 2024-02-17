export class Professeur {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    imageUrl: string;
    numberTel: number;
    tarifh: number;
    cv: string;
    message: string;

    constructor(id: number, nom: string, prenom: string, email: string, imageUrl: string, numberTel: number, tarifh: number, cv: string, message: string) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.imageUrl = imageUrl;
        this.numberTel = numberTel;
        this.tarifh = tarifh;
        this.cv = cv;
        this.message = message;
    }
}
