(function webpack_inject(){
	
	window.webpackJsonp([0], {
        "webpack_inject": function (wrapper, exports, getModule) {
            var mainModule = getModule("9b5f96fd");
	    // First mod: find consecutive EmoteSlot and EmoteData
			
			// init
			var gameInitBase = mainModule.prototype.init;
			mainModule.prototype.init = function(){
				gameInitBase.apply(this, arguments);
				window.gameFunctions.gameInit.call(this);
			};
			
			// free
			var gameFreeBase = mainModule.prototype.free;
			mainModule.prototype.free = function(){
				gameFreeBase.apply(this, arguments);
				window.gameFunctions.gameFree.call(this);
			};
			
			// update and override
			var gameUpdateBase = mainModule.prototype.update;
			mainModule.prototype.update = function(){
				if(!this.override)
					window.gameFunctions.gameOverride.call(this);
				gameUpdateBase.apply(this, arguments);
				window.gameFunctions.gameUpdate.call(this);
			};
			
			// render
			var gameRenderBase = mainModule.prototype.render;
			mainModule.prototype.render = function(){
				gameRenderBase.apply(this, arguments);
				window.gameFunctions.gameRender.call(this);
			};
			
			// sendMessage
			var gameSendMessageBase = mainModule.prototype.sendMessage;
			mainModule.prototype.sendMessage = function(){
				gameSendMessageBase.apply(this, arguments);
				window.gameFunctions.gameSendMessage.apply(this, arguments);
			};
			
			// processGameUpdate
			var gameSrocessGameUpdateBase = mainModule.prototype.processGameUpdate;
			mainModule.prototype.processGameUpdate = function(){
				gameSrocessGameUpdateBase.apply(this, arguments);
				window.gameFunctions.gameSrocessGameUpdate.apply(this, arguments);
			};
			
			// PING
			var emoteModule = getModule("e5d16b4d");
			// Second mod: Find consecutive declarations of emoteSoftTicker and emoteHardTicker = 0
			
			// override
			var emoteManagerUpdateBase = emoteModule.EmoteManager.prototype.update;
			emoteModule.EmoteManager.prototype.update = function(){
				if(!this.override)
					window.gameFunctions.pingOverride.call(this);
				
				emoteManagerUpdateBase.apply(this, arguments);
			};
			
			// DATA
			window.gameVars.Game.GameData = getModule("064c0a93");
			// This will be the very first ID at the top.
        }
    }, ["webpack_inject"]);

})();
