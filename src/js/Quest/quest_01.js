Quest_01 = function(questManager){
    Quest.call(this, questManager);

    this.dialogs = [
        "Oh my dear Ninjaboy,"+
        "would you please    "+
        "like to cut some    "+
        "wood for me? You can"+
        "find it outisde.",

        "The wood is outside."+
        "Go and cut it!",

        "You have cut        "+
        "the wood",

        "Thanks alot Ninjaboy"+
        "now i need Milk.    "+
        "Be my bitch."
    ]
}

Quest_01.prototype.startQuest = function(){
    this.aktiv = true;

    this.questManager.subscribe('grandpa', this._grandpaDialog, this);
    this.questManager.subscribe('quest_wood', this._woodDialog, this);
}

Quest_01.prototype.finishQuest = function(){
    this.aktiv = false;
    this.finished = true;
    stage.questManager.questList[1].startQuest();
    this.questManager.unsubscribe('grandpa', this);
    this.questManager.unsubscribe('quest_wood', this);
}

Quest_01.prototype._grandpaDialog = function(quest){
    switch(quest.state){
        case 0:
            stage.dialogManager.startDialog(quest.dialogs[0]);
            quest.state++;
            break;
        case 1:
            stage.dialogManager.startDialog(quest.dialogs[1]);
            break;
        case 2:
            stage.dialogManager.startDialog(quest.dialogs[3]);
            quest.finishQuest();
            break;
    }
}

Quest_01.prototype._woodDialog = function(quest){
    if(quest.state == 1){
        stage.dialogManager.startDialog(quest.dialogs[2]);
        quest.state++;
        this.frame = 28;
    }
}