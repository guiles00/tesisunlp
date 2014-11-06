window.onload = function(){

var css_styles = {
	class_button:"background-color:#24890d;border:1px;border-radius:2px;color:#fff;font-size: 8px;font-weight: 700;padding: 10px 30px 11px;text-transform: uppercase;vertical-align: bottom;"
};
//Agrego los estilos para el plugin
//@TODO: realizar una clase que maneje y englobe //border-radius: 1px;border: 1px;
var css = " .class_button { cursor: hand;background-color: #A2AFA0; border:1px solid; border-color: grey; color: black; font-family: Helvetica, Arial; font-size: 9px; font-weight: 400; padding: 5px 7px 6px; text-transform: uppercase;vertical-align: bottom;} .cssClass{ outline: 0.25em solid #FFFF00;} td{ border-bottom:1px solid #005000;} table{  background-color: #A2AFA0;  min-width:323px;font-family: Helvetica,Arial; font-size: 11px;}"; //border:2px solid #005000;border-radius:5px;
 var   head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);



//Guardo el contenedor de Tareas
var esta = localStorage.getItem("BPMP");
//var y = localStorage.getItem("BPM");
//console.debug('esta');
//console.debug(y);
//console.debug('esta');
//localStorage.setItem("BPM", JSON.stringify( {'P1':[] } ) );
//localStorage.setItem("BPM", JSON.stringify( {'P1':[],'P2':[] } ) );
//localStorage.setItem("BPMPROC",'');
//console.debug(localStorage.getItem('BPMPROC'));
//localStorage.setItem("BPM", JSON.stringify( {'P1':[],'P2':[] } ) );

if(!esta){
localStorage.setItem("BPMP",1);    
localStorage.setItem("BPM", JSON.stringify( {'P1':[],'P2':[] } ) );

//localStorage.setItem("BPM",JSON.stringify(new Array()));
//localStorage.setItem("BPM",JSON.stringify(new Object()));

localStorage.setItem("BPMRECORDING",0);
localStorage.setItem("BPMEXECUTION",0);
localStorage.setItem("BPMPROC",'P1');
localStorage.setItem("SHARED_DATA",JSON.stringify(new Array()));
}
//Inicia el Recorder
Recorder.init();  
var table = document.getElementById('table_consola');
var tableDnD = new TableDnD();
    tableDnD.init(table);

//console.debug(localStorage.getItem('BPMRECORDING'));

if(localStorage.getItem("BPMRECORDING") == 1){
	//alert('selecciona el procedure correspondiente');
	//Trae el procedure
	var proc = localStorage.getItem('BPMPROC');
	var sel_proc = document.getElementById('procedures_select');
	sel_proc.value = proc;
	Recorder.refresh();
	document.getElementById('start_record').click();   
}
//Si esta ejecutando tendria que tener el procedimiento
if(localStorage.getItem("BPMEXECUTION") == 1){
	var proc = localStorage.getItem('BPMPROC');
	var sel_proc = document.getElementById('procedures_select');
	sel_proc.value = proc;
	Recorder.refresh();
	document.getElementById('play_procedure').click(); 
}
     
};	