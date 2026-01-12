// ========================================
// PARTIE 5 - swap
// ========================================

function swap(eleves, indexA, indexB) {
    let temp = eleves[indexA];
    eleves[indexA] = eleves[indexB];
    eleves[indexB] = temp;
}

// ========================================
// PARTIE 6 - triParSelection
// ========================================

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