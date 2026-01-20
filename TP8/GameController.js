class GameController {
    constructor() {
        //CONFIGURATION
        this.SERVER_TICK_RATE = 20; 
        this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE; 

        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);

        this.game = new Game();

        // Récupération des données du Portail
        this.name = localStorage.getItem("playerPseudo") || "Inconnu";
        this.serverUrl = localStorage.getItem("playerServerUrl") || "ws://localhost:8000/ws";
        this.spritePath = localStorage.getItem("skinPath") || "../assets/1.png";

        //État initial des touches
        this.inputState = {
            up: false,
            down: false,
            left: false,
            right: false,
            attack: false
        };

        // Initialisation WebSocket 
        console.log("Exo 2 : Tentative de connexion à", this.serverUrl); 
        this.socket = new WebSocket(this.serverUrl);

        //INITIALISATION DES SYSTÈMES
        this.initSocket(); 
        this.initInput();  
        this.startInputSender(); 
    }
    
    initSocket() {
        //Identification
        this.socket.onopen = () => {
            console.log(" WebSocket Connecté !"); 
            
            const identification = {
                name: this.name,
                skinPath: this.spritePath
            };

            console.log(" Envoi de l'identité au serveur...", identification);
            this.socket.send(JSON.stringify(identification));
        };
    
        // Réception des Snapshots
        this.socket.onmessage = (event) => {
            const gameStateFromServer = JSON.parse(event.data); 
            
            // Mise à jour silencieuse du modèle
            this.game.update(gameStateFromServer); 
            
            // Log occasionnel pour vérifier la réception
            if (Math.random() < 0.01) { 
                console.log(" Snapshot reçu du serveur ( Timer =", gameStateFromServer.timer, ")"); 
            }
        };

        this.socket.onerror = (error) => console.error(" Erreur WebSocket", error);
        this.socket.onclose = () => console.warn(" Connexion fermée");
    };

 
    initInput() {
        window.addEventListener("keydown", (event) => {
            let keyChanged = true;
            switch (event.code) {
                case "KeyW": this.inputState.up = true; break;
                case "KeyS": this.inputState.down = true; break;
                case "KeyA": this.inputState.left = true; break;
                case "KeyD": this.inputState.right = true; break;
                case "KeyE": this.inputState.attack = true; break;
                default: keyChanged = false;
            }
            if (keyChanged) console.log(" Touche pressée ->", event.code, "| State:", this.inputState); //
        });

        window.addEventListener("keyup", (event) => {
            switch (event.code) {
                case "KeyW": this.inputState.up = false; break;
                case "KeyS": this.inputState.down = false; break;
                case "KeyA": this.inputState.left = false; break;
                case "KeyD": this.inputState.right = false; break;
                case "KeyE": this.inputState.attack = false; break;
            }
            console.log(" Touche relâchée ->", event.code); //
        });
    }

    //Envoi régulier
    startInputSender() {
        setInterval(() => {
            if (this.socket.readyState === WebSocket.OPEN) { //
                const message = {
                    type: "input",
                    input: this.inputState
                };
                this.socket.send(JSON.stringify(message)); //
            }
        }, this.SERVER_INTERVAL);
        console.log(" Boucle d'envoi activée à", this.SERVER_TICK_RATE, "Hz"); //
    }

    // Boucle de Rendu 
    loop(timestamp) {
        requestAnimationFrame(this.loop); //

        const players = Object.values(this.game.players);
        const me = players.find(p => p.name === this.name);
        
        if (me && (this.inputState.up || this.inputState.down || this.inputState.left || this.inputState.right)) {
            
            console.log(`Mouvement détecté par le serveur -> X: ${me.x.toFixed(2)} Y: ${me.y.toFixed(2)}`);
        }
    }
}

new GameController();
