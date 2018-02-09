//version 1.3

let Gingerbread = {
	list: [],
	debug: false,
	init: function(state){
		this.state = state;
	},
	addPhysics: function(object){
		this.list.push(object);
		object.ginger = this.createBody(object);
	},
	update: function(){
		for(obj in this.list){
			this.updateUnit.call(this.list[obj]);
		}
		this.collisionDetection();
	},
	updateUnit: function(){
		if(this.previousPosition) this.previousPosition.set(this.x, this.y);
		this.x += this.ginger.speed.x * game.time.elapsed/1000;
		this.y += this.ginger.speed.y * game.time.elapsed/1000;
		if(this.ginger.debug){
			this.ginger.debug.x = this.x;
			this.ginger.debug.y = this.y;
		}
	},
	collisionDetection: function(){
		this.collisionWithObjects();
		this.collisionWithMap();
		this.collisionWithTrigger();
	},
	collisionWithObjects: function(){
		for(a = 0; a < this.list.length-1; a++){
			for(b = a+1; b < this.list.length; b++){
				if(this.list[b].name = "wood"){
					//console.log("wood", this.list[b].x)
				}
				if(!(this.list[a].ginger.trigger || this.list[b].ginger.trigger) && this.collides(this.list[a], this.list[b])){
					if(this.list[a].onCollision){
						this.list[a].onCollision(this.list[b]);
					}
					if(this.list[b].onCollision){
						this.list[b].onCollision(this.list[a]);
					}
				}
			}
		}
	},
	collisionWithMap: function(){
		mapColliders = this.list.filter((other) => other.ginger.collidesWithMap);
		for(obj in mapColliders){
			for(block in this.state.map.collisionMap){
				if(this.collides(mapColliders[obj], this.state.map.collisionMap[block])){
					mapColliders[obj].onCollision(this.state.map.collisionMap[block]);
				}
			}
		}
	},
	collisionWithTrigger: function(){
		for(a = 0; a < this.list.length; a++){
			if(this.list[a].ginger.trigger)
				for(b = 0; b < this.list.length; b++){
					if(a != b && !this.list[b].ginger.trigger){
						if(this.collides(this.list[a], this.list[b])){
							//console.log(this.list[b].key);
							this.list[a].onCollision(this.list[b]);
						}
					}
				}
		}
	},
	collides: function(a, b){
		if(!a || !b)
			return false;
		if( a.ginger.origin.x + a.x + a.ginger.width >= b.ginger.origin.x + b.x &&
			a.ginger.origin.x + a.x <= b.ginger.origin.x + b.x + b.ginger.width &&
			a.ginger.origin.y + a.y + a.ginger.height >= b.ginger.origin.y + b.y &&
			a.ginger.origin.y + a.y <= b.ginger.origin.y + b.y + b.ginger.height ){
			return true;
		}
		return false;
	},
	createBody: function(object){
		ginger = {};
		ginger.width = object.width || 0;
		ginger.height = object.height || 0;
		ginger.origin = {x: 0, y: 0};
		ginger.trigger = false;
		ginger.collidesWithMap = false;
		ginger.speed = {
			x: 0,
			y: 0,
			set: function(x, y){
				if(!y){
					//console.log(this);
					this.x = x;
					this.y = x;
				} else {
					//console.log(this);
					this.x = x;
					this.y = y;
				}
			},
			getCurrentSpeed: function(){
				return Math.sqrt(this.x * this.x + this.y * this.y);
			},
			setMagnitude: function(speed){ //rename bedarf
				modif = speed/this.getCurrentSpeed();
				this.x *= modif;
				this.y *= modif;
			}
		}
		if(this.debug){
			console.log("debugging");
			ginger.debug = objects.add(game.make.graphics(object.x, object.y));
			ginger.debug.beginFill(0xFF0000);
			ginger.debug.drawRect(0, 0, ginger.width, ginger.height);
			ginger.debug.endFill();
		}
		ginger.setSize = function(width, height){
			this.width = width;
			this.height = height;
			if(this.debug){
				ginger.debug.clear();
				ginger.debug.beginFill(0xFF0000);
				ginger.debug.drawRect(this.origin.x, this.origin.y, this.width, this.height);
				ginger.debug.endFill();
			}

		}
		ginger.setOrigin = function(x, y, anchor){ //PLS CHANGE
			this.origin.x = x;
			this.origin.y = y;
			if(anchor) {
				this.origin.x -= anchor.x * object.width;
				this.origin.y -= anchor.y * object.height;
			}
			if(this.debug){
				this.debug.clear();
				this.debug.beginFill(0xFF0000);
				this.debug.drawRect(this.origin.x, this.origin.y, this.width, this.height);
				this.debug.endFill();
			}
		}
		return ginger;
	},
	deload: function(){
		this.list = this.list.filter((obj) => obj == player || obj == player.dialogHitbox); //BIGGEST SHIT
	}
}