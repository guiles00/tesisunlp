/**
 * 
 * @module RConsole
*/
window.onbeforeunload = function(e) {
  //console.debug('Se fue de la pagina');
};
/**  
* Listener de eventos cuando cambia el foco, recolecta datos relacionados.
* @event eventoChange
*/

var eventoClick = function(event){

	if(event.target.nodeName == 'A' ) {

	//console.debug('se va a otro lado, registro el evento/Tarea');
	
		var tipo = 0;
		var el_id = event.target.id;
		var el_value = event.target.value;
	
		//Si tiene id le pongo el xPath //*[@id="THE_ID"]
		if(el_id){
		var sxPath = '//*[@id="'+el_id+'"]';
		}else{ //Si no tiene ID tengo que ver la manera de sacar el absoluto
		////console.debug("no tiene id, saco el absoluto, uso el ejemplo de stack");
		var sxPath = Recorder.createXPathFromElement(event.target) ;
		////console.debug(sxPath);
		}
		
		var xPath = Object.create(XPathAttribute);
		xPath.setValue(sxPath);
		
		var o_task = new ClickLinkTask(10,xPath,'',0,0);
		localStorageManager.insert(o_task.toJson());
		console.debug('o_taskasdasdasdas');
		console.debug(o_task);
		console.debug('o_taskasdasdasdas');
		Recorder.refresh();

	} 
}
/**
* @event
* eventoChange
* Registra los cambios en los elementos HTML
*/

var eventoChange = function(event){
		var el_id = event.target.id;
		var el_value = event.target.value;
		var	o_task;

		if(el_id){
		var sxPath = '//*[@id="'+el_id+'"]';
		}else{
		var sxPath = Recorder.createXPathFromElement(event.target) ;
		}

		var xPath = Object.create(XPathAttribute);
			xPath.setValue(sxPath);
		var objValue = Object.create(ValueAttribute);
			objValue.setValue(el_value);

		//Diferencio los tipos de nodos, ahi le envio el tipo de tarea que recolecto.
		switch(event.target.nodeName)
		{
		case 'SELECT':
			o_task = new SelectOptionTask(10,xPath,objValue,0,0);
	    break;
		case 'INPUT':
			if(event.target.type=='radio'){ 
				o_task = new RadioTask(10,xPath,objValue,0,0);
			}else if(event.target.type=='checkbox'){
				o_task = new CheckBoxTask(10,xPath,objValue,0,0);
			}else{				
				o_task = new FillInputTask(10,xPath,objValue,0,0);
			}
		break;
	 	case 'TEXTAREA':
				o_task = new TextAreaTask(10,xPath,objValue,0,0);
		
        break;
		default:
			console.log('No se encontro Nodo');
		break;
		}

		localStorageManager.insert(o_task.toJson());
		Recorder.refresh();
		console.log('NodeName:'+event.target.nodeName+',id:'+event.target.id+',xPath:'+sxPath);
}

var addInputTaskEvent = function(event){

		var tipo = 0;
		var el_id = event.target.id;
		var el_value = event.target.value;
		
		if(el_id){
		var sxPath = '//*[@id="'+el_id+'"]';
		}else{ 
		var sxPath = Recorder.createXPathFromElement(event.target) ;
		}

	if(event.target.nodeName == 'INPUT'){ 	
	
	var	o_task = new FillInputTask();
		o_task.xPath = sxPath;
		o_task.value = el_value;
		o_task.tipo = tipo;
		localStorageManager.insert(o_task.toJson());
		Recorder.refresh();
	document.removeEventListener("change", addInputTaskEvent, false); 


	}
}

var addTextAreaTaskEvent = function(event){

		var tipo = 0;
		var el_id = event.target.id;
		var el_value = event.target.value;
		
		if(el_id){
		var sxPath = '//*[@id="'+el_id+'"]';
		}else{ 
		var sxPath = Recorder.createXPathFromElement(event.target) ;
		}
//console.debug(event.target.nodeName);
	//event.target.nodeName
	if(event.target.nodeName == 'TEXTAREA'){ 	
	
	var	o_task = new TextAreaTask();
		o_task.xPath = sxPath;
		o_task.value = el_value;
		o_task.tipo = tipo;
		localStorageManager.insert(o_task.toJson());
		Recorder.refresh();
	document.removeEventListener("change", addTextAreaTaskEvent, false); 


	}
}
var addSelectOptionTaskEvent = function(event){

		var tipo = 0;
		var el_id = event.target.id;
		var el_value = event.target.value;
		
		if(el_id){
		var sxPath = '//*[@id="'+el_id+'"]';
		}else{ 
		var sxPath = Recorder.createXPathFromElement(event.target) ;
		}
//console.debug(event.target.nodeName);
	//event.target.nodeName
	if(event.target.nodeName == 'SELECT'){ 	
	
	var	o_task = new SelectOptionTask();
		o_task.xPath = sxPath;
		o_task.value = el_value;
		o_task.tipo = tipo;
		localStorageManager.insert(o_task.toJson());
		Recorder.refresh();
	document.removeEventListener("change", addSelectOptionTaskEvent, false); 


	}
}


//======================================================================//
/**
 * @class Recorder
 */

var Recorder = {
    /**
     * @method createButton
     */
	createButton: function(aValue,anId,attributes){

	var aButton = document.createElement("input");	
    aButton.setAttribute('type','button');
    aButton.setAttribute('value',aValue);
    aButton.setAttribute('id',anId);

      for (var attr in attributes) { 
      aButton.setAttribute(attr,attributes[attr]);  
      }

	return aButton;
	}	
	/**  
	* Muestra ventana para agregar una tarea primitiva y capturar ese evento
	* @method addPrimitiveTask    
	*/
	,addPrimitiveTask: function(event) {
		
		var id_selected = event.target.options[event.target.options.selectedIndex].value;
		if(id_selected == 2){
		Recorder.addAugmentedTask();
		return false;	
		}

	var el_add_inflate = document.getElementById("div_add_inflate");
		
	var that = this;

	var ok_task = document.createElement("input");
	ok_task.type = "button";
	ok_task.value = "Ok";
	ok_task.addEventListener('click',function(){
	
	that.firstChild.selected = true;	
	var el = document.getElementById("div_add_container");
	el.style.visibility = 'hidden';
	//Despues mejoro el codigo, lo hago para terminar las funcionalidades
	if(event_type == 1){
		document.addEventListener("change", addInputTaskEvent, false); 
	}else if(event_type == 2){
		document.addEventListener("change", addTextAreaTaskEvent, false); 
	}else if(event_type == 3){
				console.debug('eeehhhh');

		document.addEventListener("change", addSelectOptionTaskEvent, false); 
	}else if(event_type == 4){
		console.debug('eeehhhh');
		//document.addEventListener("change", addInputTaskEvent, false); 
	}
	});
		
	var el_container = document.getElementById("div_add_container");
	el_container.style.visibility = "visible";
	var event_type;
    //Traigo el select de las tareas y modifico el HTML segun el tipo de tarea
    var el_sel = document.getElementById("id_primitive_task");
	el_sel.addEventListener('change',function(x){
	console.debug('change');
	var task;
	console.debug(x.target.options.selectedIndex);
	if(x.target.options.selectedIndex == 1){ //Si Es FillInputTask
	console.debug('escucha evento indicado');
	event_type = 1;
	}else if(x.target.options.selectedIndex == 2){
	console.debug('escucha otro evento indicado');
	event_type = 2;
	}else if(x.target.options.selectedIndex == 3){
	console.debug('escucha otro evento indicado');
	event_type = 3;
	}else if(x.target.options.selectedIndex == 4){
	console.debug('escucha otro evento indicado');
	event_type = 4;
	}

	});


var close_task = document.createElement("input");
	close_task.type = "button";
	close_task.value = "Close";
	close_task.addEventListener('click',function(){
	
	that.firstChild.selected = true;

	var el = document.getElementById("div_add_container");
	el.style.visibility = 'hidden';
	//console.debug(el);
	});
	
 	var div_footer = document.getElementById("div_add_footer");
 	div_footer.innerHTML="";
	//Agrego al final los dos botones
	div_footer.appendChild(ok_task);
	div_footer.appendChild(close_task);
	 
	}
	/**  
	* Muestra ventana para agregar una tarea primitiva o un augmenter
	* @method addTask    
	*/
	,addAugmentedTask: function() {
	//===============================================//

function handleSelectxPath(){
		  var high = new Highlighter();

		high.stop();
	  	console.debug('clic clic clic');
	  	var el = document.getElementById('div_add_container');
	  	el.style.visibility = 'visible';
}
	//==============================================//

	var div_add_aug_inflate = document.getElementById("div_add_aug_inflate");

	var that = this;
	var save_task = document.createElement("input");
	save_task.type = "button";
	save_task.value = "Save";
	//save_task.setAttribute('class','class_button');

	save_task.onclick = function(x){ 
	//Que tipo de tarea tiene que guardar!?
	console.debug('guarda esto en el localStorage');
	el = document.getElementById("div_add_aug_inflate");
	
	var task = new LinkATask();
	var j = task.htmlToJson(el);
	console.debug('inserta esto!');
	console.debug(j);
	localStorageManager.insert(j);
	Recorder.refresh();
	
	var el_at = document.getElementById('add_task');
	el_at.firstChild.selected = true;
	
	console.debug(that);

	};
		
	var el_container = document.getElementById("div_add_aug_container");
	el_container.style.visibility = "visible";
	
	
    //Traigo el select de las tareas y modifico el HTML segun el tipo de tarea
    var el_sel = document.getElementById("id_augmented_task");
	el_sel.addEventListener('change',function(x){
	var task;
	if(x.target.options.selectedIndex == 1){ //Si Es LinkATask
	task = new LinkATask();
	}else if(x.target.options.selectedIndex == 2){
	task = new LinkATask();
	}

	view.render(div_add_aug_inflate, task.toHtml(task.emptyToJson()));	

	});

	var close_edit = document.createElement("input");
	close_edit.type = "button";
	close_edit.value = "Close";
	close_edit.style.cssText = "position:absolute;float:right;top:0;right:0;";

	//close_edit.setAttribute('class','class_button');



	close_edit.onclick = function(){ 
  	  el = document.getElementById("div_add_aug_container");
 	  el.style.visibility = "hidden";
 	  that.firstChild.selected = true;
 	  document.removeEventListener('dblclick',handleSelectxPath,false);
 	
 	};

 	var div_footer = document.getElementById("div_add_aug_footer");
 	div_footer.innerHTML="";
	//Agrego al final los dos botones
	div_footer.appendChild(save_task);
	div_footer.appendChild(close_edit);
	
	//el_container.appendChild(div_footer);
	
	// Podria ser que se oculte el 
  	var select_xpath = document.getElementById("input_xpath");

	/*	select_xpath.addEventListener('focus',function(){ var high = new Highlighter(); high.init();},true);
		select_xpath.addEventListener('blur',function(){ var high = new Highlighter(); high.stop();},true);*/
	var select_xpath = document.createElement("input");
		select_xpath.type = "button";
		select_xpath.id = "select_xpath";
		select_xpath.value = "X";
		select_xpath.setAttribute('class','class_button');
	 	//el.appendChild(select_xpath);
		select_xpath.onclick = function(){ 
	  var high = new Highlighter();

	  var el = document.getElementById('div_add_aug_container');
	  el.style.visibility = 'hidden';
	  high.init();

	  document.addEventListener('dblclick',handleSelectxPath,false);
	  	//var select_xpath = document.getElementById("select_xpath");
	  	//Para ver que ande el highlighter
	 	var input_xpath = document.getElementById("input_xpath");
	 	
	 	////console.debug('trae input_xpath');
		
	
		if(select_xpath.value=='X'){
		 	    high.init();
		 	    select_xpath.value = "-"
		 	    	 //////console.debug(input_xpath);

		}else{
		 	    high.stop();
		 	    //select_xpath.value = "XPathEvaluator"
		 	    el.style.visibility = 'visible';
		}
		 
	 	};

	 var input_xpath = document.getElementById("input_xpath");
	// ////console.debug('nananana');
	// var temp = input_xpath.parentNode;
	div_footer.appendChild(select_xpath);
	 //temp.appendChild(select_xpath);
	 
	}
	/**  
	* 
	* @method Consola.editRow    
	*/
	,editRow: function(x) {

	el = document.getElementById("div_inflate");
	var edition_container = document.getElementById("div_editor_container");
	edition_container.style.visibility = (edition_container.style.visibility == "visible") ? "hidden" : "visible";


	var table_row = x.parentNode.parentNode;  	
	var edit_task = Object.create(inflater);
    var task = localStorageManager.getObject(table_row.id);

	var xPath = Object.create(XPathAttribute);
    	xPath.value = task.xPath.value;
    var oValue = Object.create(ValueAttribute);
    	oValue.value = task.value.value;
    
    switch(task.type)
	{
		case 'FillInputTask':
		    	
		var iTask = new FillInputTask(task.id,xPath,oValue,0,0);
		var y = iTask.toHtml();

	    break;
	
		case 'TextAreaTask':
		
		var iTask = new TextAreaTask(task.id,xPath,oValue,0,0);
		var y = iTask.toHtml();

		break;
	 	case 'SelectOptionTask':
			console.debug('Proximamente');
			return false;
	    break;
	    case 'ClickLinkTask':
			var iTask = new ClickLinkTask(task.id,xPath,oValue,0,0);
			var y = iTask.toHtml();
			
	    break;
	    
		default:
			console.log('No se encontro Tipo de tarea');
			return false;
		break;
	}

	
	view.render(el, y);

	/*****/
	var close_edit = document.createElement("input");
	close_edit.type = "button";
	close_edit.value = "X";
	close_edit.style.cssText = "position:absolute;float:right;top:0;right:0;";
	close_edit.setAttribute('class','class_button');

	
	close_edit.onclick = function(){ 
	   //var close_edit = document.getElementById("table_edit");
	   el = document.getElementById("div_editor_container");
	   el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	}
	/****/
	

	var edit_button = document.createElement('input');
	edit_button.type = "button";
	edit_button.value = "Save";
	edit_button.setAttribute('class','class_button');

	
	edit_button.onclick = function(){
    
	localStorageManager.setObjectR(iTask.htmlToJson(el));
    el = document.getElementById("div_editor_container");
    el.style.visibility = "hidden";
  	
	};

    var div_footer = document.getElementById("div_editor_footer");
    div_footer.innerHTML="";
	var el_hr = document.createElement('hr');
	div_footer.appendChild(el_hr);
	div_footer.appendChild(edit_button); 
   	div_footer.appendChild(close_edit); 

	}
	/**  
	* Dispara el handler de record
	* @method clickRecord   
	*/
	,clickRecord: function(){
	
    var start_record = document.getElementById('start_record');
	if(start_record.value == "Record"){
		start_record.value = "Stop";
		
		document.addEventListener("change", eventoChange , false);   
		document.addEventListener("click", eventoClick , false);
		localStorage.setItem("BPMRECORDING",1);

	}else if(start_record.value == "Stop"){
    	start_record.value = "Record" ;
    	
    	document.removeEventListener("change", eventoChange, false); 
    	document.removeEventListener("click", eventoClick , false);
    	localStorage.setItem("BPMRECORDING",0);
	}  
     
	var table = document.getElementById('table_consola');
    var tableDnD = new TableDnD();
    	tableDnD.init(table);
	}
	/**  
	* Para de grabar 
	* @method clickStop   
	*/
	,clickStop: function(){
	 
	//////console.debug("termino de grabar");
    document.removeEventListener("change", eventoChange, false); 
    // document.removeEventListener("click", TESIS.registroEventoClic , false); 
     var start_record = document.getElementById('start_record');
	 start_record.disabled = false;
     var stop_record = document.getElementById('stop_record');
     stop_record.disabled = true;
	}

	/**  
	* Reproduce 
	* @method clickPlay 
	*/
	,clickPlay: function(){

		//Parche!!! Le mando al localStorage el estado de ejecucion		
		localStorage.setItem("BPMEXECUTION",1);

//==================================================
//NO ME CIERRAAAAA!!!!
Manager.clearCurrentPrimitiveTasks();
var arr_ls = Manager.initCurrentPrimitiveTasks();

if( arr_ls.length == 0){
	//console.debug('no hay mas tareas');
	localStorage.setItem("BPMEXECUTION",0);
	return false;
}

//=================================================
		
  		var i; //Recorro el array de tareas
        for (i=0;i < arr_ls.length ;i++){
			
			//Hardcodeo para ver si funciona, creo que tengo que modificar la manera en que se instancian las tareas

        	if(arr_ls[i].type == 'LinkATask'){
			
			var aug_task = new LinkATask(arr_ls[i].id,arr_ls[i].atributos[1].value,xpath,valor,'',0,arr_ls[i].state);
			
			var c_t = Manager.getCurrentPrimitiveTasks();
			c_t.push(aug_task);

        	}

            try{

    		//Instancio xPath y Value (wrappers de atributos)
    		var xPath = Object.create(XPathAttribute); 
    		xPath.setValue(arr_ls[i].xPath.value);
			var value = Object.create(ValueAttribute); 
    		value.setValue(arr_ls[i].value.value);

            }catch(err){
            	console.log('error atributos');
            }            

        	try{
            
            Manager.addPrimitiveTask(arr_ls[i].id,arr_ls[i].type,xPath,value,0,arr_ls[i].state);
        
            }catch(err){
            	console.log(err);
            }

        }
        
        //console.debug(Manager.getCurrentPrimitiveTasks());
        
        Manager.start();
          
	}
	/**  
	* Actualiza la consola con el localStorage 
	* @method refresh   
	*/
	,refresh: function(){

		  var table_consola = document.getElementById("table_consola");
  
            while(table_consola.hasChildNodes())
            {
              table_consola.removeChild(table_consola.firstChild);
            }

          //1. Traigo del localStorage el array
          var ls_tasks = localStorage.getItem("BPM");
          var arr_tasks = JSON.parse(ls_tasks);

          for (var i=0;i < arr_tasks.length;i++){

			try{
			var concept = JSON.parse(value).type;	
			}catch(err){
				//////console.debug(err);
			}
			
			console.debug('escribe esto');
			console.debug(ls_tasks);
             this.writer(arr_tasks[i].id,arr_tasks[i].type,-1);
           }
	}
	/**  
	* Escribe en la consola
	* @method writer 
	*/
	,writer: function(id,text,index){

		var table_consola = document.getElementById("table_consola");

		//Inserto registro
		var tr = document.getElementById('table_consola').insertRow(index);
        tr.id= id;
	    var td1 = document.createElement('td');
	    var td2 = document.createElement('td');
	    var td3 = document.createElement('td');
	    var td4 = document.createElement('td');
	    var td5 = document.createElement('td');

		//Pruebo si el doble clic funciona
		tr.addEventListener("dblclick",function(){
			Recorder.editRow(this);
		} ,false);

	 	var text1 = document.createTextNode(text);
	    var delete_button = document.createElement('input');
		delete_button.type = "button";
		delete_button.value = "X";
		delete_button.setAttribute('class','class_button');

		delete_button.onclick = function(x){ 

			if(confirm('Desea borrar el regitro?')){
			var id = this.parentNode.parentNode.id;
			var row = this.parentNode.parentNode.sectionRowIndex;
			document.getElementById('table_consola').deleteRow(row);
			
			//localStorage.removeItem(id);
			//
			
			//iTask.htmlToJson(el)
			localStorageManager.removeElement(id);

			}
		};

		var edit_button = document.createElement('input');
		edit_button.type = "button";
		edit_button.value = "E";
		edit_button.setAttribute('class','class_button');
		edit_button.onclick = function(){
		Recorder.editRow(this);
		console.debug(this);
		};


		var id_text = document.createTextNode(id);

		td1.appendChild(id_text);
		td2.appendChild(text1);
		//td3.appendChild(add_button);
		td4.appendChild(edit_button);
		td5.appendChild(delete_button);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		}	
	/**
	* @method lookupElementByXPath
	*/
	,lookupElementByXPath: function (path) { 
	   var evaluator = new XPathEvaluator(); 
	   var result = evaluator.evaluate(path, document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null); 
	   return  result.singleNodeValue; 
	}
	/**
	* @method createXPathFromElement	
	*/
	,createXPathFromElement: function(elm) { 
	   var allNodes = document.getElementsByTagName('*'); 
	   for (segs = []; elm && elm.nodeType == 1; elm = elm.parentNode) 
	   { 
	       if (elm.hasAttribute('id')) { 
	       var uniqueIdCount = 0; 
	       for (var n=0;n < allNodes.length;n++) { 
	           if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++; 
	           if (uniqueIdCount > 1) break; 
	       }; 
	       if ( uniqueIdCount == 1) { 
	           segs.unshift('id("' + elm.getAttribute('id') + '")'); 
	           return segs.join('/'); 
	       } else { 
	           segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]'); 
	       } 
	       } else if (elm.hasAttribute('class')) { 
	           segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]'); 
	       } else { 
	           for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) { 
	       if (sib.localName == elm.localName)  i++; }; 
	       segs.unshift(elm.localName.toLowerCase() + '[' + i + ']'); 
	       }; 
	   }; 
	   return segs.length ? '/' + segs.join('/') : null; 
	} 
	,init: function(){
	
	RConsole.init();
	Recorder.refresh();

	}
  }