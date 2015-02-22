var Explosion = function(id, x, y, particlecount, lifetime){	
	Entity.call(this, id);
	this.pos.Set(x, y);
	this.lifetime = lifetime;
	this.points = [];
	this.dirs = [];

	for (var i = 0; i < particlecount; i++) {
		this.points.push(new Vector(0, 0));
		var dir = new Vector(0, 1*(Math.random()*Constants.EXPLOSION_ACCELERATION));
		dir.Rotate(Math.random()*360);
		this.dirs.push(dir);
	}	
};		
Explosion.prototype = new Entity();

Explosion.prototype.Update = function(frametime) {
	// Animate particles
	for (var i = 0; i < this.points.length; i++) {
		this.points[i].Add(this.dirs[i].x * frametime, this.dirs[i].y * frametime);
	}			
	
	// Update lifetime and remove if expands lifetime
	var delta = Date.now() - this.created;
	if (delta > this.lifetime){
		this.OnDestroy();
	}
};	

Explosion.prototype.Draw = function(canvas) {
	for (var i = 0; i < this.points.length; i++) {
		canvas.DrawRect((this.pos.x + this.points[i].x)-2, (this.pos.y + this.points[i].y)-2, Constants.EXPLOSION_PART_RADIUS, Constants.EXPLOSION_PART_RADIUS, '#ffffff');
	}			
};	