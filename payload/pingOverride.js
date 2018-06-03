window.gameFunctions = window.gameFunctions || {};
window.gameFunctions.pingOverride = function(){
	this.override = {};
	this.override.tempWorking = false;
	this.override.pingTriggered = false;
	this.override.emoteTriggered = false;
	
	this.__defineSetter__("emoteWheelsGreyed", function(val){});	
	this.__defineGetter__("emoteWheelsGreyed", function(){
		return false;
	});
	
	// PING
	var baseTriggerPing = this.triggerPing;
	this.triggerPing = function() {
		if(this.override.tempWorking){
			baseTriggerPing.call(this);
			this.override.pingTriggered = false;
		}
	}
	
	this.__defineSetter__("pingMouseTriggered", function(val){});
	this.__defineSetter__("pingKeyTriggered", function(val){});
	this.__defineSetter__("pingKeyDown", function(val){});
	
	this.__defineGetter__("pingMouseTriggered", function(){
		return this.override.pingTriggered
	});
	
	this.__defineGetter__("pingKeyTriggered", function(){
		return this.override.pingTriggered
	});
	
	this.__defineGetter__("pingKeyDown", function(){
		return this.override.pingTriggered
	});
	
	
	// EMOTE
	var baseTriggerEmote = this.triggerEmote;
	this.triggerEmote = function() {
		if(this.override.tempWorking) {
			baseTriggerEmote.call(this);
			this.override.emoteTriggered = false;
		}
	}
	
	this.__defineSetter__("emoteMouseTriggered", function(val){});
	
	this.__defineGetter__("emoteMouseTriggered", function(){
		return this.override.emoteTriggered
	});
	
	var currentContext = this;
	
	window.Pings = {}
	
	window.Pings.EmoteTrigger = function(down) {
		currentContext.override.tempWorking = true;
		
		down ? 
		currentContext.override.emoteTriggered = true : 
		currentContext.triggerEmote.call(currentContext);
		
		currentContext.override.tempWorking = false;
	}
	
	window.Pings.PingTrigger = function(down) {
		currentContext.override.tempWorking = true;
		
		down ? 
		currentContext.override.pingTriggered = true : 
		currentContext.triggerPing.call(currentContext);
		
		currentContext.override.tempWorking = false;
	}
	
	// EVENTS
	
	document.addEventListener('mousemove', (event) => {
		if(this.override.pingTriggered || this.override.emoteTriggered)
			return;
		this.emoteScreenPos = 
		{
			x: event.clientX,
			y: event.clientY
		}
	});

}