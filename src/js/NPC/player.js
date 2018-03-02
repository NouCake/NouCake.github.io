Player = function(){
    NPC.call(this, 20, 20, "player", true);

    this.ginger.setSize(8, 10);
    this.ginger.setOrigin(3, 2, {x:0.5, y:0.5});
    this.ginger.collidesWithMap = true;

    stage.input.addButton(4, this._onDialogPressed);
    stage.input.addButton(5, this._onActionPressed);
    this._addDialogHitbox();

    this.name = "player";

    this.anchor.set(0.5, 0.5);
    this._directionFreezed = false;
    this._speed = 75;
    this._maxspeed = 75;
    this._bindedSpeed = 15;
    this._knockbackDistance = 7;
    this._carry = false;
    this.health = 6;
    this.agro = true;
}

Player.prototype = Object.create(NPC.prototype)
Player.prototype.constructor = Player;

Player.prototype.update = function(){
    this.inputUpdate();
    this.animationUpdate();
    this.boundedUpdate();
    this.carryUpadte();
    this.dialogHitbox.update();
    
    game.camera.follow(this);
}

Player.prototype.inputUpdate = function(){
    let inputs = 0;
    if(stage.input.left){
        inputs++;
        this.ginger.speed.x = -this._speed;
        this._changeDirection(1);
    } else if(stage.input.right){
        inputs++;
        this.ginger.speed.x = this._speed;
        this._changeDirection(3);
    } else {
        this.ginger.speed.x = 0;
    }
    if(stage.input.up){
        inputs++;
        this.ginger.speed.y = -this._speed;
        this._changeDirection(2);
    } else if(stage.input.down){
        inputs++;
        this.ginger.speed.y = this._speed;
        this._changeDirection(0);
    } else {
        this.ginger.speed.y = 0;
    }

    if(inputs == 0){
        this.ginger.speed.set(0, 0);
        this._state = NPC.STATES.IDLE;
    } else {
        this._state = NPC.STATES.WALK;
    }
    if(inputs > 1){
        this.ginger.speed.setMagnitude(this._speed);
    }


}

Player.prototype.boundedUpdate = function(){
    if(this._bounded){
        this._bounded.ginger.speed.x = this.ginger.speed.x;
        this._bounded.ginger.speed.y = this.ginger.speed.y;
    }
}

Player.prototype.onCollision = function(other){
    this.ginger.speed.set(0);

    Gingerbread.extendedOnCollision.call(this, other);
    
	if(this._bounded && this._bounded != other){
		this._bounded.onCollision(this);
	}
}

Player.prototype.doDamage = Generics.doDamage;

Player.prototype.bindObject = function(object){
    this._bounded = object;
    this._bounded.ginger.speed.set(0);
    this._speed = this._bindedSpeed;    

    //reducing jittering
    object.x -= object.x % 1;
    object.x += this.x % 1 + 0.001 * DIRECTION_AS_POINT[this._direction].x;
    object.y -= object.y % 1;
    object.y += this.y % 1 + 0.001 * DIRECTION_AS_POINT[this._direction].y;

    console.log("bounded");
    this._directionFreezed = true;
    return true;
}

Player.prototype.unbindBoundedObject = function(){
    this._bounded.ginger.speed.set(0);
    this._bounded = null;
    this._speed = this._maxspeed;
    console.log("unbounded");
    this._directionFreezed = false;
}

Player.prototype._changeDirection = function(dir){
    if(!this._directionFreezed)
        this._direction = dir;
}

Player.prototype._addDialogHitbox = function(){
    dialogHitbox = {x: 128, y: 128};
    dialogHitbox.player = this;

	Gingerbread.add(dialogHitbox);
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
		this.x = this.player.x + 8 * DIRECTION_AS_POINT[this.player._direction].x;
        this.y = this.player.y + 8 * DIRECTION_AS_POINT[this.player._direction].y;
        if(this.mark && !this.mark.alive){
            this.mark = null;
        }
	}
}

Player.prototype.carry = function(other){
    this._carry = true;
    this.carriedObject = other;
}

Player.prototype.carryUpadte = function(){
    if(this._carry){
        if(this.scale.x == -1){
            this.carriedObject.scale.x = -1;
        } else {
            this.carriedObject.scale.x = 1;
        }
        if(this.animations.currentFrame.index < 3){
            this.carriedObject.pivot.y = 0;
        } else {
            this.carriedObject.pivot.y = -1;
        }
    }
}

Player.prototype._onDialogPressed = function(){
    player = stage.player
    if(!player.parent.paused && !stage.dialogManager.running){
        if(player._carry){
            player.carriedObject.scale.x = 1;
            player.carriedObject.pivot.y = 0;
            player.carriedObject.throw(player);
            player.carriedObject = null;
            player._carry = false;
        } else {
            if(player.dialogHitbox.mark && Gingerbread.collides(player.dialogHitbox, player.dialogHitbox.mark)){
                player.ginger.speed.set(0);
                player.dialogHitbox.mark.dialog(player);
            }
        }
    }
}

Player.prototype._onActionPressed = function(){
    stage.dialogManager.startDialog(dialogs[dia]);
    dia = dia >= 3 ? 0 : dia+1;
}

Player.prototype.SET = function(x, y){
    if(stage.player){
        stage.player.x = x + stage.player.width * stage.player.anchor.x;
        stage.player.y = y + stage.player.height * stage.player.anchor.y;
    }
}