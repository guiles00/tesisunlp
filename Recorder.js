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
				//console.debug('eeehhhh');

		document.addEventListener("change", addSelectOptionTaskEvent, false); 
	}else if(event_type == 4){
		//console.debug('eeehhhh');
		//document.addEventListener("change", addInputTaskEvent, false); 
	}
	});
		
	var el_container = document.getElementById("div_add_container");
	el_container.style.visibility = "visible";
	var event_type;
    //Traigo el select de las tareas y modifico el HTML segun el tipo de tarea
    var el_sel = document.getElementById("id_primitive_task");
	el_sel.addEventListener('change',function(x){
	//console.debug('change');
	var task;
	//console.debug(x.target.options.selectedIndex);
	if(x.target.options.selectedIndex == 1){ //Si Es FillInputTask
	//console.debug('escucha evento indicado');
	event_type = 1;
	}else if(x.target.options.selectedIndex == 2){
	//console.debug('escucha otro evento indicado');
	event_type = 2;
	}else if(x.target.options.selectedIndex == 3){
	//console.debug('escucha otro evento indicado');
	event_type = 3;
	}else if(x.target.options.selectedIndex == 4){
	//console.debug('escucha otro evento indicado');
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
	////console.debug(el);
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
	  	//console.debug('clic clic clic');
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
	//console.debug('guarda esto en el localStorage');
	el = document.getElementById("div_add_aug_inflate");
	
	var task = new LinkATask();
	var j = task.htmlToJson(el);
	//console.debug('inserta esto!');
	//console.debug(j);
	localStorageManager.insert(j);
	Recorder.refresh();
	
	var el_at = document.getElementById('add_task');
	el_at.firstChild.selected = true;
	
	//console.debug(that);

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
	 	
	 	//////console.debug('trae input_xpath');
		
	
		if(select_xpath.value=='X'){
		 	    high.init();
		 	    select_xpath.value = "-"
		 	    	 ////////console.debug(input_xpath);

		}else{
		 	    high.stop();
		 	    //select_xpath.value = "XPathEvaluator"
		 	    el.style.visibility = 'visible';
		}
		 
	 	};

	 var input_xpath = document.getElementById("input_xpath");
	// //////console.debug('nananana');
	// var temp = input_xpath.parentNode;
	div_footer.appendChild(select_xpath);
	 //temp.appendChild(select_xpath);
	 
	}
	,createEditorContainer: function(){
		//@comment Por ahora traigo el DIV que ya lo crea el RConsole.init()
		var edition_container = document.getElementById("div_editor_container");
		edition_container.style.visibility = "visible";

		//1. Creo Botones
		var close_edit = document.createElement("input");
		close_edit.type = "button";
		close_edit.value = "X";
		close_edit.style.cssText = "position:absolute;float:right;top:0;right:0;";
		close_edit.setAttribute('class','class_button');


		close_edit.onclick = function(){ 
		   el = document.getElementById("div_editor_container");
	
		   el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
		}

		var edit_button = document.createElement('input');
		edit_button.type = "button";
		edit_button.value = "Save";
		edit_button.id = "id_edit_task";
		edit_button.setAttribute('class','class_button');

	    var div_footer = document.getElementById("div_editor_footer");
	    div_footer.innerHTML="";
		var el_hr = document.createElement('hr');
		div_footer.appendChild(el_hr);
		div_footer.appendChild(edit_button); 
	   	div_footer.appendChild(close_edit); 
	}
	/**  
	* 
	* @method Recorder.editRow    
	*/
	,editRow: function(x) {
	Recorder.createEditorContainer();
	
    var task = localStorageManager.getObject(x.parentNode.parentNode.id); //@comment Podría traer el objeto instanciado
 	var aTask = eval(task.type);
 	var iTask = aTask.init({'id':task.id,'xpath':Object.create(XPathAttribute).init({'value':task.xPath.value})
 		,'value':Object.create(SValueAttribute).init({'value':task.value.value})
 		,'tipo':Object.create(TipoAttribute).init({'value':task.tipo.value})
 		,'state':Object.create(StateAttribute).init({'value':(task.state.value).toString()})
 		,'taskTitle':Object.create(TaskTitleAttribute).init({'value':task.taskTitle.value})
 	});
 	
	// 	var pre = Object.create(Precondition).init(Object.create(UrlAttribute).init({'value':task.precondition.url.value}));	
	//	iTask.setPrecondition(pre);
	var y = iTask.toHtml();

	view.render(document.getElementById("div_inflate"), y);
		
	/*****/
	//Hardcodeo el boton |<-|
	var bind_data = document.createElement("input");
	bind_data.type = "button";
	bind_data.value = "<";
	bind_data.setAttribute('class','class_button');
	bind_data.onclick = function(){ 
		Recorder.mostrarPocket();
	}
	var div_value = document.getElementById('value_id').parentNode;
	div_value.appendChild(bind_data);

	//El comportamiento de los botones todavia no se bien como desacoplarlo
	var b = document.getElementById('id_edit_task');
	b.onclick = function(){
    //console.debug(iTask.htmlToJson(document.getElementById("div_inflate")));
	localStorageManager.setObjectR(iTask.htmlToJson(document.getElementById("div_inflate")));
    el = document.getElementById("div_editor_container");
    el.style.visibility = "hidden";
  	Recorder.refresh();

	}; 


	}//@ToRefactor
	,formatearTextoPocket: function(texto){
		
		var table = document.createElement("table"); 
		var i;
		for (i = 0; i < texto.length -1; i = i + 1) {
		//-----------------------------Boton Seleccionar Valor
		var sel_button = document.createElement('input');
		sel_button.type = "button";
		sel_button.value = "S";
		sel_button.setAttribute('class','class_button');

		sel_button.onclick = function(x){ 
		//@offlineComment A tener en cuenta  typeof yourVariable === 'object'
		////console.debug(x.target.parentNode.parentNode.childNodes[1].innerHTML);
		var el = document.getElementById("value_id");
		var sh_d = '{"index":'+x.target.parentNode.parentNode.sectionRowIndex+'}';
		//el.value = x.target.parentNode.parentNode.childNodes[1].innerHTML;
		el.value = sh_d;		
		//Cierro
		var div_show_pocket = document.getElementById('id_show_pocket');
 		div_show_pocket.parentNode.removeChild(div_show_pocket);
		};
		//-----------------------------			//console.debug(texto[i].concept);
			
			var tr = document.createElement("tr");
			var td_concept = document.createElement("td");
			var t_node = document.createTextNode(texto[i].concept);
			td_concept.appendChild(t_node);
			var td_data = document.createElement("td");
			var t_data = document.createTextNode(texto[i].data);
			td_data.appendChild(t_data);
			var b = document.createElement("td");
			b.appendChild(sel_button);

			tr.appendChild(td_concept);
			tr.appendChild(td_data);
			tr.appendChild(b);
		
			table.appendChild(tr);	
			
		};
		return table;
	}
	,mostrarPocket: function(aValue,anId,attributes){

		
	    var div_show_pocket = document.createElement('DIV');
	    div_show_pocket.id = 'id_show_pocket';
	    var body = document.getElementsByTagName('body')[0];
        var array_area = JSON.parse(localStorage.getItem("SHARED_DATA"));
  		var table_s_data = Recorder.formatearTextoPocket(array_area);
  		var texto = document.createTextNode(localStorage.getItem("SHARED_DATA"));
		//visibility: hidden;
  		div_show_pocket.style.cssText="position:absolute;width:auto;height:auto;top:30%;left:50%;margin-top:-100px;margin-left:-100px;background-color:rgb(225, 218, 185);border: solid black;";
		//div_show_pocket.appendChild(texto);
		div_show_pocket.appendChild(table_s_data);
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
	/**  
	* Dispara el handler de record
	* @method clickRecord   
	*/
	,clickRecord: function(){
    var start_record = document.getElementById('start_record');
	if(start_record.value == "Record"){
		start_record.value = "Stop";
		start_record.src = 'stop.png';
		
		document.addEventListener("change", eventoChange , false);   
		document.addEventListener("click", eventoClick , false);
		document.addEventListener("mouseup", handlerPocketEvent , false);
		document.addEventListener("click", logHandler , false);
		localStorage.setItem("BPMRECORDING",1);

	}else if(start_record.value == "Stop"){
    	start_record.value = "Record" ;
    	start_record.src = 'record.png';

    	document.removeEventListener("change", eventoChange, false); 
    	document.removeEventListener("click", eventoClick , false);
    	document.removeEventListener("mouseup", handlerPocketEvent , false);
		document.removeEventListener("click", logHandler , false);

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
	 
	////////console.debug("termino de grabar");
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

		//Registro listener
		document.addEventListener('finalizado',procedureHandler,false);

		//Parche!!! Le mando al localStorage el estado de ejecucion		
		localStorage.setItem("BPMEXECUTION",1);

//==================================================
//NO ME CIERRAAAAA!!!!
Manager.clearCurrentPrimitiveTasks();
var arr_ls = Manager.initCurrentPrimitiveTasks();

if( arr_ls.length == 0){
	////console.debug('no hay mas tareas');
	localStorage.setItem("BPMEXECUTION",0);
	document.removeEventListener('finalizado',procedureHandler,false);

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
			var tipo = Object.create(TipoAttribute); 
    		tipo.setValue(arr_ls[i].tipo.value);

    		//Lo diferencio con el _type que guardo en cada {} asi instancio el que corresponde

    		//var value = eval(arr_ls[i].value._type);
    		//value.setValue(arr_ls[i].value.value);
			if(arr_ls[i].value._type == 'CValueAttribute'){ 
			var valor = Object.create(CValueAttribute); 
	    		valor.setValue(arr_ls[i].value.value);
			}else{
			var valor = Object.create(SValueAttribute); 
	    		valor.setValue(arr_ls[i].value.value);
			}
			//console.debug(eval(arr_ls[i].value._type));
	    			
            }catch(err){
            	console.log('error atributos');
            }            

        	try{
            
            Manager.addPrimitiveTask(arr_ls[i].id,arr_ls[i].type,xPath,valor,tipo,arr_ls[i].state,arr_ls[i].taskTitle);
        	}catch(err){
            	console.log(err);
            }
        }
        
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
				////////console.debug(err);
			}
			
			//console.debug('escribe esto');
			//console.debug(ls_tasks);
             this.writer(arr_tasks[i].id,arr_tasks[i].taskTitle.value,-1);
           }
	}
	,writer: function(id,text,index){

		var table_consola = document.getElementById("table_consola");

		//Inserto registro
		var tr = document.getElementById('table_consola').insertRow(index);
        tr.id = id;
        
        var task = localStorageManager.getObject(id);

        //Si la tarea se ejecuto ( estado 1 ), se pone verde
        if(task.state.value) tr.style.backgroundColor='green';
        //Hardcodeado!!!!
	    var pTask = document.createTextNode('Primitive Task');
	    var spTask = document.createElement('span');
	    spTask.setAttribute('style', 'font-size: 10px'); 
	    spTask.appendChild(pTask);
	    
	    var td1 = document.createElement('td');
	    td1.style.visibility = "hidden";
	    
	    var td2 = document.createElement('td');
	    /*var td3 = document.createElement('td');
	    var td4 = document.createElement('td');
	    var td5 = document.createElement('td');
		*/
		//Pruebo si el doble clic funciona
		tr.addEventListener("dblclick",function(){
			Recorder.editRow(this);
		} ,false);


	 	var text1 = document.createTextNode(text);
	    var delete_button = document.createElement('input');
		delete_button.type = "button";
		delete_button.value = "Delete";
		delete_button.setAttribute('class','class_button');

		delete_button.onclick = function(x){ 

			if(confirm('Desea borrar el regitro?')){
			var id = this.parentNode.parentNode.id;
			var row = this.parentNode.parentNode.sectionRowIndex;
			document.getElementById('table_consola').deleteRow(row);
			localStorageManager.removeElement(id);

			}
		};

		var edit_button = document.createElement('input');
		edit_button.type = "button";
		edit_button.value = "Edit";
		edit_button.setAttribute('class','class_button');
		edit_button.onclick = function(){
		Recorder.editRow(this);
		};

	var state_button = document.createElement('input');
		state_button.type = "button";
		state_button.value = "State";
		state_button.setAttribute('class','class_button');
		state_button.onclick = function(){
		var task = localStorageManager.getObject(this.parentNode.parentNode.id);
		task.state.value = 0;
		localStorageManager.setObjectR(JSON.stringify(task));
		};

		var id_text = document.createTextNode(id);
		var br = document.createElement('br');
		td1.appendChild(id_text);
		td2.appendChild(text1);
		td2.appendChild(edit_button);
		td2.appendChild(delete_button);
		td2.appendChild(state_button);
		td2.appendChild(br);
		td2.appendChild(spTask);
		
		//tr.appendChild(td1);
		tr.appendChild(td2);
		/*
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		*/}
	/**  
	* Escribe en la consola
	* @method writer 
	*/
	,xwriter: function(id,text,index){

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
			localStorageManager.removeElement(id);

			}
		};

		var edit_button = document.createElement('input');
		edit_button.type = "button";
		edit_button.value = "E";
		edit_button.setAttribute('class','class_button');
		edit_button.onclick = function(){
		Recorder.editRow(this);
		};

	var state_button = document.createElement('input');
		state_button.type = "button";
		state_button.value = "S";
		state_button.setAttribute('class','class_button');
		state_button.onclick = function(){
		var task = localStorageManager.getObject(this.parentNode.parentNode.id);
		task.state.value = 0;
		localStorageManager.setObjectR(JSON.stringify(task));
		};

		var id_text = document.createTextNode(id);

		td1.appendChild(id_text);
		td2.appendChild(text1);
		td3.appendChild(edit_button);
		td4.appendChild(delete_button);
		td5.appendChild(state_button);
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