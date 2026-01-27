const directions = {
    north: 0, //0
    east: 1, //3
    south: 2, //2
    west: 3, //1
}

class Player {
    constructor(id, name, skinPath, position) {
        // Unique identifier attributed by the server
        this.id = id;
        // Name of the player (chosen at portal)
        this.name = name;
        // Path to the spritesheet used to represent the player (idem)
        this.skinPath = skinPath;

        // --- RENDER positions (PARTIE 4) ---
        this.x = position[0];
        this.y = position[1];
        this.prevX = position[0];
        this.prevY = position[1];
        this.renderX = position[0];
        this.renderY = position[1];

        // --- Stats ---
        this.lvl = 1;
        this.hp = 100;
        this.maxHp = 100;
        this.speed = 0.2;

        // --- Direction & states ---
        this.direction = directions.south;
        this.isWalking = false;
        this.isAttacking = false;
        this.isDying = false;
        this.isDead = false;

        // --- Animations (remains non affected by server updates, only concernes frontend logic) ---
        this.walkSpriteIndex = 0;
        this.walkSpritesNumber = 9;
        this.currentWalkSpriteStep = 0;
        this.walkSpriteDuration = 4;

        this.attackSpriteIndex = 0;
        this.attackSpritesNumber = 6;
        this.currentAttackSpriteStep = 0;
        this.attackSpriteDuration = 7;

        this.deathSpriteIndex = 0;
        this.deathSpritesNumber = 6;
        this.currentDeathSpriteStep = 0;
        this.deathSpriteDuration = 5;
    }

    update(updateData) {
        // PARTIE 4 : Sauvegarder la position actuelle comme précédente
        this.prevX = this.x;
        this.prevY = this.y;

        // Update authoritative position
        [this.x, this.y] = updateData.position;

        // Update stats
        this.name = updateData.name
        this.lvl = updateData.lvl;
        this.hp = updateData.hp;
        this.maxHp = updateData.maxHp;
        this.attackCooldown = updateData.attackCooldown;
        this.currentAttackCooldown = updateData.currentAttackCooldown;
        this.speed = updateData.speed;

        this.direction = updateData.direction;
        this.isAttacking = updateData.isAttacking;
        this.isWalking = updateData.isWalking;
        this.isDying = updateData.isDying;
        this.skinPath = updateData.skinPath;
    }

    animate() {

        // If the player is dying, or the dying animation already started
        if (this.isDying || this.currentDeathSpriteStep > 0 || this.deathSpriteIndex > 0) {
            // No resets here as this will be the last animation of the player (ce n'est qu'un au revoir bebou).
            // Increment the current death sprite step to display the current death animation sprite for the right number of frames
            this.currentDeathSpriteStep++;
            // If we displayed it for long enough
            if (this.currentDeathSpriteStep >= this.deathSpriteDuration) {
                // Then we reset our step and increment our sprite index to go for the next sprite in the animation
                this.currentDeathSpriteStep = 0;
                this.deathSpriteIndex++;
            }
            // If we reach the last sprite in the animation and try going for the next one
            if (this.deathSpriteIndex >= this.deathSpritesNumber) {
                // It means the animation is over ; we set isDead at true to keep the player from being displayed in next frames
                // e.g, we make it disappear like in the good old URSS days.
                this.isDead = true;
            }
        }

        // If the player is walking
        else if (this.isWalking) {
            // Reset attack sprite index and current attack sprite's step to 0 as we may have interrupted an attack animation
            this.attackSpriteIndex = 0;
            this.currentAttackSpriteStep = 0;

            // Increment the current walk sprite step to display the current walking animation sprite for the right number of frames
            this.currentWalkSpriteStep++;
            // If we displayed it for long enough
            if (this.currentWalkSpriteStep >= this.walkSpriteDuration) {
                // Then we reset our step and increment our sprite index to go for the next sprite in the animation
                this.currentWalkSpriteStep = 0;
                this.walkSpriteIndex++;
            }
            // If we reach the last sprite in the animation and try going for the next one
            if (this.walkSpriteIndex >= this.walkSpritesNumber) {
                // We reset our index to display the first sprite of the animation instead, forming a looping animation
                this.walkSpriteIndex = 0;
            }
        }
        // If the player is attacking, or the attack animation started already
        else if (this.isAttacking || this.currentAttackSpriteStep > 0 || this.attackSpriteIndex > 0) {
            // Reset the walking animation variables as we may have interrupted a walking animation
            this.currentWalkSpriteStep = 0;
            this.walkSpriteIndex = 0;
            
            // Increment the current attack sprite step to display the current attacking animation sprite for the right number of frames
            this.currentAttackSpriteStep++;
            // If we displayed it for long enough
            if (this.currentAttackSpriteStep >= this.attackSpriteDuration) {
                // Then we reset our step and increment our sprite index to go for the next sprite in the animation
                this.currentAttackSpriteStep = 0;
                this.attackSpriteIndex++;
            }
            // If we reach the last sprite in the animation and try going for the next one
            if (this.attackSpriteIndex >= this.attackSpritesNumber){
                this.attackSpriteIndex = 0;
            }
        }

        // If the player is idle
        else {
            // We just select the first sprite of its walking animation
            this.walkSpriteIndex = 0;
        }
    }

    // PARTIE 4 : Méthode d'interpolation
    interpolate(alpha) {
        this.renderX = this.prevX + (this.x - this.prevX) * alpha;
        this.renderY = this.prevY + (this.y - this.prevY) * alpha;
    }
}