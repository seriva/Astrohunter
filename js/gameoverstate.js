var GameOverState = function(game){
	var self = this;
	State.call(this, game);
	this.game.input.ClearInputEvents();

	this.showPressSpace = true;
	this.showPressSpaceTimer = setInterval(function(){ self.showPressSpace = !self.showPressSpace;},800);

	var continueGame = function(){
		clearInterval(self.showPressSpace);
		self.game.SetState(States.START);
		if (window.mobileAndTabletcheck()){
			self.game.canvas.element.removeEventListener('ontouchend', continueGame, false);
		}
	}
	this.game.input.AddKeyDownEvent(32,continueGame);
	if (window.mobileAndTabletcheck()){
		self.game.canvas.element.addEventListener("ontouchend", continueGame, false);
	}
};
GameOverState.prototype = new State();

GameOverState.prototype.Update = function() {
	var self = this;
};

GameOverState.prototype.Draw = function() {
	var self = this;
	self.game.canvas.DrawRect(88, 116,725, 250, '#000000', '#ffffff', "3");
	self.game.canvas.DrawText("game over!", 450, 210, 70, "center");
	self.game.canvas.DrawText("score : " + self.game.score, 450, 276, 40, "center");
	if (self.showPressSpace){
		self.game.canvas.DrawText(Constants.CONTINUE_TEXT, 450, 342, 40, "center");
	}
};
