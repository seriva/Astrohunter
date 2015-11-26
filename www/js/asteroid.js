var Asteroid = function(id, type, x, y, dirx, diry){	
	Entity.call(this, id);
	this.pos.Set(x, y);
	this.dir.Set(dirx, diry);
	this.type = type;
	this.rotationSpeed = (-0.5 + Math.random(1))/5;
	this.radius = Constants.ASTEROID[type].RADIUS;
	this.hits = Constants.ASTEROID[type].HITS;
	this.points = []
	var step = 360 / Constants.ASTEROID[type].POINTCOUNT;
	for (var i = 0; i < Constants.ASTEROID[type].POINTCOUNT; i++) { 
		var size = (Constants.ASTEROID[type].RADIUS - (Constants.ASTEROID[type].RADIUS * 0.1));
		size = size + (Math.random() * Constants.ASTEROID[type].RADIUS * 0.2);
		var point = new Vector(size, 0);
		point.Rotate(i * step);
		this.points.push(point);
	}			
};		
Asteroid.prototype = new Entity( );

Asteroid.prototype.Update = function(frametime, input) {
	// Update position
	this.pos.Add(this.dir.x * (Constants.ASTEROID[this.type].ACCELERATION*frametime), this.dir.y * (Constants.ASTEROID[this.type].ACCELERATION*frametime));
	this.CapOnScreen();		
	
	//Rotate the asteroid
	for (var i = 0; i < this.points.length; i++) {
		this.points[i].Rotate(this.rotationSpeed*frametime);
	}			
};	

Asteroid.prototype.Draw = function(canvas) {
	canvas.DrawPolyLine(this.points, this.pos.x, this.pos.y, 1)
};		
		