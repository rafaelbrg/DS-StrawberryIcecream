document.addEventListener("DOMContentLoaded", function(){

chrome.runtime.onMessage.addListener(receiver);

	function receiver(request, sender, sendResponse){
		
		console.log(request);
		//request é a mensagem recebida
              //Aqui deve ser oq o programa deve fazer depois que receber a mensagem
		
	}	
		
}