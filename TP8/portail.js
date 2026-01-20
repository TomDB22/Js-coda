const skinContainer = document.getElementById('skin-container');
const startBtn = document.getElementById('start-btn');
const errorMsg = document.getElementById('error-message');

let selectedSkinPath = "";

// 1. Charger dynamiquement les 29 skins
for (let i = 1; i <= 29; i++) {
    const skinDiv = document.createElement('div');
    skinDiv.classList.add('skin-item');
    
    const imgPath = `assets/${i}.png`; 
    
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    const spritesheet = new Image();
    spritesheet.src = imgPath;
    
    spritesheet.onload = () => {
        ctx.drawImage(spritesheet, 0, 128, 64, 64, 0, 0, 64, 64);
    };
    
    skinDiv.appendChild(canvas);
    skinContainer.appendChild(skinDiv);

    skinDiv.addEventListener('click', () => {
        document.querySelectorAll('.skin-item').forEach(d => d.classList.remove('selected'));
        skinDiv.classList.add('selected');
        selectedSkinPath = imgPath;
    });
}

// 2. Validation, Sauvegarde et Redirection
startBtn.addEventListener('click', () => {
    const pseudo = document.getElementById('username').value.trim();
    const serverUrl = document.getElementById('server-url').value.trim();

    if (!pseudo || !serverUrl || !selectedSkinPath) {
        errorMsg.textContent = "Erreur : Tous les champs sont obligatoires !";
        return;
    }

    errorMsg.textContent = "";
    
    // Sauvegarde pour le GameController
    localStorage.setItem('pseudo', pseudo);
    localStorage.setItem('serverUrl', serverUrl);
    localStorage.setItem('skinPath', selectedSkinPath);

    console.log("Données enregistrées. Redirection...");
    
    // Changement de page vers le jeu
    window.location.href = "game.html"; 
});