Evilman = function(x, y){
    NPC.call(this, x, y, 'evilman', true);

    this.ginger.setSize(8, 14);
    this.ginger.setOrigin(4, 1);
    this.name = 'evilman';

    this.walk(1, 1);
}

Evilman.prototype = Object.create(NPC.prototype);
Evilman.prototype.constructor = Grandpa;