Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
	get: function () {
		return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
	}
})

var videourl;
var videoid; // = videourl.substr(32);

function receiver(message, sender, sendResponse){		
		videourl = message.toString();
		videoid = videourl.substr(32);
		console.log("Done! "+ videoid);			
	}	


chrome.runtime.onMessage.addListener(receiver);

 var video_status;
 var category;
console.log(videourl)
 var cat;

 // Faz requisição para a API do YouTube e pega a categoria do vídeo.
async function fetchAPI(videoid, data) {
	try {
	
		//console.log("Parte final da URL = ",videoid);
		const apiUrl = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoid}&key=AIzaSyABwRlveLXMYpZQ2CsZbGEqzrCZ9jnCA4s&fields=items(id,snippet(categoryId))&part=snippet,statistics`)
		apiUrl.json().then(data => {cat = parseInt(data.items[0].snippet.categoryId);});
	//	console.log("Request realizada! categoryId = ", cat);//Resultado Randômico(Undefined ou 27), com o código atual (URL FIXA) o esperado é 27
	} catch (error) {
		console.log(error);
	}
}


function isPaused() {
category = fetchAPI(videoid);
	if (document.querySelector('video').playing) { // checa se o video tá rodando ou não
	//	console.log("Playing");
		video_status = 0;
	} else {
	//	console.log("Paused");
		video_status = 1;
	}
}

function set_week_time() {
	
	var wut_value; //wut é week_useless_time
	var wtt_value; //wtt é week_total_time
	
	//	27;28;35; são categorias consideradas uteis
	
		//WEEK TOTAL TIME tem que ser armazenado independente do tipo de video
	//WEEK TOTAL TIME -> 	
	chrome.storage.local.get(["wtt"], function (result) { //Primeiro tem que ler o dado que já está salvo
		//console.log('WTT Armazenado: ' + parseInt(result.wtt));
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
			//console.log('NEW_WTT_SEGUNDOS = ' + wtt_value);
			chrome.storage.local.set({ wtt: wtt_value }, function () {

			});
		});
	}
	cat = parseInt(cat,10);
	let allow;
	if(cat==27||cat==28||cat==35){
		allow = 1;
	}else{
		allow = 0;
	}
	
if(allow!=1){	
	//WEEK USELESS TIME -> 
	chrome.storage.local.get(["wut"], function(result) { //Primeiro tem que ler o dado que já está salvo
       //  console.log('WUT Armazenado: ' + parseInt(result.wut));
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
		//	console.log('NEW_WUT_SEGUNDOS = ' + wut_value);
			chrome.storage.local.set({wut: wut_value}, function() {				
			});
		});
	}
}
}


setInterval(set_week_time, 1000);

function set_daily_time() {
	
	var dut_value; //dut é daily_useless_time
	var dtt_value; //dtt é daily_total_time
	
	//	27;28;35; são categorias consideradas uteis
	
		//DAILY TOTAL TIME tem que ser armazenado independente do tipo de video
	//DAILY TOTAL TIME -> 	
	chrome.storage.local.get(["dtt"], function (result) { //Primeiro tem que ler o dado que já está salvo
		console.log('DTT Armazenado: ' + parseInt(result.dtt));
		dtt_value = parseInt(result.dtt);

	});
	if (dtt_value == undefined) {
		dtt_value = 0;
	}
	isPaused();
	if (video_status == 0) {
		dtt_value = dtt_value + 1; //dtt_value conta em segundos	
		chrome.storage.local.set({ dtt: dtt_value }, function () {
			dtt_value = dtt_value + 1;
			console.log('NEW_DTT_SEGUNDOS = ' + dtt_value);
			chrome.storage.local.set({ dtt: dtt_value }, function () {

			});
		});
	}
	cat = parseInt(cat,10);
	let allow_d;
	if(cat==27||cat==28||cat==35){
		allow_d = 1;
	}else{
		allow_d = 0;
	}
	
if(allow_d!=1){	
	//DAILY  USELESS TIME -> 
	chrome.storage.local.get(["dut"], function(result) { //Primeiro tem que ler o dado que já está salvo
         console.log('DUT Armazenado: ' + parseInt(result.dut));
		  dut_value = parseInt(result.dut);		
	});	
	if(dut_value==undefined){	
		dut_value = 0;		
	}
	isPaused();
	if(video_status==0){
		dut_value = dut_value + 1; //dut_value conta em segundos	
		chrome.storage.local.set({dut: dut_value}, function() {
			dut_value = dut_value + 1;
			console.log('NEW_DUT_SEGUNDOS = ' + dut_value);
			chrome.storage.local.set({dut: dut_value}, function() {				
			});
		});
	}
}
}

setInterval(set_daily_time, 1000);


