ActionScript02 = function(){
    ActionScript.call(this, "script02");

    this.init = function(){
        
        for(i = 0; i < stage.objects.length; i++){
            if(stage.objects.getAt(i).key == "grandpa"){
                this.grandpa = stage.objects.getAt(i);
            }
        }

    }

    const waitForWalkGrandpa = function(objct){
        this.grandpa.update();
        return this.grandpa._state != NPC.STATES.IDLE;
    }

    this.actions = [
        function(){
            this.grandpa.walk(1, 0);
        },
        waitForWalkGrandpa,
        function(){
            this.grandpa.walk(1, 1);
        },
        waitForWalkGrandpa,
        function(){
            this.grandpa.walk(1, 2);
        },
        waitForWalkGrandpa,
        function(){
            this.grandpa.walk(1, 3);
        },
        waitForWalkGrandpa,
        function(){

        }
    ];

}

ActionScript02.prototype = Object.create(ActionScript.prototype);
ActionScript02.prototype.constructor = ActionScript02;

/*
    
    */