NPC = function(x, y, key, animated){
    Phaser.Sprite.call(this, game, x, y, key);

    Gingerbread.addPhysics(this);
    this._direction = 0;
    if(animated){
        this._aniTimer = 0;
        this._maxAniTime = 500;
        this._timer = 0;
    }
}

NPC.prototype = Object.create(Phaser.Sprite.prototype);
NPC.prototype.constructor = NPC;

NPC.prototype.aniamte = function(){
    if(this._direction == 3){
        this._direction = 2;
        this.scale.x = -1;
        this.anchor.x = 1;
    } else {
        this.scale.x = 1;
        this.anchor.x = 0;
    }

    if(this._aniTimer % this._maxAniTime * 4 <= this._maxAniTime * 1){
        this.frame = this._direction;
    } else if(this._aniTimer % this._maxAniTime * 4 <= this._maxAniTime * 2){
        this.frame = this._direction + 3;
    } else if(this._aniTimer % this._maxAniTime * 4 <= this._maxAniTime * 3){
        this.frame = this._direction;
    } else {
        this.frame = this._direction + 6;
    }

    this._aniTimer += game.time.elapsedMS;

    if(this.scale.x == -1){
        this._direction = 3;
    }
}

