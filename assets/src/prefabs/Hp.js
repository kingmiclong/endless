class Hp {
    constructor(scene, x, y) {
        //this.hbar = new Phaser.GameObjects.Graphics(scene);
        this.back = scene.add.image(x, y, 'healthbarEmpty').setOrigin(0.5, 1);
        this.hbar = scene.add.image(x, y - 210, 'healthbarFull').setOrigin(0.5, 1);
        this.x = x;
        this.y = y;
        this.value = 100;
        this.pval = 1;
        this.draw();
        //this.healthbar=scene.add.existing(this.hbar);
        this.hbar.setRotation(Math.PI);
    }  
 
    decrease (atkhp){
        this.value -= atkhp;
        if(this.value <0){
            this.value = 0;
        }
        this.draw();
    }

    increase(addhp){
        this.value += addhp;
        if(this.value >= 100){
            this.value = 100;
        }
        this.draw();
    }

    // Get Function that returns the current hp
    getHP() {
        return this.value;
    }

    draw(){
        /*this.hbar.clear();
        this.hbar.fillStyle(0x000000);
        this.hbar.fillRect(this.x, this.y, 104,14);
        this.hbar.fillStyle(0xffffff);
        this.hbar.fillRect(this.x+2, this.y+2, 100, 10);
        this.hbar.fillStyle(0x00ff00); */
        this.hbar.setCrop(0, 0, 40, 210 * (this.value/100));
        var d = Math.floor(this.pval* this.value);
        //this.hbar.fillRect(this.x+2, this.y+2,d,10);
    }
}