Grandpa = function(x, y){
    NPC.call(this, x, y, 'grandpa', true);

    this.ginger.setSize(9, 14);
    this.ginger.setOrigin(3, 1, this.anchor);
    this.name = 'grandpa';
}

Grandpa.prototype = Object.create(NPC.prototype);
Grandpa.prototype.constructor = Grandpa;

Grandpa.prototype.dialog = function(other){
    stage.questManager.notifyEvent(QuestManager.EVENTS.DIALOG, this.name, this);
}