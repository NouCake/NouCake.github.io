Crate = function(x, y){
    Phaser.Sprite.call(this, game, x, y, 'tileset', 13);

    Gingerbread.addPhysics(this);
    this.ginger.setSize(12, 12);
    this.ginger.setOrigin(1, 3);
    this._bounded = false;
}

Crate.prototype = Object.create(Phaser.Sprite.prototype);
Crate.prototype.constructor = Crate;

Crate.prototype.dialog = function(player){
    if(!this._bounded){
        this._bounded = player.bindObject(this);
        this.ginger.collidesWithMap = true;
    } else {
        player.unbindBoundedObject();
        this._bounded = false;
        this.ginger.collidesWithMap = false;
    }
}

Crate.prototype.onCollision = function(other){
    this.x = this.previousPosition.x;
	this.y = this.previousPosition.y;
	if(this._bounded && other != stage.player){
		stage.player.onCollision(this);
	}
}