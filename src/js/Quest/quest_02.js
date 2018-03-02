Quest_02 = function(questManager){
    Quest.call(this, questManager);

    this.dialogs = QuestDialogs.Quest_02;

    this.state = 0;
}

Quest_02.prototype = Object.create(Quest.prototype);

Quest_02.prototype.onStart = function(){
    this.questManager.subscribe(QuestManager.EVENTS.CREATE, 'quest_milk', Quest_02._milkCreate, this);
    
    this.questManager.subscribe(QuestManager.EVENTS.DIALOG, 'grandpa', Quest_02._grandpaDialog, this);
    this.questManager.subscribe(QuestManager.EVENTS.DIALOG, 'quest_milk', Quest_02._milkDialog, this);
}

Quest_02.prototype.onFinish = function(){
    this.questManager.unsubscribe(QuestManager.EVENTS.DIALOG, 'grandpa', this);
    this.questManager.unsubscribe(QuestManager.EVENTS.DIALOG, 'quest_milk', this);

    this.questManager.questList[3].startQuest();
}

Quest_02._grandpaDialog = function(quest){
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
    }
}

Quest_02._milkCreate = function(quest){
    if(quest.state > 1 || quest.finish){
        this.destroy();
    }
}

Quest_02._milkDialog = function(quest){
    if(quest.state == 1){    
        stage.dialogManager.startDialog(quest.dialogs[2]);
        quest.state++;
        this.destroy();
    }
}