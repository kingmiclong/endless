class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        this.deathmusic2 = this.sound.add('deathmusic2', {
            mute: false,
            volume: 0.2,
            rate: 1,
            loop: true 
        });
        this.deathmusic2.play();

        gamePointer = this.input.activePointer;
        this.title = this.add.image(0, 0, 'title').setOrigin(0);
        this.nextButton = this.add.sprite(game.config.width/2, 540, 'titleStart').setOrigin(0.5);
        this.nextButton.setInteractive();

        this.nextButton.on('pointerdown', () => {
            this.deathmusic2.pause();
            this.sound.play('selectsound');
            this.scene.start('instructionsScene');
        });
    }
}