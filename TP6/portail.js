const skinContainer = document.getElementById('skin-container');
const startBtn = document.getElementById('start-btn');
const errorMsg = document.getElementById('error-message');

let selectedSkinPath = "";

// 1. Charger dynamiquement les 26 skins depuis le dossier assets/
for (let i = 1; i <= 29; i++) {
    const skinDiv = document.createElement('div');
    skinDiv.classList.add('skin-item');
    
    // Chemin vers le spritesheet
    const imgPath = `assets/${i}.png`; 
    
    // Créer un canvas pour extraire la frame
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    // Charger le spritesheet
    const spritesheet = new Image();
    spritesheet.src = imgPath;
    
    spritesheet.onload = () => {
        // Extraire la frame : colonne 0, ligne 2 (3ème ligne)
        // sx, sy = position source, sw, sh = taille source
        ctx.drawImage(
            spritesheet,
            0,      // colonne 0 = x: 0
            128,    // ligne 2 = y: 64 * 2 = 128
            64,     // largeur frame
            64,     // hauteur frame
            0, 0,   // position destination dans le canvas
            64, 64  // taille destination
        );
    };
    
    skinDiv.appendChild(canvas);
    skinContainer.appendChild(skinDiv);

    // Système de sélection
    skinDiv.addEventListener('click', () => {
        document.querySelectorAll('.skin-item').forEach(d => d.classList.remove('selected'));
        skinDiv.classList.add('selected');
        selectedSkinPath = imgPath;
    });
}

// 2. Validation et Sauvegarde
startBtn.addEventListener('click', () => {
    const pseudo = document.getElementById('username').value.trim();
    const serverUrl = document.getElementById('server-url').value.trim();

    // Vérification
    if (!pseudo || !serverUrl || !selectedSkinPath) {
        errorMsg.textContent = "Erreur : Tous les champs sont obligatoires !";
        return;
    }

    // Si tout est bon, on vide l'erreur et on enregistre
    errorMsg.textContent = "";
    
    localStorage.setItem('pseudo', pseudo);
    localStorage.setItem('serverUrl', serverUrl);
    localStorage.setItem('skinPath', selectedSkinPath);

    console.log("Données enregistrées dans le localStorage.");
    alert("Prêt pour le combat !");
});
