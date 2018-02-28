QuestObject = function(x, y, properties){
    Phaser.Sprite.call(this, game, x, y, properties.key, properties.frame);
    this.name = properties.name;
    this.properties = properties;

    Gingerbread.add(this);
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