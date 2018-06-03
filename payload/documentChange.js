(function(){
	var adsClearTimer = function() {
		$( 'div[id^="google_ads_iframe_"]' ).remove();
		setTimeout(adsClearTimer, 200);
	};
	$(document).ready(() => adsClearTimer());
	
	var addHelp = function() {
		if(!window.tempVars) {
			setTimeout(addHelp, 100);
			return;
		}
		try{
			$(document);
		}
		catch(e){
			setTimeout(addHelp, 100);
			return;
		}
		
		$("#ad-block-main-med-rect").css("width","auto");
		$("#ad-block-main-med-rect").css("overflow-y","auto");
		
		$("#ad-block-main-med-rect").append(window.tempVars.helpEnHtml);
		$("#ad-block-main-med-rect").append(window.tempVars.helpRuHtml);
		
		var updateHelp = function() {
			setTimeout(updateHelp, 50);
			if(window.gameVars){
				var en = window.gameVars.Language != "ru";
				$(".help-en").css("display", en ? "block" : "none");
				$(".help-ru").css("display", en ? "none" : "block");
			}	
		};
		updateHelp();
	}
	
	$(document).ready(() => {
		addHelp();
		$("<style>")
			.prop("type", "text/css")
			.html("\
			.menu-option {\
				pointer-events: all;\
			}")
			.appendTo("head");
	});
	
	$(document).off("mousedown");
	
	var updateLang = function() {
		setTimeout(updateLang, 50);
		if(window.gameVars)
			window.gameVars.Language = $(".language-select option:selected").val();
	};
	$(document).ready(() => updateLang());
})();