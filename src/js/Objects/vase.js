Vase = function(x, y){
    Phaser.Sprite.call(this, game, 4+x, 4+y, 'misc', 2);

    Gingerbread.addPhysics(this);
    this.ginger.setSize(8, 8);
    //this.ginger.setOrigin(4, 4);
}

Vase.prototype = Object.create(Phaser.Sprite.prototype);
Vase.prototype.constructor = Vase;

