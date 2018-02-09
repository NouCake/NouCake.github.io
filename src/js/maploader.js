let MapLoader = function(stage){
    this.stage = stage;
}

MapLoader.prototype.loadMap = function(mapKey){
    map = game.add.tilemap(mapKey);
    map.addTilesetImage("tiles", "tileset");
    map.groundLayer = map.createLayer(this._LAYER.GROUND);
    map.topLayer = map.createLayer(this._LAYER.TOP);
    this._createCollisionMap(map);

    this.stage.objects.removeAll();
    this.stage.objects.add(this.stage.player);
    this._addObjectsFromMap(map);
    game.world.bringToTop(stage.objects);
    stage.player.bringToTop();
}

MapLoader.prototype._LAYER = {
    GROUND: 0,
    TOP: 1,
    COLLISION: 2,
    OBJECTS: 3,
}

MapLoader.prototype._addObjectsFromMap = function(map){
    //if(!this.map.objects.objects) return;
	objects = map.objects.objects;
	for(i in objects){
        console.log(objects[i].properties.class);
		eval(objects[i].properties.class)(objects[i].x, objects[i].y-TILE_SIZE, objects[i].properties);
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
