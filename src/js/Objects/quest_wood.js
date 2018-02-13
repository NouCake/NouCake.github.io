QuestWood = function(x, y){
    Phaser.Sprite.call(this, game, x, y, 'tileset', 27);

    Gingerbread.addPhysics(this);
    this.name = "quest_wood";
    if(stage.questManager.questList[0].state > 1){
        this.frame = 28;
    }
}

QuestWood.prototype = Object.create(Phaser.Sprite.prototype);
QuestWood.prototype.constructor = QuestWood;

QuestWood.prototype.dialog = function(other){
    stage.questManager.notifyDialog(this.name, this);
}