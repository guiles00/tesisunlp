/**
* Crea todos los elementos de la consola
* @class RConsole
*/
var RConsole = {

	mostrarPocket: function(aValue,anId,attributes){

		var aButton = document.createElement("input");	
	    aButton.setAttribute('type','button');
	    aButton.setAttribute('value',aValue);
	    aButton.setAttribute('id',anId);

	    aButton.onclick = function(){
	    var div_show_pocket = document.createElement('DIV');
	    div_show_pocket.id = 'id_show_pocket';
	    var body = document.getElementsByTagName('body')[0];
        var array_area = JSON.parse(localStorage.getItem("SHARED_DATA"));
  		console.debug(array_area);
  		var texto = document.createTextNode(localStorage.getItem("SHARED_DATA"));
		//visibility: hidden;
  		div_show_pocket.style.cssText="position:absolute;width:auto;height:auto;top:30%;left:50%;margin-top:-100px;margin-left:-100px;background-color:rgb(225, 218, 185);border: solid black;";
		div_show_pocket.appendChild(texto);
		var bClose = document.createElement('input');
		bClose.type = 'button';
		bClose.value = 'x';
		bClose.style.cssText = "position:absolute;float:right;top:0;right:0;";
		bClose.onclick = function(){
			var el = document.getElementById('id_show_pocket');
 				el.parentNode.removeChild(el);
		}
		div_show_pocket.appendChild(bClose);
		

		var bClear = document.createElement('input');
		bClear.type = 'button';
		bClear.value = 'clear';
		bClear.onclick = function(){
			localStorageManager.clearPocket();
		}
		div_show_pocket.appendChild(bClear);
		body.appendChild(div_show_pocket);

	    }

	return aButton;
	}
	,createButtonPocket: function(aValue,anId,attributes){

		var aButton = document.createElement("input");	
	    aButton.setAttribute('type','button');
	    aButton.setAttribute('value',aValue);
	    aButton.setAttribute('id',anId);

	    aButton.onclick = function(){ 
	    var elButton = document.getElementById('pocket_id'); 	
	    if( elButton.value == 'X') {
	    	elButton.value = '-';
	    	//if(confirm('Desea Seleccionar Texto')){
	    	
	    	document.addEventListener('mouseup', handlerPocket,false);

			/*}else{
				elButton.value = 'X';
	    		document.removeEventListener('mouseup', handlerPocket,false);
			}*/
	    }else{
	    	elButton.value = 'X';
	    	document.removeEventListener('mouseup', handlerPocket,false);
	    }
	    
	}

	return aButton;
	}
	/**
	* @method createAddAugContainer
	*/
	,createAddAugContainer: function(){
	
	var div_add_aug_container = document.createElement("div");	
	div_add_aug_container.id = "div_add_aug_container";
	div_add_aug_container.style.cssText="padding: 10px;visibility: hidden;position:absolute;width:200px;height:auto;top:30%;left:50%;margin-top:-100px;margin-left:-100px;background-color:rgb(225, 218, 185);border: solid black;";
	//div_editor_container.style.cssText="position:absolute;width:200px;height:200px;top:20%;left:50%;margin-top:-100px;margin-left:-100px;background-color:red";
	

	var div_add_aug_header = document.createElement("div");	
	div_add_aug_header.id = "div_add_aug_header";
	div_add_aug_header.style.cssText="";

    var header_aug_title = document.createTextNode('Augmented Tasks');
	div_add_aug_header.appendChild(header_aug_title);

	var hr_title = document.createElement('hr');
	div_add_aug_header.appendChild(hr_title);

	var div_select_aug_tasks = document.createElement('div');
	div_select_aug_tasks.id = 'div_select_aug_tasks';

	var div_add_aug_inflate = document.createElement("div");	
	div_add_aug_inflate.id = "div_add_aug_inflate";

	var div_add_aug_footer = document.createElement("div");	
	div_add_aug_footer.id = "div_add_aug_footer";
	div_add_aug_footer.style.cssText="";
    
    // div_consola.style.visibility = "hidden";
    div_add_aug_container.appendChild(div_add_aug_header);
    div_add_aug_container.appendChild(div_select_aug_tasks);
    div_add_aug_container.appendChild(div_add_aug_inflate);
    div_add_aug_container.appendChild(div_add_aug_footer);
	//div_consola.appendChild(div_editor);

	//=========================Agrego el Container
	var el_select_aug_inflate = document.getElementById("div_select_aug_inflate");
    var elements = new Array();
    	
    var option_aug_el = Object.create(optionsElement);
    	option_aug_el.id = 'id_augmented_task';
        option_aug_el.label = "Aug. Task";
        option_aug_el.options[0] = ['Select Task',0]; //deberia ser disabled
        option_aug_el.options[1] = ['GoToLink ATask',1];
        option_aug_el.options[2] = ['Another Task',2];
        console.debug(option_aug_el);
        elements.push(option_aug_el);
      	view.render(div_select_aug_tasks, elements);	
	//==========================

	return div_add_aug_container;
	}
	/**
	* @method createEditionContainer
	*/
	,createAddContainer: function(){
	
	var div_add_container = document.createElement("div");	
	div_add_container.id = "div_add_container";
	div_add_container.style.cssText="visibility: hidden;position:absolute;width:200px;height:auto;top:30%;left:50%;margin-top:-100px;margin-left:-100px;background-color:rgb(225, 218, 185);border: solid black;";
	//div_editor_container.style.cssText="position:absolute;width:200px;height:200px;top:20%;left:50%;margin-top:-100px;margin-left:-100px;background-color:red";
	

	var div_add_header = document.createElement("div");	
	div_add_header.id = "div_add_header";
	div_add_header.style.cssText="";

    var header_title = document.createTextNode('Task Editor');
	div_add_header.appendChild(header_title);

	var div_select_tasks = document.createElement('div');
	div_select_tasks.id = 'div_select_tasks';

	var div_add_inflate = document.createElement("div");	
	div_add_inflate.id = "div_add_inflate";

	var div_add_footer = document.createElement("div");	
	div_add_footer.id = "div_add_footer";
	div_add_footer.style.cssText="";
    
    // div_consola.style.visibility = "hidden";
    div_add_container.appendChild(div_add_header);
    div_add_container.appendChild(div_select_tasks);
    div_add_container.appendChild(div_add_inflate);
    div_add_container.appendChild(div_add_footer);
	//div_consola.appendChild(div_editor);

	//=========================Agrego el Container
	var el_select_inflate = document.getElementById("div_select_inflate");
    var elements = new Array();
    	
    var option_el = Object.create(optionsElement);
    	option_el.id = 'id_primitive_task';
        option_el.label = "Primitive Task";
        option_el.options[0] = ['Select Task',0]; //deberia ser disabled
        option_el.options[1] = ['FillInputTask',1];
        option_el.options[2] = ['TextAreaTask',2];
        option_el.options[3] = ['SelectOptionTask',3];
		option_el.options[4] = ['ClickLinkTask',4];
        
        elements.push(option_el);
      	view.render(div_select_tasks, elements);	
	//==========================

	return div_add_container;
	}
	/**
	* @method createEditionContainer
	*/
	 ,createEditionContainer: function(){
	
	var div_editor_container = document.createElement("div");	
	div_editor_container.id = "div_editor_container";
	div_editor_container.style.cssText="padding: 10px;visibility: hidden;position:absolute;width:auto;height:auto;top:30%;left:50%;margin-top:-100px;margin-left:-100px;background: #A2AFA0;border: solid #A2AFFF;";
	//div_editor_container.style.cssText="position:absolute;width:200px;height:200px;top:20%;left:50%;margin-top:-100px;margin-left:-100px;background-color:red";
	//overflow:scroll;z-index: 300;position:fixed;left: 0px;width:auto;height: 100%;border:solid 1px #e1e1e1;vertical-align: middle;background: #A2AFA0;text-align:center;";

	var div_editor_header = document.createElement("div");	
	div_editor_header.id = "div_editor_header";
	div_editor_header.style.cssText="";

	var el_hr = document.createElement('hr');
	
    var header_title = document.createTextNode('Task Editor');
	div_editor_header.appendChild(header_title);	
	div_editor_header.appendChild(el_hr);
	
	var div_editor_preconditions = document.createElement("div");	
	div_editor_preconditions.id = "div_editor_preconditions";
	div_editor_preconditions.style.cssText="";
	var header_title_preconditions = document.createTextNode('Preconditions');
	var el_hr_preconditions = document.createElement('hr');
	div_editor_preconditions.appendChild(header_title_preconditions);	
	div_editor_preconditions.appendChild(el_hr_preconditions);



	var div_inflate = document.createElement("div");	
	div_inflate.id = "div_inflate";
	

	var div_editor_footer = document.createElement("div");	
	div_editor_footer.id = "div_editor_footer";
	div_editor_footer.style.cssText="";
    
    // div_consola.style.visibility = "hidden";
    div_editor_container.appendChild(div_editor_header);
    div_editor_container.appendChild(div_editor_preconditions);
    div_editor_container.appendChild(div_inflate);
    div_editor_container.appendChild(div_editor_footer);
	//div_consola.appendChild(div_editor);
	
	//console.debug(div_editor_footer);
	return div_editor_container;
	}
	/**
	* 
	* @method createButton
	*/
	,createButton: function(aValue,anId,attributes){

		var aButton = document.createElement("input");	
	    aButton.setAttribute('type','button');
	    aButton.setAttribute('value',aValue);
	    aButton.setAttribute('id',anId);

	      for (var attr in attributes) { 
	      aButton.setAttribute(attr,attributes[attr]);  
	      }

	return aButton;
	}
	,createStopButton: function(){
		////console.debug('1. crea boton Stop');
		var attr_stop = {'disabled':true, 'hidden':false };
		var iStop_recorder = this.createButton('Stop','stop_record',attr_stop);
		iStop_recorder.addEventListener("click", Recorder.clickStop , false); 
		////console.debug(iStop_recorder.nodeName);
		return iStop_recorder;
	 }
	 ,createPlayButton: function(){
	 	////console.debug('2. crea boton Play');
		var iPlay_recorder = this.createButton('Play','play_procedure',null);
		iPlay_recorder.className = "class_button";
		iPlay_recorder.addEventListener("click", Recorder.clickPlay , false); 
		return iPlay_recorder;
	 }
	 ,createRecordButton: function(){

		////console.debug('3. crea boton Record');
		var iRecord_recorder = this.createButton('Record','start_record',null);
		iRecord_recorder.addEventListener("click",Recorder.clickRecord, false); 
		iRecord_recorder.className = "class_button";
		return iRecord_recorder;
	 }
	 ,createClearButton: function(){
	 	////console.debug('4. crea boton Clear');
		var clear = this.createButton('Clear','clear',null);
		clear.className = "class_button";
		clear.onclick = function(){

		//localStorage.clear();
		localStorage.setItem("BPM",JSON.stringify(new Array()));
        document.getElementById("table_consola").innerHTML = "";
		}; 
		return clear;
	 }
	 ,createShowLocalStorageButton: function(){
		var load = document.createElement('input');
		load.className = "class_button";
		load.type = "button";
		load.value = "LS";
		load.id = "load";

		load.onclick = function(){	
		console.log("Contenido:");
		console.log(JSON.parse(localStorage.getItem("BPM")));
		console.log('ejecutando:');
		console.log(localStorage.getItem("BPMEXECUTION"));
		console.log('grabando:');
		console.log(localStorage.getItem("BPMRECORDING"));
		console.log(localStorage);

									////console.debug("Tamano:");////console.debug(localStorage.length);
								};
	     return load;
		 }
	 ,createaddTasksSelect: function(){

		////console.debug('5. crea Select Tasks');
		var sAddTask = document.createElement('select');
		sAddTask.className = "class_button";
		sAddTask.setAttribute('id','add_task');
	 	var j;
	 	var aOptions=['Add Task','Primitive Task','Augmented Task'];
		for (j = 0; j < aOptions.length; j = j + 1) {
			opt = document.createElement('option');
			opt.value = j;
			if(j===0){opt.disabled = true;opt.selected = true;} 
			opt.innerHTML = aOptions[j];
			sAddTask.appendChild(opt);
		}
		//sAddTask.addEventListener("change", Recorder.addTask , false); 
		sAddTask.addEventListener("change", Recorder.addPrimitiveTask , false); 

		return sAddTask;
	 }
	 ,createHeaderContainer: function(){
		////console.debug('7. Crea el div consola');		
		var div_consola = document.createElement("div");
			div_consola.id = "div_consola";		
			div_consola.style.cssText = "overflow:scroll;z-index: 300;position:fixed;left: 0px;width:auto;height: 100%;border:solid 1px #e1e1e1;vertical-align: middle;background: #A2AFA0;text-align:center;";
		return div_consola;

	 }
	 ,createHeader: function(){
	 	////console.debug('8. Crea el div consola header');
		var div_consola_header = document.createElement("div");
		div_consola_header.id = "consola_header"
		
		return div_consola_header;
	 }
	 ,createTableContainer: function(){
	 	////console.debug('9. Crea el div consola table');
		var div_table_consola = document.createElement("div");
		div_table_consola.id =  "div_table_consola";
		return div_table_consola;
	 }
	 ,createTable: function(){
		////console.debug('10. Crea la tabla contenedora de la consola');
		var table_consola = document.createElement("table")
		table_consola.id = "table_consola"
		table_consola.style.cssText = "min-width:auto;font-family: Helvetica,Arial;";
		return table_consola;
	 }
	 ,createShowHide: function(){

	////console.debug('14. crea el div para la solapa show/hide');
	//Agrego la solapa para mostrar/ocultar
	var div_pestana = document.createElement("div");
	div_pestana.id =  "div_pestana"; 
	//div_pestana.style.cssText = "display: inline-block;background: #37abc8;opacity: 0.67;position: fixed;right: 0;bottom: 3.2em;z-index: 100;font-size: 14px;font-family: Helvetica, arial, freesans, clean, sans-serif;" ;
	div_pestana.style.cssText = "display: inline-block;background: #A2AFA0;position: fixed;right: 0;bottom: 3.2em;z-index: 100;font-size: 14px;font-family: Helvetica, arial, freesans, clean, sans-serif;" ;

	var input_label = document.createElement("input");
	input_label.type = "button";
	//input_label.style.cssText = "background-color: #A2AFA0; border: 0; border-radius: 2px; color: #fff; font-size: 12px; font-weight: 700; padding: 10px 30px 11px; text-transform: uppercase;vertical-align: bottom;";
	input_label.style.cssText = "background-color: #A2AFA0; border: 0; border-radius: 2px; color: black; font-size: 11px; font-weight: 700; padding: 10px 30px 11px; text-transform: uppercase;vertical-align: bottom;";
	input_label.value ="show/hide";
	input_label.id ="toc-label";
	input_label.onclick = function(){ 

	var div_consola = document.getElementById('div_consola');
	var body   = document.body || document.getElementsByTagName('body')[0];

	   if(div_consola.style.visibility=='visible'){

		div_consola.style.visibility = "hidden";
		body.style.marginLeft = "";
		}else{

		div_consola.style.visibility = "visible";
		body.style.marginLeft = "500px";
		}
	};

	div_pestana.appendChild(input_label);

	return div_pestana;
	 }
	 ,init: function(){

	 	var stopButton = this.createStopButton();
	 	var playButton = this.createPlayButton();
	 	var recordButton = this.createRecordButton();
	 	var clearButton = this.createClearButton(); 
	 	var addTaksSelect = this.createaddTasksSelect();
	 	var loadButton = this.createShowLocalStorageButton();
		//var pocketButton = this.createButtonPocket('X','pocket_id','')
		//var mostrarPocket = this.mostrarPocket('M','mpocket_id','')
		
		var container = this.createHeaderContainer();
		var show_hide = this.createShowHide();
		var container_header = this.createHeader();
		var table_console_container = this.createTableContainer();
		var table_console = this.createTable();
		var editor_container = this.createEditionContainer();
		var add_container = this.createAddContainer();
	 	var add_aug_container = this.createAddAugContainer();

	 	container_header.appendChild(stopButton);
	 	container_header.appendChild(recordButton);
		container_header.appendChild(playButton);
	 	container_header.appendChild(clearButton);
	 	container_header.appendChild(loadButton);
	 	container_header.appendChild(addTaksSelect);
	 	//container_header.appendChild(pocketButton);
	 	//container_header.appendChild(mostrarPocket);
	 	
		
		table_console_container.appendChild(table_console);
		container.appendChild(container_header);
		container.appendChild(table_console_container);
		

	 	var body   = document.body || document.getElementsByTagName('body')[0];
	 	
		if (document.body.firstChild){
		      document.body.insertBefore(container, document.body.firstChild);
		    }else{
		      document.body.appendChild(container);
		}



		body.appendChild(editor_container);
		body.appendChild(add_container);
		body.appendChild(add_aug_container);
	 	////console.debug('15. Agrega la pestana show/hide');    	
		body.appendChild(show_hide); 
    	body.style.marginLeft = "500px";
	 }
}


  
