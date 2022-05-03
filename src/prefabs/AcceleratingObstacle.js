class AcceleratingObstacle extends Obstacle {
    constructor(scene, velocity, texture) {
        // call Phaser Physics Sprite constructor
        super(scene, 1, texture);         
        this.acceleration = -100 + (velocity / 2);
        this.slow = true;
    }

    update() {
        if (this.isHit && this.alpha > 0) {
            this.alpha -= 0.05;
            this.setAlpha(this.alpha);
        }

        if (this.slow && this.x <= game.config.height * 6/8) {
            this.slow = false;
            this.setAccelerationX(this.acceleration);
        }

        // add new barrier when existing barrier hits center X
        if(this.newObstacle && this.x < centerX) {
            this.newObstacle = false;
            // (recursively) call parent scene method from this context
            this.scene.addAcceleratingEnemy(this.parent, enemySpeed, this.texture);
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}