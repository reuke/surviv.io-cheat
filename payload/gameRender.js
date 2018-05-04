window.gameFunctions = window.gameFunctions || {};
window.gameFunctions.gameRender = function(){
	
	if(!window.menu || !window.menu.UserSetting)
		return;
	
	var game = this;
	
	var targetTexture = window.gameVars.Textures.targetTexture;
	var roundTexture = window.gameVars.Textures.roundTexture;

	if(!targetTexture || !targetTexture.baseTexture ||
		!roundTexture || !roundTexture.baseTexture)
		return;

	var updateObstacleAlpha = function(obstacle) {
		if(!obstacle || !obstacle.img)
			return;
		
		var alpha = 1.0;
		
		var setting = window.menu.UserSetting.look;
		
		if(obstacle.img.includes("map-tree"))
			alpha = setting.ceilingAlphaEnabled ? setting.obstaclesAlphaTreeLevel : 1.0;
		if(obstacle.img.includes("map-bush"))
			alpha = setting.ceilingAlphaEnabled ? setting.obstaclesAlphaBushLevel : 0.97;
		if(obstacle.img.includes("map-table"))
			alpha = setting.ceilingAlphaEnabled ? setting.obstaclesAlphaTableLevel : 1.0;
		
		obstacle.sprite.alpha = alpha;
	}

	var updateBuildingCeilingAplha = function(building) {
		if(!building || !building.ceiling)
			return;
		
		var setting = window.menu.UserSetting.look;

		if(!setting.ceilingAlphaEnabled)
			return;
		
		building.ceiling.sprite.alpha = setting.ceilingAlphaLevel;
	}
	
	var updateSmokeAplha = function(smoke) {
		if(!smoke || !smoke.particle || !smoke.particle.sprite)
			return;
		
		var setting = window.menu.UserSetting.look;

		if(!setting.smokeAlphaEnabled)
			return;
		
		smoke.particle.sprite.alpha *= setting.smokeAlphaLevel;
	}

	game.smokeBarn.smokePool.pool.forEach(updateSmokeAplha);
	game.map.obstaclePool.pool.forEach(updateObstacleAlpha);
	game.map.buildingPool.pool.forEach(updateBuildingCeilingAplha);

	var updateTargetIndicator = function(player) {
		if(!player || !player.prediction)
			return;
		
		var targetIndicator = player.targetIndicator;
		
		if(!targetIndicator)
		{
			targetIndicator = window.PIXI.Sprite.from(targetTexture);
			targetIndicator.scale.x = 0.7;
			targetIndicator.scale.y = 0.7;
			player.container.addChild(targetIndicator);
			player.targetIndicator = targetIndicator;
		}
		
		targetIndicator.position.x = targetIndicator.width * -0.5 + player.prediction.x;
		targetIndicator.position.y = targetIndicator.height * -0.5 + player.prediction.y;
		
		if(player == window.gameVars.Game.Target)
		{
			targetIndicator.visible = true;
			targetIndicator.tint = 16711680;
			targetIndicator.alpha = 0.4;
			return;
		}
		
		if(!window.menu.UserSetting.look.predictionsEnabled || player.teammate)
		{
			targetIndicator.visible = false;
			return;
		}
		
		targetIndicator.visible = true;
		targetIndicator.tint = 0;
		targetIndicator.alpha = 0.7;
	}

	var updateRangeIndicator = function(player) {
		if(!player || !player.range)
			return;
		
		var rangeIndicator = player.rangeIndicator;
		
		if(!rangeIndicator)
		{
			rangeIndicator = window.PIXI.Sprite.from(roundTexture);
			rangeIndicator.alpha = 0.4;
			player.container.addChild(rangeIndicator);
			player.rangeIndicator = rangeIndicator;
		}
		
		if(!window.menu.UserSetting.look.outrunRangeEnabled || player.teammate)
		{
			rangeIndicator.visible = false;
			return;
		}
		else if(player.range < 10 || player.range > 50)
		{
			rangeIndicator.visible = false;
			return;
		}
		
		var drawRange = player.range + (37 / 2);
		
		var scale = (drawRange * 2) / 72
		
		rangeIndicator.visible = true;
		rangeIndicator.scale.x = scale;
		rangeIndicator.scale.y = scale;
		rangeIndicator.position.x = rangeIndicator.width * -0.5;
		rangeIndicator.position.y = rangeIndicator.height * -0.5;
	}
	
	var updateLaser = function() {
		if(!game.activePlayer || !game.activePlayer.container)
			return;
		
		var laser = window.gameVars.Game.Laser;
		
		var draw = laser.draw;
		
		if(!draw)
		{
			draw = new window.PIXI.Graphics();
			
			laser.draw = draw;
			game.activePlayer.container.addChild(draw);
			game.activePlayer.container.setChildIndex(draw, 0);
		}
		
		if(!draw.graphicsData)
			return;
		
		draw.clear();
		
		if(!laser.active || !window.menu.UserSetting.shoot.lasersightEnabled)
			return;
		
		var center = {x: 0, y: 0}
		var radius = laser.range;
		var angleFrom = laser.direction - laser.angle;
		var angleTo = laser.direction + laser.angle;
		
		angleFrom = angleFrom > Math.PI * 2 ? angleFrom - Math.PI * 2 : angleFrom < 0 ? angleFrom + Math.PI * 2 : angleFrom;
		angleTo = angleTo > Math.PI * 2 ? angleTo - Math.PI * 2 : angleTo < 0 ? angleTo + Math.PI * 2 : angleTo;
		
		draw.beginFill( 0xff0000, 0.1 );
		draw.moveTo(center.x,center.y);
		draw.arc(center.x, center.y, radius, angleFrom, angleTo);
		draw.lineTo(center.x, center.y);
		draw.endFill();
	}
	
	try {
		window.gameVars.Game.Enimies.forEach(updateTargetIndicator);
		window.gameVars.Game.Enimies.forEach(updateRangeIndicator);
		updateLaser();
	}
	catch(error)
	{
		console.log(error)
	}
}