//Este script es para greasemonkey

var tesis_css = document.createElement('link');
tesis_css.setAttribute("rel","stylesheet");
tesis_css.setAttribute("type","text/css");
tesis_css.setAttribute("href","http://127.0.0.1/tesis/tesisunlp/tesisunlp.css");

document.head.appendChild(tesis_css);
//Este script es para prueba solamente, usar uglify para unir todos los archivos
var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/Attribute.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/Utils.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/listeners.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/tablednd.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/Recorder.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/localStorageManager.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/Manager.js');
document.head.appendChild(tesis_script);


var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/RConsole.js');
document.head.appendChild(tesis_script);


var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/main.js');
document.head.appendChild(tesis_script);


var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/edit.js');
document.head.appendChild(tesis_script);


var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesis/tesisunlp/PrimitiveTasks.js');
document.head.appendChild(tesis_script);


