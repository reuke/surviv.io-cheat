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
	LAGText: null,
}

window.gameVars.Perfomance = {
	lastTimeFPS: 0,
	lastFPS: 0,
	lastFPSList: [],
	lastLAT: 0,
	lastLAG: 0,
}

window.gameVars.Input = {
	GlobalHookCallback: null,
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
		CtrlPressed: false,
		AltPressed: false,
	},
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
	if(e.keyCode === 17 || e.charCode === 17)
		window.gameVars.Input.Keyboard.CtrlPressed = true;
	if(e.keyCode === 18 || e.charCode === 18)
		window.gameVars.Input.Keyboard.AltPressed = true;
});

window.addEventListener('keyup', function(e) {
	if(e.keyCode === 16 || e.charCode === 16)
		window.gameVars.Input.Keyboard.ShiftPressed = false;
	if(e.keyCode === 17 || e.charCode === 17)
		window.gameVars.Input.Keyboard.CtrlPressed = false;
	if(e.keyCode === 18 || e.charCode === 18)
		window.gameVars.Input.Keyboard.AltPressed = false;
});

window.gameVars.Textures = {};

window.gameVars.Input.keycodes = [{
    "id": 0,
    "name": "None"
}, {
    "id": -1,
    "name": "LMB"
}, {
    "id": -2,
    "name": "RMB"
}, {
    "id": -3,
    "name": "MMB"
}, {
    "id": -4,
    "name": "WheelUp"
}, {
    "id": -5,
    "name": "WheelDown"
}, {
    "id": 8,
    "name": "Backspace"
}, {
    "id": 9,
    "name": "Tab"
}, {
    "id": 13,
    "name": "Enter"
}, {
    "id": 16,
    "name": "Shift"
}, {
    "id": 17,
    "name": "Ctrl"
}, {
    "id": 18,
    "name": "Alt"
}, {
    "id": 19,
    "name": "Pause/Break"
}, {
    "id": 20,
    "name": "Caps Lock"
}, {
    "id": 27,
    "name": "Esc"
}, {
    "id": 33,
    "name": "Page Up"
}, {
    "id": 34,
    "name": "Page Down"
}, {
    "id": 35,
    "name": "End"
}, {
    "id": 36,
    "name": "Home"
}, {
    "id": 37,
    "name": "←"
}, {
    "id": 38,
    "name": "↑"
}, {
    "id": 39,
    "name": "→"
}, {
    "id": 40,
    "name": "↓"
}, {
    "id": 45,
    "name": "Insert"
}, {
    "id": 46,
    "name": "Delete"
}, {
    "id": 48,
    "name": "0"
}, {
    "id": 49,
    "name": "1"
}, {
    "id": 50,
    "name": "2"
}, {
    "id": 51,
    "name": "3"
}, {
    "id": 52,
    "name": "4"
}, {
    "id": 53,
    "name": "5"
}, {
    "id": 54,
    "name": "6"
}, {
    "id": 55,
    "name": "7"
}, {
    "id": 56,
    "name": "8"
}, {
    "id": 57,
    "name": "9"
}, {
    "id": 65,
    "name": "A"
}, {
    "id": 66,
    "name": "B"
}, {
    "id": 67,
    "name": "C"
}, {
    "id": 68,
    "name": "D"
}, {
    "id": 69,
    "name": "E"
}, {
    "id": 70,
    "name": "F"
}, {
    "id": 71,
    "name": "G"
}, {
    "id": 72,
    "name": "H"
}, {
    "id": 73,
    "name": "I"
}, {
    "id": 74,
    "name": "J"
}, {
    "id": 75,
    "name": "K"
}, {
    "id": 76,
    "name": "L"
}, {
    "id": 77,
    "name": "M"
}, {
    "id": 78,
    "name": "N"
}, {
    "id": 79,
    "name": "O"
}, {
    "id": 80,
    "name": "P"
}, {
    "id": 81,
    "name": "Q"
}, {
    "id": 82,
    "name": "R"
}, {
    "id": 83,
    "name": "S"
}, {
    "id": 84,
    "name": "T"
}, {
    "id": 85,
    "name": "U"
}, {
    "id": 86,
    "name": "V"
}, {
    "id": 87,
    "name": "W"
}, {
    "id": 88,
    "name": "X"
}, {
    "id": 89,
    "name": "Y"
}, {
    "id": 90,
    "name": "Z"
}, {
    "id": 91,
    "name": "Left WinKey"
}, {
    "id": 92,
    "name": "Right WinKey"
}, {
    "id": 93,
    "name": "Select"
}, {
    "id": 96,
    "name": "NumPad 0"
}, {
    "id": 97,
    "name": "NumPad 1"
}, {
    "id": 98,
    "name": "NumPad 2"
}, {
    "id": 99,
    "name": "NumPad 3"
}, {
    "id": 100,
    "name": "NumPad 4"
}, {
    "id": 101,
    "name": "NumPad 5"
}, {
    "id": 102,
    "name": "NumPad 6"
}, {
    "id": 103,
    "name": "NumPad 7"
}, {
    "id": 104,
    "name": "NumPad 8"
}, {
    "id": 105,
    "name": "NumPad 9"
}, {
    "id": 106,
    "name": "NumPad *"
}, {
    "id": 107,
    "name": "NumPad +"
}, {
    "id": 109,
    "name": "NumPad -"
}, {
    "id": 110,
    "name": "NumPad ."
}, {
    "id": 111,
    "name": "NumPad /"
}, {
    "id": 112,
    "name": "F1"
}, {
    "id": 113,
    "name": "F2"
}, {
    "id": 114,
    "name": "F3"
}, {
    "id": 115,
    "name": "F4"
}, {
    "id": 116,
    "name": "F5"
}, {
    "id": 117,
    "name": "F6"
}, {
    "id": 118,
    "name": "F7"
}, {
    "id": 119,
    "name": "F8"
}, {
    "id": 120,
    "name": "F9"
}, {
    "id": 121,
    "name": "F10"
}, {
    "id": 122,
    "name": "F11"
}, {
    "id": 123,
    "name": "F12"
}, {
    "id": 144,
    "name": "Num Lock"
}, {
    "id": 145,
    "name": "Scroll Lock"
}, {
    "id": 186,
    "name": ";"
}, {
    "id": 187,
    "name": "="
}, {
    "id": 188,
    "name": ","
}, {
    "id": 189,
    "name": "-"
}, {
    "id": 190,
    "name": "."
}, {
    "id": 191,
    "name": "/"
}, {
    "id": 192,
    "name": "`"
}, {
    "id": 219,
    "name": "["
}, {
    "id": 220,
    "name": "\\"
}, {
    "id": 221,
    "name": "]"
}, {
    "id": 222,
    "name": "'"
}];