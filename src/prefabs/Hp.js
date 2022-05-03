class Hp {
    constructor(scene, x, y) {
        this.back = scene.add.image(x, y, 'healthbarEmpty').setOrigin(0.5, 1);
        this.hbar = scene.add.image(x, y - 210, 'healthbarFull').setOrigin(0.5, 1);
        this.x = x;
        this.y = y;
        this.value = 100;
        this.pval = 1;
        this.draw();
        this.hbar.setRotation(Math.PI);
        this.playsound = false;
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
        this.playsound = true;
    }

    // Get Function that returns the current hp
    getHP() {
        return this.value;
    }

    draw(){
        this.hbar.setCrop(0, 0, 40, 210 * (this.value/100));
        var d = Math.floor(this.pval* this.value);
    }
}