window.gameVars = {};

window.gameVars.Game = {
	GameActive: false,
	Instance: null,
	GameData: null,
	Enimies: [],
	Target: null,
	LastTimeDropItem: 0.0,
	Laser: {
		draw: null,
		active: false,
		range: 0.0,
		direction: 0.0,
		angle: 0.0,
	},
	EnemyLines: {
		draw: null,
		points: null,
	},
};

window.gameVars.ZoomLevel = 0.5;
window.gameVars.Menu = false;
window.gameVars.Language = "en";

window.gameVars.UI = {
	FPSText: null,
	LATText: null,
}

window.gameVars.Perfomance = {
	lastTimeFPS: 0,
	lastFPS: 0,
	lastFPSList: [],
	lastLAT: 0,
}

window.gameVars.Input = {
	Mouse: {
		Pos: {
			x: 0.0,
			y: 0.0,
		},
		AimActive: false,
		AimPos: {
			x: 0.0,
			y: 0.0,
		},
		RepeatFire: false,
		RightMouseButton: false,
	},
	Wheel: {
		HookActive: true,
		Delta: 0,
		GetDelta: function(){
			var delta = window.gameVars.Input.Wheel.Delta;
			window.gameVars.Input.Wheel.Delta = 0;
			return delta;
		},
	},
	Keyboard: {
		RepeatInteraction: false,
		ShiftPressed: false,
	}
};

document.addEventListener('mousedown', function(e) {
	if(e.button == 2)
		window.gameVars.Input.Mouse.RightMouseButton = true;
	if(window.gameVars && window.gameVars.Menu)
		e.stopPropagation();
});

window.addEventListener('mouseup', function(e) {
	if(e.button == 2)
		window.gameVars.Input.Mouse.RightMouseButton = false;
	if(window.gameVars && window.gameVars.Menu)
		e.stopPropagation();
});

window.addEventListener('keydown', function(e) {
	if(e.keyCode === 16 || e.charCode === 16)
		window.gameVars.Input.Keyboard.ShiftPressed = true;
});

window.addEventListener('keyup', function(e) {
	if(e.keyCode === 16 || e.charCode === 16)
		window.gameVars.Input.Keyboard.ShiftPressed = false;
});


window.gameVars.Textures = {};