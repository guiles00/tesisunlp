window.onload = function(){

var css_styles = {
	class_button:"background-color:#24890d;border:1px;border-radius:2px;color:#fff;font-size: 8px;font-weight: 700;padding: 10px 30px 11px;text-transform: uppercase;vertical-align: bottom;"
};
//Agrego los estilos para el plugin
//@TODO: realizar una clase que maneje y englobe //border-radius: 1px;border: 1px;
var css = " .class_button { cursor: hand;background-color: #A2AFA0; border:1px solid; border-color: grey; color: black; font-family: Helvetica, Arial; font-size: 11px; font-weight: 400; padding: 5px 7px 6px; text-transform: uppercase;vertical-align: bottom;} .cssClass{ outline: 0.25em solid #FFFF00;} td{ border-bottom:1px solid #005000;} table{  background-color: #A2AFA0;  min-width:323px;font-family: Helvetica,Arial; font-size: 11px;}"; //border:2px solid #005000;border-radius:5px;
 var   head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);

//Inicia el Recorder
Recorder.init();

//Guardo el contenedor de Tareas
var esta = localStorage.getItem("BPMP");
if(!esta){
localStorage.setItem("BPMP",1);    
localStorage.setItem("BPM",JSON.stringify(new Array()));
localStorage.setItem("BPMRECORDING",0);
localStorage.setItem("BPMEXECUTION",0);
localStorage.setItem("SHARED_DATA",JSON.stringify(new Array()));
}

var table = document.getElementById('table_consola');
var tableDnD = new TableDnD();
    tableDnD.init(table);

if(localStorage.getItem("BPMRECORDING") == 1)document.getElementById('start_record').click();   

if(localStorage.getItem("BPMEXECUTION") == 1)document.getElementById('play_procedure').click(); 
        
};	