//////////////////////// Code fourni (ne pas modifier) ////////////////////////

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

// Liste de prénoms
let prenoms = ["Alexis", "Théo", "Achille", "Romain", "Pierre", "Raph", "Lilian", "Tom", "Enzo", "Gaufroid"];

// Nombre d'élèves entre 7 et 10
let nb = Math.floor(Math.random() * 4) + 7;

// Tableau d'élèves
let eleves = [];

// Créer les élèves
for (let i = 0; i < nb; i++) {
    let p = prenoms[Math.floor(Math.random() * prenoms.length)];
    let f = Math.floor(Math.random() * 21);
    let m = Math.floor(Math.random() * 21);
    let h = Math.floor(Math.random() * 21);
    let moy = (f + m + h) / 3;
    
    eleves.push({
        prenom: p,
        noteFrancais: f,
        noteMaths: m,
        noteHistoire: h,
        moyenne: moy
    });
}

// Afficher les élèves
for (let i = 0; i < eleves.length; i++) {
    console.log(eleves[i].prenom + " : " + eleves[i].moyenne.toFixed(2));
}

// Partie 2

console.log("\nPARTIE 2");

console.log("Nombre d'élèves:", eleves.length);

// Plus petite moyenne
let min = eleves[0].moyenne;
for (let i = 0; i < eleves.length; i++) {
    if (eleves[i].moyenne < min) {
        min = eleves[i].moyenne;
    }
}
console.log("Plus petite moyenne:", min.toFixed(2));

// Plus grande moyenne
let max = eleves[0].moyenne;
for (let i = 0; i < eleves.length; i++) {
    if (eleves[i].moyenne > max) {
        max = eleves[i].moyenne;
    }
}
console.log("Plus grande moyenne:", max.toFixed(2));

// Partie 3

console.log("\nPARTIE 3");

// Trouver l'indice du plus petit
let idx = 0;
for (let i = 0; i < eleves.length; i++) {
    if (eleves[i].moyenne < eleves[idx].moyenne) {
        idx = i;
    }
}

console.log("Élève:", eleves[idx].prenom);
console.log("Moyenne:", eleves[idx].moyenne.toFixed(2));
console.log("Indice:", idx);

// Partie 4

console.log("\nPARTIE 4");

console.log("Avant:");
for (let i = 0; i < eleves.length; i++) {
    console.log(eleves[i].prenom + " - " + eleves[i].moyenne.toFixed(2));
}

// Échanger
let temp = eleves[0];
eleves[0] = eleves[idx];
eleves[idx] = temp;

console.log("\nAprès:");
for (let i = 0; i < eleves.length; i++) {
    console.log(eleves[i].prenom + " - " + eleves[i].moyenne.toFixed(2));
}

// Partie 5

console.log("\nPARTIE 5");

// Refaire les élèves
eleves = [];
for (let i = 0; i < nb; i++) {
    let p = prenoms[Math.floor(Math.random() * prenoms.length)];
    let f = Math.floor(Math.random() * 21);
    let m = Math.floor(Math.random() * 21);
    let h = Math.floor(Math.random() * 21);
    eleves.push({
        prenom: p,
        noteFrancais: f,
        noteMaths: m,
        noteHistoire: h,
        moyenne: (f + m + h) / 3
    });
}

console.log("Avant tri:");
for (let i = 0; i < eleves.length; i++) {
    console.log(eleves[i].prenom + " - " + eleves[i].moyenne.toFixed(2));
}

// Compter
let comp = 0;
let ech = 0;

// Tri
for (let i = 0; i < eleves.length; i++) {
    let idx = i;
    
    for (let j = i + 1; j < eleves.length; j++) {
        comp++;
        if (eleves[j].moyenne < eleves[idx].moyenne) {
            idx = j;
        }
    }
    
    if (idx !== i) {
        ech++;
        let temp = eleves[i];
        eleves[i] = eleves[idx];
        eleves[idx] = temp;
    }
}

console.log("\nAprès tri:");
for (let i = 0; i < eleves.length; i++) {
    console.log(eleves[i].prenom + " - " + eleves[i].moyenne.toFixed(2));
}

// Partie 6

console.log("\nPARTIE 60");
console.log("Tableaux affichés ci-dessus");
console.log("Comparaisons:", comp);
console.log("Échanges:", ech);

// Bonus

console.log("\nBONUS");

console.log("Avant tri par maths:");
for (let i = 0; i < eleves.length; i++) {
    console.log(eleves[i].prenom + " - Maths: " + eleves[i].noteMaths);
}

// Tri par maths
for (let i = 0; i < eleves.length; i++) {
    let idx = i;
    for (let j = i + 1; j < eleves.length; j++) {
        if (eleves[j].noteMaths < eleves[idx].noteMaths) {
            idx = j;
        }
    }
    if (idx !== i) {
        let temp = eleves[i];
        eleves[i] = eleves[idx];
        eleves[idx] = temp;
    }
}

console.log("\nAprès tri par maths:");
for (let i = 0; i < eleves.length; i++) {
    console.log(eleves[i].prenom + " - Maths: " + eleves[i].noteMaths);
}