//Siempre empieza desde cero
localStorage.setItem('sumatoria',JSON.stringify({values:[]}));
//El handler tiene como parametro el evento para traer el valor
var  handlerPocket = function(e) { 
			
			//Si toque el boton que no haga nada
			if(e.target.nodeName == 'INPUT') return false;
			if (window.getSelection) {
          	selection = window.getSelection();
          	console.debug('en getSelection');
        	} else if (document.selection) {
          	selection = document.selection.createRange();
          	console.debug('en createRange');
        	}

			if(selection.toString().length != 0){

				if(confirm('Seleccionar: '+selection.toString()+'?')){
					var val = selection.toString()
					//guardo en localStorage
					var st = JSON.parse(localStorage.getItem('sumatoria'));
					//Agrego elemento
					st.values.push(val);
					//guardo en el localStorage
					localStorage.setItem('sumatoria',JSON.stringify(st));
					
					//sumatoria
					var st_sum = JSON.parse(localStorage.getItem('sumatoria'));
					var sum = 0;
					for(var i=0;i< st_sum.values.length;i++){
						
						sum = sum + parseInt(st_sum.values[i]);
						
					}

					var sum_container = document.getElementById("sum_container");
					var l = document.createElement("li");
					l.textContent = val;
					sum_container.appendChild(l);
					
					document.getElementById('sum').innerHTML = 'sum: '+sum;
				}		
			} 
		};
//Asumo que se agrego la tarea y empezo a escuchar 
document.addEventListener('mouseup', handlerPocket,false);

window.onload = function(){

//Agrego en la esquina izquierda un "contenedor" que muestre los valores y la sumatoria
var div = document.createElement("div");
div.classList.add('topcorner');
div.id = "sum_container";

var div_sum = document.createElement("div");
//div.classList.add('topcorner');
div_sum.id = "sum";
var body = document.getElementsByTagName("body")[0];
div.appendChild(div_sum);
body.appendChild(div);
};
