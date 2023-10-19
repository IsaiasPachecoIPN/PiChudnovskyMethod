var DETENER_CALCULO = false;
var local_chart;

function countDigitsInStringUsingRegex(inputString, targetDigit) {
  // Asegúrate de que targetDigit sea una cadena de un solo carácter
 
  
  // Crear una expresión regular para buscar el dígito en toda la cadena
  const regex = new RegExp(targetDigit, 'g');
  
  // Utilizar el método match con la expresión regular para encontrar todas las coincidencias
  const matches = inputString.match(regex);
  
  // Si no se encontraron coincidencias, retornamos 0, de lo contrario, retornamos la longitud del array de coincidencias
  return matches ? matches.length : 0;
}

function getRandomColor() {
  // Genera valores aleatorios para los componentes RGB
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Convierte los componentes en una cadena hexadecimal y devuelve el color
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

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
  

  document.addEventListener("DOMContentLoaded", async function() {

    const btnIniciar = document.getElementById("iniciar");
    const inputNumDigits = document.getElementById("lblNumDigits");
    const txtRest = document.getElementById("txtRes");
    const txtNumDigits = document.getElementById("lblNumDigitsCalculated");
    const btnDetener = document.getElementById("detener");
    const btnCargarPi1MB = document.getElementById("cargar-pi-1mb");
    const btnMostrarGrafica = document.getElementById("mostrarGrafica");

    btnMostrarGrafica.addEventListener("click", function() {
      
      let data = txtRest.value;

      if(data == null || data == undefined || data == "")
        return;

      let num9 = countDigitsInStringUsingRegex(data, 9);
      let num8 = countDigitsInStringUsingRegex(data, 8);
      let num7 = countDigitsInStringUsingRegex(data, 7);
      let num6 = countDigitsInStringUsingRegex(data, 6);
      let num5 = countDigitsInStringUsingRegex(data, 5);
      let num4 = countDigitsInStringUsingRegex(data, 4);
      let num3 = countDigitsInStringUsingRegex(data, 3);
      let num2 = countDigitsInStringUsingRegex(data, 2);
      let num1 = countDigitsInStringUsingRegex(data, 1);
      let num0 = countDigitsInStringUsingRegex(data, 0);

      const ctx = document.getElementById('myChart');

      if(local_chart != null || local_chart != undefined)
        local_chart.destroy();

      // Crea un arreglo de colores aleatorios para tus datos
      const randomColors = [];
      for (let i = 0; i < 10; i++) {
        randomColors.push(getRandomColor());
      }
      
      local_chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
          datasets: [{
            label: '# de Dígitos',
            data: [num0, num1, num2, num3, num4, num5, num6, num7, num8, num9],
            borderWidth: 1,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

    });

    btnCargarPi1MB.addEventListener("click", async function() {
      txtRest.value = pi_1mb;
      txtNumDigits.innerText = "1.000.000";
    });

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