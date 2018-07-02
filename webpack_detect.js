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
	
	var modulesIds = [];
	
	var detectModules = function() {
		if(!window.webpackJsonp) {
			setTimeout(detectModules, 100);
			return;
		}
		
		window.webpackJsonp([0], {
			"webpack_detect": function (wrapper, exports, getModule) {
				
				for (var i = 0; i < modulesIds.length; i++) {
					var id = modulesIds[i].slice(0);
					
					var module = getModule(id);
					
					// mainModule signature
					if(	module.prototype &&
						module.prototype.hasOwnProperty("init") &&
						module.prototype.hasOwnProperty("free") &&
						module.prototype.hasOwnProperty("update") &&
						module.prototype.hasOwnProperty("render") &&
						module.prototype.hasOwnProperty("sendMessage") &&
						module.prototype.hasOwnProperty("processGameUpdate")
					) {
						window.gameVars.OverrideIDs.mainModule = id;
						console.log('mainModule detected:' + id);
					}
					
					// emoteModule signature
					if(	module.hasOwnProperty("EmoteManager")) {
						window.gameVars.OverrideIDs.emoteModule = id;
						console.log('emoteModule detected:' + id);
					}
					
					// gameData signature
					if(	module.hasOwnProperty("Action") &&
						module.hasOwnProperty("WeaponSlot") &&
						module.hasOwnProperty("WeaponType") &&
						module.hasOwnProperty("DamageType") &&
						module.hasOwnProperty("Anim") &&
						module.hasOwnProperty("GasMode")
					) {
						window.gameVars.OverrideIDs.gameData = id;
						console.log('gameData detected:' + id);
					}
				}
			}
		}, ["webpack_detect"]);
	}
	
	var extensionId = "dhjbajnikgblcpeolmhckmejcnjojpod";

	var sendModRequest = function() {
		chrome.runtime.sendMessage(extensionId, {}, parseModResponse );
	}
	
	var parseModResponse = function(response) {
		if(!response) {
			setTimeout(sendModRequest, 100);
			return;
		}
		
		var responseObj = eval("(" + response + ')');
		for (var key in responseObj) {
			var id = key.slice(0);
			if (responseObj.hasOwnProperty(id)) {
				modulesIds.push(id);
			}
		}
		console.log(modulesIds);
		detectModules();
	}
	
	sendModRequest();
})();
