window.gameFunctions = window.gameFunctions || {};
window.gameFunctions.gameOverride = function(){
	this.override = true;
	
	console.log("game override fired");
	
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
	
	var inputOnMouseMoveBase = this.input.onMouseMove;
	this.input.onMouseMove = function(e){
		if(window.gameVars){
			window.gameVars.Input.Mouse.Pos.x = e.clientX;
			window.gameVars.Input.Mouse.Pos.y = e.clientY;
			
			if(window.gameVars.Input.Mouse.AimActive) {
				e.__defineGetter__("clientX", () => window.gameVars.Input.Mouse.AimPos.x);
				e.__defineGetter__("clientY", () => window.gameVars.Input.Mouse.AimPos.y);
			}
		}
		
		inputOnMouseMoveBase.call(this, e);
	};
	
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