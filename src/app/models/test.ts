
  export class Test {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    image: string;
    file?: File; 

    constructor(id: number, nom: string, prenom: string, email: string, image: string) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.image = image;
    }
  }
  