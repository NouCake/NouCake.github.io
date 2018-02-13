Quest_02 = function(questManager){
    Quest.call(this, questManager);

    this.dialogs = [
        "I am still waiting  "+
        "for my god damn milk",

        "                    ",

    ]
}

Quest_02.prototype.startQuest = function(){
    this.aktiv = true;

    this.questManager.subscribe('grandpa', this._grandpaDialog, this);
    this.questManager.subscribe('quest_milk', this._milkDialog, this);
}

Quest_02.prototype._grandpaDialog = function(quest){
    switch(quest.state){
        case 0:
            stage.dialogManager.startDialog(quest.dialogs[0]);
            break;
    }
}

Quest_02.prototype._milkDialog = function(quest){
    stage.dialogManager.startDialog("You have the Milk");
}