class Player {
    constructor(name) {
        // Nom du joueur ou nom par défaut
        this.name = name || "Joueur" + Math.floor(Math.random() * 1000);
        // Image du personnage
        this.sprite = "lpc_skin_" + Math.floor(Math.random() * 5);
        
        // Position aléatoire au départ
        this.x = Math.random() * 800; 
        this.y = Math.random() * 600; 
        
        // Points de vie et niveau
        this.level = 1;
        this.hpMax = 100;
        this.hp = 100;
        this.attackDamage = 15;
        this.attackCooldown = 1000; 
        this.lastAttackTime = 0;
        
        // Vitesse et statut
        this.speed = 5;
        this.direction = "down";
        this.regenRate = 1; 
        this.isAlive = true;
        this.kills = 0;

        // Statut d'attaque pour bloquer le mouvement
        this.isAttacking = false;
    }

    // Mise à jour automatique du joueur
    update() {
        if (!this.isAlive) return;
        this.regenerate();
    }

    // Régénération de la vie
    regenerate() {
        if (this.hp < this.hpMax) {
            this.hp = Math.min(this.hp + (this.regenRate / 60), this.hpMax); 
        }
    }

    // Attaquer une cible
    attack(target) {
        const now = Date.now();
        
        // Vérifie si le délai d'attaque est passé
        if (now - this.lastAttackTime < this.attackCooldown) return;
        if (!target || !target.isAlive) return;

        // Active l'arrêt du mouvement
        this.isAttacking = true;
        console.log(`${this.name} attaque ${target.name}`);

        target.takeDamage(this.attackDamage);
        this.lastAttackTime = now;

        // Si la cible meurt on déclenche onKill
        if (!target.isAlive) {
            this.onKill(target);
        }

        // Relance le mouvement après 300ms (temps de l'attaque)
        setTimeout(() => {
            this.isAttacking = false;
        }, 300);
    }

    // Retirer des points de vie
    takeDamage(amount) {
        this.hp -= amount;
        console.log(`${this.name} HP: ${Math.max(0, Math.floor(this.hp))}`);

        // Mort si les HP arrivent à 0
        if (this.hp <= 0) {
            this.die();
        }
    }

    // Gestion du score et du niveau après un kill
    onKill(victim) {
        this.kills++;
        if (victim.level > this.level) {
            this.level = victim.level;
        }
        this.levelUp();
    }

    // Amélioration des statistiques
    levelUp() {
        this.level++;
        this.hpMax += 20;
        this.hp = this.hpMax; 
        this.attackDamage += 5;
        this.speed += 0.2;
        this.regenRate += 0.5;
        console.log(`${this.name} monte au niveau ${this.level}`);
    }

    // Changer la position selon la direction
    move(dir) {
        // Bloque le mouvement si mort ou en train d'attaquer
        if (!this.isAlive || this.isAttacking) return;

        this.direction = dir;
        if (dir === "up") this.y -= this.speed;
        if (dir === "down") this.y += this.speed;
        if (dir === "left") this.x -= this.speed;
        if (dir === "right") this.x += this.speed;
    }

    // Fin de partie pour le joueur
    die() {
        this.isAlive = false;
        this.hp = 0;
        console.log(`${this.name} est mort`);
    }
}

// Création des joueurs pour le test
const p1 = new Player("Tom");
const p2 = new Player("Alexis");

// Simulation de mouvement
p1.move("right");
p2.move("left");

// Boucle de combat automatique
const testLoop = setInterval(() => {
    if (p1.isAlive && p2.isAlive) {
        p1.update();
        p2.update();
        p1.attack(p2);
        p2.attack(p1);
    } else {
        clearInterval(testLoop);
        console.log("Simulation terminée");
        console.log(p1.isAlive ? "Tom gagne !" : "Alexis gagne !");
    }
}, 100);