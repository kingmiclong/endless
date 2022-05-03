class BouncingObstacle extends Obstacle {
    constructor(scene, velocity, texture) {
        // call Phaser Physics Sprite constructor
        super(scene, velocity, texture); 
        this.ySpeed = 50;
        this.yDir = (Math.floor(Math.random() * 2));
        if (this.yDir == 0) {
            this.ySpeed *= -1;
        }
        this.setVelocityY(this.ySpeed);
    }

    update() {
        if (this.isHit && this.alpha > 0) {
            this.alpha -= 0.05;
            this.setAlpha(this.alpha);
        }

        if (this.y <= 40 || this.y + 40 >= game.config.height * 2/3) {
            this.ySpeed *= -1;
            this.setVelocityY(this.ySpeed);
        }

        // add new barrier when existing barrier hits center X
        if(this.newObstacle && this.x < centerX) {
            this.newObstacle = false;
            // (recursively) call parent scene method from this context
            this.scene.addBouncingEnemy(this.parent, enemySpeed, this.texture);
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}
