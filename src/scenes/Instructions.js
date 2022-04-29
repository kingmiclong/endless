class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene");
    }

    create() {
        gamePointer = this.input.activePointer;
        this.background = this.add.image(0, 0, 'instructions').setOrigin(0);
        this.nextButton = this.add.sprite(game.config.width/2, 440, 'instructionNext').setOrigin(0.5);
        this.backButton = this.add.sprite(game.config.width/2, 540, 'instructionBack').setOrigin(0.5);

        this.nextButton.setInteractive();
        this.backButton.setInteractive();

        this.nextButton.on('pointerdown', () => {
            this.scene.start('playScene');
        });

        this.backButton.on('pointerdown', () => {
            this.scene.start('menuScene');
        });
    }
}