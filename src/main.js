/*******************************************************************************************
 * Collaborators: Dongling Yang, Michael Leung, Vincent Bouyssounouse, Vincent Kurniadjaja
 * Title: Spiritual Relief
 * Date Completed: 5/2/2022
 * 
 * Creative Tilt: We divided the game into 2 different sections, one for player movement,
 * and one for player healing. The main idea of our game is that the player will be 
 * constantly losing health passively and must click the buttons in order to continue
 * playing. Additionally, another creative tilt we did was implement wave based enemy 
 * spawning, where every 30 seconds a random wave of different enemies will be spawned.
 *******************************************************************************************/

let config = {
    type: Phaser.CANVAS,
    width: 480,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Load, Menu, Instructions, Play, Death]
}

let game = new Phaser.Game(config);

let cursors;
let gamePointer;
let enemySpeed;
let score;
let centerX = game.config.width/2;