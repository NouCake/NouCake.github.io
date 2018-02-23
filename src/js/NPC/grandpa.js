Grandpa = function(x, y){
    NPC.call(this, x, y, 'grandpa', true);

    this.ginger.setSize(9, 14);
    this.ginger.setOrigin(3, 1);
    this.name = 'grandpa';
}

Grandpa.prototype = Object.create(NPC.prototype);
Grandpa.prototype.constructor = Grandpa;

Grandpa.prototype.dialog = function(other){
    stage.questManager.notifyEvent(stage.questManager.EVENT_TYPES.DIALOG, this.name, this);
}