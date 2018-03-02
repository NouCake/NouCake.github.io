QuestManager = function(){
    this.subscribers = [];
    this.questList = [];
}

QuestManager.prototype.update = function(){
    for(i in this.questList){
        if(this.questList[i].aktiv){
            if(this.questList[i].update)
                this.questList[i].update();
        }
    }
}

QuestManager.prototype.subscribe = function(event, key, callback, quest){
    this.subscribers.push({event:event, key:key, callback:callback, quest:quest});
    console.log("subscribed", key)
}

QuestManager.prototype.unsubscribe = function(event, key, quest){
    let i = this.subscribers.length;
    while(i--){
        if(this.subscribers[i].quest == quest &&
            this.subscribers[i].key == key &&
            this.subscribers[i].event == event){
            delete this.subscribers[i];
            console.log("unsubscribed", key);
        }
    }
    this.subscribers = this.subscribers.filter(obj => obj != undefined);
}

QuestManager.prototype.notifyEvent = function(event, key, object, other){
    console.log("notified",event, key);
    let i = this.subscribers.length;
    while(i--) {
        if(this.subscribers[i].key == key &&
            this.subscribers[i].event == event){
                this.subscribers[i].callback.call(object, this.subscribers[i].quest, other);
            }
    }
}

QuestManager.EVENTS = {
    CREATE: 'create',
    DIALOG: 'dialog',
    COLLISION: 'collision' 
}