class Game {
    constructor() {
        this.isRunning = false;
        this.isOver = false;
        this.timer = 0;
        this.players = {}; 
    }

    update(gameStateFromServer) {
        // Update des métadonnées
        this.isRunning = gameStateFromServer.isRunning;
        this.isOver = gameStateFromServer.isOver;
        this.timer = gameStateFromServer.timer;

        const serverPlayers = gameStateFromServer.players;

        // Update des joueurs
        for (let id in serverPlayers) {
            const data = serverPlayers[id];

            if (!this.players[id]) {
                // Si le joueur n'existe pas
                console.log(`[GAME] Nouveau joueur détecté : ${data.name}`);
                
                this.players[id] = new Player(
                    id, 
                    data.name, 
                    data.skinPath, 
                    data.position
                );
            } else {
                // Si le joueur existe déjà
                this.players[id].update(data);
            }
        }

        // Si un joueur n'est plus sur le serveur
        for (let id in this.players) {
            if (!serverPlayers[id]) {
                console.log(`[GAME] Suppression de ${this.players[id].name}`);
                delete this.players[id];
            }
        }
    }
}

// Test

// Données initiales 
const backendData = {
   "isRunning": true,
   "isOver": false,
   "timer": 190.6,
   "players": {
      "3cd71bbb-6a6b-4d4e-80e3-107130328a27": {
         "name": "blabla",
         "skinPath": "./assets/3.png",
         "position": [0.5, 0.1],
         "lvl": 1,
         "hp": 100,
         "maxHp": 100,
         "speed": 0.2,
         "direction": 2,
         "isAttacking": false,
         "isWalking": false,
         "isDying": false
      },
      "28ead291-fcea-4b41-a596-d3c876c49a53": {
         "name": "bloublou",
         "skinPath": "./assets/4.png",
         "position": [0.4, 0.2],
         "lvl": 1,
         "hp": 100,
         "maxHp": 100,
         "speed": 0.2,
         "direction": 1,
         "isAttacking": false,
         "isWalking": false,
         "isDying": false
      }
   }
};

const myGame = new Game();

console.log("TEST 1 ");
myGame.update(backendData);
console.log("Joueurs en mémoire :", Object.keys(myGame.players).length);

console.log("TEST 2 ");
// simule un changement de PV et de position pour le premier joueur
backendData.players["3cd71bbb-6a6b-4d4e-80e3-107130328a27"].hp = 50;
backendData.players["3cd71bbb-6a6b-4d4e-80e3-107130328a27"].position = [0.9, 0.9];
myGame.update(backendData);
console.log("HP 'blabla'  :", myGame.players["3cd71bbb-6a6b-4d4e-80e3-107130328a27"].hp);
console.log("Pos 'blabla' :", myGame.players["3cd71bbb-6a6b-4d4e-80e3-107130328a27"].renderX, myGame.players["3cd71bbb-6a6b-4d4e-80e3-107130328a27"].renderY);

console.log(" TEST 3 ");
// On simule la déconnexion 
delete backendData.players["28ead291-fcea-4b41-a596-d3c876c49a53"];
myGame.update(backendData);
console.log("Joueurs restants  :", Object.keys(myGame.players).length);