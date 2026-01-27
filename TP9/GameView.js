class GameView {
    constructor(game) {
        this.game = game;
        this.canvas = document.getElementById("canvas");

        this.canvas.width = 600;
        this.canvas.height = 600;

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.ctx = this.canvas.getContext("2d");
        
        // Cache pour stocker les images des sprites
        this.spriteCache = {};
        this.drawBackground();
        this.clear();
    }

    // Efface le canvas
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Dessine le fond avec grille et effets
    drawBackground() {
        const ctx = this.ctx;

        // Dégradé bleu foncé
        const gradient = ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, "#1e1e2f");
        gradient.addColorStop(1, "#0f0f1a");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.width, this.height);

        // Grille transparente
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 1;

        const gridSize = 64;

        // Lignes verticales
        for (let x = 0; x <= this.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
            ctx.stroke();
        }

        // Lignes horizontales
        for (let y = 0; y <= this.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
            ctx.stroke();
        }

        // Cadre orange autour de l'arène
        ctx.strokeStyle = "#ff914d";
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, this.width, this.height);

        // Effet lumière au centre
        const light = ctx.createRadialGradient(
            this.width / 2,
            this.height / 2,
            50,
            this.width / 2,
            this.height / 2,
            this.width / 1.2
        );

        light.addColorStop(0, "rgba(255,255,255,0.05)");
        light.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = light;
        ctx.fillRect(0, 0, this.width, this.height);
    }

    // Boucle de rendu principal
    render() {
        this.clear();
        this.drawBackground();

        // Dessine tous les joueurs
        for (let id in this.game.players) {
            let player = this.game.players[id];
            this.drawPlayer(player);
            player.animate();
        }
    }

    // Dessine un joueur avec son sprite
    drawPlayer(player) {
        if (player.isDead) return;
        
        let SPRITE_WIDTH = 64;
        let SPRITE_HEIGHT = 64;

        // Lignes du spritesheet pour chaque animation
        let IDLE_LINE_OFFSET   = 0;
        let WALK_LINE_OFFSET   = 8;
        let ATTACK_LINE_OFFSET = 54;
        let DEATH_LINE_OFFSET  = 3;

        // Position en pixels sur le canvas
        const x = player.renderX * this.width;
        const y = player.renderY * this.height;

        player.animate();   

        // Charge le sprite si pas encore en cache
        if (!this.spriteCache[player.skinPath]) {
            const img = new Image();
            img.src = player.skinPath;
            this.spriteCache[player.skinPath] = img;
            return;
        }

        const sprite = this.spriteCache[player.skinPath];
        if (!sprite.complete || sprite.naturalWidth === 0) return;

        // Inverse gauche et droite pour la direction
        let dir = player.direction;
        if (dir === 1) dir = 3;
        else if (dir === 3) dir = 1;

        // Sélection de la frame dans le spritesheet
        let frameX = 64;
        let frameY = 64 * (8 + dir);
        let middle = 32;

        // Animation de mort
        if (player.isDying) {
            frameX = player.deathSpriteIndex * SPRITE_WIDTH;
            frameY = (DEATH_LINE_OFFSET + dir) * SPRITE_HEIGHT;
        }
        // Animation d'attaque
        else if (player.isAttacking || player.attackSpriteIndex > 0 || player.currentAttackSpriteStep > 0) {
            middle = 96;
            frameX = player.attackSpriteIndex * 192;
            frameY = (ATTACK_LINE_OFFSET + dir * 3) * 64;
            SPRITE_WIDTH = 192;
            SPRITE_HEIGHT= 192;
        }
        // Animation de marche
        else if (player.isWalking) {
            frameY = (WALK_LINE_OFFSET + dir) * SPRITE_HEIGHT;
            frameX = player.walkSpriteIndex * SPRITE_WIDTH;
        }

        // Affiche le sprite
        this.ctx.drawImage(
            sprite,
            frameX,
            frameY,
            SPRITE_WIDTH,
            SPRITE_HEIGHT,
            x - middle,
            y - middle,
            SPRITE_WIDTH,
            SPRITE_HEIGHT
        );

        // Affiche les barres de vie et infos
        this.drawHUD(player, x, y);
    }

    // Dessine le nom, niveau et barres de vie
    drawHUD(player, x, y) {
        const barWidth = 60;
        const barHeight = 6;
        const offsetY = -40;

        // Nom et niveau du joueur
        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "bold 12px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`${player.name} (Lv${player.lvl})`, x, y + offsetY - 15);

        // Barre de vie
        const hpPercent = player.hp / player.maxHp;

        // Fond noir
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(x - barWidth / 2, y + offsetY, barWidth, barHeight);

        // Barre verte selon les HP
        if (hpPercent > 0.5) {
            this.ctx.fillStyle = "#00ff00";
        }
        this.ctx.fillRect(x - barWidth / 2, y + offsetY, barWidth * hpPercent, barHeight);

        // Contour blanc
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x - barWidth / 2, y + offsetY, barWidth, barHeight);

        // Barre de cooldown d'attaque
        if (player.attackCooldown && player.currentAttackCooldown !== undefined) {
            const cdPercent = 1 - (player.currentAttackCooldown / player.attackCooldown);

            // Fond noir
            this.ctx.fillStyle = "#000000";
            this.ctx.fillRect(x - barWidth / 2, y + offsetY + 8, barWidth, barHeight);

            // Barre violette de cooldown
            this.ctx.fillStyle = "#bc13fe";
            this.ctx.fillRect(x - barWidth / 2, y + offsetY + 8, barWidth * cdPercent, barHeight);

            // Contour blanc
            this.ctx.strokeStyle = "#ffffff";
            this.ctx.strokeRect(x - barWidth / 2, y + offsetY + 8, barWidth, barHeight);
        }
    }
}