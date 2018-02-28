Quest_01 = function(questManager){
    Quest.call(this, questManager);

    this.dialogs = [
        "Boi, you're still   "+
        "around? Its freezing"+
        "cold. Make yourself "+
        "useful and cut wood "+
        "or whatever.        "+
        "Where's my damn beer",

        "The wood is outside."+
        "Go and cut it!      "+
        "stupid brat         ",

        "You have cut        "+
        "the wood            ",

        "And now bring me    "+
        "my fkn beer from    "+
        "outside             "
    ]

    this.state = 2;
}

Quest_01.prototype.startQuest = function(){
    this.aktiv = true;

    this.questManager.subscribe(QuestManager.EVENTS.DIALOG, 'grandpa', this._grandpaDialog, this);

    this.questManager.subscribe(QuestManager.EVENTS.DIALOG, 'quest_wood', this._woodDialog, this);
    this.questManager.subscribe(QuestManager.EVENTS.CREATE, 'quest_wood', this._woodCreate, this);
}

Quest_01.prototype.finishQuest = function(){
    this.aktiv = false;
    this.finished = true;
    stage.questManager.questList[1].startQuest();
    this.questManager.unsubscribe(QuestManager.EVENTS.DIALOG, 'grandpa', this);
    this.questManager.unsubscribe(QuestManager.EVENTS.DIALOG, 'quest_wood', this);
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

Quest_01.prototype._woodCreate = function(quest){
    if(quest.state >= 2){
        this.frame = 28;
    }
}