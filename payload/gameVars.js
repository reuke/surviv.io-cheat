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

window.gameVars.Textures = {};