class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene");
    }

    create() {
        this.deathmusic2 = this.sound.add('deathmusic2', {
            mute: false,
            volume: 0.25,
            rate: 1.4,
            loop: true 
        });
        this.deathmusic2.play()
        gamePointer = this.input.activePointer;
        this.background = this.add.image(0, 0, 'instructions').setOrigin(0);
        this.nextButton = this.add.sprite(game.config.width/2, 440, 'instructionNext').setOrigin(0.5);
        this.backButton = this.add.sprite(game.config.width/2, 540, 'instructionBack').setOrigin(0.5).setScale(0.5);

        this.nextButton.setInteractive();
        this.backButton.setInteractive();

        this.nextButton.on('pointerdown', () => {
            this.deathmusic2.pause();
            this.sound.play('selectsound');
            this.scene.start('playScene');
        });

        this.backButton.on('pointerdown', () => {
            this.deathmusic2.pause();
            this.sound.play('selectsound');
            this.scene.start('menuScene');
        });
    }
}