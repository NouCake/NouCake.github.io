Flame = function(x, y, presets){
    Phaser.Sprite.call(this, game, x, y, 'flame')

    this.anchor.set(0.5);
    this.animations.add('idle', [0, 1, 2, 3])
    this.animations.play('idle', 8, true);

    Gingerbread.add(this);
    this.ginger.setOrigin(0, 0, this.anchor);
    this.name = 'flame';
    //Generics.makeThrowable(this);
    this._timer = -1;
    this.circularData = {};
    this.filters = [Flame.filter];
    console.log("created");
}

Flame.prototype = Object.create(Phaser.Sprite.prototype)
Flame.prototype.constructor = Flame;

Flame.prototype.update = function(){
    //this.throwUpdate();
    this.circularUpdate();
}

Flame.prototype.circularUpdate = function(){
    if(this.circularData.activ){
        this._timer += game.time.elapsedMS;
        this.x = this.circularData.parent.x + Math.sin(2*Math.PI / this.circularData.total * (this.circularData.index+1) + this._timer/1000 * Math.PI * this.circularData.speed) * this.circularData.distance;
        this.y = this.circularData.parent.y + Math.cos(2*Math.PI / this.circularData.total * (this.circularData.index+1) + this._timer/1000 * Math.PI * this.circularData.speed) * this.circularData.distance;
    }
}

Flame.prototype.circular = function(parent, distance, speed, index, total){
    this._timer = 0;
    this.circularData = {};
    this.circularData.parent = parent;
    this.circularData.distance = distance;
    this.circularData.speed = speed;
    this.circularData.index = index;
    this.circularData.total = total;
    this.circularData.activ = true;
}

Flame.prototype.onCollision = function(other){
    if(other.name == 'firepit'){
        this.destroy();
    }
}
