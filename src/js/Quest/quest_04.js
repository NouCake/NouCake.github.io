Quest_04 = function(questManager){
    Quest.call(this, questManager);

    this.dialogs = QuestDialogs.Quest_04;
}

Quest_04.prototype = Object.create(Quest.prototype);

Quest_04.prototype.onStart = function(){
    this.questManager.subscribe(QuestManager.EVENTS.DIALOG, 'grandpa', Quest_04._grandpaDialog, this);
    this.questManager.subscribe(QuestManager.EVENTS.DIALOG, 'weaponguy', Quest_04._weaponguyDialog, this);
    this.questManager.subscribe(QuestManager.EVENTS.COLLISION, 'home_trigger', Quest_04._triggerCollision, this);
}
Quest_04.prototype.onFinish = function(){
    this.questManager.unsubscribe(QuestManager.EVENTS.DIALOG, 'grandpa', this);
    this.questManager.unsubscribe(QuestManager.EVENTS.COLLISION, 'home_trigger', this);
}


Quest_04._grandpaDialog = function(quest){
    if(quest.state == 0){
        stage.questManager.questList[0].finishQuest();
        stage.dialogManager.startDialog(quest.dialogs[1]);
        quest.state++;
    } else {
        stage.dialogManager.startDialog(quest.dialogs[1]);
    }
}

Quest_04._triggerCollision = function(quest, other){
    if(other == stage.player){
        if(!(other.carriedObject && other.carriedObject.name == 'sword')){
            stage.dialogManager.startDialog(quest.dialogs[2]);
            other.onCollision(this);
        }
    }
}

Quest_04._weaponguyDialog = function(quest){
    if(quest.state == 1){
        stage.dialogManager.startDialog(quest.dialogs[3]);
        quest.finishQuest();
    }
}