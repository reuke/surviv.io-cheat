window.gameFunctions = window.gameFunctions || {};
window.gameFunctions.gameOverride = function(){
	this.override = true;
	
	// ZOOM
	
	var baseCameraTargetZoom = this.camera.targetZoom;
	this.camera.__defineSetter__("targetZoom", function(val){
		baseCameraTargetZoom = val;
	});
	this.camera.__defineGetter__("targetZoom", function(){
		if(window.gameVars && window.menu && window.menu.UserSetting.look.zoomEnabled)
			return window.gameVars.ZoomLevel;
		
		return baseCameraTargetZoom;
	});
	
	var baseZoomFast = this.activePlayer.zoomFast;
	this.activePlayer.__defineSetter__("zoomFast", function(val){
		baseZoomFast = val;
	});
	this.activePlayer.__defineGetter__("zoomFast", function(){
		if(window.menu && window.menu.UserSetting.look.zoomEnabled)
			return true;
		
		return baseZoomFast;
	});
	
	// INPUT
	
	var inpt = this.input;
	
	var processInput = function(bind, down){
		// always pass Esc
		if(bind.code == 27) return keyboardEvent(27, down);
		
		var opt = window.menu.UserSetting.binds;
		
		if(checkBind(opt.autoAim, bind)) {
			
		}else if(checkBind(opt.switchMainWeapon, bind)) {

		}else if(checkBind(opt.zoomIn, bind)) {

		}else if(checkBind(opt.zoomOut, bind)) {

		}else if(checkBind(opt.displayNames, bind)) {

		}else if(checkBind(opt.streamerMode, bind)) {

		}else if(checkBind(opt.goUp, bind)) {

		}else if(checkBind(opt.goLeft, bind)) {

		}else if(checkBind(opt.goDown, bind)) {

		}else if(checkBind(opt.goRight, bind)) {

		}else if(checkBind(opt.shoot, bind)) {

		}else if(checkBind(opt.reload, bind)) {

		}else if(checkBind(opt.interact, bind)) {

		}else if(checkBind(opt.cancelAction, bind)) {

		}else if(checkBind(opt.teamPing, bind)) {

		}else if(checkBind(opt.emotes, bind)) {

		}else if(checkBind(opt.toggleMap, bind)) {

		}else if(checkBind(opt.toggleMiniMap, bind)) {

		}else if(checkBind(opt.equipLast, bind)) {

		}else if(checkBind(opt.equipNext, bind)) {

		}else if(checkBind(opt.equipPrev, bind)) {

		}else if(checkBind(opt.equipWeapon1, bind)) {

		}else if(checkBind(opt.equipWeapon2, bind)) {

		}else if(checkBind(opt.equipWeapon3, bind)) {

		}else if(checkBind(opt.equipWeapon4, bind)) {

		}else if(checkBind(opt.useMedical7, bind)) {

		}else if(checkBind(opt.useMedical8, bind)) {

		}else if(checkBind(opt.useMedical9, bind)) {

		}else if(checkBind(opt.useMedical0, bind)) {

		}
	}
	
	var checkBind = function(ref, bind){
		return ref.code == bind.code &&
		!(ref.shift && !bind.shift) &&
		!(ref.ctrl && !bind.ctrl) &&
		!(ref.alt && !bind.alt);
	}
	
	var keyboardEvent = function(code, down){
		down ? onKeyDownBase.call(inpt, {keyCode: code}) : onKeyUpBase.call(inpt, {keyCode: code});
	}
	
	var mouseButtonEvent = function(buttonCode, down){
		
		down ? onMouseDownBase.call(inpt, {keyCode: code}) : onMouseUpBase.call(inpt, {keyCode: code});
	}
	
	// keyboard
	
	var onKeyDownBase = this.input.onKeyDown;
	this.input.onKeyDown = function(e){
		processInput({code: e.keyCode, shift: e.shiftKey, ctrl: e.ctrlKey, alt: e.altKey}, true);
		if(e.keyCode == 16) return window.gameVars.Input.Keyboard.ShiftPressed = true;
		if(e.keyCode == 17) return window.gameVars.Input.Keyboard.CtrlPressed = true;
		if(e.keyCode == 18) return window.gameVars.Input.Keyboard.AltPressed = true;
		window.gameVars.Input.Keyboard.AnythingElsePressed = true;
	};
	var onKeyUpBase = this.input.onKeyUp;
	this.input.onKeyUp = function(e){
		processInput({code: e.keyCode, shift: e.shiftKey, ctrl: e.ctrlKey, alt: e.altKey}, false);
		if(e.keyCode == 16) return window.gameVars.Input.Keyboard.ShiftPressed = false;
		if(e.keyCode == 17) return window.gameVars.Input.Keyboard.CtrlPressed = false;
		if(e.keyCode == 18) return window.gameVars.Input.Keyboard.AltPressed = false;
		window.gameVars.Input.Keyboard.AnythingElsePressed = false;
	};
	
	// mouse
	
	var onMouseMoveBase = this.input.onMouseMove;
	this.input.onMouseMove = function(e){
		if(window.gameVars){
			window.gameVars.Input.Mouse.Pos.x = e.clientX;
			window.gameVars.Input.Mouse.Pos.y = e.clientY;
			
			if(window.gameVars.Input.Mouse.AimActive) {
				e.clientX = window.gameVars.Input.Mouse.AimPos.x;
				e.clientY = window.gameVars.Input.Mouse.AimPos.y;
			}
		}
		
		onMouseMoveBase.call(this, e);
	};
	var onMouseDownBase = this.input.onMouseDown;
	this.input.onMouseDown = function(e){
		var code = e.button * -1 - 1;
		processInput({code: e.button * -1 - 1, shift: e.shiftKey, ctrl: e.ctrlKey, alt: e.altKey}, true);
	};
	var onMouseUpBase = this.input.onMouseUp;
	this.input.onMouseUp = function(e){
		processInput({code: e.button * -1 - 1, shift: e.shiftKey, ctrl: e.ctrlKey, alt: e.altKey}, false);
	};
	var onMouseWheelBase = this.input.onMouseWheel;
	this.input.onMouseWheel = function(e){
		processInput({
			code: e.deltaY < 0 ? -4 : -5, 
			shift: window.gameVars.Input.Keyboard.ShiftPressed,
			ctrl: window.gameVars.Input.Keyboard.CtrlPressed,
			alt: window.gameVars.Input.Keyboard.AltPressed
		}, true);
	};
	
	// var onMouseMoveBase = this.input.onMouseMove;
	// this.input.onMouseMove = function(e){
		// if(window.gameVars){
			// window.gameVars.Input.Mouse.Pos.x = e.clientX;
			// window.gameVars.Input.Mouse.Pos.y = e.clientY;
			
			// if(window.gameVars.Input.Mouse.AimActive) {
				// e.__defineGetter__("clientX", () => window.gameVars.Input.Mouse.AimPos.x);
				// e.__defineGetter__("clientY", () => window.gameVars.Input.Mouse.AimPos.y);
			// }
		// }
		
		// onMouseMoveBase.call(this, e);
	// };
	
	// repeating actions
	
	var inputOnMouseWheelBase = this.input.onMouseWheel;
	this.input.onMouseWheel = function(e){
		if(window.gameVars && window.gameVars.Input.Wheel.HookActive)
			window.gameVars.Input.Wheel.Delta += (e.deltaY < 0 ? -1 : 1);
		else
			inputOnMouseWheelBase.call(this, e);
	};
	
	var inputKeyPressedBase = this.input.keyPressed;
	this.input.keyPressed = function(e){
		if(window.gameVars)
		{
			if(window.gameVars.Input.Keyboard.RepeatInteraction && e == 70)
				return true;
		}
		
		return inputKeyPressedBase.call(this, e);
	};
	
	var inputMousePressedBase = this.input.mousePressed;
	this.input.mousePressed = function(){
		if(window.gameVars && window.gameVars.Input.Mouse.RepeatFire)
			return true;
		
		return inputMousePressedBase.call(this);
	};
	
	var inputMouseDownBase = this.input.mouseDown;
	this.input.mouseDown = function(){
		if(window.gameVars && window.gameVars.Input.Mouse.RepeatFire)
			return false;
		
		return inputMouseDownBase.call(this);
	};
	
}