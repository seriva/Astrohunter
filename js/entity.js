var Entity = function(id){
	this.id = id;
	this.pos = new Vector(0, 0);
	this.dir = new Vector(0, 0);
	this.radius = 0;
	this.created = Date.now();
};

Entity.prototype.Update = function(frametime) {
};	

Entity.prototype.Draw = function() {
};	

Entity.prototype.OnDestroy = function() {
};

Entity.prototype.IsColliding = function(e) {
	var pos1 = this.pos;
	var rad1 = this.radius;
	var pos2 = e.pos;
	var rad2 = e.radius;
	if (pos1.x + rad1 + rad2 > pos2.x 
	 && pos1.x < pos2.x + rad1 + rad2
	 && pos1.y + rad1 + rad2 > pos2.y 
	 && pos1.y < pos2.y + rad1 + rad2) {
		if (pos1.DistanceTo(pos2) < rad1 + rad2) {
			return true;
		}
	}	
	return false;
};	

Entity.prototype.CapOnScreen = function(){
	if (this.pos.x < -30) this.pos.x = Constants.SCR_WIDTH+30;
	if (this.pos.x >Constants.SCR_WIDTH+30) this.pos.x = -30;
	if (this.pos.y < -30) this.pos.y = Constants.SCR_HEIGHT+30;
	if (this.pos.y > Constants.SCR_HEIGHT+30) this.pos.y = -30;		
};