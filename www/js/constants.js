Constants = {
	SCR_WIDTH : 900,
	SCR_HEIGHT : 506,
	MOB_BUTTON_SIZE : 100,

	SHIPS : 3,

	WAVE_START : 1,
	WAVE_INC : 2,

	SHIP_RADIUS : 15,
	SHIP_ROTATIONSPEED : 0.25,
	SHIP_ACCELERATION : 0.010,
	SHIP_MAXVELOCITY : 5.0,
	SHIP_IMMUME : 4.0,

	BULLET_FIRESPEED : 175,
	BULLET_RADIUS : 4,
	BULLET_LIFETIME : 600,
	BULLET_ACCELERATION : 1.0,

	EXPLOSION_ACCELERATION : 0.5,
	EXPLOSION_PART_RADIUS : 2.0,

	ASTEROID : [
		{
			RADIUS 		   : 40,
			ACCELERATION : 0.03,
			HITS   		   : 8,
			POINTCOUNT   : 15,
			POINTS		   : 1000
		},
		{
			RADIUS 		   : 25,
			ACCELERATION : 0.05,
			HITS   		   : 4,
			POINTCOUNT   : 15,
			POINTS		   : 500
		},
		{
			RADIUS 		   : 15,
			ACCELERATION : 0.07,
			HITS   		   : 2,
			POINTCOUNT   : 15,
			POINTS		   : 250
		}
	],

  START_TEXT : "hit space to start game",
	CONTINUE_TEXT : "hit space to continue"
};

if (window.mobileAndTabletcheck()){
	Constants.START_TEXT = "tap to start game";
	Constants.CONTINUE_TEXT = "tap to continue";
};
