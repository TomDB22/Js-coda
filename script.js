// Partie 1

// Création des variables pour la classe
const nomClasse = "B1-A";
let nombreEleves = 3;
let classeOuverte = true;

// Affichage dans la console
console.log("PARTIE 1");
console.log("Nom de la classe:", nomClasse);
console.log("Nombre d'élèves:", nombreEleves);
console.log("Classe ouverte:", classeOuverte);

// Partie 2

// Création d'un objet élève avec ses propriétés
const eleve1 = {
  prenom: "Alexis",
  noteMaths: 19,
  noteFrancais: 2
};

// Affichage du prénom
console.log("\nPARTIE 2");
console.log("Prénom de l'élève:", eleve1.prenom);

// Partie 3

// Création d'un tableau contenant plusieurs élèves
const eleves = [
  {
    prenom: "Alexis",
    noteMaths: 11,
    noteFrancais: 9
  },
  {
    prenom: "Achille",
    noteMaths: 18,
    noteFrancais: 10
  },
  {
    prenom: "Romain",
    noteMaths: 20,
    noteFrancais: 17
  },
  {
    prenom: "Théo",
    noteMaths: 12,
    noteFrancais: 14
  }
];

// Affichage des prénoms avec une boucle for
console.log("\nPARTIE 3");
for (let i = 0; i < eleves.length; i++) {
  console.log("Élève:", eleves[i].prenom);
}

// Partie 4

console.log("\nPARTIE 4");
// Pour chaque élève, calcul et affichage de la moyenne
for (let i = 0; i < eleves.length; i++) {
  const moyenne = (eleves[i].noteMaths + eleves[i].noteFrancais) / 2;
  console.log(eleves[i].prenom + " : Moyenne:", moyenne);
}

// Partie 5

console.log("\nPARTIE 5");
// Affichage "Admis" ou "Refusé" selon la moyenne
for (let i = 0; i < eleves.length; i++) {
  const moyenne = (eleves[i].noteMaths + eleves[i].noteFrancais) / 2;
  
  if (moyenne >= 10) {
    console.log(eleves[i].prenom + " : Admis");
  } else {
    console.log(eleves[i].prenom + " : Refusé");
  }
}

// Partie 6

console.log("\nPARTIE 6");
// Affichage de la mention selon la moyenne avec if/else if/else
for (let i = 0; i < eleves.length; i++) {
  const moyenne = (eleves[i].noteMaths + eleves[i].noteFrancais) / 2;
  let mention;
  
  // Conditions pour déterminer la mention
  if (moyenne >= 16) {
    mention = "Très bien";
  } else if (moyenne >= 14) {
    mention = "Bien";
  } else if (moyenne >= 12) {
    mention = "Assez bien";
  } else if (moyenne >= 10) {
    mention = "Pas de mention";
  } else {
    mention = "Pas de mention et en dessous de 10";
  }
  
  console.log(eleves[i].prenom + " : Moyenne:", moyenne, ": Mention:", mention);
}

// Partie 7

console.log("\nPARTIE 7");
// Comptage des élèves admis avec une boucle while
let compteurAdmis = 0;
let index = 0;

while (index < eleves.length) {
  const moyenne = (eleves[index].noteMaths + eleves[index].noteFrancais) / 2;
  
  if (moyenne >= 10) {
    compteurAdmis++;
  }
  
  index++;
}

console.log("Nombre d'élèves admis:", compteurAdmis);

// Bonus 
console.log("\nBONUS");

// BONUS 1: Moyenne de la classe
let totalMoyennes = 0;

// Additionner toutes les moyennes des élèves
for (let i = 0; i < eleves.length; i++) {
  const moyenne = (eleves[i].noteMaths + eleves[i].noteFrancais) / 2;
  totalMoyennes = totalMoyennes + moyenne;
}

// Diviser par le nombre d'élèves
const moyenneClasse = totalMoyennes / eleves.length;
console.log("Moyenne de la classe:", moyenneClasse);

// BONUS 2: Ajouter un nouvel élève
const nouvelEleve = {
  prenom: "Enzo",
  noteMaths: 16,
  noteFrancais: 15
};
eleves.push(nouvelEleve);
console.log("Nouvel élève ajouté:", nouvelEleve.prenom);
console.log("Nouveau nombre d'élèves:", eleves.length);

// BONUS 3: Message si tous sont admis
let tousAdmis = true;
for (let i = 0; i < eleves.length; i++) {
  const moyenne = (eleves[i].noteMaths + eleves[i].noteFrancais) / 2;
  if (moyenne < 10) {
    tousAdmis = false;
  }
}

if (tousAdmis) {
  console.log(" Félicitations ! Tous les élèves sont admis !");
} else {
  console.log("Certains élèves doivent progresser.");
}