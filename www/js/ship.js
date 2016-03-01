var Ship = function(id, x, y){
	Entity.call(this, id);
	this.pos.Set(x, y);
	this.dir.Set(0, -1);
	this.radius = Constants.SHIP_RADIUS;
	this.velocity = new Vector(0, 0);
	this.canBeHit = false;
	this.showFlame = false;
	this.SetPoints();
	this.rotateLeft = false;
	this.rotateRight = false;
	this.moveForward = false;
};
Ship.prototype = new Entity();

Ship.prototype.Update = function(frametime,  input) {
	// Ship rotation
	var rotation = 0;
	if (input.IsDown(37) || this.rotateLeft){
		rotation = -(Constants.SHIP_ROTATIONSPEED*frametime);
	}
	if (input.IsDown(39) || this.rotateRight){
		rotation = (Constants.SHIP_ROTATIONSPEED*frametime);
	}
	this.dir.Rotate(rotation);
	for (var i = 0; i < this.shipPoints.length; i++) {
		this.shipPoints[i].Rotate(rotation);
	}
	for (var i = 0; i < this.flamePoints.length; i++) {
		this.flamePoints[i].Rotate(rotation);
	}

	//	Movement
	this.showFlame = false;
	if (input.IsDown(38) || this.moveForward){
		this.velocity.Add( this.dir.x * (Constants.SHIP_ACCELERATION*frametime), this.dir.y * (Constants.SHIP_ACCELERATION*frametime))
		var length = this.velocity.Length();
		if (length > Constants.SHIP_MAXVELOCITY){
			this.velocity.Div(length);
			this.velocity.Mul(Constants.SHIP_MAXVELOCITY);
		}
		this.showFlame = true;
	}
	this.pos.Add(this.velocity.x, this.velocity.y);
	this.CapOnScreen();
};

Ship.prototype.Draw = function(canvas) {
	if(!this.isVisible) return;
	canvas.DrawPolyLine(this.shipPoints, this.pos.x, this.pos.y, 1)
	if (this.showFlame){
		canvas.DrawPolyLine(this.flamePoints, this.pos.x, this.pos.y, 1)
	}
};

Ship.prototype.SetPoints = function() {
	this.shipPoints = [];
	this.shipPoints.push(new Vector(0, -18));
	this.shipPoints.push(new Vector(-13, 14));
	this.shipPoints.push(new Vector(0, 11));
	this.shipPoints.push(new Vector(13, 14));
	this.shipPoints.push(new Vector(0, -18));

	this.flamePoints = [];
	this.flamePoints.push(new Vector(-10, 13));
	this.flamePoints.push(new Vector(0, 11));
	this.flamePoints.push(new Vector(10, 13));
	this.flamePoints.push(new Vector(0, 19));
}

Ship.prototype.ResetShip = function(x, y) {
	this.pos.Set(x, y);
	this.dir.Set(0, -1);
	this.velocity.Set(0, 0);
	this.SetPoints();
	this.canBeHit = false;
	this.rotateLeft = false;
	this.rotateRight = false;
	this.rotateForward = false;
	var counter = Constants.SHIP_IMMUME-1;
	var self = this;
	var immumeHitTimer = setInterval(function(){
		counter--;
		if (counter === 0){
			self.canBeHit = true;
			self.isVisible = true;
			clearInterval(immumeHitTimer);
			clearInterval(blinkTimer);
		}
	},1000);
	var blinkTimer = setInterval(function(){
		self.isVisible = !self.isVisible;
	},250);
};
