ActionScript = function(name){
    this.name = name;

    this.aktiv = false;
    this._step = 0;

    this.actions = [];

}

ActionScript.prototype = Object.create(Object.prototype);
ActionScript.prototype.constructor = ActionScript;

ActionScript.prototype.bindActions = function(){
    this.actions = this.actions.map((func) => func.bind(this));
}

ActionScript.prototype.start = function(){
    this.init();

    this.bindActions();
    this._step = 0;
    this.aktiv = true;
    stage.objects.paused = true;
}

ActionScript.prototype.init = function(){

}

ActionScript.prototype.update = function(){
    if(this._step >= this.actions.length){
        this.finishScript();
    } else if(this.actions[this._step]() != true){
        this._step++;
    }
}

ActionScript.prototype.finishScript  = function(){
    this.aktiv = false;
    stage.resumeGame();
}

ActionScript.prototype._waitForDialog = function(){
    if(stage.dialogManager.running){
        return true;
    }
}

