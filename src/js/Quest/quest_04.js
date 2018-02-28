Quest_04 = function(questManager){
    Quest.call(this, questManager);

    this.state = 0;
    this.questManager.subscribe(QuestManager.EVENTS.CREATE, 'sword', this._swordCreate);

    this.dialogs = [
        "Why are you here    "+
        "without mushrooms?  "+
        "                    "+
        "What? A Evilman?    "+
        "He stole them all?  "+
        "What a bastard!     "+
        "Here take my sword  "+
        "and kill him        "+
        "Press A for attack  "+
        "or whatever.        "+
        "Hell im so drunk.",

        "No cycling allowed  "+
        "here.",

        "OAK: ASH!           "+
        "This isnt the time  "+
        "to use that!",

        "Theres a time and   "+
        "place for everything",

        "You should probably "+
        "go to the city and  "+
        "learn how to use a  "+
        "a sword",

        "Grandpa:            "+
        "DONT FKN TOUCH THAT!"
    ]
}

Quest_04.prototype.startQuest = function(){
    this.aktiv = true;

    this.questManager.subscribe(QuestManager.EVENTS.DIALOG, 'grandpa', this._grandpaDialog, this);
    this.questManager.subscribe(QuestManager.EVENTS.DIALOG, 'player', this._playerAction, this);
    this.questManager.subscribe(QuestManager.EVENTS.DIALOG, 'sword', this._swordDialog, this);

}

Quest_04.prototype._swordCreate = function(){
    console.log("new dialog", this);
    this.dialog = function(other){
        stage.questManager.notifyEvent(QuestManager.EVENTS.DIALOG, 'sword', this, other);
    }
}

Quest_04.prototype._swordDialog = function(quest, other){
    if(!quest.aktiv || quest.state < 1){
        stage.dialogManager.startDialog(quest.dialogs[5]);
    } else {
        this.dialog = Generics.throwDialog.bind(this);
        this.dialog(other);
        console.log(other);
    }
}

Quest_04.prototype.finishQuest = function(){
    this.aktiv = false;
    this.finished = true;

    this.questManager.unsubscribe(QuestManager.EVENTS.DIALOG, 'grandpa', this);;
}

Quest_04.prototype._grandpaDialog = function(quest){
    switch(quest.state){
        case 0:
            stage.dialogManager.startDialog(quest.dialogs[0]);
            quest.state++;
            break;
        case 4:
            stage.dialogManager.startDialog(quest.dialogs[4]);
            quest.state++;
            break;
    }
}

Quest_04.prototype._playerAction = function(quest){
    switch(quest.state){
        case 1:
            stage.dialogManager.startDialog(quest.dialogs[1]);
            quest.state++;
            break;
        case 2:
            stage.dialogManager.startDialog(quest.dialogs[2]);
            quest.state++;
            break;
        case 3:
            stage.dialogManager.startDialog(quest.dialogs[3]);
            quest.state++;
            break;
    }
}