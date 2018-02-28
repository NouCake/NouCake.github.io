Vase = function(x, y){
    Phaser.Sprite.call(this, game, 4+x, 4+y, 'objects', 21);

    this.anchor.set(0.5);
    Gingerbread.add(this);
    this.ginger.setSize(8, 8);
    this.ginger.setOrigin(4, 4, true);

    Generics.makeThrowable(this);
}

Vase.prototype = Object.create(Phaser.Sprite.prototype);
Vase.prototype.constructor = Vase;

Vase.prototype.update = function(){
    this.throwUpdate();
}

Vase.prototype.onThrowEnd = function(){
    this.frame = 31;
    this.ginger.aktiv = false;
    this.dialog = null;
}
