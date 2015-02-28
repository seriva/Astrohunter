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
	self.game.canvas.DrawRect(88, 216,725, 250, '#000000', '#ffffff', "3");
	self.game.canvas.DrawText("game over!", 450, 316, 70, "center");
	self.game.canvas.DrawText("your score is " + self.game.score, 450, 381, 20, "center");	
	if (self.showPressSpace){
		self.game.canvas.DrawText("press space to continue", 450, 436, 20, "center");				
	}			
};	