var jsonToSend = null;

chrome.runtime.onMessageExternal.addListener(
	function(request, sender, sendResponse) {
		sendResponse(jsonToSend);
	}
);

var parseAppJs = function(appJsText) {
	var trimmed = appJsText
		.replace(/^webpackJsonp\(\[\w+\],/, '')
		.replace(/,\["\w+"\]\);\n\/\/#\ssourceMappingURL.+$/, '');
	
	jsonToSend = trimmed;
};

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
		
		if(!details.initiator)
			return;
		
		if(details.initiator.search('chrome-extension.+') == 0)
			return;
		
        if(details.url.search('^http.+/js/app\..+\.js$') == 0){

			fetch(details.url)
				.then(res => res.text())
				.then(txt => {
					parseAppJs(txt);
				});
		}
    },
    {
        urls: [
			"*://surviv.io/*",
			"*://surviv2.io/*",
			"*://2dbattleroyale.com/*"
		]
    },
    []
);