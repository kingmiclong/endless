class Death extends Phaser.Scene {
    constructor() {
        super("deathScene");
    }

    create() {
        this.deathmusic2 = this.sound.add('deathmusic2', {
            mute: false,
            volume: 0.25,
            rate: 1,
            loop: true 
        });
        this.deathmusic2.play();

        gamePointer = this.input.activePointer;
        this.background = this.add.image(0, 0, 'deathscene').setOrigin(0);
        this.nextButton = this.add.sprite(game.config.width/2, 440, 'restart').setOrigin(0.5);
        this.backButton = this.add.sprite(game.config.width/2, 540, 'instructionBack').setOrigin(0.5);

        this.nextButton.setInteractive();
        this.backButton.setInteractive();

        this.nextButton.on('pointerdown', () => {
            this.deathmusic2.pause()
            this.sound.play('selectsound');
            this.scene.start('playScene');
        });

        this.backButton.on('pointerdown', () => {
            this.deathmusic2.pause()
            this.sound.play('selectsound');
            this.scene.start('menuScene');
        });

        this.background = this.add.image(88, 300, 'yourscore').setOrigin(0).setScale(0.6);

        let endscoreConfig = {
            fontFamily: 'fantasy',
            fontSize: '28px',
            //backgroundColor: '#0000',
            color: '#00f5ff',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        this.add.text(350, 305, score, endscoreConfig).setScale(1.3);
    }
}
