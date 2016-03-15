/** Este script levanta todos los archivos necesarios 
**  Directorios.
**  Core --> Nucleo de la aplicacion ( no se toca nada aca)
**  js --> se guardan las tareas primitivas y aumentadas
**  libs --> plugins 
**  img --> Imagenes para la consola
**  css --> CSS 
**  exports --> donde se guardan los procedures en .json
**/

var absolute_path = 'http://localhost/content/tesisunlp/';

var tesis_css = document.createElement('link');
tesis_css.setAttribute("rel","stylesheet");
tesis_css.setAttribute("type","text/css");
//tesis_css.setAttribute("href","http://127.0.0.1/content/tesisunlp/css/tesisunlp.css");
tesis_css.setAttribute("href",absolute_path+"/css/tesisunlp.css");
document.head.appendChild(tesis_css);

//Load scripts after loading
window.onload = (function(){

	
	//var absolute_path = 'var/www/content/tesisunlp/js/';

	function loadScript (dir, file) {
	 var scr = document.createElement("script");
	 scr.src = dir + file;
	 document.body.appendChild(scr);
	}

	var objects = ['main','edit','listeners','RConsole','Recorder'
	,'Manager','localStorageManager','StorageManager','XMLDOMCreator'];
	//Load core
	for (var i = 0; i < objects.length; i++) {
	        loadScript(absolute_path+'./core/',objects[i]+'.js');
	};

	var tasks = ['Attribute','PrimitiveTasks','AbstractTask','AugmentedTask','ComposedTask','IfTask','Utils'
	,'TableManagerTask','NotasTask','SumatoriaTask','ConcatStringTask','HighLightTask'
	,'FillInputTask','TextAreaTask','SelectOptionTask','CheckBoxTask'
	,'ClickLinkTask','ClickInputTask','RadioTask','DataCollectionTask','UrlTask','SimpleHideTask','SimpleWrapTask'];
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
tesis_script.setAttribute('src','http://127.0.0.1/content/tesisunlp/libs/tablednd.js');
document.head.appendChild(tesis_script);
*/
/*var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/content/tesisunlp/core/listeners.js');
document.head.appendChild(tesis_script);


var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/content/tesisunlp/core/localStorageManager.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/content/tesisunlp/core/StorageManager.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/content/tesisunlp/core/main.js');
document.head.appendChild(tesis_script);


var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/content/tesisunlp/core/edit.js');
document.head.appendChild(tesis_script);

*///Este script es para prueba solamente, usar uglify para unir todos los archivos
/*var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/content/tesisunlp/js/Attribute.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/content/tesisunlp/js/Utils.js');
document.head.appendChild(tesis_script);
*/


/*var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/content/tesisunlp/Recorder.js');
document.head.appendChild(tesis_script);
*/

/*var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/content/tesisunlp/Manager.js');
document.head.appendChild(tesis_script);
*/

/*var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/content/tesisunlp/RConsole.js');
document.head.appendChild(tesis_script);
*/



/*
var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/content/tesisunlp/js/PrimitiveTasks.js');
document.head.appendChild(tesis_script);*/


