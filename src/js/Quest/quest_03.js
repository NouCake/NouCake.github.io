Quest_03 = function(questManager){
    Quest.call(this, questManager);

    this.dialogs = QuestDialogs.Quest_03;
    this.collected = 0;
}

Quest_03.prototype = Object.create(Quest.prototype);

Quest_03.prototype.onStart = function(){
    this.questManager.subscribe(QuestManager.EVENTS.CREATE, 'mushroom', Quest_03._mushroomCreate, this);

    this.questManager.subscribe(QuestManager.EVENTS.DIALOG, 'grandpa', Quest_03._grandpaDialog, this);
    this.questManager.subscribe(QuestManager.EVENTS.DIALOG, 'mushroom', Quest_03._mushroomDialog, this);
    this.questManager.subscribe(QuestManager.EVENTS.COLLISION, 'home_trigger', Quest_03._triggerCollision, this);
}

Quest_03.prototype.finishQuest = function(){
    this.questManager.unsubscribe(QuestManager.EVENTS.DIALOG, 'grandpa', this);
    this.questManager.unsubscribe(QuestManager.EVENTS.DIALOG, 'mushroom', this);
    this.questManager.unsubscribe(QuestManager.EVENTS.COLLISION, 'home_trigger', this);

    this.questManager.questList[4].startQuest();
}

Quest_03._grandpaDialog = function(quest){
    switch(quest.state){
        case 0:
            stage.dialogManager.startDialog(quest.dialogs[0]);
            quest.state++;
            break;
        case 1:
            stage.dialogManager.startDialog(quest.dialogs[2]);
            quest.state++;
            break;
        case 2:
            stage.dialogManager.startDialog(quest.dialogs[3]);
            break;
    }
}

Quest_03._mushroomCreate = function(quest){
    if(quest.trigger[this.id] || quest.finish || quest.state > 2){
        this.destroy();
    }
}

Quest_03._mushroomDialog = function(quest){
    if(quest.state > 0){
        this.destroy();
        quest.collected++;
        if(quest.collected < 4){
            stage.dialogManager.startDialog(
                "I found a Mushroom  "+
                "just " + (5-quest.collected) + " more",);
        } else {
            stage.actionScriptManager.startScript("script01");
            quest.finishQuest();
        }
        quest.trigger[this.id] = true;
    }
}

Quest_03._triggerCollision = function(quest, other){
    console.log("here");
    if(other == stage.player && quest.state == 0){
        stage.dialogManager.startDialog(quest.dialogs[1]);
        other.onCollision(this);
    }
}