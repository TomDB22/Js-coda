// Partie 1 – genererEleves

// Fonction qui génère un tableau d'élèves avec des notes aléatoires et calcule la moyenne
function genererEleves() {
    let taille_minimum = 7;
    let taille_maximum = 10;

    // Génération aléatoire du nombre d'élèves dans la classe
    let taille = Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) + taille_minimum;

    // Tableau qui contiendra les étudiants
    let students = [];

    // Note maximale possible pour une matière
    let note_maximum = 20;

    // Liste de prénoms possibles
    let names = ["Tom", "Alexis", "Achille", "Théo", "Raph"];

    // Boucle pour générer chaque élève avec des notes aléatoires
    for (let i = 0; i < taille; i++) {
        let indice_random = Math.floor(Math.random() * (names.length));
        students.push({
            firstName : names[indice_random],
            noteMath : Math.floor(Math.random() * (note_maximum + 1)),
            noteFrancais : Math.floor(Math.random() * (note_maximum + 1)),
            noteHistoire : Math.floor(Math.random() * (note_maximum + 1)),
        });
    }

    // Calcul de la moyenne pour chaque étudiant et ajout de la propriété moyenne
    for (let stud of students) {
        let moyenne = (stud.noteMath + stud.noteFrancais + stud.noteHistoire) / 3;
        stud.moyenne = Number(moyenne.toFixed(2)); // toFixed pour limiter à 2 décimales
    }

    return students; // Retourne le tableau d'élèves
}

// Partie 2 – afficherEleves 

// Fonction pour afficher les élèves avec leur prénom et leur moyenne
function afficherEleves(students) {
    for (let stud of students) {
        console.log(stud.firstName, ':', stud.moyenne);
    }
}

// Partie 3 – trouverMoyenneMin  

// Fonction qui trouve l'indice de l'élève ayant la plus petite moyenne à partir d'un index donné
function trouverMoyenneMin(students, indexDepart) {
    let min_moyenne = students[indexDepart].moyenne;
    let indice = 0;

    for (let i = indexDepart + 1; i < students.length; i++) {
        if (min_moyenne > students[i].moyenne) {
            min_moyenne = students[i].moyenne;
            indice = i;
        }    
    }

    return indice; // Retourne l'indice du minimum
}

// Fonction qui trouve l'indice de l'élève ayant la plus grande moyenne à partir d'un index donné
function trouverMoyenneMax(students, indexDepart) {
    let max_moyenne = students[indexDepart].moyenne;
    let indice = 0;

    for (let i = indexDepart + 1; i < students.length; i++) {
        if (max_moyenne < students[i].moyenne) {
            max_moyenne = students[i].moyenne;
            indice = i;
        }    
    }

    return indice; // Retourne l'indice du maximum
}

// Partie 4 – afficherDonnees

// Fonction qui affiche le nombre d'élèves, la moyenne minimale et maximale
// Utilise les fonctions trouverMoyenneMin et trouverMoyenneMax pour obtenir les indices
function afficherDonnees(students) {
    let indexDepart = 1;
    console.log("Nombre d'élèves :", students.length);
    console.log("Moyenne minimum :", students[trouverMoyenneMin(students, indexDepart)].moyenne);
    console.log("Moyenne maximum :", students[trouverMoyenneMax(students, indexDepart)].moyenne);
}

// Partie 5 – swap

// Fonction pour échanger deux élèves dans le tableau à l'aide de leurs indices
function swap(students, indexA, indexB) {
    let tmp = students[indexA];
    students[indexA] = students[indexB];
    students[indexB] = tmp;
}

// Partie 6 – triParSelection

// Fonction qui trie le tableau d'élèves par ordre croissant de moyenne avec un tri par sélection
// Utilise la fonction swap pour échanger les éléments
function triParSelection(students) {
    for (let j = 0; j < students.length - 1; j++) {
        for (let i = j + 1; i < students.length; i++) {
            if (students[j].moyenne > students[i].moyenne) {
                swap(students, j, i) // Échange les élèves si nécessaire
            }   
        }
    }
}

// Partie 7 – Appel des fonctions

// Génération des élèves
let students = genererEleves();

// Affichage des données générales (nombre d'élèves, min et max)
afficherDonnees(students);

// Affichage du tableau avant tri
console.log(" AVANT TRI ");
afficherEleves(students);

// Tri du tableau par sélection
triParSelection(students);

// Affichage du tableau après tri
console.log(" APRÈS TRI ");
afficherEleves(students);

//console.log(students); // Pour vérifier le tableau complet d'objets si nécessaire