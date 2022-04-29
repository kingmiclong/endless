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
        this.passiveHPLoss = 3;
        this.ONE_SEC = 60;
        this.emenyHPLoss = 30;
        enemySpeed = -2.5;
        score = 0;

        //CREATE bug/obstacle/ghost ANIMATIONS
        this.anims.create({
            key: 'bugsprite',            
            frames: this.anims.generateFrameNumbers('bugsprite', {start: 0, end: 1, first: 0}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'hurtbug',            
            frames: this.anims.generateFrameNumbers('hurtbug', {start: 0, end: 1, first: 0}),
            frameRate: 50,
            repeat: 0
        });
        this.anims.create({
            key: 'ghostWalk',            
            frames: this.anims.generateFrameNumbers('ghost', {start: 0, end: 4, first: 0}),
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
        
        //create player animate
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

        // player
        this.blocker= this.physics.add.image(game.config.width/2,2*game.config.height/3,'blocker');
        this.blocker.setImmovable(true);
        this.player = this.physics.add.sprite(100,100,'miku'); 
        this.player.anims.play("right");
        this.player.setScale(0.75);
        this.player.setCollideWorldBounds(true);  
        this.physics.add.collider(this.player, this.blocker);


        // Score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            //backgroundColor: '#F3B141',
            color: '#ffffff',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreText = this.add.text(20, 20, score, scoreConfig);


        // move player to the clicked/tapped position AND PLAY DIRECTIONAL ANIMATION
        this.input.on('pointerdown', function (gamePointer)
        {
            //this.arrow.setPosition(gamePointer.x, gamePointer.y);
            if(gamePointer.y<=2*game.config.height/3){
            this.ptr.x=gamePointer.x;
            this.ptr.y=gamePointer.y;
            let xdifference = (Math.abs((Math.abs(this.player.x)) - (Math.abs(this.ptr.x))));
            let ydifference = (Math.abs((Math.abs(this.player.y)) - (Math.abs(this.ptr.y))));
            if(xdifference > ydifference){  //if player is moving more horizontal than vertical
                if(this.player.x<this.ptr.x){this.player.play('right');}
                else{this.player.play('left');}
            }
            if(ydifference > xdifference){  //if player is moving more vertical than horizontal
                if(this.player.y<this.ptr.y){this.player.play('down');}
                else{this.player.play('up');}
            }
            this.physics.moveToObject(this.player, gamePointer, this.MAX_SPEED); } //player speed, can always change 
        },this)
        
        // Add a new hp bar deatures: Hp.increase(var) Hp.decrease(var);
        this.hp= new Hp(this, 59, game.config.height - 2);

        // Buttons
        this.testButtons = this.add.group();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                let testButton = new Button(this, 118 + (88 * i), game.config.height * (2/3) + 10 + (70 * j), 'button', 0, this.hp).setOrigin(0, 0);
                this.testButtons.add(testButton);
            }
        }

        this.testButtons.runChildUpdate = true;

        this.obstacleGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        })

        this.time.delayedCall(2500, () => { 
            this.addEnemy(); 
        });

        this.time.delayedCall(2500, () => { 
            this.addEnemy(); 
        });

        this.time.delayedCall(2500 * 5, () => { 
            this.addEnemy(); 
        });

        // set up difficulty timer (triggers callback every second)
        this.scoreTimer = this.time.addEvent({
            delay: 1000,
            callback: this.addScore,
            callbackScope: this,
            loop: true
        });
    }

    addEnemy() {
        let enemy = new Obstacle(this, enemySpeed, 'ghost');
        enemy.play("ghostWalk");
        this.obstacleGroup.add(enemy);
    }

    addScore() {
        score += 100;
        this.scoreText.text = score;
    }

    update() {
        
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
            /*if(enemy.body.blocked.left)       
            //if obstacle hits left side of screen, reset it, play standard animation (instead of being broken animation if player has collided with obstacle)
            {
                // console.log("blocked on left") //for debugging
            enemy.x = 1000;
            enemy.body.collideWorldBounds = true; 
            enemy.play("bugsprite");
            }*/

            enemy.x -= 2.5;     //obstacles are constantly moving
        }

        this.physics.add.overlap(this.player, this.obstacleGroup, obstacleHit, null, this); 
        //polling to see if player has collided with any obstacle in obstacleGroup. If so , run obstacleHit Function
        function obstacleHit (player, obstacle) //function that runs when player hits obstacle during polling
        {
            if(obstacle.isHit == false){  
                //if statement added since obstacleHit is called in all the different frames where player and obstacle are overlapping
                //if statement allows code below to only happen once (the first time collision happens between player and member of obstacleGroup)
                obstacle.isHit = true; // obstacle animation plays that shows it got hit by player (breaks/gets damaged)
                this.hp.decrease(this.emenyHPLoss);         //Decrements HP
                //insert code to play animation for character to make it appear hurt (can also just be changing the tint of the sprite.)
                //decrease hp
                this.hp.decrease(5);
            }
        }


      
    }
   
}