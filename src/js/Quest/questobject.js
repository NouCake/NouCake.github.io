QuestObject = function(x, y, properties){
    Phaser.Sprite.call(this, game, x, y, properties.key, properties.frame);
    this.name = properties.name;
    this.properties = properties;

    Gingerbread.addPhysics(this);
    stage.questManager.notifyEvent(stage.questManager.EVENT_TYPES.CREATE, this.name, this);
}

QuestObject.prototype = Object.create(Phaser.Sprite.prototype);
QuestObject.prototype.constructor = QuestObject;

QuestObject.prototype.dialog = function(other){
    stage.questManager.notifyEvent(stage.questManager.EVENT_TYPES.DIALOG, this.name, this);
}

QuestObject.prototype.onCollision = function(other){
    stage.questManager.notifyEvent(stage.questManager.EVENT_TYPES.COLLISION, this.name, this, other);
}