Quest_01 = function(questManager){
    Quest.call(this, questManager);
    this.dialogs = QuestDialogs.Quest_01;
}

Quest_01.prototype = Object.create(Quest.prototype);

Quest_01.prototype.onStart = function(){
    this.questManager.subscribe(QuestManager.EVENTS.CREATE, 'quest_wood', Quest_01._woodCreate, this);
    
    this.questManager.subscribe(QuestManager.EVENTS.DIALOG, 'grandpa', Quest_01._grandpaDialog, this);
    this.questManager.subscribe(QuestManager.EVENTS.DIALOG, 'quest_wood', Quest_01._woodDialog, this);
}

Quest_01.prototype.onFinish = function(){
    this.questManager.unsubscribe(QuestManager.EVENTS.DIALOG, 'grandpa', this);
    this.questManager.unsubscribe(QuestManager.EVENTS.DIALOG, 'quest_wood', this);

    stage.questManager.questList[2].startQuest();
}

Quest_01._grandpaDialog = function(quest){
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

Quest_01._woodDialog = function(quest){
    if(quest.state == 1){
        stage.dialogManager.startDialog(quest.dialogs[2]);
        quest.state++;
        this.frame = 28;
    }
}

Quest_01._woodCreate = function(quest){
    if(quest.state >= 2 || quest.finished){
        this.frame = 28;
    }
}