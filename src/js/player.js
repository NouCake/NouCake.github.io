function Player(){
    Phaser.Sprite.call(this, game, 20, 20, "player");

    Gingerbread.addPhysics(this);
    this.ginger.setSize(7, 9);
    this.ginger.setOrigin(-4, -5);
    //this.ginger.collidesWithMap = true;

    stage.input.addButton(4, this._onDialogPressed);
    this._addAnimations();
    this._addDialogHitbox();

    this.name = "Player";

    this.anchor.set(0.5, 0.5);
    this._directionFreezed = false;
    this._maxSpeed = 75;
    this._direction = 0;
}

Player.prototype = Object.create(Phaser.Sprite.prototype)
Player.prototype.constructor = Player;

Player.prototype.update = function(){
    this.inputUpdate();
    this.animationUpdate();
}

Player.prototype.inputUpdate = function(){
    let inputs = 0;
    if(stage.input.left){
        inputs++;
        this.ginger.speed.x = -this._maxSpeed;
        this._changeDirection(1);
    } else if(stage.input.right){
        inputs++;
        this.ginger.speed.x = this._maxSpeed;
        this._changeDirection(3);
    } else {
        this.ginger.speed.x = 0;
    }
    if(stage.input.up){
        inputs++;
        this.ginger.speed.y = -this._maxSpeed;
        this._changeDirection(2);
    } else if(stage.input.down){
        inputs++;
        this.ginger.speed.y = this._maxSpeed;
        this._changeDirection(0);
    } else {
        this.ginger.speed.y = 0;
    }

    if(inputs == 0){
        this.ginger.speed.set(0, 0);
        this._state = this._STATES.IDLE;
    } else {
        this._state = this._STATES.WALK;
    }
    if(inputs > 1){
        this.ginger.speed.setMagnitude(this._maxSpeed);
    }


}

Player.prototype.animationUpdate = function(){
    this.animations.play(this._getCurrentAnimation().name, 8);
    this.scale.x = this._direction == 3 ? -1 : 1;
}

Player.prototype._getCurrentAnimation = function(){
    return this.animations.getAnimation(this._state + this._direction);
}

Player.prototype._changeDirection = function(dir){
    if(!this._directionFreezed)
        this._direction = dir;
}

Player.prototype._addAnimations = function(){
    this.animations.add("idle_0", [0]); //down
    this.animations.add("idle_1", [2]); //left
    this.animations.add("idle_2", [1]); //up
    this.animations.add("idle_3", [2]); //right

    this.animations.add("walk_0", [3,0,6,0]); //down
    this.animations.add("walk_1", [5,2,8,2]); //left
    this.animations.add("walk_2", [4,1,7,1]); //up
    this.animations.add("walk_3", [5,2,8,2]); //right
}

Player.prototype._addDialogHitbox = function(){
    dialogHitbox = {x: 128, y: 128};
    dialogHitbox.player = this;

	Gingerbread.addPhysics(dialogHitbox);
	dialogHitbox.ginger.setSize(8, 8);
	dialogHitbox.ginger.setOrigin(-4, -4);
	dialogHitbox.ginger.trigger = true;
	dialogHitbox.key = "dialogHitbox";
	this.dialogHitbox = dialogHitbox;

	dialogHitbox.onCollision = function(other){
		if(other.dialog){
			this.mark = other;
		}
	}

	dialogHitbox.update = function(){
		this.x = this.player.x + 8 * getPointFromDirection(this.player.direction).x;
		this.y = this.player.y + 8 * getPointFromDirection(this.player.direction).y;
	}
}

Player.prototype._onDialogPressed = function(){
    if(stage.player.dialogHitbox.mark && !dialogManager.running && stage.player.dialogHitbox.mark.dialog &&
        Gingerbread.collides(stage.player.dialogHitbox, stage.player.dialogHitbox.mark)){
        stage.player.dialogHitbox.mark.dialog();
    }
}

Player.prototype.SET = function(x, y){
    if(stage.player){
        stage.player.x = x;
        stage.player.y = y;
    }
}

Player.prototype._STATES = {
    IDLE: "idle_",
    WALK: "walk_"
}