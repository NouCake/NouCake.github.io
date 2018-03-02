QuestObject = function(x, y, properties){
    Phaser.Sprite.call(this, game, x, y, properties.key, properties.frame);
    this.properties = properties;

    for(val in properties){
        this[val] = properties[val];
    }

    Gingerbread.add(this);
    if(properties.trigger){
        this.ginger.trigger = true;
    }
    stage.questManager.notifyEvent(QuestManager.EVENTS.CREATE, this.name, this);
}

QuestObject.prototype = Object.create(Phaser.Sprite.prototype);
QuestObject.prototype.constructor = QuestObject;

QuestObject.prototype.dialog = function(other){
    stage.questManager.notifyEvent(QuestManager.EVENTS.DIALOG, this.name, this);
}

QuestObject.prototype.onCollision = function(other){
    stage.questManager.notifyEvent(QuestManager.EVENTS.COLLISION, this.name, this, other);
}