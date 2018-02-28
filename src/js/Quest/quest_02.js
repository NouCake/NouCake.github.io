Quest_02 = function(questManager){
    Quest.call(this, questManager);

    this.dialogs = [
        "I am still waiting  "+
        "for my god damn beer",

        "I think i will piss "+
        "into this milk      ",

        "Seesh!              "+
        "That's the bets beer"+
        "i ever had in my    "+
        "entire life         ",

        "No one allowed you  "+
        "to leave the house  ",

        "That beer made me   "+
        "hungry. Collect some"+
        "Mushrooms before i  "+
        "eat you. At least 5 "
    ];

    this.questManager.subscribe(QuestManager.EVENTS.CREATE, 'quest_02_trigger', this._triggerCreate, this);
    this.state = 1;
}

Quest_02.prototype.startQuest = function(){
    this.aktiv = true;

    this.questManager.subscribe(QuestManager.EVENTS.DIALOG, 'grandpa', this._grandpaDialog, this);
    this.questManager.subscribe(QuestManager.EVENTS.DIALOG, 'quest_milk', this._milkDialog, this);

    this.questManager.subscribe(QuestManager.EVENTS.CREATE, 'quest_milk', this._milkCreate, this);

    this.questManager.subscribe(QuestManager.EVENTS.COLLISION, 'quest_02_trigger', this._triggerCollision, this);
}

Quest_02.prototype.finishQuest = function(){
    this.aktiv = false;
    this.finish = true;

    this.questManager.unsubscribe(QuestManager.EVENTS.DIALOG, 'grandpa', this);
    this.questManager.unsubscribe(QuestManager.EVENTS.DIALOG, 'quest_milk', this);;

    this.questManager.questList[2].startQuest();
}

Quest_02.prototype._grandpaDialog = function(quest){
    switch(quest.state){
        case 0:
            stage.dialogManager.startDialog(quest.dialogs[0]);
            break;
        case 1:
            stage.dialogManager.startDialog(quest.dialogs[2]);
            quest.state++;
            break;
        case 2:
            stage.dialogManager.startDialog(quest.dialogs[4]);
            quest.finishQuest();
    }
}
Quest_02.prototype._milkCreate = function(quest){
    if(quest.finish){
        this.destroy();
    }
}

Quest_02.prototype._milkDialog = function(quest){
    if(quest.state == 0){    
        stage.dialogManager.startDialog(quest.dialogs[1]);
        quest.state++;
        this.destroy();
    }
}

Quest_02.prototype._triggerCreate = function(quest){
    this.ginger.trigger = true;
    this.renderable = false;

    if(quest.finish || quest.state > 2){
        this.destroy();
    }
}

Quest_02.prototype._triggerCollision = function(quest, other){
    if(quest.aktiv && quest.state == 2){
        other.onCollision(this);
        stage.dialogManager.startDialog(quest.dialogs[3]);
        console.log(other);
    }
}