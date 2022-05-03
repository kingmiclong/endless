class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // a vector to track player's position
        this.ptr = new Phaser.Math.Vector2();
        //variables/settings for physics engine
        this.ACCELERATION = 2000;
        this.MAX_SPEED = 150; 
        this.DRAG = 4000;   

        // Variables for health bar
        this.passiveHPLoss = 3;
        this.ONE_SEC = 60;
        this.enemyHPLoss = 30;

        //Variables for enemy speed
        enemySpeed = -2.5;
        this.maxEnemySpeed = -200;

        // Variable for game progression
        score = 0;

        // Variables for game ending
        this.gameOver = false;
        this.playerAlpha = 1;

        this.bg_music = this.sound.add('bg_music', {
            mute: false,
            volume: 0.2,
            rate: 1.2,
            loop: true 
        });

        this.bg_music.play();
        

        //CREATE ghost/obstacle ANIMATIONS
        this.anims.create({
            key: 'ghostWalk',            
            frames: this.anims.generateFrameNumbers('ghost', {start: 0, end: 4, first: 0}),
            frameRate: 4,
            yoyo: true,
            repeat: -1
        });

        this.anims.create({
            key: 'ghostBounce',            
            frames: this.anims.generateFrameNumbers('bounceGhost', {start: 0, end: 4, first: 0}),
            frameRate: 4,
            yoyo: true,
            repeat: -1
        });

        this.anims.create({
            key: 'ghostAccelerate',            
            frames: this.anims.generateFrameNumbers('fastGhost', {start: 0, end: 4, first: 0}),
            frameRate: 4,
            yoyo: true,
            repeat: -1
        });
       

        //place back ground 
        this.magicworld = this.add.tileSprite(0, 0, 480, game.config.height * (2/3), 'magicworld').setOrigin(0);

        // UI
        this.add.image(0, game.config.height * (2/3), 'botUI').setOrigin(0);

        // Variable for cursor
        gamePointer = this.input.activePointer;        
        
        // Player Animations
        this.anims.create({
            key: 'right',            
            frames: this.anims.generateFrameNumbers('miku', {start: 6, end: 8, first: 6}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'left',            
            frames: this.anims.generateFrameNumbers('miku', {start: 0, end: 2, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'down',          
            frames: this.anims.generateFrameNumbers('miku', {start: 3, end: 5, first: 3}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'up',            
            frames: this.anims.generateFrameNumbers('miku', {start: 9, end: 11, first: 9}),
            frameRate: 4,
            repeat: -1
        });

        // Blocker
        this.blocker= this.physics.add.image(game.config.width/2,2*game.config.height/3,'blocker');
        this.blocker.setImmovable(true);

        // On Click Pointer
        this.point = this.physics.add.sprite(-100, 0, 'pointer').setOrigin(0.5);

        // Player
        this.player = this.physics.add.sprite(100,100,'miku'); 
        this.player.anims.play("right");
        this.player.setScale(0.50);
        this.player.setCollideWorldBounds(true);  
        this.physics.add.collider(this.player, this.blocker);


        // Score
        let scoreConfig = {
            fontFamily: 'fantasy',
            fontSize: '28px',
            //backgroundColor: '#0000',
            color: '#ffffff',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        this.add.image(16, 16, 'scoreback').setOrigin(0,0).setScale(1.1);
        this.scoreText = this.add.text(26, 20, "0:00", scoreConfig);


        // move player to the clicked/tapped position AND PLAY DIRECTIONAL ANIMATION
        this.input.on('pointerdown', function (gamePointer)
        {
            if (this.gameOver == false) {
                //this.arrow.setPosition(gamePointer.x, gamePointer.y);
                if(gamePointer.y<2*game.config.height/3){
                this.ptr.x=gamePointer.x;
                this.ptr.y=gamePointer.y;
                if (this.ptr.y < 2*game.config.height/3 - 15) {
                    this.point.setX(this.ptr.x);
                    this.point.setY(this.ptr.y + 15);
                }
                let xdifference = (Math.abs((Math.abs(this.player.x)) - (Math.abs(this.ptr.x))));
                let ydifference = (Math.abs((Math.abs(this.player.y)) - (Math.abs(this.ptr.y))));
                if(xdifference > ydifference){  
                    this.sound.play('walk3');
                    //if player is moving more horizontal than vertical
                    if(this.player.x<this.ptr.x){this.player.play('right');}
                    else{this.player.play('left');}
                }
                if(ydifference > xdifference){  //if player is moving more vertical than horizontal
                    this.sound.play('walk3');
                    if(this.player.y<this.ptr.y){this.player.play('down');}
                    else{this.player.play('up');}
                }
                this.physics.moveToObject(this.player, gamePointer, this.MAX_SPEED); } //player speed, can always change 
            }
        },this)
        
        // Add a new hp bar deatures: Hp.increase(var) Hp.decrease(var);
        this.hp= new Hp(this, 59, game.config.height - 2);

        // Buttons
        this.testButtons = this.add.group();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                let testButton = new Button(this, 118 + (88 * i), game.config.height * (2/3) + 5 + (70 * j), 'button', 0, this.hp).setOrigin(0, 0);
                this.testButtons.add(testButton);
            }
        }

        this.testButtons.runChildUpdate = true;

        this.obstacleGroup = this.add.group({
            runChildUpdate: true            // make sure update runs on group children
        })


        // set up difficulty timer (triggers callback every second)
        this.scoreTimer = this.time.addEvent({
            delay: 1000,
            callback: this.addScore,
            callbackScope: this,
            loop: true
        });
    }

    // Enemy Spawn Functions
    addEnemy() {
        let enemy = new Obstacle(this, enemySpeed, 'ghost');
        enemy.play("ghostWalk");
        this.obstacleGroup.add(enemy);
    }

    addBouncingEnemy() {
        let enemy = new BouncingObstacle(this, enemySpeed, 'bounceGhost');
        enemy.play("ghostBounce");
        this.obstacleGroup.add(enemy);
    }
    
    addAcceleratingEnemy() {
        let enemy = new AcceleratingObstacle(this, enemySpeed, 'fastGhost');
        enemy.play("ghostAccelerate");
        this.obstacleGroup.add(enemy);
    }

    addNewEnemyWave() {
        this.clearEnemies();
        this.time.delayedCall(2000, () => {
            this.waveType = (Math.floor(Math.random() * 4));
            if (this.waveType == 1) {
                for (let i = 0; i < 4; i++){
                    this.addAcceleratingEnemy();
                }
            } else if (this.waveType == 2) {
                for (let i = 0; i < 3; i++){
                    this.addBouncingEnemy();
                }
            } else if (this.waveType == 3) {
                this.addEnemy();
                this.addEnemy();
                this.addAcceleratingEnemy();
                this.addBouncingEnemy();
            } else {
                this.addEnemy();
                this.addEnemy();
                this.time.delayedCall(1500, () => {
                    this.addEnemy();
                    this.addEnemy();
                });
            }
        });
    }

    clearEnemies() {
        for (let enemy of this.obstacleGroup.getChildren()){
            enemy.newObstacle = false;
        }
    }

    // Iterates Game difficulty
    addScore() {
        score += 1;
        if (score % 60 < 10) {
            this.scoreText.setText(Math.floor(score / 60) + ":0" + score % 60);
        } else {
            this.scoreText.setText(Math.floor(score / 60) + ":" + score % 60);
        }

        if (score > 1) {
            if (score == 2) {
                this.addEnemy();
            } else if (score == 7) {
                this.clearEnemies();
                this.time.delayedCall(1500, () => {
                    this.addEnemy();
                    this.addEnemy();
                });
            } else if (score == 15) {
                this.clearEnemies();
                this.time.delayedCall(1500, () => {
                    this.addEnemy();
                    this.addEnemy();
                    this.addEnemy();
                });
            }

            if (score % 10 == 0 && enemySpeed > this.maxEnemySpeed && score >= 20) {
                enemySpeed -= 5;
            }

            if (score % 30 == 0) {
                this.addNewEnemyWave();
            }
        }
    }

    // Polls Game State
    update() {
        //play heart noise if hp increases
        if(this.hp.playsound){
            this.sound.play('heart');
            this.hp.playsound = false;
        }
        //play heart spawn noise if it spawns
        for (let i of this.testButtons.getChildren()){
            if(i.refreshTime == 1){ //use 1 and not 0 since the timer stays at 0 once it runs out - causes sound to play a ton of times super loud 
                this.sound.play('heartspawn', { volume: 0.2});
            }
        }
        //Make player have "right" animation if they are not currently moving 
        //and the "right" animation is not already playing 
        //(this happens when player finishes moving left,up, or down.)
        var anim = this.player.anims.currentAnim.key;
        if(anim == "right"){}
        else{
            if(this.player.body.velocity.x == 0){this.player.anims.play("right")}
        }

        //Scrolls BG
        this.magicworld.tilePositionX += 1;
        // Decrements HP
        this.hp.decrease(this.passiveHPLoss / this.ONE_SEC);

        //////////////////////// PLAYER MOVEMENT ///////////////////////////
        // calculate the distance between player and the clicked/tapped spot
        // line xx~ xx from https://phaser.io/examples/v2/input/follow-mouse
        var distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.ptr.x, this.ptr.y);

        if (this.player.body.speed > 0)
        {
            if (distance < 4)
            {
            this.player.body.reset(this.ptr.x, this.ptr.y);
            }
        }
        // end of borrowing code

        for (let enemy of this.obstacleGroup.getChildren()){
            enemy.x -= 2.5;     //obstacles are constantly moving
        }

        this.physics.add.overlap(this.player, this.obstacleGroup, obstacleHit, null, this); 
        //polling to see if player has collided with any obstacle in obstacleGroup. If so , run obstacleHit Function
        function obstacleHit (player, obstacle) //function that runs when player hits obstacle during polling
        {
            if(obstacle.isHit == false){  
                obstacle.isHit = true; // obstacle animation plays that shows it got hit by player (breaks/gets damaged)
                this.hp.decrease(this.enemyHPLoss);         //Decrements HP
                this.sound.play('ghost_die', { volume: 0.3 });
            }
        }
        //if player die
        if(this.hp.getHP() <= 0 && this.gameOver == false){
            this.gameOver = true;
            this.player.setVelocityY(0);
            this.player.setVelocityX(1);
            this.time.delayedCall(3000, () => {
                this.scene.start('deathScene');
            });
            this.bg_music.pause();
        }

        if (this.playerAlpha > 0 && this.gameOver == true) {
            this.playerAlpha -= 0.01;
            this.player.setAlpha(this.playerAlpha);
        }
    }
}