document.addEventListener("DOMContentLoaded", function(){

chrome.runtime.onMessage.addListener(receiver);

	function receiver(request, sender, sendResponse){
		
		console.log(request);
		//request é a mensagem recebida
              //Aqui deve ser oq o programa deve fazer depois que receber a mensagem
		
	}	
		
})

    function getURL(){
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            console.log(tabs[0].url); //URL    
            let URL = tabs[0].url;
        })
    }