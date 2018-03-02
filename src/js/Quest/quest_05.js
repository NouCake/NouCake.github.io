Quest_05 = function(questManager){
    Quest.call(this, questManager);

    this.dialogs = QuestDialogs.Quest_05;
}

Quest_05.prototype = Object.create(Quest.prototype);

Quest_05.prototype.onStart = function(){
    this.questManager.subscribe(QuestManager.EVENTS.CREATE, 'sword', Quest_05._swordCreate, this);
    this.questManager.subscribe(QuestManager.EVENTS.DIALOG, 'sword', Quest_05._swordDialog, this);
}

Quest_05.prototype.onFinish = function(){
    this.questManager.unsubscribe(QuestManager.EVENTS.DIALOG, 'sword', this);
    
    this.sword.dialog = Generics.throwDialog.bind(this.sword);
}

Quest_05._swordCreate = function(quest){
    this.dialog = function(other){
        stage.questManager.notifyEvent(QuestManager.EVENTS.DIALOG, 'sword', this, other);
    }
    quest.sword = this;
}

Quest_05._swordDialog = function(quest, other){
    stage.dialogManager.startDialog(quest.dialogs[0]);
}