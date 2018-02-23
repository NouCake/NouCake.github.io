Quest = function(questManager){
    this.state = 0;
    this.aktiv = false;
    this.questManager = questManager;
    this.trigger = [];
}

Quest.prototype = Object.create(Object.prototype);
Quest.prototype.constructor = Quest;

Quest.prototype.update = function(){

}

Quest.prototype.startQuest = function(){
    
}

Quest.prototype.finishQuest = function(){
    
}