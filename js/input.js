var Input = function(){
	this.pressed = {};
	this.upevents = [];
	this.downevents = [];	
	
	var self = this;
	window.addEventListener('keyup', function(event) { 
		delete self.pressed[event.keyCode];
		for (var i = 0; i < self.upevents.length; i++) {
			if (self.upevents[i].key === event.keyCode){
				self.upevents[i].event();
			}
		}
		for (var i = 0; i < self.downevents.length; i++) {
			if (self.downevents[i].pressed){
				self.downevents[i].pressed = false;
			}
		}		
	}, false);
	window.addEventListener('keydown', function(event) { 
		self.pressed[event.keyCode] = true;
		for (var i = 0; i < self.downevents.length; i++) {
			if (self.downevents[i].key === event.keyCode && (!self.downevents[i].pressed)){
				self.downevents[i].event();
				self.downevents[i].pressed = true;
			}
		}	
	}, false);
};

Input.prototype.ClearInputEvents = function(){
	this.pressed    = {};
	this.upevents   = [];
	this.downevents = [];		
};

Input.prototype.AddKeyDownEvent = function(key, event){
	this.downevents.push({key : key, event : event, pressed : false});
};

Input.prototype.AddKeyUpEvent = function(key, event){
	this.upevents.push({key : key, event : event});
};

Input.prototype.IsDown = function(keyCode) {
	return this.pressed[keyCode];
};

