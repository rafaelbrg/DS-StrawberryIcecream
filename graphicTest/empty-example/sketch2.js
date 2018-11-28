var disco;
var tempo_total;
var tempo_util;


function setup() {
  createCanvas(150,150);
  background(180);
  angleMode(DEGREES);

  frameRate(3); //Setar um framerate baixo pois não precisa de uma taxa grande de atualização
  disco = new grafico();


}

function draw() {
	console.log("start drawing");
	background(180);
	//rotate(-90);
	disco.reload();
	disco.display();
  disco.showPercent();
	console.log("Done!");
}



function grafico(){
	var raio = 73;
	var end = 150;
	var porcentagem = 0;
	var dtt_valor=0;
	var dut_valor=0;

  this.showPercent = function(){
    porcentagem = parseFloat(porcentagem.toFixed(2));
    fill(255);
    text(porcentagem,100,90);
  };


	this.display = function(){
		fill(255);
		ellipse(width/2,height/2,raio*2,raio*2);
		fill(100);
		arc(width/2,height/2,raio*2,raio*2,0, end);
		console.log("Display: OK");
	};

	this.reload = function(){
		chrome.storage.local.get(["dtt"], function(result) { //Primeiro tem que ler o dado que já está salvo
         console.log('DTT Armazenado: ' + parseInt(result.dtt));
		  dtt_valor = parseInt(result.dtt);

		});
		chrome.storage.local.get(["dut"], function(result) { //Primeiro tem que ler o dado que já está salvo
         console.log('DUT Armazenado: ' + parseInt(result.dut));
		dut_valor = parseInt(result.dut);
		});

		porcentagem = (dut_valor/dtt_valor)*100;
		console.log("porcentagem: "+porcentagem);
		end = map(porcentagem, 0, 100, 0, 360);
		console.log("Reload: OK");
	};


}
