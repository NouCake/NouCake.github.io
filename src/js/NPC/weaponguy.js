WeaponGuy = function(x, y, properties){
    NPC.call(this, x, y, 'guard', true, properties);

    this.ginger.setSize(9, 14);
    this.ginger.setOrigin(3, 1, this.anchor);
    this.name = 'weaponguy';
}

WeaponGuy.prototype = Object.create(NPC.prototype);
WeaponGuy.prototype.constructor = WeaponGuy;

WeaponGuy.prototype.dialog = function(other){
    stage.questManager.notifyEvent(QuestManager.EVENTS.DIALOG, this.name, this);
} 