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
	this.showPressSpaceTimer = setInterval(function(){ self.showPressSpace = !self.showPressSpace;},800);

	var continueGame = function(e){
		clearInterval(self.showPressSpace);
		self.game.SetState(States.GAME);
		if (window.mobileAndTabletcheck()){
			self.game.canvas.element.removeEventListener('touchend', continueGame, false);
			e.preventDefault();
		}
	}
	self.game.input.AddKeyDownEvent(32,continueGame);
	if (window.mobileAndTabletcheck()){
		self.game.canvas.element.addEventListener("touchend", continueGame, false);
	}
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
	self.game.canvas.DrawRect(88, 116,725, 250, '#000000', '#ffffff', "3");
	self.game.canvas.DrawText("asteroids", 450, 241, 90, "center");
	if (self.showPressSpace){
		self.game.canvas.DrawText(Constants.START_TEXT, 450, 320, 40, "center");
	}
};
