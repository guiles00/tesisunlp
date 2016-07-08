//Este script es para greasemonkey

var tesis_css = document.createElement('link');
tesis_css.setAttribute("rel","stylesheet");
tesis_css.setAttribute("type","text/css");
tesis_css.setAttribute("href","http://127.0.0.1/tesisunlp/tesisunlp.css");

document.head.appendChild(tesis_css);
//Este script es para prueba solamente, usar uglify para unir todos los archivos
var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesisunlp/Attribute.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesisunlp/Utils.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesisunlp/listeners.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesisunlp/tablednd.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesisunlp/Recorder.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesisunlp/localStorageManager.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesisunlp/StorageManager.js');
document.head.appendChild(tesis_script);

var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesisunlp/Manager.js');
document.head.appendChild(tesis_script);


var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesisunlp/RConsole.js');
document.head.appendChild(tesis_script);


var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesisunlp/main.js');
document.head.appendChild(tesis_script);


var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesisunlp/edit.js');
document.head.appendChild(tesis_script);


var tesis_script = document.createElement('script');
tesis_script.setAttribute('src','http://127.0.0.1/tesisunlp/PrimitiveTasks.js');
document.head.appendChild(tesis_script);


