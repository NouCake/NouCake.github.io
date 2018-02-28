Slime = function(x, y){
    Monster.call(this, x, y, 'monster', 4);
    this.anchor.set(0.5, 0.5);
    this.ginger.setOrigin(0,0,this.anchor);
    this.animations.add("idle", [4, 4, 5, 5, 6]); //down
    this.animations.play('idle', 6, true);
}

Slime.prototype = Object.create(Monster.prototype);
Slime.prototype.constructor = Slime;