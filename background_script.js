
setInterval(getURL, 1000);

    function getURL(){
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            let URL = tabs[0].url;
			let str_url = URL;			
			chrome.tabs.sendMessage(tabs[0].id, str_url, function(response) {});
			console.log("Done!, message: "+ URL);
			console.log("str_url: "+str_url);
			
        })
    }
