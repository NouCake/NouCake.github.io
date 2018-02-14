Mushroom = function(x, y, properties){
    QuestObject.call(this, x, y, {key:'misc', frame:6, name:'mushroom', id:properties.id})
}

Mushroom.prototype = Object.create(QuestObject.prototype);
Mushroom.prototype.constructor = Mushroom;