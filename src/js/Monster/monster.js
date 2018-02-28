Monster = function(x, y, key, frame){
    Phaser.Sprite.call(this, game, x, y, key, frame);

    Gingerbread.add(this);
    this.agro = false;
    this.player = stage.player;
    this._speed = 25;
    this._followPlayer = true;
    this._followDistance = 75;
    this._damage = 1;
    this.health = 2;
}

Monster.prototype = Object.create(Phaser.Sprite.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.update = function(){
    if(this._followPlayer) this.followPlayer();
    if(this.health == 0){
        this.destroy();
    }
}

Monster.prototype.followPlayer = function(){
    if(this.agro){
        this.ginger.speed.x = this.player.x - this.x;
        this.ginger.speed.y = this.player.y - this.y;   
        this.ginger.speed.setMagnitude(this._speed);	
    } else if(this.player.position.distance(this.position) <= this._followDistance){
        this.agro = true;
    }
}

Monster.prototype.onCollision = function(other){
    this.x = this.previousPosition.x;
    this.y = this.previousPosition.y;
    
    if(other == this.player){
        this.knockback(other, Generics.knockbackDistance);
        other.doDamage(this._damage, this);
    }
}

Monster.prototype.knockback = Generics.knockback;
Monster.prototype.doDamage = Generics.doDamage;