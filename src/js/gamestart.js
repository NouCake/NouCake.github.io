LoadStartGame = function(){
    
    
    stage.actionScriptManager.scriptList.push(new ActionScript01());
    stage.actionScriptManager.scriptList.push(new ActionScript02());

    stage.questManager.questList.push(new Quest_05(stage.questManager));
    stage.questManager.questList.push(new Quest_01(stage.questManager));
    stage.questManager.questList.push(new Quest_02(stage.questManager));
    stage.questManager.questList.push(new Quest_03(stage.questManager));
    stage.questManager.questList.push(new Quest_04(stage.questManager));

    stage.questManager.questList[0].startQuest();
    stage.questManager.questList[1].startQuest();

    stage.objects.add(stage.player);
    stage.loadNewMap('map_03');

    


    stage.filter = new Phaser.Filter(game, null, game.cache.getShader('colorFilter'));
    stage.filter.uniforms.hue = {type: "1f", value: 0.0};
    stage.filter.uniforms.sat = {type: "1f", value: 1};
    stage.filter.uniforms.val = {type: "1f", value: 1};

    //let flame = stage.objects.add(new Flame(stage.player.x, stage.player.y));
    //flame.filters = [stage.filter];

}




const dialogs = ["No cycling allowed  "+
"here.",

"OAK: ASH!           "+
"This isnt the time  "+
"to use that!",

"Theres a time and   "+
"place for everything",

"You should probably "+
"go to the city and  "+
"learn how to use a  "+
"a sword"];
let dia = 0;