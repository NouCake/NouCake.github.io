QuestManager = function(){
    this.subscribers = [];
    this.questList = [];

    this.questList.push(new Quest_01(this));
    this.questList.push(new Quest_02(this));

    this.questList[0].startQuest();
}

QuestManager.prototype.update = function(){
    for(i in this.questList){
        if(this.questList[i].aktiv){
            this.questList[i].update();
        }
    }
}

QuestManager.prototype.subscribe = function(key, callback, quest){
    this.subscribers.push({key:key, callback:callback, quest:quest});
    console.log("Listener succesfully subscribed to key", key);
}

QuestManager.prototype.unsubscribe = function(key, quest){
    let i = this.subscribers.length;
    while(i--){
        if(key == this.subscribers[i].key && quest == this.subscribers[i].quest){
            console.log("Listener succesfully unsubscribed to key", this.subscribers[i].key,);
            delete this.subscribers[i];
        }
    }
    this.subscribers = this.subscribers.filter(obj => obj != undefined);
}

QuestManager.prototype.notifyDialog = function(key, object){
    for(i in this.subscribers){
        if(this.subscribers[i].key == key){
            this.subscribers[i].callback.call(object, this.subscribers[i].quest);
        }
    }
}