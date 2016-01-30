var Vector = function(x, y){
	this.x = x;
	this.y = y;			
};

Vector.prototype.Set = function(x, y) {
	this.x = x;
	this.y = y;					
};
		
Vector.prototype.Add = function(x, y) {
	this.x = this.x + x;
	this.y = this.y + y;					
};

Vector.prototype.Min = function(x, y) {
	this.x = this.x - x;
	this.y = this.y - y;					
};	

Vector.prototype.Mul = function(i) {
	this.x = this.x * i;
	this.y = this.y * i;					
};	

Vector.prototype.Div = function(i) {
	this.x = this.x / i;
	this.y = this.y / i;					
};

Vector.prototype.Rotate = function(angle) {
	var rangle = angle * (Math.PI/180);
	var sin = Math.sin(rangle);
	var cos = Math.cos(rangle);
	var nx = (this.x*cos) - (this.y*sin);
	var ny = (this.x*sin) + (this.y*cos);	
	this.x = nx;
	this.y = ny;	
};	
		
Vector.prototype.Length = function() {
	return Math.sqrt((this.x *this.x) + (this.y * this.y));
};	

Vector.prototype.DistanceTo = function(v) {
	var distance = Math.sqrt(((this.x - v.x) * (this.x - v.x)) + ((this.y - v.y) * (this.y - v.y)));
	if (distance < 0) { distance = distance * -1; }
	return distance;
};	

Vector.prototype.Normalize = function() {
	var l = 1/this.Length();
	this.x = this.x * l;
	this.y = this.y * l;
};		
Vector.prototype.Dot = function(v) {
	return ((this.x*v.x) + (this.y*v.y));
};
Vector.prototype.Angle = function(v) {
	var dot = this.Dot(v);
	var mag = this.Length() * v.Length();
	var angle = Math.acos( dot / mag );
	if(isNaN(angle)){
		return 0
	} else{
		return angle;	
	}
};	