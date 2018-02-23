ActionScript01 = function(){
    ActionScript.call(this, "script01");

    this.init = function(){
        
        this.player = stage.player;
        this.evilman = new Evilman(0, 0);
        this.evilman.visible = false;
        stage.objects.add(this.evilman);

    }

    const waitForWalkEvilman = function(objct){
        this.evilman.update();
        return this.evilman._state != NPC.STATES.IDLE;
    }

    this.actions = [
        function(){
            stage.dialogManager.startDialog("Hey!", false);
        },
        this._waitForDialog,
        function(){
            console.log(this);
            this.player.direction = 3;
            this.evilman.visible = true;
            this.evilman.direction = 2;
            this.evilman.x = 70*TILE_SIZE
            this.evilman.y = 27*TILE_SIZE
    
            let distToPlayerX = Math.round((this.evilman.x - this.player.x) / TILE_SIZE);
            this.evilman.walk(distToPlayerX,1);
        },
        waitForWalkEvilman,
        function(){
            const distToPlayerY = Math.round((this.evilman.y - this.player.y) / TILE_SIZE);
            this.evilman.walk(distToPlayerY, 2);
        },
        waitForWalkEvilman,
        function(){
            stage.dialogManager.startDialog(
                "Im Evilman because  "+
                "Im obviously evil   "+
                "and i will steal all"+
                "of your mushrooms!  "+
                "*evil laughing*     ",
                false);
        },
        this._waitForDialog,
        function(){
            const distToPathY = Math.round(27 - this.evilman.y/TILE_SIZE);
            this.evilman.walk(distToPathY, 0);
        },
        waitForWalkEvilman,
        function(){
            const distToPathX = Math.round(70 - this.evilman.x / TILE_SIZE);
            this.evilman.walk(distToPathX, 3);
        },
        waitForWalkEvilman,
        function(){
            this.evilman.visible = false;
            this.evilman.destroy();
        }
    ];

}

ActionScript01.prototype = Object.create(ActionScript.prototype);
ActionScript01.prototype.constructor = ActionScript01;

/*
    
    */