var DETENER_CALCULO = false;

function calcularPiChudnovsky(n) {
    // Definir la precisión deseada (n + 1 dígitos)
    // Ajustar la precisión para obtener n + 1 dígitos
    const precision = Math.ceil((n + 1) * Math.log10(10) / Math.log10(16));
    BigNumber.config({ DECIMAL_PLACES: precision });
    
    // Inicializar variables con BigInt.js
    let suma = new BigNumber(0);

    
    // Calcular la serie de Chudnovsky
    for (let k = 0; k < precision; k++) {
      const numerador = factorial(BigNumber(6).times(BigNumber(k))).times(545140134n * BigInt(k) + 13591409n);
      const denominador = factorial(BigNumber(3).times(BigNumber(k))).times(factorial(BigNumber(k)).pow(BigNumber(3))).times("-262537412640768000").pow(BigNumber(k));
      
      suma = suma.plus(numerador.dividedBy(denominador));
    }
    
    // Calcular el valor de Pi
    const pi = BigNumber(426880).times(BigNumber(10005).sqrt()).dividedBy(suma);
    
    // Devolver Pi con "n" dígitos
    return pi.toString().slice(0, n + 1);
  }
  
  function factorial(n) {
    if (n.lte(1)) return BigNumber(1);
    let result = BigNumber(1);
    for (let i = BigNumber(2); i.lte(n); i = i.plus(1)) {
      result = result.times(i);
    }
    return result;
  }
  
  function sqrt(n) {
    return BigNumber(n).sqrt();
  }
  
const sleep = (millis) => {
    return new Promise(resolve => setTimeout(resolve, millis))
}
  

  document.addEventListener("DOMContentLoaded", function() {

    const btnIniciar = document.getElementById("iniciar");
    const inputNumDigits = document.getElementById("lblNumDigits");
    const txtRest = document.getElementById("txtRes");
    const txtNumDigits = document.getElementById("lblNumDigitsCalculated");
    const btnDetener = document.getElementById("detener");

    btnDetener.addEventListener("click", function() {
        DETENER_CALCULO = true;
    });

    btnIniciar.addEventListener("click", async function() {

        DETENER_CALCULO = false;

        let iter = parseInt(inputNumDigits.value)+1;

        if( iter == null || iter == undefined || iter == "" || iter <= 0){
            iter = 100;
        }
        
        for(let i=0; i<=(iter); i++){
            let pi_res = calcularPiChudnovsky(i);
            txtRest.value = pi_res+"";
            txtNumDigits.innerText = i > 1 && i < 2 ? i : (i-1);
            if (i<30)
                await sleep(50);
            else   
                await sleep(1);

            if (DETENER_CALCULO)
                break;
        }
        
    });

  });