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
		
		building.sprites
			.map((s) => s.sprite)
			.filter((s) => s.texture.baseTexture.imageUrl.includes("ceiling"))
			.forEach((s) => s.alpha = setting.ceilingAlphaLevel);
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
			targetIndicator.visible = false;
			targetIndicator.scale.x = 0.7;
			targetIndicator.scale.y = 0.7;
			targetIndicator.tint = 16711680;
			targetIndicator.alpha = 0.4;
			player.container.addChild(targetIndicator);
			player.targetIndicator = targetIndicator;
		}
		
		if(!targetIndicator)
			return;
		
		targetIndicator.position.x = targetIndicator.width * -0.5 + player.prediction.x;
		targetIndicator.position.y = targetIndicator.height * -0.5 + player.prediction.y;


		// Setting to hide target indicator

		// Check if the player that we are putting the target indicator on is the autoaim target
		if(player == window.gameVars.Game.Target) {
			var settings = window.menu.UserSetting.shoot;
			// If this is the correct player, set the visibility of the target indicator to the target-indicator-visible setting
			targetIndicator.visible = settings.autoAimCrosshairEnabled;
		} else {
			// Hide the indicator if this is the wrong target
			targetIndicator.visible = false;
		}
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
	
	var updateEnemyLines = function() {
		if(!game.activePlayer || !game.activePlayer.container)
			return;
		
		var enemyLines = window.gameVars.Game.EnemyLines;
		
		var points = enemyLines.points
		var draw = enemyLines.draw;
		
		if(!points)
			return;
	
		if(!draw)
		{
			draw = new window.PIXI.Graphics();
			
			enemyLines.draw = draw;
			game.activePlayer.container.addChild(draw);
			game.activePlayer.container.setChildIndex(draw, 0);
		}
		
		if(!draw.graphicsData)
			return;
		
		draw.clear();
		
		if(!window.menu.UserSetting.look.enemyLinesEnabled)
			return;
		
		draw.beginFill();
		draw.lineStyle(2, 0x68B0E8);
		
		points.forEach(function(pnt) {
			draw.moveTo(0, 0);
			draw.lineTo(pnt.x, pnt.y);
		});
		
		draw.endFill();
	}
	
	var updateNames = function(player) {
		if(!player || !player.nameText)
			return;
		
		var nameText = player.nameText;
		
		if(player.teammate == true)
		{	
			nameText.style.fill = "#00ffff";
			nameText.visible = true;
		}
		else if(window.gameVars.Input.Cheat.ShowNamesPressed)
		{
			nameText.style.fill = "#ff3333";
			nameText.visible = true;
		}
		else
		{	
			nameText.style.fill = "#00ffff";
			nameText.visible = false;
		}
	}
	
	try {
		var players = game.playerBarn.playerPool.pool.filter(p => p.__id != game.activePlayer.__id);
		
		players.forEach(updateTargetIndicator);
		players.forEach(updateNames);
		updateLaser();
		updateEnemyLines();
	}
	catch(error)
	{
		console.log(error)
	}
	
	// counters
	
	var red = { r: 255, g: 0, b: 0 };
	var green = { r: 0, g: 180, b: 0 };
	
	function getColor(color1, color2, weight) {
		var w1 = weight;
		var w2 = 1 - w1;
		var rgb = {
			r: Math.round(color1.r * w1 + color2.r * w2),
			g: Math.round(color1.g * w1 + color2.g * w2),
			b: Math.round(color1.b * w1 + color2.b * w2)
		};
		return rgb;
	}
	
	function getWeight(value, min, max) {
		if (value <= min) return 0;
		if (value >= max) return 1;
		return (value - min) / (max - min);
	}
	
	function colorToString(color) {
		return 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 1.0)';
	}
	
	function getMedian(array) {
		
		var values = array.slice();
		
		values.sort( function(a,b) {return a - b;} );

		var half = Math.floor(values.length/2);

		if(values.length % 2)
			return values[half];
		else
			return (values[half-1] + values[half]) / 2.0;
	}
	
	// FPS counter
	
	var perf = window.gameVars.Perfomance;
	var FPSinertia = 0.1;
	var FPSResultsCount = 15;
	
	var curFPS = 0;
	
	if(perf.lastTimeFPS) {
		var elapsed = window.performance.now() - perf.lastTimeFPS;
		curFPS = 1000 / elapsed;
	}
	
	perf.lastTimeFPS = window.performance.now();
	
	var FPSList = perf.lastFPSList;
	
	FPSList.push(curFPS);
	
	while (FPSList.length > FPSResultsCount) {
		FPSList.shift();
	}
	
	var FPS = getMedian(FPSList);
	
	if(perf.lastFPS) {
		FPS = FPS * (1 - FPSinertia) + perf.lastFPS * FPSinertia;
	}

	perf.lastFPS = FPS;
		
	var FPSCol = getColor(green, red, getWeight(FPS, 5, 40));
	
	if(window.gameVars && window.gameVars.UI && window.gameVars.UI.FPSText) {
		window.gameVars.UI.FPSText.text("FPS: " + Math.round(FPS));
		window.gameVars.UI.FPSText.css('color', colorToString(FPSCol));
	}
	
	//counters display
	
	if(window.gameVars && window.gameVars.UI && window.gameVars.UI.CountersWrapper) {
		window.gameVars.UI.CountersWrapper.css("display", window.menu.UserSetting.look.countersEnabled ? "block" : "none");
	}
	
}