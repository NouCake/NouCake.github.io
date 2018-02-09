let stage = {
    preload: function(){
        game.load.spritesheet('player', 'src/assets/player.png', 16, 16);
        game.load.spritesheet('tileset', 'src/assets/tileset.png', 16, 16);
        game.load.tilemap('map_03', 'src/assets/maps/map_03.json', null, Phaser.Tilemap.TILED_JSON);
    },
    create: function(){
        game.time.advancedTiming = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.renderer.renderSession.roundPixels = true
        game.stage.backgroundColor = '#2d2d2d';
        game.time.advancedTiming = true;
        game.camera.roundPx = true;

        Gingerbread.init(this);
        this.input = new Input();
        this.mapLoader = new MapLoader(this);

        stage.objects = new Phaser.Group(game);
        this.objects.name = "Objects";
        this.objects.roundPixels = true;

        this.ui = new Phaser.Group(game);
        this.ui.name = "UI";
        this.ui.fixedToCamera = true;

        this.player = new Player();
        this.map = this.mapLoader.loadMap('map_03');


    },
    update: function(){
        this.input.update();
        Gingerbread.update();
    },
    render: function(){

    }
}

var TILE_SIZE = 16;
var game = new Phaser.Game(160, 128, Phaser.CANVAS, "", stage, false, false);