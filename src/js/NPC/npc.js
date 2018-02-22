NPC = function(x, y, key, animated){
    Phaser.Sprite.call(this, game, x, y, key);

    Gingerbread.addPhysics(this);
    this._direction = 0;
    this._state = this._STATES.IDLE;
    this._frameRate = 8;
    this._speed = 25;
    if(animated){
        this._addAnimations();
    }
    this._walkTimer = 0;
}

NPC.prototype = Object.create(Phaser.Sprite.prototype);
NPC.prototype.constructor = NPC;

NPC.prototype.update = function(){
    this.animationUpdate();
    this._walkUpdate();
}

NPC.prototype.onCollision = function(other){
    this.x = this.previousPosition.x;
	this.y = this.previousPosition.y;
}

NPC.prototype._STATES = {
    IDLE: "idle_",
    WALK: "walk_"
}

NPC.prototype._addAnimations = function(){
    this.animations.add("idle_0", [0]); //down
    this.animations.add("idle_1", [2]); //left
    this.animations.add("idle_2", [1]); //up
    this.animations.add("idle_3", [2]); //right

    this.animations.add("walk_0", [3,0,6,0]); //down
    this.animations.add("walk_1", [5,2,8,2]); //left
    this.animations.add("walk_2", [4,1,7,1]); //up
    this.animations.add("walk_3", [5,2,8,2]); //right
}

NPC.prototype._getCurrentAnimation = function(){
    return this.animations.getAnimation(this._state + this._direction);
}

NPC.prototype.animationUpdate = function(){
    //console.log(this);
    this.animations.play(this._getCurrentAnimation().name, this._frameRate);
    this.scale.x = this._direction == 3 ? -1 : 1;
}

NPC.prototype.walk = function(distanceInTiles, direction){
    this._direction = direction;
    this._walkTimer = distanceInTiles * TILE_SIZE / this._speed * 1000;
    this._state = this._STATES.WALK;
}

NPC.prototype._walkUpdate = function(){
    if(this._state == this._STATES.WALK){
        if(this._walkTimer > 0){
            this.ginger.speed.set(
                this._speed * DIRECTION_AS_POINT[this._direction].x,
                this._speed * DIRECTION_AS_POINT[this._direction].y)
        } else {
            this.ginger.speed.set(0);
            this._walkTimer = 0;
            this._state = this._STATES.IDLE;
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
        }
            
        this._walkTimer -= game.time.elapsedMS;
    }
}