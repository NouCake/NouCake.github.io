Firepit = function(x, y){
    Phaser.Sprite.call(this, game, x, y, 'tileset', 11);

    Gingerbread.add(this);

    this.key = 'firepit';
    this.occupied = false;
    this.holding = null;

    stage.questManager.subscribe(QuestManager.EVENTS.OTHER, 'boss', this.reset, this);
    this.events.onDestroy.add(function(){
        stage.questManager.unsubscribe(QuestManager.EVENTS.Other, 'boss', this);
    })
}

Firepit.prototype = Object.create(Phaser.Sprite.prototype);
Firepit.prototype.constructor = Firepit;

Firepit.prototype.onCollision = function(other){
    if(!this.occupied && other.name == 'flame'){

        stage.objects.remove(other);
        
        Gingerbread.remove(other);
        this.addChild(other);
        this.holding = other;
        other.x = 8;
        other.y = 2;
        this.occupied = true;
    }
}

Firepit.prototype.reset = function(){
    if(this.holding){
        this.holding.destroy();
        this.holding = null;
        this.occupied = false;
    }
}