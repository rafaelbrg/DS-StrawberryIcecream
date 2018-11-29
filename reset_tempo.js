var day_info;
	var today = new Date;
	var zero = 0;

function	day_undefined(){
	var d = $.Deferred();
	if (day_info == undefined) {//caso o get acima não retorne nada
		console.log("day_info undefined");
		day_info = parseInt(today.getDate());
		chrome.storage.local.set({day: today.getDate()}, function() {
				chrome.storage.local.set({day: today.getDate()}, function() {
				});
			});
	}
	d.resolve();
	return d.promise();
}

function	novo_dia(){
	var d = $.Deferred();
	if(day_info!=parseInt(today.getDate())){ //Caso o dia salvo no sistema for diferente do dia atual
			console.log("NASCE UM NOVO DIA!");
			//LIMPA MEMORIA DIARIA->
			chrome.storage.local.set({dut: zero}, function() {
				chrome.storage.local.set({dut: zero}, function() {
				});
			});
			chrome.storage.local.set({dtt: zero}, function() {
				chrome.storage.local.set({dtt: zero}, function() {
				});
			});

			//DEFINIR NOVO DIA->
			chrome.storage.local.set({day: today.getDate()}, function() {
				chrome.storage.local.set({day: today.getDate()}, function() {
				});
			});
		}
	d.resolve();
	return d.promise();
}

function 	get_day(){
	var d = $.Deferred();

	chrome.storage.local.get(["day"], function (result) { //Primeiro tem que ler o dado que já está salvo
		console.log('Today Armazenado: ' + parseInt(result.day));
		day_info = parseInt(result.day); //O dia é o ultimo dia salvo no sistema

	});
	d.resolve();

	return d.promise();
}

function verify_date(){ //verificar a data em razão de resetar os dados diariamente


	get_day().pipe(day_undefined).pipe(novo_dia);
	//função().pipe(outrafunção).pipe(maisoutrafunção);
	//serve pra executar as funções em ordem

}

window.addEventListener("mouseup",verify_date);
var zero = 0;
function reset(){
		//zerar valores wtt wut dtt dut
	chrome.storage.local.set({ wtt: zero }, function () {
		chrome.storage.local.set({ wtt: zero }, function () {
		});
	});
	chrome.storage.local.set({ wut: zero }, function () {
		chrome.storage.local.set({ wut: zero }, function () {
		});
	});
	chrome.storage.local.set({ dtt: zero }, function () {
		chrome.storage.local.set({ dtt: zero }, function () {
		});
	});
	chrome.storage.local.set({ dut: zero }, function () {
		chrome.storage.local.set({ dut: zero }, function () {
		});
	});
		/*chrome.storage.local.clear(function() {
			console.log("Clear");
			var error = chrome.runtime.lastError;
			if (error) {
			console.error(error);
		}});*/
}

window.addEventListener('load', function load(event){
    var createButton = document.getElementById('create_button');
    createButton.addEventListener('click', reset);
});
