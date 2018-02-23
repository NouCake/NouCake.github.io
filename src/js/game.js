let stage = {
    preload: function(){
        game.load.bitmapFont('font', 'src/assets/font/font.png', 'src/assets/font/font.fnt');
        game.load.image('dialog', 'src/assets/dialog.png');
        game.load.spritesheet('player', 'src/assets/spritesheets/player.png', 16, 16);
        game.load.spritesheet('grandpa', 'src/assets/spritesheets/grandfather.png', 16, 16);
        game.load.spritesheet('evilman', 'src/assets/spritesheets/ghost.png', 16, 16);
        game.load.spritesheet('tileset', 'src/assets/tileset.png', 16, 16);
        game.load.spritesheet('misc', 'src/assets/misc.png', 8, 8);
        game.load.spritesheet('dpad', 'src/assets/dpad.png', 32, 32);
        game.load.tilemap('map_01', 'src/assets/maps/map_01.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map_03', 'src/assets/maps/map_03.json', null, Phaser.Tilemap.TILED_JSON);
    },
    create: function(){
        game.time.advancedTiming = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.renderer.renderSession.roundPixels = true
        game.stage.backgroundColor = '#2d2d2d';
        game.time.advancedTiming = true;
        game.camera.roundPx = true;

        stage.objects = new Phaser.Group(game);
        this.objects.name = "Objects";
        this.objects.roundPixels = true;

        this.ui = new Phaser.Group(game);
        this.ui.name = "UI";
        this.ui.fixedToCamera = true;

        Gingerbread.init(this);
        //Gingerbread.debug = true;

        this.input = new Input();
        this.player = new Player();
        this.mapLoader = new MapLoader(this);
        this.healthbar = new Healthbar(this.player);
        this.dialogManager = new DialogManager();
        this.questManager = new QuestManager();
        this.actionScriptManager = new ActionScriptManager();


        this.ui.add(this.dialogManager);
        this.ui.add(this.healthbar);

        this.loadNewMap('map_03');
    },
    loadNewMap: function(key, x, y){
        this.objects.removeAll();
        this.objects.add(this.player);

        Gingerbread.clearList(function(obj){
            return obj == stage.player || obj == stage.player.dialogHitbox
        })
        

        if(this.map){
            this.map.groundLayer.destroy();
            this.map.topLayer.destroy();
            this.map.destroy();
        }
        
        this.map = this.mapLoader.loadMap(key);
        this.mapLoader.addObjectsFromMap(this.map, this.objects);
        if(x){
            this.player.SET(x, y);
        }
        this.sortObjects();
    },
    update: function(){
        this.input.update();
        this.actionScriptManager.update();
        Gingerbread.update();
    },
    render: function(){

    },
    pauseGame: function(){
        this.objects.paused = true;
        Gingerbread.paused = true;
    },
    resumeGame: function(){
        this.objects.paused = false;
        Gingerbread.paused = false;
    },
    sortObjects: function(){
        game.world.bringToTop(this.objects);
        this.player.bringToTop();
        game.world.bringToTop(this.ui);
    }
}

//Customizing Phaser
Phaser.Group.prototype.update = function () {
    if(this.paused)
        return;
    
    var i = this.children.length;
    while (i--){
        var len = this.children.length;
        if (i >= len)
            i = len - 1;
        var child = this.children[i];
        if (!this.updateOnlyExistingChildren || child.exists)
            child.update();
    }
};

let TILE_SIZE = 16;
let DIRECTION_AS_POINT = [new Phaser.Point(0, 1),
    new Phaser.Point(-1, 0),
    new Phaser.Point(0, -1),
    new Phaser.Point(1, 0)];
let game = new Phaser.Game(160, 128, Phaser.CANVAS, "", stage, false, false);