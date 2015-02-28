var NewWaveState = function(game){
	var self = this;
	State.call(this, game);
	this.game.input.ClearInputEvents();
	
	this.countDown = 3;
	this.game.asteroidCount = this.game.asteroidCount + Constants.WAVE_INC;
	this.newWaveTimer = setInterval(function(){ 
		self.countDown--;
		if (self.countDown === 0){
			clearInterval(self.newWaveTimer);
			self.game.SetState(States.GAME);
		}
	},1000);
	
};
NewWaveState.prototype = new State();

NewWaveState.prototype.Update = function() {
	var self = this;
};	

NewWaveState.prototype.Draw = function() {
	var self = this;
	self.game.canvas.DrawRect(88, 216 ,725 , 250, '#000000', '#ffffff', "3");
	self.game.canvas.DrawText("new wave in",  450, 326, 50, "center");				
	self.game.canvas.DrawText("" + self.countDown, 450, 406, 50, "center");			
};