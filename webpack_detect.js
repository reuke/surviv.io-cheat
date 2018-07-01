(function webpack_detect(){
	
	if(!window.gameVars) window.gameVars = {};
	
	window.gameVars.OverrideIDs = {
		isDetected: () => (
				window.gameVars.OverrideIDs.mainModule && 
				window.gameVars.OverrideIDs.emoteModule && 
				window.gameVars.OverrideIDs.gameData
			),
		mainModule: null,
		emoteModule: null,
		gameData: null,
	}
	
	// webpack functions
	window._webpackJsonp = undefined;
	window.webpackJsonpBase = undefined;
	
	var override_module = function(modules, id) {
		
		var moduleBase = modules[id];
		
		modules[id] = function(exportsVal, idk, same) {
			moduleBase(exportsVal, idk, same);
			
			// detect exports property
			if(exportsVal.hasOwnProperty("exports")) {
				
				var exports = exportsVal.exports;
				
				// mainModule signature
				if(	exports.prototype &&
					exports.prototype.hasOwnProperty("init") &&
					exports.prototype.hasOwnProperty("free") &&
					exports.prototype.hasOwnProperty("update") &&
					exports.prototype.hasOwnProperty("render") &&
					exports.prototype.hasOwnProperty("sendMessage") &&
					exports.prototype.hasOwnProperty("processGameUpdate")
				) {
					window.gameVars.OverrideIDs.mainModule = id;
					console.log('mainModule detected:' + id);
				}
				
				// emoteModule signature
				if(	exports.hasOwnProperty("EmoteManager")) {
					window.gameVars.OverrideIDs.emoteModule = id;
					console.log('emoteModule detected:' + id);
				}
				
				// gameData signature
				if(	exports.hasOwnProperty("Action") &&
					exports.hasOwnProperty("WeaponSlot") &&
					exports.hasOwnProperty("WeaponType") &&
					exports.hasOwnProperty("DamageType") &&
					exports.hasOwnProperty("Anim") &&
					exports.hasOwnProperty("GasMode")
				) {
					window.gameVars.OverrideIDs.gameData = id;
					console.log('gameData detected:' + id);
				}
				
			}
		}
	}
	
	window.__defineGetter__("webpackJsonp", function(){
		return _webpackJsonp;
	});
	
	window.__defineSetter__("webpackJsonp", function(val){
		
		window.webpackJsonpBase = val;
		
		_webpackJsonp = function(t, modules, u) {
			
			// detect app.********.js webpack modules
			if(Object.keys(modules).length > 20){
				
				// detect modules ID's
				
				for (var key in modules) {
					
					var id = key.slice(0);
						
					if (modules.hasOwnProperty(id)) {
						
						override_module(modules, id);
					}
				}
				
				_webpackJsonp = webpackJsonpBase;
			}
			
			// base method
			webpackJsonpBase.call(this, t, modules, u);
		};
	});
	
	console.log('webpack detect deployed');
})();
