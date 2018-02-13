QuestMilk = function(x, y){
    Phaser.Sprite.call(this, game, x, y, 'misc', 5);

    Gingerbread.addPhysics(this);
    this.name = "questmilk";
    if(stage.questManager.questList[0].state > 1){
        this.frame = 28;
    }
}

QuestMilk.prototype = Object.create(Phaser.Sprite.prototype);
QuestMilk.prototype.constructor = QuestMilk;

QuestMilk.prototype.dialog = function(other){
    stage.questManager.notifyDialog(this.name, this);
}