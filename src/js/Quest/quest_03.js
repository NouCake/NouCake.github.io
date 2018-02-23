Quest_03 = function(questManager){
    Quest.call(this, questManager);

    this.dialogs = [
        "You will find them  "+
        "on the forrest on   "+
        "the right side of   "+
        "this house          ",

        "Hurry up            ",

        "I found a Mushroom  "+
        "just " + (5-this.collected) + " more",
    ];

    this.questManager.subscribe(this.questManager.EVENT_TYPES.CREATE, 'mushroom', this._mushroomCreate, this);
    this.state = 0;
    this.collected = 3;
}

Quest_03.prototype.startQuest = function(){
    this.aktiv = true;

    this.questManager.subscribe(this.questManager.EVENT_TYPES.DIALOG, 'grandpa', this._grandpaDialog, this);
    this.questManager.subscribe(this.questManager.EVENT_TYPES.DIALOG, 'mushroom', this._mushroomDialog, this);

}

Quest_03.prototype.finishQuest = function(){
    this.aktiv = false;
    this.finish = true;

    this.questManager.unsubscribe(this.questManager.EVENT_TYPES.DIALOG, 'grandpa', this);
    this.questManager.unsubscribe(this.questManager.EVENT_TYPES.DIALOG, 'mushroom', this);
}

Quest_03.prototype._grandpaDialog = function(quest){
    switch(quest.state){
        case 0:
            stage.dialogManager.startDialog(quest.dialogs[0]);
            quest.state++;
            break;
        case 1:
            stage.dialogManager.startDialog(quest.dialogs[1]);
            break;
    }
}

Quest_03.prototype._mushroomCreate = function(quest){
    if(quest.trigger[this.properties.id] || quest.finish || quest.state > 1){
        this.destroy();
    }
}

Quest_03.prototype._mushroomDialog = function(quest){
    quest.collected++;
    if(quest.collected < 4){
        stage.dialogManager.startDialog(quest.dialogs[2]);
    } else {
        stage.actionScriptManager.startScript("script01");
    }
    quest.trigger[this.properties.id] = true;
    this.destroy();
    
}