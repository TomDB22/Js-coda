// Récupération des éléments du DOM
const startBtn = document.getElementById('start-btn');
const usernameInput = document.getElementById('username');

// Action quand on clique sur le bouton
startBtn.addEventListener('click', () => {
    const name = usernameInput.value;

    if (name.trim() !== "") {
        // On sauvegarde le nom dans le navigateur
        localStorage.setItem('playerName', name);
        
        // Message de test dans la console
        console.log("Nom enregistré : " + name);
        
        // Plus tard, on ajoutera la redirection vers index.html
        alert("Bienvenue " + name + " ! Prépare-toi au combat.");
    } else {
        alert("Entre un pseudo d'abord !");
    }
});