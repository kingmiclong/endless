class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        gamePointer = this.input.activePointer;
        this.title = this.add.image(0, 0, 'title').setOrigin(0);
        this.nextButton = this.add.sprite(game.config.width/2, 540, 'titleStart').setOrigin(0.5);
        this.nextButton.setInteractive();

        this.nextButton.on('pointerdown', () => {
            this.scene.start('instructionsScene');
        });
    }
}