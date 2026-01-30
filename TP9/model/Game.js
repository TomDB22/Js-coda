import Player from "./Player.js"

export default class Game {

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




