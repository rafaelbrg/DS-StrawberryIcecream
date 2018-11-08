document.addEventListener("DOMContentLoaded", function(){

function enviarMSG(){
         //Aqui deve ser colocado as funçoes que vão especificar o que é a tal mensagem, mas o prototipo é esse
			chrome.runtime.sendMessage(message);
		}
			
});

