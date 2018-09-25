Flame = function(x, y, mode){
    Phaser.Sprite.call(this, game, x, y, 'flame')

    this.anchor.set(0.5);
    this.animations.add('idle', [0, 1, 2, 3])
    this.animations.play('idle', 8, true);

    Gingerbread.add(this);
    this.ginger.setOrigin(0, 0, this.anchor);
    this.ginger.trigger = true;

    this.name = 'flame';
    this._timer = -1;
    this.circularData = {};
    this.shooting = false;
    this.mode = mode ? mode : 0;
    this.speed = 50;

    this.shader = new Phaser.Filter(game, null, game.cache.getShader('colorFilter'));
    this.shader.uniforms.hue = {type: "1f", value: 0.0};
    this.shader.uniforms.sat = {type: "1f", value: 1.0};
    this.shader.uniforms.val = {type: "1f", value: 1.0};
}

Flame.prototype = Object.create(Phaser.Sprite.prototype)
Flame.prototype.constructor = Flame;

Flame.prototype.update = function(){
    this.circularUpdate();
}

Flame.prototype.shootUpdate = function(){
    if(this.mode == 2){
        let p = Phaser.Point(tage.player.x - this.x, stage.player.y - this.y);
        p.setMagnitude(this.speed * 0.5);
        this.ginger.x += p.x;
        this.ginger.y += p.y;
    }
}

Flame.prototype.onCollision = function(other){
    this["onCollisionMode"+this.mode](other);
}

Flame.prototype.onCollisionMode0 = function(other){
    if(stage.player == other){
        other.doDamage(1, this);
        this.destroy();
    }
}

Flame.prototype.onCollisionMode1 = function(other){
    this.onCollisionMode0(other);
    if(other.name == 'sword'){
        other.onCollision(this);
        if(other.throwing){
            this.destroy();
        }
    }
}

Flame.prototype.onCollisionMode2 = function(other){
    this.onCollisionMode1(other);
}

Flame.prototype.shoot = function(){
    projectile = stage.objects.add(new Flame(this.x, this.y, this.mode));
    
    projectile.shooting = true;
    projectile.ginger.speed.x = stage.player.x - this.x;
    projectile.ginger.speed.y = stage.player.y - this.y;
    projectile.ginger.speed.setMagnitude(this.speed);
}

Flame.prototype.setMode = function(mode){
    switch(mode){
        case 0:
            this.shader.uniforms.hue.value = 0;
            break;
        case 1:
            this.shader.uniforms.hue.value = 240;
            break;
        case 2:
            this.shader.uniforms.hue.value = 283;
            break;
    }
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
