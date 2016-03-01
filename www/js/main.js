var States = {
	START: 0,
	GAMEOVER: 1,
	NEWWAVE: 2,
	GAME: 3,
}

var Game = function(){
		var self = this

		//create canvas
		this.canvas = new Canvas("canvas", Constants.SCR_WIDTH, Constants.SCR_HEIGHT);
		this.canvas.Resize();

		//Input
		this.input = new Input();
		this.forward = document.getElementById('forward');
		this.left = document.getElementById('left');
		this.right = document.getElementById('right');
		this.fire = document.getElementById('fire');
		function PlaceAndSizeButtons(){
				if (window.mobileAndTabletcheck()){
					function setButtons(button, size, x, y){
						button.style.left = Math.round(x) + 'px';
						button.style.top = Math.round(y) + 'px';
						button.style.height = Math.round(size) + 'px';
						button.style.width = Math.round(size) + 'px';
						button.style.borderRadius = Math.round(size / 2) + 'px';
					}
				  var left = self.canvas.element.offsetLeft;
					var top = self.canvas.element.offsetTop;
					var height = self.canvas.element.clientHeight;
					var width = self.canvas.element.clientWidth;
					var size = Math.round(Constants.MOB_BUTTON_SIZE * width / Constants.SCR_WIDTH);
					setButtons(this.left, size, left + 5, top+(height-(2*size)) - 10);
					setButtons(this.right, size, left+size + 5, top+(height-size) - 10);
					setButtons(this.forward, size, left + (width - (size + 10)), top+(height-(2*size)) - 10);
					setButtons(this.fire, size,  left + (width - ((size*2) + 10)), top+(height-size) - 10);
				}
		}
		PlaceAndSizeButtons();
		window.addEventListener('resize', function(){self.canvas.Resize();PlaceAndSizeButtons();}, false);

		//Sounds
		this.sound = new Sound();
		var music = this.sound.PlayMusic('sounds/music.ogg', 1, 0.75, true)
		this.sound.CacheSound('fire', 'sounds/fire.ogg', 1, 0.2, true)
		this.sound.CacheSound('explosion', 'sounds/explosion.ogg', 1, 0.5, true)

		//Vars
		this.state = States.START;
		this.time;
		this.currentState = null;
		this.frameTime = 0;
		this.score = 0;
		this.ships = Constants.SHIPS;
		this.asteroidCount = Constants.WAVE_START;

		// Set the start state
		this.SetState(States.START);

		//Pause game on phone
		if (window.mobileAndTabletcheck()){
			document.addEventListener("resume", function(){
				music.play();
				if (this.state == States.START) {
						currentState.pause = false;
				}
			}, false);
			document.addEventListener("pause", function(){
				music.pause();
				if (this.state == States.START) {
						currentState.pause = true;
				}
			}, false);
		}
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
	this.state = state;
	delete this.currentState;
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

Game.prototype.ShowControlButtons = function(visible){
	if (!window.mobileAndTabletcheck()) return;
	this.forward.style.opacity = 0.2;
	this.left.style.opacity = 0.2;
	this.right.style.opacity = 0.2;
	this.fire.style.opacity = 0.2;
	if (visible){
		this.forward.style.visibility = "visible";
		this.left.style.visibility = "visible";
		this.right.style.visibility = "visible";
		this.fire.style.visibility = "visible";
	}	else {
		this.forward.style.visibility = "hidden";
		this.left.style.visibility = "hidden";
		this.right.style.visibility = "hidden";
		this.fire.style.visibility = "hidden";
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
