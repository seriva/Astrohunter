var GameOverState = function(game){
	var self = this;
	State.call(this, game);
	this.game.input.ClearInputEvents();
	
	this.showPressSpace = true;
	this.showPressSpaceTimer = setInterval(function(){ self.showPressSpace = !self.showPressSpace;},750);
	this.game.input.AddKeyDownEvent(32, function(){
		clearInterval(self.showPressSpace);
		self.game.SetState(States.START);
	});		
};
GameOverState.prototype = new State();

GameOverState.prototype.Update = function() {
	var self = this;
};	

GameOverState.prototype.Draw = function() {
	var self = this;
	self.game.canvas.DrawRect(150, 250,725, 250, '#000000', '#ffffff', "3");
	self.game.canvas.DrawText("game over!", 512, 350, 70, "center");
	self.game.canvas.DrawText("your score is " + self.game.score, 512, 415, 20, "center");	
	if (self.showPressSpace){
		self.game.canvas.DrawText("press space to continue", 512, 470, 20, "center");				
	}			
};	