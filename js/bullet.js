var Bullet = function(id, x, y, dirx, diry){
	Entity.call(this, id);
	this.pos.Set(x, y);
	this.dir.Set(dirx, diry);
	this.radius = Constants.BULLET_RADIUS;
}
Bullet.prototype = new Entity( );

Bullet.prototype.Update = function(frametime) {
	// Update position
	this.pos.Add(this.dir.x * (Constants.BULLET_ACCELERATION*frametime), this.dir.y * (Constants.BULLET_ACCELERATION*frametime));
	this.CapOnScreen();

	// Update lifetime and remove if expands lifetime.
	var lifetime = Date.now() - this.created;
	if (lifetime > Constants.BULLET_LIFETIME){
		this.OnDestroy();
	}
};	

Bullet.prototype.Draw = function(canvas) {
	canvas.DrawRect( this.pos.x-2, this.pos.y-2,Constants.BULLET_RADIUS, Constants.BULLET_RADIUS, '#ffffff');			
};	