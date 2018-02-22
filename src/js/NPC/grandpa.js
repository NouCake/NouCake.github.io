Grandpa = function(x, y){
    NPC.call(this, x, y, 'grandpa', true);

    this.ginger.setSize(8, 14);
    this.ginger.setOrigin(4, 1);
    this.name = 'grandpa';

    this.walk(1, 1);
    console.log(this);
}

Grandpa.prototype = Object.create(NPC.prototype);
Grandpa.prototype.constructor = Grandpa;

Grandpa.prototype.dialog = function(other){
    stage.questManager.notifyEvent(stage.questManager.EVENT_TYPES.DIALOG, this.name, this);
}