Sword = function(x, y){
    Phaser.Sprite.call(this, game, x, y, 'objects', 3);
    this.name = 'sword';

    this.anchor.set(0.5, 0.5);

    Gingerbread.add(this);
    this.ginger.setSize(10, 10);
    this.ginger.setOrigin(3, 3, this.anchor);
    this.x += this.offsetX;
    this.y += this.offsetY;
    
    this._speed = 100;
    this._timer = 0;
    this._damage = 1;

    Generics.makeThrowable(this);
    stage.questManager.notifyEvent(QuestManager.EVENTS.CREATE, 'sword', this);
}

Sword.prototype = Object.create(Phaser.Sprite.prototype);
Sword.prototype.constructor = Sword;

Sword.prototype.update = function(){
    this.throwUpdate();
}