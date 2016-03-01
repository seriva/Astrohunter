var Sound = function(){
	 this.soundCache = {};
	 this.cachSize = 5;
};

Sound.prototype.LoadSound = function(file, speed, volume){
	var sound = new Audio(file);
	sound.playbackRate = speed;
	sound.volume=volume;
	sound.play();
	sound.pause();
	return sound;
}

Sound.prototype.CacheSound = function(id, file, speed, volume){
	if (!this.soundCache[id + '_0']){
		for (i = 0; i < this.cachSize; i++){
			var sound = this.LoadSound(file, speed, volume);
			this.soundCache[id + '_' + i] = sound;
		}
	}
};

Sound.prototype.PlaySound = function(id){
	if (this.soundCache[id + '_0']){
		var itr = 0;
		while(!this.soundCache[id + '_' + itr].paused){
			itr = itr + 1;
			if (itr > this.cachSize-1) return;
		}
		this.soundCache[id + '_' + itr].play();
	}
};

Sound.prototype.PlayMusic = function(file, speed, volume, loop){
	var sound = this.LoadSound(file, speed, volume);
	sound.loop = loop;
	sound.play();
	return sound;
};
