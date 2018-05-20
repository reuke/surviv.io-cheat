(function menu(){
	var doWork = function() {
		if(!window.tempVars) {
			setTimeout(doWork, 100);
			return;
		}
		try{
			$(document);
		}
		catch(e){
			setTimeout(doWork, 100);
			return;
		}
		
		$("#ui-center").append(window.tempVars.menuHtml);
		
		window.menu = {};
		window.menu.UserSetting = {};
		
		var defaultSetting = function(){
			
			window.menu.UserSetting = {
				shoot: {
					lasersightEnabled: 				true,
					fragGrenadeTimerEnabled: 		true,
					bumpFireEnabled: 				true,
					autoAimEnabled: 				true,
					autoAimSpeedInertia:			0.4,
					autoAimPredictionInertia:		0.7,
					autoAimRestirctionEnabled: 		true,
					autoAimRestirctionAngle:		20,
					autoAimRestrictionCloseRange:	11,
					autoAimPingCorrectionEnabled:	true,
					// autoAimAntiAntiCheatEnabled: 	true,
					// autoAimAntiAntiCheatInertia:	0.4,
				},
				loot: {
					// lootHighlightEnabled: 			true,
					autolootEnabled: 				true,
					autolootSafeDistance:			0.9,
					autolootDropDelay:				0.8,
				},
				look: {
					zoomEnabled: 					true,
					zoomSpeed:						5,
					obstaclesAlphaEnabled: 			true,
					obstaclesAlphaTreeLevel:		0.15,
					obstaclesAlphaBushLevel:		0.5,
					obstaclesAlphaTableLevel:		0.15,
					ceilingAlphaEnabled: 			true,
					ceilingAlphaLevel:				0.15,
					smokeAlphaEnabled: 				true,
					smokeAlphaLevel:				0.15,
					outrunRangeEnabled: 			true,
					predictionsEnabled: 			true,
					enemyLinesEnabled: 				true,
				},
			}
		}
		
		var loadSetting = function(){
			var mergeCategory = function(category, base){
				for (var param in base) {
				   if (!category.hasOwnProperty(param)) {
					   category[param] = base[param];
				   }
				}
			}
			
			var storedString = localStorage.getItem('cheat2Setting');
			
			if(!storedString || storedString == "undefined")
				return;
			
			var stored = JSON.parse(storedString);
			var base = window.menu.UserSetting;
			
			
			for (var cat in base) {
			   if (base.hasOwnProperty(cat))
					if (stored.hasOwnProperty(cat))
						mergeCategory(stored[cat], base[cat]);
					else
						stored[cat] = base[cat];
			}
			
			window.menu.UserSetting = stored;
		}
		
		var saveSetting = function(){
			localStorage.setItem('cheat2Setting', JSON.stringify(window.menu.UserSetting))
		}
		
		var updateSetting = function(){
			
			var btnGetState = function(btn){
				return $("#btn-cheat-" + btn).hasClass("enabled");
			}
			
			var sliderGetValue = function(slider){
				return $("#slider-" + slider).val();
			}
			
			window.menu.UserSetting = {
				shoot: {
					lasersightEnabled: 				btnGetState("lasersightEnabled"),
					fragGrenadeTimerEnabled: 		btnGetState("fragGrenadeTimerEnabled"),
					bumpFireEnabled: 				btnGetState("bumpFireEnabled"),
					autoAimEnabled: 				btnGetState("autoAimEnabled"),
					autoAimSpeedInertia:			sliderGetValue("autoAimSpeedInertia"),
					autoAimPredictionInertia:		sliderGetValue("autoAimPredictionInertia"),
					autoAimRestirctionEnabled: 		btnGetState("autoAimRestirctionEnabled"),
					autoAimRestirctionAngle:		sliderGetValue("autoAimRestirctionAngle"),
					autoAimRestrictionCloseRange:	sliderGetValue("autoAimRestrictionCloseRange"),
					autoAimPingCorrectionEnabled:	btnGetState("autoAimPingCorrectionEnabled"),
					// autoAimAntiAntiCheatEnabled: 	btnGetState("autoAimAntiAntiCheatEnabled"),
					// autoAimAntiAntiCheatInertia:	sliderGetValue("autoAimAntiAntiCheatInertia"),
				},
				loot: {
					// lootHighlightEnabled: 			btnGetState("lootHighlightEnabled"),
					autolootEnabled: 				btnGetState("autolootEnabled"),
					autolootSafeDistance:			sliderGetValue("autolootSafeDistance"),
					autolootDropDelay:				sliderGetValue("autolootDropDelay"),
				},
				look: {
					zoomEnabled: 					btnGetState("zoomEnabled"),
					zoomSpeed:						sliderGetValue("zoomSpeed"),
					obstaclesAlphaEnabled: 			btnGetState("obstaclesAlphaEnabled"),
					obstaclesAlphaTreeLevel:		sliderGetValue("obstaclesAlphaTreeLevel"),
					obstaclesAlphaBushLevel:		sliderGetValue("obstaclesAlphaBushLevel"),
					obstaclesAlphaTableLevel:		sliderGetValue("obstaclesAlphaTableLevel"),
					ceilingAlphaEnabled: 			btnGetState("ceilingAlphaEnabled"),
					ceilingAlphaLevel:				sliderGetValue("ceilingAlphaLevel"),
					smokeAlphaEnabled: 				btnGetState("smokeAlphaEnabled"),
					smokeAlphaLevel:				sliderGetValue("smokeAlphaLevel"),
					outrunRangeEnabled: 			btnGetState("outrunRangeEnabled"),
					predictionsEnabled: 			btnGetState("predictionsEnabled"),
					enemyLinesEnabled: 				btnGetState("enemyLinesEnabled"),
				},
			}
		}
			
			
		var updateMenu = function(){
			
			var btnSetState = function(btn, state){
				$("#btn-cheat-" + btn).removeClass(state ? "disabled" : "enabled");
				$("#btn-cheat-" + btn).addClass(state ? "enabled" : "disabled");
			}
			
			var sliderSetValue = function(slider, value){
				var cap = $("#menu-text-" + slider).text();
				$("#menu-text-" + slider).text(cap.substr(0, cap.indexOf(': ') + 2) +  value.toString())
				$("#slider-" + slider).val(value);
			}
			
			var state = {};
			
			// shoot
			state = window.menu.UserSetting.shoot;
			
			btnSetState("lasersightEnabled",				state.lasersightEnabled);
			btnSetState("fragGrenadeTimerEnabled",			state.fragGrenadeTimerEnabled);
			btnSetState("bumpFireEnabled",					state.bumpFireEnabled);
			btnSetState("autoAimEnabled",					state.autoAimEnabled);
			sliderSetValue("autoAimSpeedInertia",			state.autoAimSpeedInertia);
			sliderSetValue("autoAimPredictionInertia",		state.autoAimPredictionInertia);
			btnSetState("autoAimRestirctionEnabled",		state.autoAimRestirctionEnabled);
			sliderSetValue("autoAimRestirctionAngle",		state.autoAimRestirctionAngle);
			sliderSetValue("autoAimRestrictionCloseRange",	state.autoAimRestrictionCloseRange);
			btnSetState("autoAimPingCorrectionEnabled",		state.autoAimPingCorrectionEnabled);
			// btnSetState("autoAimAntiAntiCheatEnabled",		state.autoAimAntiAntiCheatEnabled);
			// sliderSetValue("autoAimAntiAntiCheatInertia",	state.autoAimAntiAntiCheatInertia);
			
			// loot
			state = window.menu.UserSetting.loot;
			
			// btnSetState("lootHighlightEnabled",				state.lootHighlightEnabled);
			btnSetState("autolootEnabled",					state.autolootEnabled);
			sliderSetValue("autolootSafeDistance",			state.autolootSafeDistance);
			sliderSetValue("autolootDropDelay",				state.autolootDropDelay);
			
			// look
			state = window.menu.UserSetting.look;
			
			btnSetState("zoomEnabled",						state.zoomEnabled);
			sliderSetValue("zoomSpeed",						state.zoomSpeed);
			btnSetState("obstaclesAlphaEnabled",			state.obstaclesAlphaEnabled);
			sliderSetValue("obstaclesAlphaTreeLevel",		state.obstaclesAlphaTreeLevel);
			sliderSetValue("obstaclesAlphaBushLevel",		state.obstaclesAlphaBushLevel);
			sliderSetValue("obstaclesAlphaTableLevel",		state.obstaclesAlphaTableLevel);
			btnSetState("ceilingAlphaEnabled",				state.ceilingAlphaEnabled);
			sliderSetValue("ceilingAlphaLevel",				state.ceilingAlphaLevel);
			btnSetState("smokeAlphaEnabled",				state.smokeAlphaEnabled);
			sliderSetValue("smokeAlphaLevel",				state.smokeAlphaLevel);
			btnSetState("outrunRangeEnabled",				state.outrunRangeEnabled);
			btnSetState("predictionsEnabled",				state.predictionsEnabled);
			btnSetState("enemyLinesEnabled",				state.enemyLinesEnabled);
		}
		
		var changeTab = function(tabName){
			
			var btnSetState = function(btn, state){
				$("#btn-tab-selector-" + btn).removeClass(state ? "disabled" : "enabled");
				$("#btn-tab-selector-" + btn).addClass(state ? "enabled" : "disabled");
			}
			
			var tabSetState = function(tab, state){
				$("#tab-" + tab).css("display", state ? "block" : "none");
			}
			
			var updateTabCategory = function(tab){
				btnSetState(tab, tab == tabName);
				tabSetState(tab, tab == tabName);
			}
			
			updateTabCategory("shoot");
			updateTabCategory("loot");
			updateTabCategory("look");
		}
		
		var setEvents = function(tabName){
			
			var btnSetEvent = function(btn, tab){
				
				var btnElement = $("#btn-cheat-" + btn);
				var name = btn;
				var tabb = tab;
				
				btnElement.click(() => {
					window.menu.UserSetting[tabb][name] = !window.menu.UserSetting[tabb][name];
					saveSetting();
					updateMenu();
				});
			}
			
			var sliderSetEvent = function(slider, tab){
				var sliderElement = $("#slider-" + slider);
				var name = slider;
				var tabb = tab;
				
				sliderElement.change((e) => {
					window.menu.UserSetting[tab][name] = parseFloat(sliderElement.val());
					saveSetting();
					updateMenu();
				});
			}
			
			var tabSetEvent = function(tab){
				
				var tabButton = $("#btn-tab-selector-" + tab);
				var tabName = tab;
				tabButton.click(() => {
					changeTab(tabName);
				});
				
				function endsWith(str, suffix) {
					return str.indexOf(suffix, str.length - suffix.length) !== -1;
				}
				
				for (var name in window.menu.UserSetting[tab]) {
					if(endsWith(name, "Enabled"))
						btnSetEvent(name, tab);
					else
						sliderSetEvent(name, tab);
				}
			}
			
			tabSetEvent("shoot");
			tabSetEvent("loot");
			tabSetEvent("look");
		}
		
		var menuTimer = function(){
			setTimeout(menuTimer, 100);
			
			var baseMenu = $("#ui-game-menu")
			
			if(!baseMenu)
				return;
			
			var menuActive = baseMenu.css("display") != "none";
			
			if(window.gameVars)
				window.gameVars.Menu = menuActive;
			
			var cheatMenu = $("#cheat-menu");
			
			var center = $("#ui-center");
			
			center.css("display", "inline-grid");
			center.css("grid-gap", "25px");
			baseMenu.css("grid-row", "1");
			cheatMenu.css("display", menuActive ? "block" : "none");
			cheatMenu.css("grid-row", "1");
		}
		
		// $(document).ready(() => {
			// defaultSetting();
			// // loadSetting();
			// updateMenu();
			// changeTab("shoot");
			// setEvents();
			// menuTimer();
		// });
		
		defaultSetting();
		loadSetting();
		updateMenu();
		changeTab("shoot");
		setEvents();
		menuTimer();
		
		// Other UI stuff is here for now
		$("#ui-top-left").append(window.tempVars.counterHtml);
		window.gameVars.UI.FPSText = $("#fps_text");
		window.gameVars.UI.LATText = $("#lat_text");
	};
	doWork();
})();
