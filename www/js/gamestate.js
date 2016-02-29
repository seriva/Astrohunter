var GameState = function(game){
	State.call(this, game);
	var self = this;
	this.game.input.ClearInputEvents();
	this.game.ShowControlButtons(true);

	// Vars.
	this.ship = new Ship("ship", Constants.SCR_WIDTH / 2, Constants.SCR_HEIGHT / 2)
	this.ship.ResetShip(Constants.SCR_WIDTH / 2, Constants.SCR_HEIGHT / 2);
	this.fireTimer = 0;
	this.bulletCounter = 0;
	this.bullets = {};
	this.asteroidCounter = 0;
	this.asteroids = {};
	this.explosionCounter = 0;
	this.explosions = {};
	this.pause = false;

	// Create the asteroids
	for (var i = 0; i < this.game.asteroidCount; i++) {
		var id = 'Asteroid' + this.asteroidCounter;
		var dir = new Vector(0, 1);
		dir.Rotate(Math.random()*360);
		this.asteroids[id] = new Asteroid(id, 0, Math.random() * Constants.SCR_WIDTH , Math.random() * Constants.SCR_HEIGHT, dir.x, dir.y )
		this.asteroidCounter++;
	}

  // fire functions
	var startFire = function(e) {
		if (self.fireTimer === 0){
			var selfFire = self;
			function FireBullet(){
				if(selfFire.pause) return;
				var x = selfFire.ship.pos.x + (selfFire.ship.dir.x * Constants.SHIP_RADIUS );
				var y = selfFire.ship.pos.y + (selfFire.ship.dir.y * Constants.SHIP_RADIUS );
				var id = 'Bullet' + selfFire.bulletCounter;
				selfFire.bullets[id] = new Bullet(id,x, y, selfFire.ship.dir.x, selfFire.ship.dir.y);
				selfFire.bullets[id].OnDestroy = function() {
					delete selfFire.bullets[this.id];
				};
				selfFire.bulletCounter++;
			}
			self.fireTimer = setInterval(function(){
						FireBullet();
					}, Constants.BULLET_FIRESPEED);
			FireBullet();
		}
		if (window.mobileAndTabletcheck()){
			e.preventDefault();
		}
	}
	var endFire = function(e) {
		clearInterval(self.fireTimer);
		self.fireTimer = 0;
		if (window.mobileAndTabletcheck()){
			e.preventDefault();
		}
	}

	//touch Input
	if (window.mobileAndTabletcheck()){
		self.game.left.addEventListener("touchstart", function(e){
			self.ship.rotateLeft = true;
			e.preventDefault();
		}, false);
		self.game.left.addEventListener("touchend", function(e){
			self.ship.rotateLeft = false;
			e.preventDefault();
		}, false);
		self.game.right.addEventListener("touchstart", function(e){
			self.ship.rotateRight = true;
			e.preventDefault();
		}, false);
		self.game.right.addEventListener("touchend", function(e){
			self.ship.rotateRight = false;
			e.preventDefault();
		}, false);
		self.game.forward.addEventListener("touchstart", function(e){
			self.ship.moveForward = true;
			e.preventDefault();
		}, false);
		self.game.forward.addEventListener("touchend", function(e){
			self.ship.moveForward = false;
			e.preventDefault();
		}, false);
		self.game.fire.addEventListener("touchstart", startFire, false);
		self.game.fire.addEventListener("touchend", endFire, false);
	}

	// Key input events
	this.game.input.AddKeyDownEvent(32, startFire);
	this.game.input.AddKeyUpEvent(32, endFire);
	this.game.input.AddKeyDownEvent(80, function(){
		self.pause = !self.pause;
	});
};
GameState.prototype = new State( );

GameState.prototype.Update = function() {
	var self = this;
	if(self.pause) return;

	self.ship.Update(self.game.frameTime, self.game.input);

	Object.keys(self.bullets).forEach(function (key) {
		 self.bullets[key].Update(self.game.frameTime);
	});

	Object.keys(self.asteroids).forEach(function (key) {
		 self.asteroids[key].Update(self.game.frameTime);
	});

	Object.keys(self.explosions).forEach(function (key) {
		 self.explosions[key].Update(self.game.frameTime);
	});

	self.game.DoAsteroidColisions(self.asteroids);
	self.DoShipAsteroidColision();
	self.DoBulletsAsteroidColision();
};

GameState.prototype.Draw = function() {
	var self = this;

	self.ship.Draw(self.game.canvas);

	Object.keys(self.bullets).forEach(function (key) {
		 self.bullets[key].Draw(self.game.canvas);
	});

	Object.keys(self.asteroids).forEach(function (key) {
		 self.asteroids[key].Draw(self.game.canvas);
	});

	Object.keys(self.explosions).forEach(function (key) {
		 self.explosions[key].Draw(self.game.canvas);
	});

	self.game.canvas.DrawText("score : " + self.game.score, 10, 35, 30, "left");
	self.game.canvas.DrawText("ships : " + self.game.ships, 10, 70, 30, "left");
	if(self.pause){
		self.game.canvas.DrawRect(150, 250,725, 250, '#000000', '#ffffff', "3");
		self.game.canvas.DrawText("pause", 512, 400, 50, "center");
	}
};

GameState.prototype.DoShipAsteroidColision = function(){
	var self = this;

	if (!self.ship.canBeHit) return;
	Object.keys(self.asteroids).forEach(function (key) {
		var a = self.asteroids[key];
		if (self.ship.IsColliding(a)){
			// Explosion
			self.CreateExplosion(self.ship.pos.x, self.ship.pos.y, 75, 300)

			// Break up asteroid
			self.BreakupAsteroid(a);

			// Check game over
			self.game.ships--;
			if  (self.game.ships === 0){
				self.game.SetState(States.GAMEOVER);
				return;
			}

			// Reset the ship
			self.ship.ResetShip(Constants.SCR_WIDTH / 2, Constants.SCR_HEIGHT / 2);
			return;
		}
	});
};

GameState.prototype.DoBulletsAsteroidColision = function(){
	var self = this;
	Object.keys(self.asteroids).forEach(function (key) {
		var a = self.asteroids[key];
		Object.keys(self.bullets).forEach(function (key) {
			var b = self.bullets[key];
			if ( b.IsColliding(a)){
				self.CreateExplosion(b.pos.x, b.pos.y, 10, 100)
				delete self.bullets[b.id];
				a.hits--;
				if (a.hits < 1){
					self.BreakupAsteroid(a);
				}
			}
		});
	});
};

GameState.prototype.CreateExplosion = function(x, y, particlecount, lifetime){
	var self = this;
	var id = 'Explosion' + this.explosionCounter;
	self.explosions[id] = new Explosion(id, x, y, particlecount, lifetime);
	self.explosions[id].OnDestroy = function(){
		delete self.explosions[id];
	}
	self.explosionCounter++;
}

GameState.prototype.BreakupAsteroid = function(a){
	var self = this;

	// Explosion
	self.CreateExplosion(a.pos.x, a.pos.y, (3-a.type)*50, (3-a.type)*120)

	// Calculate new type and score
	self.game.score = self.game.score + Constants.ASTEROID[a.type].POINTS;
	var type = a.type+1;
	var pos = a.pos;
	delete self.asteroids[a.id];

	// Return of its the smallest type
	if (type > 2) {
		// Start next wave if there are no more asteroids
		if (Object.keys(self.asteroids).length === 0){
			self.game.SetState(States.NEWWAVE);
		}
		return;
	}

	// Spawn 3 new ones if we get here
	for (var i = 0; i < 3; i++) {
		var id = 'Asteroid' + self.asteroidCounter;
		var dir = new Vector(0, 1);
		dir.Rotate(Math.random()*360);
		self.asteroids[id] = new Asteroid(id, type, pos.x + (-15 + Math.random()*30), pos.y + (-15 + Math.random()*30) , dir.x, dir.y )
		self.asteroidCounter++;
	}
}
