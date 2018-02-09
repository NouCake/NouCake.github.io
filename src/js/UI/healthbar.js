Healthbar = function(player){
    Phaser.Group.call(this, game, null, "healthbar", false);

    this.player = player;
    console.log(player);

    this.hearts = [];
    this.hearts.push(stage.ui.create(game.width - 12*3, 0, 'tileset', 100));
    this.hearts.push(stage.ui.create(game.width - 12*2, 0, 'tileset', 100));
    this.hearts.push(stage.ui.create(game.width - 12*1, 0, 'tileset', 100));

    this.health = 6;
}

Healthbar.prototype = Object.create(Phaser.Group.prototype);
Healthbar.prototype.constructor = Healthbar;

Healthbar.prototype.update = function(){
    if(this.health != this.player.health){
        this.setHealth(this.player.health);
    }
}

Healthbar.prototype.setHealth = function(health){
    this.health = health;
    console.log("setLife " + this.hearts);
    for(var i = 1; i < this.hearts.length+1; i++){
        if(health >= i*2){
            this.hearts[i-1].frame = 100;
        } else if(health == i*2 -1){
            this.hearts[i-1].frame = 101;
        } else {
            this.hearts[i-1].frame = 102;
        }
    }
}