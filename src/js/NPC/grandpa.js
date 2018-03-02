Grandpa = function(x, y, properties){
    NPC.call(this, x, y, 'grandpa', true, properties);

    this.ginger.setSize(9, 14);
    this.ginger.setOrigin(3, 1, this.anchor);
    this.name = 'grandpa';
}

Grandpa.prototype = Object.create(NPC.prototype);
Grandpa.prototype.constructor = Grandpa;

Grandpa.prototype.dialog = function(other){
    stage.questManager.notifyEvent(QuestManager.EVENTS.DIALOG, this.name, this);
}