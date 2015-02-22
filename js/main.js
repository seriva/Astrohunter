var States = {
	START: 0,
	GAMEOVER: 1,
	NEWWAVE: 2,
	GAME: 3,
}

var Game = function(){
		this.canvas = new Canvas("canvas", Constants.SCR_WIDTH, Constants.SCR_HEIGHT);
		this.input = new Input();	
		this.time;
		this.currentState = null; 
		this.frameTime = 0;
		this.score = 0;
		this.ships = Constants.SHIPS;
		this.asteroidCount = Constants.WAVE_START;			
		
		// Set the start state
		this.SetState(States.START);
};

Game.prototype.Run = function() {
	var self = game;
	
	function GameLoop(currenttime) {
		// Timing
		var now = currenttime;
		self.frameTime = now - (self.time || now);
		self.time = now;
		
		// Run the current state
		if (self.currentState != null) {
			// Update state
			self.currentState.Update();
			
			// Draw state
			self.canvas.DrawRect(0 , 0 , Constants.SCR_WIDTH,Constants.SCR_HEIGHT, '#000000');
			self.currentState.Draw();			
		}		
	
		// Trigger new loop
		window.requestAnimationFrame(GameLoop);
	}
	window.requestAnimationFrame(GameLoop);		
};

Game.prototype.SetState = function(state){
	switch(state) {
		case States.START:
			this.currentState = new StartState(this);
			break;
		case States.GAMEOVER:
			this.currentState = new GameOverState(this);
			break;
		case States.NEWWAVE:
			this.currentState = new NewWaveState(this);
			break;
		case States.GAME:
			this.currentState = new GameState(this);
			break;			
	}
};

Game.prototype.DoAsteroidColisions = function(a){
	Object.keys(a).forEach(function (key) { 
		var key1 = key;
		Object.keys(a).forEach(function (key) { 
			if (key1 !== key){
				var e1 = a[key]; 
				var e2 = a[key1]; 
				if (e1.IsColliding(e2)){
					var dx = e2.pos.x - e1.pos.x;
					var dy = e2.pos.y - e1.pos.y;
					var nx1 = dx / e1.radius;
					var ny1 = dy / e1.radius;
					var nx2 = dx / e2.radius;
					var ny2 = dy / e2.radius;
					e1.pos.x = e1.pos.x - nx1;
					e1.pos.y = e1.pos.y - ny1;
					e2.pos.x = e2.pos.x + nx2;
					e2.pos.y = e2.pos.y + ny2;
		
					var d = new Vector(dx, dy);						
					d.Div(d.Length());
					var aci = e1.dir.Dot(d);
					var bci = e2.dir.Dot(d);
					var acf = bci;
					var bcf = aci;

					e1.dir.Set((acf - aci) * d.x, (acf - aci) * d.y);
					e1.dir.Normalize();
					e2.dir.Set((bcf - bci) * d.x, (bcf - bci) * d.y);						
					e2.dir.Normalize();
				}
			}
		});
	});			
};








