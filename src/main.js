console.log("hello from main.js");

let config = {
    type: Phaser.CANVAS,
    width: 480,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Load, Menu, Instructions, Play, Death]
}

let game = new Phaser.Game(config);
//let pause is true
let pause = false ;
let cursors;
let gamePointer;
let enemySpeed;
let score;
let centerX = game.config.width/2;