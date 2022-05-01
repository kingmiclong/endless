class Death extends Phaser.Scene {
    constructor() {
        super("deathScene");
    }

    create() {
        gamePointer = this.input.activePointer;
        this.background = this.add.image(0, 0, 'deathscene').setOrigin(0);
        this.nextButton = this.add.sprite(game.config.width/2, 440, 'restart').setOrigin(0.5);
        this.backButton = this.add.sprite(game.config.width/2, 540, 'dipped').setOrigin(0.5);

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