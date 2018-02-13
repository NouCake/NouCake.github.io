let MapLoader = function(stage){
    this.stage = stage;
}

MapLoader.prototype.loadMap = function(mapKey){
    map = new Phaser.Tilemap(game, mapKey);
    map.addTilesetImage("tiles", "tileset");
    map.groundLayer = map.createLayer(this._LAYER.GROUND);
    map.topLayer = map.createLayer(this._LAYER.TOP);
    this._createCollisionMap(map);

    game.world.setBounds(0,0, map.width * TILE_SIZE, map.height * TILE_SIZE);
        
    return map;
}

MapLoader.prototype._LAYER = {
    GROUND: 0,
    TOP: 1,
    COLLISION: 2,
    OBJECTS: 3,
}

MapLoader.prototype.addObjectsFromMap = function(map, group){
    //if(!this.map.objects.objects) return;
	objects = map.objects.objects;
	for(i in objects){
        objClass = eval(objects[i].properties.class);
        obj = new objClass(objects[i].x, objects[i].y-TILE_SIZE, objects[i].properties);
        if(obj instanceof Phaser.Sprite){
            console.log(objects[i].properties.class, "created");
            group.add(obj);
        }
	}
}
    
MapLoader.prototype._createCollisionMap = function(map){
    map.collisionMap = [];
    map.layers[this._LAYER.COLLISION].data
        .forEach((line) => map.collisionMap = map.collisionMap.concat(line));
    map.collisionMap = map.collisionMap
        .filter((tile) => tile.index == 11)
        .map((tile) => _Block(tile.x*TILE_SIZE, tile.y*TILE_SIZE));
}

_Block = function(x, y){
    let block = {};
    block.x = x;
    block.y = y;
    block.width = TILE_SIZE;
    block.height = TILE_SIZE;
    
    block.ginger = Gingerbread.createBody(block);
    return block;
}
