(function webpack_override(){
	console.log('webpack');
	
	// webpack functions
	window._webpackJsonp = undefined;
	window.webpackJsonpBase = undefined;
	
	window.__defineGetter__("webpackJsonp", function(){
		return _webpackJsonp;
	});
	
	window.__defineSetter__("webpackJsonp", function(val){
		
		window.webpackJsonpBase = val;
		
		_webpackJsonp = function(t, c, u) {
			
			// detect app.********.js webpack modules
			if(Object.keys(c).length > 20){
				
				// GAME
				var gameBase = c["m1+W"];
				c["m1+W"] = function(exportsVal, b, n) {
					gameBase(exportsVal, b, n);
					
					// init
					var gameInitBase = exportsVal.exports.prototype.init;
					exportsVal.exports.prototype.init = function(){
						gameInitBase.apply(this, arguments);
						window.gameFunctions.gameInit.call(this);
					};
					
					// free
					var gameFreeBase = exportsVal.exports.prototype.free;
					exportsVal.exports.prototype.free = function(){
						gameFreeBase.apply(this, arguments);
						window.gameFunctions.gameFree.call(this);
					};
					
					// update and override
					var gameUpdateBase = exportsVal.exports.prototype.update;
					exportsVal.exports.prototype.update = function(){
						if(!this.override)
							window.gameFunctions.gameOverride.call(this);
						gameUpdateBase.apply(this, arguments);
						window.gameFunctions.gameUpdate.call(this);
					};
					
					// render
					var gameRenderBase = exportsVal.exports.prototype.render;
					exportsVal.exports.prototype.render = function(){
						gameRenderBase.apply(this, arguments);
						window.gameFunctions.gameRender.call(this);
					};
					
					// sendMessage
					var gameSendMessageBase = exportsVal.exports.prototype.sendMessage;
					exportsVal.exports.prototype.sendMessage = function(){
						gameSendMessageBase.apply(this, arguments);
						window.gameFunctions.gameSendMessage.apply(this, arguments);
					};
					
					// processGameUpdate
					var gameSrocessGameUpdateBase = exportsVal.exports.prototype.processGameUpdate;
					exportsVal.exports.prototype.processGameUpdate = function(){
						gameSrocessGameUpdateBase.apply(this, arguments);
						window.gameFunctions.gameSrocessGameUpdate.apply(this, arguments);
					};
				}
				
				// PING
				var pingBase = c["5dFr"];
				c["5dFr"] = function(exportsVal, b, n) {
					pingBase(exportsVal, b, n);
					
					var emoteManager = exportsVal.exports.EmoteManager
					
					// override
					var emoteManagerUpdateBase = emoteManager.prototype.update;
					emoteManager.prototype.update = function(){
						if(!this.override)
							window.gameFunctions.pingOverride.call(this);
						
						emoteManagerUpdateBase.apply(this, arguments);
					};
				}
				
				// DATA
				var dataBase = c["+0OL"];
				c["+0OL"] = function(exportsVal, b, n) {
					dataBase(exportsVal, b, n);
					
					window.gameVars.Game.GameData = exportsVal.exports;
				}
			}
			
			// Run base method
			webpackJsonpBase.call(this, t, c, u);
		};
	});

})();
