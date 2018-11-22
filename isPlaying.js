Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
	get: function () {
		return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
	}
})

 var video_status;
 var category;
 var videourl = "https://www.youtube.com/watch?v=eaAAvCAeewQ";//Recebe URL do Site do YoutTube (URL FIXA PARA TESTE)
console.log(videourl)
 var videoid = videourl.substr(32);//Remove apenas o Video ID da URL
 var cat;

 // Faz requisição para a API do YouTube e pega a categoria do vídeo.
async function fetchAPI(videoid, data) {
	try {
		console.log("Parte final da URL = ",videoid);
		const apiUrl = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoid}&key=AIzaSyABwRlveLXMYpZQ2CsZbGEqzrCZ9jnCA4s&fields=items(id,snippet(categoryId))&part=snippet,statistics`)
		apiUrl.json().then(data => {cat = parseInt(data.items[0].snippet.categoryId);});
		console.log("Request realizada! categoryId = ", cat);//Resultado Randômico(Undefined ou 27), com o código atual (URL FIXA) o esperado é 27
	} catch (error) {
		console.log(error);
	}
}//agradecimento ao Fabrício Santos por ajudar a fazer esta request após 3 dias de frustração.
category = fetchAPI(videoid)
//console.log("category =", category);

/*Adicionar função para category ser igual a ALLOW (cat = 27 [EDUCATION] || cat = 35 [DOCUMENTARY]) ou DENY (Qualquer outro resultado)?
*
*/
window.addEventListener('mouseup',fetchAPI());

function isPaused() {

	if (document.querySelector('video').playing) { // checa se o video tá rodando ou não
		console.log("Playing");
		video_status = 0;
	} else {
		console.log("Paused");
		video_status = 1;
	}
}

function set_week_total_time() {
	var wtt_value; //wtt é week_total_time
	chrome.storage.local.get(["wtt"], function (result) { //Primeiro tem que ler o dado que já está salvo
		console.log('WTT Armazenado: ' + parseInt(result.wtt));
		wtt_value = parseInt(result.wtt);

	});
	if (wtt_value == undefined) {

		wtt_value = 0;
	}
	isPaused();
	if (video_status == 0) {
		wtt_value = wtt_value + 1; //wtt_value conta em segundos	
		chrome.storage.local.set({ wtt: wtt_value }, function () {
			wtt_value = wtt_value + 1;
			console.log('NEW_WTT_SEGUNDOS = ' + wtt_value);
			chrome.storage.local.set({ wtt: wtt_value }, function () {

			});
		});
	}

}


setInterval(set_week_total_time, 1000);


//Somar segundos do video nao util
/*
function set_week_useless_time(){
	var wut_value; //wut é week_useless_time
	chrome.storage.local.get(["wut"], function(result) { //Primeiro tem que ler o dado que já está salvo
         console.log('WUT Armazenado: ' + parseInt(result.wut));
		  wut_value = parseInt(result.wut);		
	});	
	if(wut_value==undefined){	
		wut_value = 0;		
	}
	isPaused();
	if(video_status==0){
		wut_value = wut_value + 1; //wut_value conta em segundos	
		chrome.storage.local.set({wut: wut_value}, function() {
			wut_value = wut_value + 1;
			console.log('NEW_WUT_SEGUNDOS = ' + wut_value);
			chrome.storage.local.set({wut: wut_value}, function() {				
			});
		});
	}
	
}	
*/




