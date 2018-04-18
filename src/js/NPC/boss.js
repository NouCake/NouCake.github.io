Boss = function(x, y){
    NPC.call(this, x-32, y-32, 'boss', true);
    
    this.phase = 0;
    this.adds = [];
    this.flames = [];

    stage.dialogManager.startDialog("kill my adds");
    //this.adds.push(stage.objects.add(new Slime(15 * TILE_SIZE, 15 * TILE_SIZE)));
    this.adds.push(stage.objects.add(new Slime(24 * TILE_SIZE, 15 * TILE_SIZE)));

    this.name = 'boss';
    this._offY = 0;
    this._timer = 0;
    this.speed = 20;

    //this.onCollision = Boss._phase1Collision;
    this.currentPhaseUpdate = Boss._phaseSpawnUpdate;
}

Boss.prototype = Object.create(NPC.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.update = function(){
    this._timer += game.time.elapsedMS;
    this.floatingUpdate();

    if(this.invincible){
        this.invincible = false;
    }

    this.currentPhaseUpdate.call(this);
} 
Boss.prototype.floatingUpdate = function(){
    this.y -= this._offY;
    this._offY = Math.sin(this._timer/1000 * Math.PI * 0.65) * 5;
    this.y += this._offY;
}

Boss._phaseSpawnUpdate = function(){
    let waiting = false;
    for(i in this.adds){
        if(this.adds[i].alive){
            waiting = true;
        }
    }
    if(!waiting){
        stage.dialogManager.startDialog("you killed all adds");
        this.phase++;
        Boss["_phase"+this.phase+"Init"].call(this);
        this.currentPhaseUpdate = Boss["_phase"+this.phase+"Update"];
    }
}

Boss.prototype._followPlayer = function(){
    this.ginger.speed.set(stage.player.x - this.x, stage.player.y - this.y);
    this.ginger.speed.setMagnitude(this.speed);
}

Boss.prototype.spawnFlames = function(number){
    this.flames = [];
    for(i = 0; i < number; i++){
        let distance = 50;
        let flame = new Flame(this.x + Math.sin(2*Math.PI / number * (i+1)) * distance,
                              this.y + Math.cos(2*Math.PI / number * (i+1)) * distance);
        flame.circular(this, distance, .8, i, number);
        stage.objects.add(flame);
        this.flames.push(flame);
    }
}

Boss.prototype.onCollision = function(other){
    if(other == stage.player){
        stage.player.doDamage(3, this);
    }
    
    if(other.name == "sword"){
        if(other._throwed)
        this.doDamage(1, stage.player);
    }
}

Boss._phase1Init = function(){
    this.adds = [];
    this.spawnFlames(10);
}

Boss._phase1Update = function(){
    this._followPlayer();
}

Boss.prototype.knockback = Generics.knockback;
Boss.prototype.doDamage = Generics.doDamage;
/*


    this.y -= this._offY;
    this._offY = Math.sin(this._timer/1000 * Math.PI * 0.65) * 5;
    this.y += this._offY;
    for(i = 0; i < this.children.length; i++){
        this.children[i].x = Math.sin(2*Math.PI / this.children.length * (i+1) + this._timer/1000 * Math.PI * .8) * 50;
        this.children[i].y = Math.cos(2*Math.PI / this.children.length * (i+1) + this._timer/1000 * Math.PI * .8) * 50;
    }
    if(this.position.distance(stage.player) > 65){
        this.ginger.speed.set(stage.player.x - this.x, stage.player.y - this.y);
        this.ginger.speed.setMagnitude(25);
    } else {
        this.ginger.speed.set(0);
    }
 */