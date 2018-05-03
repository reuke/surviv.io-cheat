window.gameFunctions = window.gameFunctions || {};
window.gameFunctions.gameInit = function(){
	window.gameVars.Game.GameActive = true;
	window.gameVars.Game.Instance = this;
	
	if(!window.gameVars.Textures.targetTexture)
		window.gameVars.Textures.targetTexture = window.PIXI.Texture.fromImage("img/gui/ping-team-coming.svg");
	
	if(!window.gameVars.Textures.roundTexture)
		window.gameVars.Textures.roundTexture = window.PIXI.Texture.fromImage("img/gui/timer-background.svg");
}