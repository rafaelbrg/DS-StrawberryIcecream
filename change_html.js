var dut_valu;
var dtt_valu;
var wut_valu;
var wtt_valu;
  var hr_util;
  var min_util;
  var hr_inutil;
  var min_inutil;
  var hr_total;
  var min_total;
  var percent;
  function duas_casas(numero){
      if (numero <= 9){
        numero = "0"+numero;
      }
      return numero;
    }

async  function muda_dados_diarios() {

    //ler os dados salvos do sistema
      chrome.storage.local.get(["dtt"], function (result) { //Primeiro tem que ler o dado que já está salvo

        dtt_valu = parseInt(result.dtt);
      });
      chrome.storage.local.get(["dut"], function(result) { //Primeiro tem que ler o dado que já está salvo

        dut_valu = parseInt(result.dut);
      });
    //transformar em variaveis pertinentes
    after_day();
  }
async  function muda_dados_semanais() {

    //ler os dados salvos do sistema
      chrome.storage.local.get(["wtt"], function (result) { //Primeiro tem que ler o dado que já está salvo
        wtt_valu = parseInt(result.wtt);
      });
      chrome.storage.local.get(["wut"], function(result) { //Primeiro tem que ler o dado que já está salvo
        wut_valu = parseInt(result.wut);
      });
    //transformar em variaveis pertinentes
        after_week();
  }
  function after_day(){
    hr_total = duas_casas(Math.round(dtt_valu/3600));
    min_total = duas_casas(Math.round((dtt_valu%3600)/60));
    hr_inutil = duas_casas(Math.round(dut_valu/3600));
    min_inutil = duas_casas(Math.round((dut_valu%3600)/60));
    hr_util = duas_casas(Math.round((dtt_valu - dut_valu)/3600));
    min_util = duas_casas(Math.round(((dtt_valu - dut_valu)%3600)/60));
    percent = (dtt_valu - dut_valu) / dtt_valu;
    //console.log("Calculou?");
  //alterar no front
    percent = parseFloat(percent.toFixed(2));
document.getElementById('dado1').innerHTML = "Tempo gasto em vídeos produtivos: "+hr_util+":"+min_util;
document.getElementById('dado2').innerHTML = "Tempo gasto em vídeos improdutivos: "+hr_inutil+":"+min_inutil;
document.getElementById('dado3').innerHTML = "Tempo total gasto no youtube: "+hr_total+":"+min_total;
document.getElementById('info_final').innerHTML = "Hoje vc usou "+percent+"% do youtube para vídeos não-banais.";
  }

  function after_week(){

  hr_total = duas_casas(Math.round(wtt_valu/3600));
  min_total = duas_casas(Math.round((wtt_valu%3600)/60));
  hr_inutil = duas_casas(Math.round(wut_valu/3600));
  min_inutil = duas_casas(Math.round((wut_valu%3600)/60));
  hr_util = duas_casas(Math.round((wtt_valu - wut_valu)/3600));
  min_util = duas_casas(Math.round(((wtt_valu - wut_valu)%3600)/60));
//alterar no front
document.getElementById('dado4').innerHTML = "Tempo gasto em vídeos produtivos: "+hr_util+":"+min_util;
document.getElementById('dado5').innerHTML = "Tempo gasto em vídeos improdutivos: "+hr_inutil+":"+min_inutil;
document.getElementById('dado6').innerHTML = "Tempo total gasto no youtube: "+hr_total+":"+min_total;
  }
  //chamar as funçôes, 1 exec. a cada 10 segundos é suficiente
  setInterval(muda_dados_diarios, 1000);
  setInterval(muda_dados_semanais, 1000);
