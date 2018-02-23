ActionScriptManager = function(){
    this.scriptList = [];
    
    this.scriptList.push(new ActionScript01());
    this.scriptList.push(new ActionScript02());
}

ActionScriptManager.prototype = Object.create(Object.prototype);
ActionScriptManager.prototype.constructor = ActionScriptManager;

ActionScriptManager.prototype.startScript = function(scriptName){
    for(i in this.scriptList){
        console.log(scriptName, this.scriptList[i].name);
        if(this.scriptList[i].name == scriptName){
            this.scriptList[i].start();
            console.log("Script started");
        }            
    }
}

ActionScriptManager.prototype.update = function(){
    let counter = 0;
    for(i in this.scriptList){
        if(this.scriptList[i].aktiv){
            this.scriptList[i].update();
            counter++;
        }
    }
    if(counter > 1){
        console.log("ERRÖR");
    }
}