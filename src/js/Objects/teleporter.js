Teleporter = function(x, y, properties){
    Phaser.Sprite.call(this, game, x, y, 'tileset', 11);

    this.properties = properties;
    Gingerbread.add(this);
    this.ginger.setSize(8, 8);
    this.ginger.setOrigin(4, 4);
    this.ginger.trigger = true;

    this.renderable = false;

    this.collided = false;
}

Teleporter.prototype = Object.create(Phaser.Sprite.prototype);
Teleporter.prototype.constructor = Teleporter;

Teleporter.prototype.onCollision = function(other){
    if(other == stage.player){
        this.collided = true;
    }
}

Teleporter.prototype.update = function(){
    if(this.collided){
            stage.loadNewMap(this.properties["destMap"],
                this.properties["destX"]*TILE_SIZE,
                this.properties["destY"]*TILE_SIZE);
    }
}