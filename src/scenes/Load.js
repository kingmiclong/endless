class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {

        this.load.audio('walk3', './assets/walk3.wav');
        this.load.audio('heart', './assets/heart.wav');
        this.load.audio('heartspawn', './assets/heartspawn.wav');
        this.load.audio('ghost_die', './assets/ghost_die.wav');
        this.load.audio('bg_music', './assets/bg_music.wav');
        this.load.audio('deathmusic2', './assets/deathmusic2.wav');
        this.load.audio('selectsound', './assets/selectsound.wav');
        // All title assets
        this.load.image('title','./assets/startscreen.png');
        this.load.image('instructions','./assets/introduction_3.png');
        this.load.image('instructionBack','./assets/introductionTitleText.png');
        this.load.image('instructionNext','./assets/introductionContinueText.png');
        this.load.image('titleStart','./assets/clicktostartText.png');
        this.load.image('titleCredits','./assets/creditText.png');
        this.load.image('yourscore','./assets/yourscore.png');
        this.load.image('scoreback','./assets/scoreback.png');


        //player death scene
        this.load.image('restart','./assets/restart.png');
        this.load.image('dipped','./assets/dipped.png');
        this.load.image('deathscene','./assets/deathscene.png');

        //place back ground 
        this.load.image('magicworld', './assets/magicworld.png');
        this.load.image('blocker','./assets/bar.png');

        // Static image assets
        this.load.image('healthbarFull','./assets/healthbarFull.png')
        this.load.image('healthbarEmpty','./assets/healthbarEmpty.png')
        this.load.image('botUI','./assets/underUI.png')

        // Game Assets
        this.load.spritesheet('button', './assets/b2.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 4});
        this.load.spritesheet('miku', './assets/player.png', {frameWidth: 60, frameHeight: 75, startFrame: 0, endFrame: 11});       
        this.load.spritesheet('ghost', './assets/ghost.png', {frameWidth: 49, frameHeight: 40, startFrame: 0, endFrame: 4});
        this.load.spritesheet('bounceGhost', './assets/ghost1.png', {frameWidth: 50, frameHeight: 40, startFrame: 0, endFrame: 4});
        this.load.spritesheet('fastGhost', './assets/ghost2.png', {frameWidth: 50, frameHeight: 40, startFrame: 0, endFrame: 4});
        this.load.image('pointer', './assets/pointer.png');
    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('menuScene');
        // this.scene.start('playScene');
    }
}
