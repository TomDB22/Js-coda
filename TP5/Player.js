class Player {
    constructor(name) {
        this.name = name || "Joueur" + Math.floor(Math.random() * 1000);
        this.sprite = "lpc_skin_" + Math.floor(Math.random() * 5);
        
        this.x = Math.random() * 800; 
        this.y = Math.random() * 600; 
        
        this.level = 1;
        this.hpMax = 100;
        this.hp = 100;
        this.attackDamage = 15;
        this.attackCooldown = 1000; 
        this.lastAttackTime = 0;
        
        this.speed = 5;
        this.direction = "down";
        this.regenRate = 1; 
        this.isAlive = true;
        this.kills = 0;
    }

    update() {
        if (!this.isAlive) return;
        this.regenerate();
    }

    regenerate() {
        if (this.hp < this.hpMax) {
            this.hp = Math.min(this.hp + (this.regenRate / 60), this.hpMax); 
        }
    }

    attack(target) {
        const now = Date.now();
        
        if (now - this.lastAttackTime < this.attackCooldown) return;
        if (!target || !target.isAlive) return;

        console.log(`${this.name} attaque ${target.name}`);
        target.takeDamage(this.attackDamage);
        this.lastAttackTime = now;

        if (!target.isAlive) {
            this.onKill(target);
        }
    }

    takeDamage(amount) {
        this.hp -= amount;
        console.log(`${this.name} HP: ${Math.max(0, Math.floor(this.hp))}`);

        if (this.hp <= 0) {
            this.die();
        }
    }

    onKill(victim) {
        this.kills++;
        if (victim.level > this.level) {
            this.level = victim.level;
        }
        this.levelUp();
    }

    levelUp() {
        this.level++;
        this.hpMax += 20;
        this.hp = this.hpMax; 
        this.attackDamage += 5;
        this.speed += 0.2;
        this.regenRate += 0.5;
        console.log(`${this.name} monte au niveau ${this.level}`);
    }

    move(dir) {
        if (!this.isAlive) return;
        this.direction = dir;
        if (dir === "up") this.y -= this.speed;
        if (dir === "down") this.y += this.speed;
        if (dir === "left") this.x -= this.speed;
        if (dir === "right") this.x += this.speed;
    }

    die() {
        this.isAlive = false;
        this.hp = 0;
        console.log(`${this.name} est mort`);
    }
}

const p1 = new Player("Tom");
const p2 = new Player("Alexis");

p1.move("right");
p2.move("left");

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