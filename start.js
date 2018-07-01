var runScript = function(scriptName, callOnLoad, isAsync) {
	try {
		var e =  document.createElement('script');
		e.src = chrome.extension.getURL(scriptName);
		e.async = !!isAsync;
		(document.head || document.documentElement).appendChild(e);
		e.onload = function() {
			e.parentNode.removeChild(e);
			if(callOnLoad)
				callOnLoad.call(this);
		};
	} catch (e) {}
};

// injection point lookup
runScript('webpack_detect.js', false, true);

var loadFile = function(fileName) {
	try{
		var request = new XMLHttpRequest();
		request.open('GET', chrome.extension.getURL(fileName), false);
		request.send(null);  
		if (request.status === 200) {  
		  return request.responseText;  
		}
	}
	catch(e) {}
	return "";
};

(function() {
	try {
		var e =  document.createElement("script");
		
		var menuHtml = loadFile('payload/menu.html');
		var helpEnHtml = loadFile('payload/help-en.html');
		var helpRuHtml = loadFile('payload/help-ru.html');
		var counterHtml = loadFile('payload/FPSCounter.html');

		code = "window.tempVars = {" +
			"menuHtml: `" + menuHtml + "`," +
			"helpEnHtml: `" + helpEnHtml + "`," +
			"helpRuHtml: `" + helpRuHtml + "`," +
			"counterHtml: `" + counterHtml + "`," +
			"};";
			
		e.setAttribute('type', 'text/javascript');
		e.innerHTML = code;
		
		(document.head || document.documentElement).appendChild(e);
		e.onload = function() {
			e.parentNode.removeChild(e);
		};
	} catch (e) {}
})();

// payload vars
runScript('payload/gameVars.js');
runScript('payload/gameSetting.js');

// payload functions
runScript('payload/gameInit.js');
runScript('payload/gameFree.js');
runScript('payload/gameOverride.js');
runScript('payload/gameUpdate.js');
runScript('payload/gameRender.js');
runScript('payload/pingOverride.js');

window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); 
	
	// injection point
	runScript('webpack_override.js');

	// appearance
	runScript('third_party/jquery-3.3.1.min.js',
		() => {
			runScript('payload/menuAppearance.js');
			runScript('payload/documentChange.js');
	});
},false);

