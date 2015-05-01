/** Este script levanta todos los archivos necesarios 
**  Directorios.
**  Core --> Nucleo de la aplicacion ( no se toca nada aca)
**  js --> se guardan las tareas primitivas y aumentadas
**  libs --> plugins 
**  img --> Imagenes para la consola
**  css --> CSS 
**  exports --> donde se guardan los procedures en .json
**/
var tesis_css = document.createElement('link');
tesis_css.setAttribute("rel","stylesheet");
tesis_css.setAttribute("type","text/css");
tesis_css.setAttribute("href","http://127.0.0.1/tesis/tesisunlp/css/tesisunlp.css");
document.head.appendChild(tesis_css);

//Load scripts after loading
window.onload = (function(){

	var absolute_path = 'http://127.0.0.1/tesis/tesisunlp/';
	//var absolute_path = 'var/www/tesis/tesisunlp/js/';

	function loadScript (dir, file) {
	 var scr = document.createElement("script");
	 scr.src = dir + file;
	 document.body.appendChild(scr);
	}

	var objects = ['main','edit','listeners','RConsole','Recorder'
	,'Manager','localStorageManager','StorageManager'];
	//Load core
	for (var i = 0; i < objects.length; i++) {
	        loadScript(absolute_path+'./core/',objects[i]+'.js');
	};

	var tasks = ['PrimitiveTasks','AbstractTask','Attribute','Utils'
	,'NotasTask','SumatoriaTask','ConcatStringTask','HighLightTask'
	,'FillInputTask','TextAreaTask','SelectOptionTask','CheckBoxTask','DataCollectionTask'];
	//Load tasks
	for (var i = 0; i < tasks.length; i++) {
	        loadScript(absolute_path+'./js/',tasks[i]+'.js');
	        
	};

	var libs = ['tablednd'];
	//Load tasks
	for (var i = 0; i < libs.length; i++) {
	        loadScript(absolute_path+'./libs/',libs[i]+'.js');
	        
	};

})();


/*
var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/libs/tablednd.js');
document.head.appendChild(tesis_script);
*/
/*var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/core/listeners.js');
document.head.appendChild(tesis_script);


var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/core/localStorageManager.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/core/StorageManager.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/core/main.js');
document.head.appendChild(tesis_script);


var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/core/edit.js');
document.head.appendChild(tesis_script);

*///Este script es para prueba solamente, usar uglify para unir todos los archivos
/*var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/js/Attribute.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/js/Utils.js');
document.head.appendChild(tesis_script);
*/


/*var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/Recorder.js');
document.head.appendChild(tesis_script);
*/

/*var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/Manager.js');
document.head.appendChild(tesis_script);
*/

/*var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/RConsole.js');
document.head.appendChild(tesis_script);
*/



/*
var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/js/PrimitiveTasks.js');
document.head.appendChild(tesis_script);*/


