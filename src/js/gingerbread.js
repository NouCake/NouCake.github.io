//version 1.3
Gingerbread = {
	running: false,
	paused: false,
	attachedBodies: [],
	init: function(world){
		this.running = true;
		this.world = world;
	},
	add: function(object){
		object.ginger = new Gingerbread.Body(object);
		this.attachedBodies.push(object);
		if(object.events){
			object.events.onDestroy.add(function(object){
				Gingerbread.remove(object);
			})
		}
	},
	collides: function(a, b){
		if( a.ginger.aktiv && b.ginger.aktiv)
		if( a.ginger.origin.x + a.x + a.ginger.width >= b.ginger.origin.x + b.x &&
			a.ginger.origin.x + a.x <= b.ginger.origin.x + b.x + b.ginger.width &&
			a.ginger.origin.y + a.y + a.ginger.height >= b.ginger.origin.y + b.y &&
			a.ginger.origin.y + a.y <= b.ginger.origin.y + b.y + b.ginger.height ){
			return true;
		}
		return false;
	},
	remove: function(object){
		let i = this.attachedBodies.length;
		while(i--){
			if(object == this.attachedBodies[i]){
				delete this.attachedBodies[i];
				this.attachedBodies = this.attachedBodies.filter(obj => obj!=undefined);
				console.log("ginger removed");
			}
		}
	},
	clearList: function(filterFunction){
		this.attachedBodies = this.attachedBodies.filter(filterFunction);
	},
	update: function(){
		if(!this.paused && this.running){
			for(obj in this.attachedBodies){
				Gingerbread._updateUnit.call(this.attachedBodies[obj]);
			}
			Gingerbread._collisionDetection();
		}
	}
}

Gingerbread._updateUnit = function(){
	if(this.previousPosition) this.previousPosition.set(this.x, this.y);
	this.x += this.ginger.speed.x * game.time.elapsed/1000;
	this.y += this.ginger.speed.y * game.time.elapsed/1000;
	this.x += this.ginger._move.x;
	this.y += this.ginger._move.y;
	this.ginger._move.set(0);

	if(this.ginger.debug){
		this.ginger.debug.x = this.x;
		this.ginger.debug.y = this.y;
	}
}

Gingerbread._collisionDetection = function(){
	this._collisionWithObjects();
	this._collisionWithMap();
	this._collisionWithTrigger();
}

Gingerbread._collisionWithObjects = function(){
	for(a = 0; a < this.attachedBodies.length-1; a++){
		for(b = a+1; b < this.attachedBodies.length; b++){
			if(!(this.attachedBodies[a].ginger.trigger || this.attachedBodies[b].ginger.trigger) && this.collides(this.attachedBodies[a], this.attachedBodies[b])){
				if(this.attachedBodies[a].onCollision){
					this.attachedBodies[a].onCollision(this.attachedBodies[b]);
				}
				if(this.attachedBodies[b].onCollision){
					this.attachedBodies[b].onCollision(this.attachedBodies[a]);
				}
			}
		}
	}
}

Gingerbread._collisionWithMap = function(){
	let mapColliders = this.attachedBodies.filter((other) => other.ginger.collidesWithMap);
	for(obj in mapColliders){
		for(block in this.world.map.collisionMap){
			if(this.collides(mapColliders[obj], this.world.map.collisionMap[block])){
				mapColliders[obj].onCollision(this.world.map.collisionMap[block]);
			}
		}
	}
}

Gingerbread._collisionWithTrigger = function(){
	for(a = 0; a < this.attachedBodies.length; a++){
		if(this.attachedBodies[a].ginger.trigger)
			for(b = 0; b < this.attachedBodies.length; b++){
				if(a != b && !this.attachedBodies[b].ginger.trigger){
					if(this.collides(this.attachedBodies[a], this.attachedBodies[b])){
						//console.log(this.list[b].key);
						this.attachedBodies[a].onCollision(this.attachedBodies[b]);
					}
				}
			}
	}
}



Gingerbread.Body = function(parent){
	this.parent = parent;

	this.width = parent.width || 0;
	this.height = parent.height || 0;

	this.origin = new Phaser.Point(0, 0);
	this.speed = new Phaser.Point(0, 0);
	this._move = new Phaser.Point(0, 0);

	this.aktiv = true;
	this.trigger = false;
	this.collidesWithMap = false;
}

Gingerbread.Body.prototype = Object.create(Object.prototype);
Gingerbread.Body.prototype.constructor = Gingerbread.Body;

Gingerbread.Body.prototype.setSize = function(width, height){
	this.width = width;
	this.height = height;
}

Gingerbread.Body.prototype.setOrigin = function(x, y, useAnchor){
	this.origin.x = x-1;
	this.origin.y = y-1;
	if(useAnchor){
		this.origin.x -= this.parent.anchor.x * this.parent.width;
		this.origin.y -= this.parent.anchor.y * this.parent.width;
	}
}

Gingerbread.Body.prototype.move = function(point){
	this._move.copyFrom(point);
}