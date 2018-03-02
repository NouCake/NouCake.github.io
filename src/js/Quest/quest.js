Quest = function(questManager){
    this.state = 0;
    this.aktiv = false;
    this.finished = false;
    this.questManager = questManager;
    this.trigger = [];
}

Quest.prototype = Object.create(Object.prototype);
Quest.prototype.constructor = Quest;

Quest.prototype.startQuest = function(){
    this.aktiv = true;
    this.onStart();
}

Quest.prototype.finishQuest = function(){
    this.aktiv = false;
    this.finished = true;
    this.onFinish();
}