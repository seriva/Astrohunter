var StartState = function(game){
	var self = this;
	State.call(this, game);
	this.game.input.ClearInputEvents();
	
	this.game.score = 0;
	this.game.ships = Constants.SHIPS;
	this.game.asteroidCount = Constants.WAVE_START;		
	
	this.asteroids = {};
	for (var i = 0; i < 25; i++) {
		var dir = new Vector(0, 1);
		dir.Rotate(Math.random()*360);
		this.asteroids[i] = new Asteroid(i, Math.floor((Math.random() * 3)), Math.random() * Constants.SCR_WIDTH , Math.random() * Constants.SCR_HEIGHT, dir.x, dir.y );
	}		
	
	this.showPressSpace = true;
	this.showPressSpaceTimer = setInterval(function(){ self.showPressSpace = !self.showPressSpace;},750);
	this.game.input.AddKeyDownEvent(32, function(){
		clearInterval(self.showPressSpace);
		self.game.SetState(States.GAME);
	});	
};
StartState.prototype = new State();

StartState.prototype.Update = function() {
	var self = this;
	Object.keys(self.asteroids).forEach(function (key) { 
		 self.asteroids[key].Update(self.game.frameTime);
	});	
	self.game.DoAsteroidColisions(self.asteroids);	
};	

StartState.prototype.Draw = function() {
	var self = this;
	Object.keys(self.asteroids).forEach(function (key) { 
		 self.asteroids[key].Draw(self.game.canvas);
	});	
	self.game.canvas.DrawRect(150, 250,725, 250, '#000000', '#ffffff', "3");
	self.game.canvas.DrawText("asteroids", 512, 375, 90, "center");
	if (self.showPressSpace){
		self.game.canvas.DrawText("press space to start game", 512, 450, 20, "center");
	}			
};