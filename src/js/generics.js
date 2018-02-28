Generics = {};

Generics.knockbackDistance = 10;

Generics.doDamage = function(damage, source){
    this.health -= damage;
    Generics.knockback.call(this, source, Generics.knockbackDistance);
}

Generics.knockback = function(source, distance){
    console.log(this);
    let pos = new Phaser.Point(this.x - source.x, this.y - source.y);
    pos.setMagnitude(distance);
    this.ginger.move(pos);
}

Generics.makeThrowable = function(object){
    object._speed = object._speed || 100;
    object._damage = object._damage || 1;

    object.throw = function(other){
        this.ginger.aktiv = true;
        this.ginger.trigger = true;
        this.ginger.speed.copyFrom(DIRECTION_AS_POINT[other._direction]).multiply(this._speed, this._speed);
        this.ginger.collidesWithMap = true;
        other.removeChild(this);
        stage.objects.add(this);
        this.x += other.x;
        this.y += other.y;
        this._timer = 0.5;
        this._throwed = true;
        
    }

    object.throwUpdate = function(){
        if(this._throwed){
            if(this._timer > 0){
                this._timer -= game.time.elapsedMS/1000;
            } else {
                this.throwEnd();
            }
        }
    }

    object.throwEnd = function(){

        this.ginger.speed.set(0);
        this.ginger.collidesWithMap = false;
        this.ginger.trigger = false;
        this._throwed = false;
        this.onThrowEnd();
    }

    object.onCollision = function(other){
        if(other != stage.player){
            if(this._throwed){
                if(other.doDamage) other.doDamage(this._damage, this);    
                this.throwEnd();
            }
        }
    }
    
    object.dialog = Generics.throwDialog.bind(object);
    object.onThrowEnd = object.onThrowEnd || function(){

    }
}

Generics.throwDialog = function(other){
    if(other != stage.player){
        console.log("lol");
        return;
    }

    this.ginger.aktiv = false;
    this.y = -this.height+6;
    this.x = 0;
    other.carry(this);
    other.addChild(this);
}