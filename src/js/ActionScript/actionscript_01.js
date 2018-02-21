ActionScript01 = function(){

    this.timer = 0;
    this.aktiv = false;
    this.step = 0;

}

ActionScript01.start = function(){

    this.player = stage.player;
    this.evilman = stage.objects.create(0, 0, 'tileset', 17);
    this.aktiv = true;
    stage.pauseGame();

}

ActionScript01.update = function(){
    if(this.step == 0){
        stage.dialogManager.startDialog("Hey!");
        this.step++;
    } else if(this.step == 1){
        if(!stage.dialogManager.running){
            this.step++;
        }
    } else if(this.step == 2){
        this.player.direction = 3;
        this.evilman.visible = true;
        this.evilman.direction = 2;
        this.evilman.x = 70*TILE_SIZE
        this.evilman.y = 27*TILE_SIZE
        //this.evilman.
    }
}