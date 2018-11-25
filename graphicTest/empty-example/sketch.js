var disco;
var tempo_total;
var tempo_util;


function setup() {
  createCanvas(150,150);
  background(180);
  angleMode(DEGREES);
  
  frameRate(2); //Setar um framerate baixo pois não precisa de uma taxa grande de atualização
  disco = new grafico();
 

}

function draw() {
	console.log("start drawing");
	background(180);
	//rotate(-90);
	disco.reload();
	disco.display();
	console.log("Done!");	
}



function grafico(){
	var raio = 73;
	var end = 150;
	var porcentagem = 0;
	var wtt_valor=0;
	var wtu_valor=1800;
	
	
	
	this.display = function(){
		fill(255);
		ellipse(width/2,height/2,raio*2,raio*2);
		fill(100);
		arc(width/2,height/2,raio*2,raio*2,0, end);
		console.log("Display: OK");
	};
	
	this.reload = function(){
		chrome.storage.local.get(["wtt"], function(result) { //Primeiro tem que ler o dado que já está salvo
         console.log('WTT Armazenado: ' + parseInt(result.wtt));
		  wtt_valor = parseInt(result.wtt);
		
		});
		porcentagem = (wtu_valor/wtt_valor)*100;
		end = map(porcentagem, 0, 100, 0, 360);
		console.log("Reload: OK");
	};
	
	
}