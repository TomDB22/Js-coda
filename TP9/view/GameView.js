export default class GameView {
    constructor(game) {
        this.game = game;
        this.canvas = document.getElementById("canvas");

        this.canvas.width = 1000;
        this.canvas.height = 800;

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
        const gradient = ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, "#a926b3ff");
        gradient.addColorStop(1, "#3d0c5aff");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 1;
        const gridSize = 64;

        for (let x = 0; x <= this.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
            ctx.stroke();
        }
        for (let y = 0; y <= this.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
            ctx.stroke();
        }

        ctx.strokeStyle = "#000000ff";
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, this.width, this.height);
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

        this.drawGlobalHUD();

        if (this.game.isOver) {
            this.drawEndGameScreen();
        }
    }

    // Interface 
    drawGlobalHUD() {
        const ctx = this.ctx;
        const playersArray = Object.values(this.game.players);

        // 1. TIMER 
        ctx.fillStyle = "white";
        ctx.font = "bold 20px monospace";
        ctx.textAlign = "center";
        const totalSeconds = this.game.timer || 0;
        const mins = Math.floor(totalSeconds / 60);
        const secs = Math.floor(totalSeconds % 60);
        const tenths = Math.floor((totalSeconds % 1) * 10);
        ctx.fillText(`${mins}:${secs.toString().padStart(2, '0')}.${tenths}`, this.width / 2, 35);

        // 2. COMPTEUR VIVANTS
        const aliveCount = playersArray.filter(p => !p.isDead).length;
        ctx.textAlign = "left";
        ctx.font = "14px Arial";
        ctx.fillText(`JOUEUR: ${aliveCount}/${playersArray.length}`, 20, 30);

        // 3. CLASSEMENT 
        const sorted = [...playersArray].sort((a, b) => {
            if (!a.isDead && b.isDead) return -1;
            if (a.isDead && !b.isDead) return 1;
            return b.lvl - a.lvl;
        });

        const startX = this.width - 160;
        let startY = 30;
        ctx.fillStyle = "#ffffffff";
        ctx.font = "bold 12px Arial";
        ctx.fillText("CLASSEMENT", startX, startY);

        sorted.slice(0, 5).forEach((p, i) => {
            startY += 18;
            ctx.fillStyle = p.isDead ? "rgba(255,255,255,0.4)" : "white";
            ctx.font = "11px Arial";
            ctx.textAlign = "left";
            ctx.fillText(`${i + 1}. ${p.name.substring(0, 8)}`, startX, startY);
            ctx.textAlign = "right";
            ctx.fillText(p.isDead ? "×" : `L${p.lvl}`, startX + 140, startY);
        });
    }

    // Dessine un joueur 
    drawPlayer(player) {
        if (player.isDead) return;
        
        let SPRITE_WIDTH = 64;
        let SPRITE_HEIGHT = 64;
        let WALK_LINE_OFFSET = 8;
        let ATTACK_LINE_OFFSET = 54;
        let DEATH_LINE_OFFSET = 3;

        const x = player.renderX * this.width;
        const y = player.renderY * this.height;

        if (!this.spriteCache[player.skinPath]) {
            const img = new Image();
            img.src = player.skinPath;
            this.spriteCache[player.skinPath] = img;
            return;
        }

        const sprite = this.spriteCache[player.skinPath];
        if (!sprite.complete || sprite.naturalWidth === 0) return;

        let dir = player.direction;
        if (dir === 1) dir = 3;
        else if (dir === 3) dir = 1;

        let frameX = 64;
        let frameY = 64 * (8 + dir);
        let middle = 32;

        if (player.isDying) {
            frameX = player.deathSpriteIndex * SPRITE_WIDTH;
            frameY = (DEATH_LINE_OFFSET + dir) * SPRITE_HEIGHT;
        }
        else if (player.isAttacking || player.attackSpriteIndex > 0 || player.currentAttackSpriteStep > 0) {
            middle = 96;
            frameX = player.attackSpriteIndex * 192;
            frameY = (ATTACK_LINE_OFFSET + dir * 3) * 64;
            SPRITE_WIDTH = 192;
            SPRITE_HEIGHT= 192;
        }
        else if (player.isWalking) {
            frameY = (WALK_LINE_OFFSET + dir) * SPRITE_HEIGHT;
            frameX = player.walkSpriteIndex * SPRITE_WIDTH;
        }

        this.ctx.drawImage(sprite, frameX, frameY, SPRITE_WIDTH, SPRITE_HEIGHT, x - middle, y - middle, SPRITE_WIDTH, SPRITE_HEIGHT);

        // Appel de la méthode HUD 
        this.drawPlayerHUD(player, x, y);
    }

    // Barres de vie
    drawPlayerHUD(player, x, y) {
        const barWidth = 50;  
        const barHeight = 4; 
        const offsetY = -40;

        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "bold 10px Arial"; 
        this.ctx.textAlign = "center";
        this.ctx.fillText(`${player.name} (Lv${player.lvl})`, x, y + offsetY - 12);

        const hpPercent = Math.max(0, Math.min(1, player.hp / player.maxHp)); 
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(x - barWidth / 2, y + offsetY, barWidth, barHeight);
        this.ctx.fillStyle = "#00ff00";
        this.ctx.fillRect(x - barWidth / 2, y + offsetY, barWidth * hpPercent, barHeight);
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x - barWidth / 2, y + offsetY, barWidth, barHeight);

        if (player.attackCooldown && player.currentAttackCooldown !== undefined) {
            const cdPercent = Math.max(0, Math.min(1, 1 - (player.currentAttackCooldown / player.attackCooldown)));
            this.ctx.fillStyle = "#000000";
            this.ctx.fillRect(x - barWidth / 2, y + offsetY + 6, barWidth, barHeight);
            this.ctx.fillStyle = "#bc13fe";
            this.ctx.fillRect(x - barWidth / 2, y + offsetY + 6, barWidth * cdPercent, barHeight);
            this.ctx.strokeStyle = "#ffffff";
            this.ctx.strokeRect(x - barWidth / 2, y + offsetY + 6, barWidth, barHeight);
        }
    }
}