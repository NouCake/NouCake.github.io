DialogManager = function(){
    Phaser.Sprite.call(this, game, 0, game.height-32, 'dialog', 2);

    this.visible = false;
    this.running = false;
    this.message = "No message Avaible";
    this._fontSize = 12;
    this._timer = 0;
    this._currentLine = 0;
    this._atLineFeed = false;
    this._finish = false;

    this.blinky = new Phaser.Sprite(game, this.width-16, this.height-10, 'misc', 4);
    this.line1 = new Phaser.BitmapText(game, 8, 4,                  'font', this.message, this._fontSize, "left");
    this.line2 = new Phaser.BitmapText(game, 8, 4 + this._fontSize, 'font', this.message, this._fontSize, "left");
    this.addChild(this.blinky);
    this.addChild(this.line1);
    this.addChild(this.line2);

	stage.input.addButton(4, this.nextLine);
}

DialogManager.prototype = Object.create(Phaser.Sprite.prototype);
DialogManager.prototype.constructor = DialogManager;

DialogManager.prototype.startDialog = function(text){
    if(this.running)
        return;
    this.message = text;

    this.visible = true;
    this.running = true;
    this._timer = 0;
    this.line1.text = "";
    this.line2.text = "";
    this._currentLine = 0;
    this._atLineFeed = false;
    this._finish = false;
    this._dialogSpeed = 35;
    this._maxChars = 20;

    stage.pauseGame();
}

DialogManager.prototype.nextLine = function(){
    dialogManager = stage.dialogManager;
    if(dialogManager.running){
        if(dialogManager._atLineFeed){
            if(dialogManager._currentLine != 0)
                dialogManager.line1.text = dialogManager.line2.text;
			dialogManager._atLineFeed = false;
			dialogManager._currentLine++;
			dialogManager._timer = 0;
        } else {
            if(dialogManager._timer != 0){
                dialogManager._timer = dialogManager._maxChars * dialogManager._dialogSpeed;
            }
        }
        if(dialogManager._finish){
            dialogManager.running = false;
			dialogManager.visible = false;
			dialogManager.blinky.visible = false;
			stage.resumeGame();
        }
    }
}

DialogManager.prototype.update = function(){
    if(this.running){
        if(!this._atLineFeed){
            this._timer += game.time.elapsedMS;
            
            if(this._currentLine == 0){
                this.line1.text = this.message.slice(0, this._timer/this._dialogSpeed);
            } else {
                this.line2.text = this.message.slice(this._currentLine * this._maxChars, this._currentLine*this._maxChars + this._timer/this._dialogSpeed);
            }

            if(this._timer >= this._maxChars*this._dialogSpeed || this._timer >= this.message.length*this._dialogSpeed){
                this._atLineFeed = true;
            }
            if((this._currentLine+1) * this._maxChars >= this.message.length && this._atLineFeed){
                this._finish = true;
            }

            this.blinky.visible = false;
        } else {
            this.blinky.visible = true;
        }
    }
}