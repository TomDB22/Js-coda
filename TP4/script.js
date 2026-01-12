// Partie 1

function genererEleves() {
    let prenoms = ["Alexis", "Théo", "Achille", "Romain", "Pierre", "Raph", "Lilian", "Tom", "Enzo", "Gaufroid"];
    let nb = Math.floor(Math.random() * 4) + 7;
    let eleves = [];
    
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
    
    return eleves;
}

// Partie 2

function afficherEleves(eleves) {
    for (let i = 0; i < eleves.length; i++) {
        console.log(eleves[i].prenom + " - " + eleves[i].moyenne.toFixed(2));
    }
}

// Partie 3

function trouverMoyenneMin(eleves, indexDepart) {
    let idx = indexDepart;
    
    for (let i = indexDepart; i < eleves.length; i++) {
        if (eleves[i].moyenne < eleves[idx].moyenne) {
            idx = i;
        }
    }
    
    return idx;
}

// Partie 4

function afficherDonnees(eleves) {
    console.log("Nombre d'élèves:", eleves.length);
    
    // Utiliser trouverMoyenneMin pour trouver la plus petite moyenne (BONUS)
    let idxMin = trouverMoyenneMin(eleves, 0);
    console.log("Plus petite moyenne:", eleves[idxMin].moyenne.toFixed(2));
    
    // Trouver la plus grande moyenne
    let max = eleves[0].moyenne;
    for (let i = 0; i < eleves.length; i++) {
        if (eleves[i].moyenne > max) {
            max = eleves[i].moyenne;
        }
    }
    console.log("Plus grande moyenne:", max.toFixed(2));
}

// Partie 5

function swap(eleves, indexA, indexB) {
    let temp = eleves[indexA];
    eleves[indexA] = eleves[indexB];
    eleves[indexB] = temp;
}

// Partie 6

function triParSelection(eleves) {
    for (let i = 0; i < eleves.length; i++) {
        // Utiliser trouverMoyenneMin (BONUS)
        let idx = trouverMoyenneMin(eleves, i);
        
        // Utiliser swap (BONUS)
        if (idx !== i) {
            swap(eleves, i, idx);
        }
    }
}

// Partie 7

// Générer les élèves
console.log("GÉNÉRATION");
let eleves = genererEleves();
afficherEleves(eleves);

// Afficher les données
console.log("\nDONNÉES");
afficherDonnees(eleves);

// Trouver le min
console.log("\nRECHERCHE MIN");
let idxMin = trouverMoyenneMin(eleves, 0);
console.log("Élève avec la plus petite moyenne:", eleves[idxMin].prenom);
console.log("Indice:", idxMin);

// Test de swap
console.log("\nTEST SWAP");
console.log("Avant swap:");
afficherEleves(eleves);
swap(eleves, 0, idxMin);
console.log("\nAprès swap:");
afficherEleves(eleves);

// Tri complet
console.log("\nTRI COMPLET");
eleves = genererEleves();
console.log("Avant tri:");
afficherEleves(eleves);

triParSelection(eleves);

console.log("\nAprès tri:");
afficherEleves(eleves);