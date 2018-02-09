Grandpa = function(x, y){
    NPC.call(this, x, y, 'grandpa', false);

    this.ginger.setSize(8, 14);
    this.ginger.setOrigin(4, 1);
    this.name = "grandpa";
}

Grandpa.prototype = Object.create(Phaser.Sprite.prototype);
Grandpa.prototype.constructor = Grandpa;

Grandpa.prototype.dialog = function(other){
    stage.dialogManager.startDialog("hello bello, my ass is hurting");
}