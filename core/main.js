window.onload = function(){
//Check if there is BPMP in localStorage
var bpmp = localStorage.getItem("BPMP");

// localStorage.setItem('sumatoria',JSON.stringify({values:[]}));

if(!bpmp){
localStorage.setItem("BPMP",1);    
localStorage.setItem("BPM", JSON.stringify( {'P1':[],'P2':[] } ) );
localStorage.setItem("BPMRECORDING",0);
localStorage.setItem("BPMEXECUTION",0);
localStorage.setItem("BPMPROC",'P1');
localStorage.setItem('SHARED_DATA',JSON.stringify(new Object()));
}
//Init the Recorder
Recorder.init();  

//If recording, keep doing it
if(localStorage.getItem("BPMRECORDING") == 1){
	//Trae el procedure
	var proc = localStorage.getItem('BPMPROC');
	var sel_proc = document.getElementById('procedures_select');
	sel_proc.value = proc;
	Recorder.refresh();
	RConsole.showConsola();
	Recorder.clickRecord();
}
//If is on execution, keep doing it
if(localStorage.getItem("BPMEXECUTION") == 1){
	var proc = localStorage.getItem('BPMPROC');
	var sel_proc = document.getElementById('procedures_select');
	sel_proc.value = proc;
	Recorder.refresh();
	RConsole.showConsola();
	Recorder.clickPlay();
}
    
};	
