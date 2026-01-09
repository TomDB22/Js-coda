//////////////////////// Code fourni (ne pas moidifier) ////////////////////////

// Définir la taille du tableau de notes au hasard entre 15 et 30 éléments
let taille_minimum = 7;
let taille_maximum = 10;
let taille = Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) + taille_minimum;

// Déclarer le tableau pour stocker les notes
let notes = [];
// Définir la note maximale (pas besoin de définir la note minimale car elle est 0 par défaut)
let note_maximum = 20;

// Itérer autant de fois qu'on a de notes aléatoires à générer
for (let i = 0; i < taille; i++) {
    // Générer une note aléatoire entre 0 et note_maximum (inclus)
    let note = Math.floor(Math.random() * (note_maximum + 1));
    // Ajouter la note générée au tableau
    notes.push(note);
}

///////////////////////////////////////////////////////////////////////////////

// Partie 1

console.log("PARTIE 1");

// Afficher la taille du tableau
console.log("Taille du tableau:", notes.length);

// Trouver la plus petite valeur
let plusPetite = notes[0];
for (let i = 1; i < notes.length; i++) {
    if (notes[i] < plusPetite) {
        plusPetite = notes[i];
    }
}
console.log("Plus petite valeur:", plusPetite);

// Trouver la plus grande valeur
let plusGrande = notes[0];
for (let i = 1; i < notes.length; i++) {
    if (notes[i] > plusGrande) {
        plusGrande = notes[i];
    }
}
console.log("Plus grande valeur:", plusGrande);

// Afficher le tableau complet
console.log("Tableau:", notes);

// Partie 2

console.log("\nPARTIE 2");

// Rechercher l'indice de la plus petite valeur
let indicePlusPetite = 0;
for (let i = 1; i < notes.length; i++) {
    if (notes[i] < notes[indicePlusPetite]) {
        indicePlusPetite = i;
    }
}

console.log("Plus petite valeur:", notes[indicePlusPetite]);
console.log("Son indice:", indicePlusPetite);

// Partie 3

console.log("\nPARTIE 3");

console.log("Avant l'échange:", notes);

// Échanger la plus petite valeur avec la valeur à l'indice 0
let temp = notes[0];
notes[0] = notes[indicePlusPetite];
notes[indicePlusPetite] = temp;

console.log("Après l'échange:", notes);

// Partie 4

console.log("\nPARTIE 4");

// Recréer le tableau pour recommencer le tri depuis le début
notes = [];
for (let i = 0; i < taille; i++) {
    let note = Math.floor(Math.random() * (note_maximum + 1));
    notes.push(note);
}

console.log("Tableau avant tri:", notes);

// Compteurs pour les bonus
let nombreVerifications = 0;
let nombreEchanges = 0;

// Boucle externe : parcourir chaque position du tableau
for (let i = 0; i < notes.length - 1; i++) {
    
    // Chercher l'indice de la plus petite valeur dans la partie non triée
    let indiceMin = i;
    
    // Boucle interne : trouver le minimum dans la partie restante
    for (let j = i + 1; j < notes.length; j++) {
        nombreVerifications++; // Bonus : compter les vérifications
        
        if (notes[j] < notes[indiceMin]) {
            indiceMin = j;
        }
    }
    
    // Échanger si nécessaire
    if (indiceMin !== i) {
        nombreEchanges++;
        
        let temporaire = notes[i];
        notes[i] = notes[indiceMin];
        notes[indiceMin] = temporaire;
        
        // BONUS 1 : Afficher le tableau à chaque échange
        console.log("Après échange", nombreEchanges, ":", notes);
    }
}

// Partie 5

console.log("\nPARTIE 5");
console.log("Tableau après tri:", notes);

// Bonus 1

console.log("\nBONUS 1");
console.log("Le tableau déjà affiché");

// Bonus 2

console.log("\nBONUS 2");
console.log("Nombre de vérifications:", nombreVerifications);
console.log("Nombre d'échanges:", nombreEchanges);

// Bonus 3

console.log("\nBONUS 3");

// Copier le tableau trié
let notesDecroissant = [];
for (let i = 0; i < notes.length; i++) {
    notesDecroissant.push(notes[i]);
}

console.log("Tableau avant tri décroissant:", notesDecroissant);

// Compteurs pour le tri décroissant
let verificationsDecroissant = 0;
let echangesDecroissant = 0;

// Tri par sélection en ordre décroissant
for (let i = 0; i < notesDecroissant.length - 1; i++) {
    
    // Chercher l'indice de la plus grande valeur dans la partie non triée
    let indiceMax = i;
    
    for (let j = i + 1; j < notesDecroissant.length; j++) {
        verificationsDecroissant++;
        
        // Changement ici : on cherche le maximum au lieu du minimum
        if (notesDecroissant[j] > notesDecroissant[indiceMax]) {
            indiceMax = j;
        }
    }
    
    // Échanger si nécessaire
    if (indiceMax !== i) {
        echangesDecroissant++;
        
        let temporaire = notesDecroissant[i];
        notesDecroissant[i] = notesDecroissant[indiceMax];
        notesDecroissant[indiceMax] = temporaire;
        
        console.log("Après échange", echangesDecroissant, ":", notesDecroissant);
    }
}

console.log("\nTableau après tri décroissant:", notesDecroissant);
console.log("Nombre de vérifications:", verificationsDecroissant);
console.log("Nombre d'échanges:", echangesDecroissant);