class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // All title assets
        this.load.image('title','./assets/startscreen.png');
        this.load.image('instructions','./assets/introduction_3.png');
        this.load.image('instructionBack','./assets/introductionTitleText.png');
        this.load.image('instructionNext','./assets/introductionContinueText.png');
        this.load.image('titleStart','./assets/clicktostartText.png');
        this.load.image('titleCredits','./assets/creditText.png');

        //place back ground 
        this.load.image('magicworld', './assets/magicworld.png');
        this.load.image ('arrow','./assets/canon.png');
        this.load.image ('still','./assets/camper.png');
        this.load.image('blocker','./assets/bar.png');

        // Static image assets
        this.load.image('healthbarFull','./assets/healthbarFull.png')
        this.load.image('healthbarEmpty','./assets/healthbarEmpty.png')
        this.load.image('botUI','./assets/underUI.png')

        // Test Assets
        this.load.spritesheet('button', './assets/button.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('miku', './assets/player.png', {frameWidth: 60, frameHeight: 75, startFrame: 0, endFrame: 11});       
        this.load.spritesheet('bugsprite', './assets/bugsprite.png', {frameWidth: 64, frameHeight: 50, startFrame: 0, endFrame: 3});
        this.load.spritesheet('hurtbug', './assets/hurtbug.png', {frameWidth: 64, frameHeight: 50, startFrame: 0, endFrame: 3});
        this.load.spritesheet('ghost', './assets/ghost.png', {frameWidth: 49, frameHeight: 40, startFrame: 0, endFrame: 4});
    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        //this.scene.start('menuScene');
        this.scene.start('playScene');
    }
}
