//======================================================================//
/**
 * @class Recorder
 */
function construct(constructor, args) {
	
    function F() {
        return constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    return new F();
}
function clickSelectedDOM(e){
	
		////alert("selection:"+e.target.innerHTML)
		var xpath = Recorder.createXPathFromElement(e.target);
	
		//Agregar Confirm
		var xpath_id = document.getElementById('xpath_id');
		xpath_id.value = xpath ;

		//e.target.classList.remove("select");
		
		document.removeEventListener('mouseover', DomSelecter,false);
		//tambien borro esta funcion
		document.removeEventListener('click', clickSelectedDOM,false);
		
	};

function DomSelecter(e){

		var target = e.target;

		target.onclick = function(event) {
		  return false;
		}

	
		console.debug(e.target.tagName);
		//var t = document.getElementById("tagname");
		//t.innerHTML = e.target.tagName;
	
		e.target.classList.add("hov");

		e.target.addEventListener("mouseout",function(e){
		
		e.target.classList.remove("hov");
		target.onclick = function(event) {
			
  		return true;
		}
		
		})
		//
	document.addEventListener("click",clickSelectedDOM,false);
	/*document.addEventListener("click",function(e){
		//e.target.className = "select";
		e.target.classList.add("select");

		////alert("selection:"+e.target.innerHTML)
		var xpath = Recorder.createXPathFromElement(e.target);
		console.debug(xpath);
		////alert(xpath);
		//Agregar Confirm
		var xpath_id = document.getElementById('xpath_id');
		console.debug(xpath_id)
		xpath_id.value = xpath ;

		e.target.classList.remove("select");
		
		document.removeEventListener('mouseover', DomSelecter,false);
		//tambien borro esta funcion
		//console.debug(this);
		document.removeEventListener('click', clickSelectedDOM,false);
		
	});*/
	};

var Recorder = {
	importProcedure: function(e){
		
		//console.debug('lee el archivo');
		
		var file = e.target.files;
		
	    var reader = new FileReader();
	    var data_import;
	      // Evento que usa para leer el archivo
	      reader.onload = (function(file) {
	        return function(e) {
	         data_import = JSON.parse(e.target.result);
	        
	        var p = document.getElementById('procedures_select').value;
 	      	var bpm = JSON.parse(localStorage.getItem("BPM") );
	      	bpm[p] = data_import.BPM;
	      	localStorage.setItem("BPM",JSON.stringify(bpm));
    		//And now the shared data
    		localStorage.setItem('SHARED_DATA',JSON.stringify(data_import.SHARED_DATA));
    		
    		Recorder.refresh();
	        }
	      })(file);
	      // Lo lee como un archivo de texto
	      reader.readAsText(file[0]);

 	      
	}	
	,importBPMNProcedure: function(e){

			var arr_o = [];
		console.debug('lee el archivo');
		
		var file = e.target.files;
		
	    var reader = new FileReader();
	    var data_import;

	      // Evento que usa para leer el archivo
	      reader.onload = (function(file) {
	        return function(e) {
	       	
	       	var root = e.target.result;
	       	parser = new DOMParser();
  			xmlDoc = parser.parseFromString(root,"text/xml");
	       	
	       var process = xmlDoc.getElementsByTagNameNS("http://www.omg.org/spec/BPMN/20100524/MODEL","process");	       	
	       var tasks = process[0].childNodes;
	       //console.debug(tasks);
	       for(i in tasks){
	      
	      // 	console.log(tasks[i]);
	       	if(typeof tasks[i] == 'object'){

	       		//tasks[i].getAttributeNS
	       	//Tiene que ser una tarea
	       	if(tasks[i].nodeName == 'bpmn:task'){
	       	
	       		var x =	tasks[i].getElementsByTagNameNS("http://json_task","jsonData");
		      	if(x.length > 0){
		       	var res_json = (x[0].innerHTML.replace("<![CDATA[", "")).replace("]]>","");
		       	console.log("guardo esto");
		       	console.debug(res_json);
		       	localStorageManager.insert(res_json);
		      	}else{
		      		console.log("encontro una tarea vacia");
		      	}
	      		       	
	       	//Suponemos que todos tienen JSON payload (Cuando modifique los graficos se arma estructura esqueleto)
	       	
				  /*  var tipo = Object.create(TipoAttribute);
						tipo._type = TipoAttribute._type;
						tipo.setValue(1);

					var state = Object.create(StateAttribute);
						state._type = StateAttribute._type;
						state.setValue(0);
					var xPath = Object.create(XPathAttribute);
						xPath._type = XPathAttribute._type;
						xPath.setValue('sxPath');
					var objValue = Object.create(SValueAttribute);
						objValue._type = SValueAttribute._type;		
						objValue.setValue('el_value');

					var objValue = Object.create(SValueAttribute);
						objValue._type = SValueAttribute._type;		
						objValue.setValue('el_value');
					var taskTitle = Object.create(TaskTitleAttribute).init({'value':tasks[i].id})

						////alert(tasks[i].id)
				    var o_task = new FillInputTask(i,xPath,objValue,tipo,state,taskTitle);

				    localStorageManager.insert(o_task.toJson());
				       		arr_o.push(o_task)		*/
	       	  }
	       	 }
	        }

	      /*  var p = document.getElementById('procedures_select').value;
 	      	var bpm = JSON.parse(localStorage.getItem("BPM") );
	      	
	      	bpm[p] = arr_o;
	      	
	      	localStorage.setItem("BPM",JSON.stringify(bpm));*/
    		//And now the shared data
    		//localStorage.setItem('SHARED_DATA',JSON.stringify(data_import.SHARED_DATA));
    		
    		Recorder.refresh();


	       	console.debug("finalizo importacion");
	       	console.debug(arr_o);
	       }
	      })(file);
	      // Lo lee como un archivo de texto
	      reader.readAsText(file[0]);
	

	}
    ,saveDestData: function(){

		    	//Trae el dato a guardar
		  	function isJson(str) {
	        try {
	            JSON.parse(str);
	        } catch (e) {
	            return false;
	        }
	        return true;
	        } 
	        
		  	var str_value = document.getElementById('value_id').value;
		  	if(isJson(str_value)) var temp = JSON.parse(str_value);

		  	if(typeof temp === 'object'){
		        var oValue = Object.create(CValueAttribute);
		        oValue._type = CValueAttribute._type;
		        oValue.value = str_value;
		        
		        }else{
		        var oValue = Object.create(SValueAttribute);
		        oValue._type = SValueAttribute._type;
		        oValue.value = str_value;
		     }
		  	/**En el caso de que sea un DataCollector tiene que editar otra tarea
		  	*/
		  	//1. Traigo Tarea desde el HTML
		  	var dest_id = document.getElementById('tsgc_dest_data_id').value;
		  	var otask_dest = localStorageManager.getObject(dest_id) ;
			//console.debug(otask_dest);
			if( otask_dest === false) throw "no encontro tarea";
			//Si trae algo que guarde
			otask_dest.value = oValue ;
			localStorageManager.setObjectR( JSON.stringify(otask_dest) );	
    	
    		return true;
    }
    ,initDomSelector:function(){
    	
    	document.addEventListener("mouseover", DomSelecter,false);
    	/*

		document.addEventListener("click",function(e){
			//e.target.className = "select";
			e.target.classList.add("select");

			////alert("selection:"+e.target.innerHTML)
			var xpath = createXPathFromElement(e.target);
			console.debug(xpath);
			//alert(xpath);
			e.target.classList.remove("select");
			
			});
		*/
    }
    /**
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
	,addTypeTask: function(event){
		var id_selected = event.target.options[event.target.options.selectedIndex].value;
		event.target.options.selectedIndex = 0;
		
		if(id_selected==1){
			RConsole.showAddPrimitiveTask();
		}else if(id_selected==2){
			
		/*var div = document.getElementById("div_a_task");
		console.debug(div);
		div.style.display = "initial";
		*/
		RConsole.showAddAugmentedTask();
		}
	}
	,addAugmentedTask: function(event) {
		var id_selected = event.target.options[event.target.options.selectedIndex].value;
		
		//Ya me traje el id ahora vuelvo el select a addTask
		event.target.options.selectedIndex = 0;
		//Esto es TEMPORAL, es una cagada
		if(id_selected == 1){ //Si es DataCollectorTask
		Manager.addDataCollectionTask('Select a Concept');		
		return true;	
		}else if(id_selected == 2){
		Manager.addHighLightTask('');			
		return true;	
		}else if(id_selected == 3){
		Manager.addSumatoriaTask('');			
		return true;	
		}else if(id_selected == 4){
		Manager.addNotasTask('');			
		return true;	
		}else if(id_selected == 5){
		Manager.addConcatStringTask('');			
		return true;	
		}else if(id_selected == 6){
		Manager.addComposedTask('');			
		return true;	
		}else if(id_selected == 7){
		Manager.addSimpleHideTask('');			
		return true;	
		}else if(id_selected == 8){
		Manager.addSimpleWrapTask('');			
		return true;	
		}else if(id_selected == 9){
		Manager.addIfTask('');			
		return true;	
		}else if(id_selected == 10){
		Manager.addTableManagerTask('');			
		return true;	
		}else if(id_selected == 11){
		Manager.addIteratorTask('');			
		return true;	
		}else if(id_selected == 12){
		Manager.addTableManagerTask('');			
		return true;	
		}


		

		return false;
	}
	,addPrimitiveTask: function(event) {
		var id_selected = event.target.options[event.target.options.selectedIndex].value;
		
		//Ya me traje el id ahora vuelvo el select a addTask
		event.target.options.selectedIndex = 0;
		
		/*********************************
		*Esto es TEMPORAL, es una cagada *
		**********************************/
		//'FillInput','TextArea','ClickLink','SelectOption'];
		if(id_selected == 1){ 
		Manager.addFillInputTask();		
		return true;	
		}else if(id_selected == 2){
		Manager.addTextAreaTask('');			
		return true;	
		}else if(id_selected == 3){
		Manager.addClickInputTask('');			
		return true;	
		}
		else if(id_selected == 4){
		Manager.addClickLinkTask('');			
		return true;	
		}else if(id_selected == 5){
		Manager.addSelectOptionTask('');			
		return true;	
		}

		return false;
	}
	/**  
	* Muestra ventana para agregar una tarea primitiva y capturar ese evento
	* @method addPrimitiveTask    
	*/
	,NOaddPrimitiveTask: function(event) {
		var id_selected = event.target.options[event.target.options.selectedIndex].value;
		
		//Ya me traje el id ahora vuelvo el select a addTask
		event.target.options.selectedIndex = 0;
		//Esto es TEMPORAL, es una cagada
		if(id_selected == 1){ //Si es DataCollectorTask
		Manager.addDataCollectionTask('Select a Concept');		
		return true;	
		}else if(id_selected == 2){
		Manager.addHighLightTask('');			
		return true;	
		}else if(id_selected == 3){
		Manager.addSumatoriaTask('');			
		return true;	
		}else if(id_selected == 4){
		Manager.addNotasTask('');			
		return true;	
		}else if(id_selected == 5){
		Manager.addConcatStringTask('');			
		return true;	
		}else if(id_selected == 6){
		Manager.addComposedTask('');			
		return true;	
		}

		

		return false;
		//Este codigo no se si funciona
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
	,NOaddAugmentedTask: function() {
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
	//save_task.setAttribute('class','tesisunlp_button');

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
	//close_edit.style.cssText = "position:absolute;float:right;top:0;right:0;";

	close_edit.setAttribute('class','tesisunlp_close_button');



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
		select_xpath.setAttribute('class','tesisunlp_button');
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
		//close_edit.style.cssText = "position:absolute;float:right;top:0;right:0;";
		//close_edit.setAttribute('class','tesisunlp_button');
		close_edit.setAttribute('class','tesisunlp_close_button');

		close_edit.onclick = function(){ 
		   el = document.getElementById("div_editor_container");
		   el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
		   //removeListenersEditBox();
		}

		var edit_button = document.createElement('input');
		edit_button.type = "button";
		edit_button.value = "Save";
		edit_button.id = "id_edit_task";
		edit_button.setAttribute('class','tesisunlp_button');

		var exec_button = document.createElement('input');
		exec_button.type = "button";
		exec_button.value = "Execute";
		exec_button.id = "id_exec_task";
		exec_button.setAttribute('class','tesisunlp_button_right');


	    var div_footer = document.getElementById("div_editor_footer");
	    div_footer.innerHTML="";
		var el_hr = document.createElement('hr');
		div_footer.appendChild(el_hr);
		div_footer.appendChild(edit_button); 
	   	div_footer.appendChild(close_edit); 
	   	div_footer.appendChild(exec_button);
	}
	/**  
	* 
	* @method Recorder.editRow    
	*/
	,editRow: function(x) {
	
	Recorder.createEditorContainer();
	
    var task = localStorageManager.getObject(x.parentNode.parentNode.id); //@comment Podría traer el objeto instanciado
 	var aTask = construct(window[task.type]);
	aTask.instanciamela(task);
	var y = aTask.toHtml();
	
	view.render(document.getElementById("div_inflate"), y);
		
	/*****/
	//Hardcodeo el boton |<-|
	if(typeof task.value != "undefined"){ //Algunas tareas no tienen el atributo value
	var bind_data = document.createElement("input");
	bind_data.type = "button";
	bind_data.value = "<";
	bind_data.setAttribute('class','tesisunlp_button');
	bind_data.onclick = function(){ 
		Recorder.mostrarPocket();
	}

	var div_value = document.getElementById('value_id').parentNode;
	div_value.appendChild(bind_data);
	}

	if(typeof task.xPath != "undefined"){ //Algunas tareas no tienen el atributo value
	var select_dom = document.createElement("input");
	select_dom.type = "button";
	select_dom.value = "<";
	select_dom.setAttribute('class','tesisunlp_button');
	
	select_dom.onclick = function(){ 
		Recorder.initDomSelector();
	}

	//Algunas tareas no tienen el xpath ( El dataCollector por ejemplo.)
	if( document.getElementById('xpath_id') != null) 
		document.getElementById('xpath_id').parentNode.appendChild(select_dom);;
	
	}


	/******/

	//El comportamiento de los botones todavia no se bien como desacoplarlo
	var b = document.getElementById('id_edit_task');
	b.onclick = function(){
   
	localStorageManager.setObjectR(aTask.htmlToJson(document.getElementById("div_inflate")));
	
  	//el = document.getElementById("div_editor_container");
    //el.style.visibility = "hidden";
    
    Recorder.refresh();

	}; 


	//El comportamiento de los botones todavia no se bien como desacoplarlo
	var b_exec = document.getElementById('id_exec_task');
	b_exec.onclick = function(){
   
	//var task = localStorageManager.getObject
	
	var task = localStorageManager.getObject(x.parentNode.parentNode.id);
	var oTask = construct(window[task.type]);
        oTask.instanciamela(task);//.execute();
        oTask.execute();
    Recorder.refresh();
	
  	//el = document.getElementById("div_editor_container");
    //el.style.visibility = "hidden";
    
    //Recorder.refresh();

	}; 


	}//Le paso el objeto shared data
	,formatearTextoPocket: function(shared_data){
		
		var table = document.createElement("table"); 
		var tbody = document.createElement("tbody");
		var th_header = document.createElement("tr");
		var td_header_c = document.createElement("td");
		var td_header_v = document.createElement("td");
		var td_header_x = document.createElement("td");
		var t_concept = document.createTextNode("Concept");
		var t_value = document.createTextNode("Value");
		

		td_header_c.appendChild(t_concept);
		td_header_v.appendChild(t_value);
		th_header.appendChild(td_header_c);
		th_header.appendChild(td_header_v);
		th_header.appendChild(td_header_x);
		tbody.appendChild(th_header);

		//var i;
		for (var i in shared_data){
		//console.debug(shared_data[i])	;

		var sel_button = document.createElement('input');
		sel_button.type = "button";
		sel_button.value = "S";
		sel_button.setAttribute('class','tesisunlp_button');



		/*****************************************/
		sel_button.onclick = function(x){ 
		//@offlineComment A tener en cuenta  typeof yourVariable === 'object'
		var el = document.getElementById("value_id");
		//var sh_d = '{"index":'+x.target.parentNode.parentNode.rowIndex+'}';
		var concept = x.target.parentNode.parentNode.firstChild.innerHTML;
		//guardo el concepto
		var sh_d = '['+concept+']';
		//el.value = x.target.parentNode.parentNode.childNodes[1].innerHTML;
		el.value = sh_d;		
		//Cierro
		var div_show_pocket = document.getElementById('id_show_pocket');
 		div_show_pocket.parentNode.removeChild(div_show_pocket);
		};
      	
      	/***************************************/
		var tr = document.createElement("tr");
		var td_concept = document.createElement("td");
		var t_node = document.createTextNode(i);
		
		td_concept.appendChild(t_node);
		/*var i_cvalue = document.createElement('input');
			i_cvalue.class = "shared_edit";
			i_cvalue.value = i;
		
		td_concept.appendChild(i_cvalue);
		*/
		var td_data = document.createElement("td");
		
		

	//	var t_data = document.createTextNode(shared_data[i].value);
	//	td_data.appendChild(t_data);
	
	//Creo un input 
	var i_value = document.createElement('input');
	i_value.classList.add('shared_edit');
	i_value.value = shared_data[i].value;
	
	//Le agrego el event handler
	i_value.addEventListener("change", editSharedData , false);

		td_data.appendChild(i_value);
	
		var b = document.createElement("td");
		b.appendChild(sel_button);

		tr.appendChild(td_concept);
		tr.appendChild(td_data);
		tr.appendChild(b);
	
		tbody.appendChild(tr);
	
				function editSharedData(x){
					//console.debug('guarda esto');
					//console.debug(x.target.value);
					//console.debug(x.target.parentNode.parentNode.firstChild.innerHTML);
					var concept = x.target.parentNode.parentNode.firstChild.innerHTML;

					localStorageManager.saveSharedData(concept,{'value':x.target.value});
				}

   		} 		
		table.appendChild(tbody);
   		return table;	
	}
	,mostrarPocket: function(aValue,anId,attributes){

		
	    var div_show_pocket = document.createElement('DIV');
	    div_show_pocket.id = 'id_show_pocket';
	    var body = document.getElementsByTagName('body')[0];
        
        var shared_data = JSON.parse(localStorage.getItem("SHARED_DATA"));
  		
  		var table_s_data = Recorder.formatearTextoPocket(shared_data);
  		//var texto = document.createTextNode(localStorage.getItem("SHARED_DATA"));
		
		div_show_pocket.setAttribute('class','tesisunlp_div_show_pocket');
		div_show_pocket.appendChild(table_s_data);
		var bClose = document.createElement('input');
		
		bClose.type = 'button';
		bClose.value = 'x';
		bClose.setAttribute('class','tesisunlp_close_button');
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
		/**/
		console.log('comienza a grabar');
		Manager.addUrlTask();
		start_record.value = "Stop";
		//start_record.src = 'http://s30.postimg.org/wd91sajn1/stop.png';
		start_record.src = 'http://raw.githubusercontent.com/guiles/unlptesis/master/images/stop.png';
		
		document.addEventListener("change", eventoChange , false);   
		document.addEventListener("click", eventoClick , false);
		document.addEventListener("mouseup", handlerPocketEvent , false);
		document.addEventListener("click", logHandler , false);
		
		localStorageManager.setStartRecording();
	
	}else if(start_record.value == "Stop"){
    	start_record.value = "Record" ;
    	
    	//start_record.src = 'http://s27.postimg.org/6chig4jb3/record.png';
    	start_record.src = 'http://raw.githubusercontent.com/guiles/unlptesis/master/images/record.png';
    	document.removeEventListener("change", eventoChange, false); 
    	document.removeEventListener("click", eventoClick , false);
    	document.removeEventListener("mouseup", handlerPocketEvent , false);
		document.removeEventListener("click", logHandler , false);

		localStorageManager.setStopRecording();
	}  
     
	/*var table = document.getElementById('table_consola');
    var tableDnD = new TableDnD();
    	tableDnD.init(table);*/
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
		localStorageManager.setStartExecuting();
		//==================================================
		//NO ME CIERRAAAAA!!!!
		Manager.clearCurrentPrimitiveTasks();
		var arr_ls = Manager.initCurrentPrimitiveTasks();

		if( arr_ls.length == 0){
			////console.debug('no hay mas tareas');
			localStorageManager.setStopExecuting();
			document.removeEventListener('finalizado',procedureHandler,false);

			return false;
		}

		//=================================================
		
  		var i; //Recorro el array de tareas
        for (i=0;i < arr_ls.length ;i++){
        	/*if(arr_ls[i].type == 'LinkATask'){
			
			var aug_task = new LinkATask(arr_ls[i].id,arr_ls[i].atributos[1].value,xpath,valor,'',0,arr_ls[i].state);
			
			var c_t = Manager.getCurrentPrimitiveTasks();
			c_t.push(aug_task);

        	}
			*/         
			//como es una de las tareas nuevas la convierto otra vez en JSON
			var json_task = localStorageManager.getObject(arr_ls[i].id);
			var c_task = construct(window[arr_ls[i].type]);
			
			c_task.instanciamela(json_task);
			
			var c_t = Manager.getCurrentPrimitiveTasks();
			c_t.push(c_task);

        }
        
        Manager.start();
          
	}
	,clickPlayIterator: function(){
		
		//Registro listener
		document.addEventListener('finalizado',procedureHandler,false);

		//Parche!!! Le mando al localStorage el estado de ejecucion		
		localStorageManager.setStartExecuting();
		//==================================================
		//NO ME CIERRAAAAA!!!!
		/*Manager.clearCurrentPrimitiveTasks();
		var arr_ls = Manager.initCurrentPrimitiveTasks();

		if( arr_ls.length == 0){
			////console.debug('no hay mas tareas');
			localStorageManager.setStopExecuting();
			document.removeEventListener('finalizado',procedureHandler,false);

			return false;
		}*/

		//=================================================

        Manager.startIterator();
          
	}
	/**  
	* Actualiza la consola con el localStorage 
	* @method refresh   
	*/
	,refresh: function(){
			//Cada vez que hago un refresh le pongo el drag and drop
	
		  var table_consola = document.getElementById("table_consola");
  			// Nothing to do here ... 
  			if(table_consola == null) return false;
  			
            while(table_consola.hasChildNodes())
            {
              table_consola.removeChild(table_consola.firstChild);
            }

          var procedure = document.getElementById('procedures_select').value;
          //Si no trae procedure  ( es P0 ) no tiene nada que mostrar, no hace nada
          if(procedure == 'P0') return false;
          
          //1. Traigo el objeto BPM y luego el array de tareas correspondiente
          var o_bpm = localStorage.getItem("BPM");
          var tasks = JSON.parse(o_bpm);
          var arr_tasks = tasks[procedure];
          
          for (var i=0;i < arr_tasks.length;i++){

          	if(arr_tasks[i].type == 'ComposedTask' || arr_tasks[i].type == 'IteratorTask'){
          		
          		this.writeComposite(arr_tasks[i].id,arr_tasks[i].taskTitle.value,-1);
	             	//split 
	             	var arr_id_tasks = arr_tasks[i].value.value.split(',');
	             	//console.debug(arr_id_tasks);
	             	for(var j = 0;j < arr_id_tasks.length;j++){
	             		//console.debug(arr_id_tasks[j]);
	             		var task = localStorageManager.getObject(arr_id_tasks[j]);
	             		console.debug(task);
	             		if(task !== false)
	             		Recorder.writerComposed(task.id,task.taskTitle.value,-1);	
	             	}

          		console.debug('tarea composite');
          		console.debug(arr_tasks[i]);

          	}else{
          		//arr_tasks[i].group.value puede tener dos valores, cuando esta dentro de una tarea cmpuesta se le agrega un objeto (MAL, siempre tendria que tener un objeto)
          		console.debug('imprimo la tarea');
          		console.debug(arr_tasks[i].group);
          		console.debug('/imprimo la tarea');

          		//console.debug(arr_tasks[i].group);
          		if(arr_tasks[i].group.value == '' || arr_tasks[i].group.value == 0) {
          			console.debug(arr_tasks[i]);
          			Recorder.writer(arr_tasks[i].id,arr_tasks[i].taskTitle.value,-1);	
          		}	             		
          	}
          	

          }

      
	/*	  try{
	          for (var i=0;i < arr_tasks.length;i++){
				//recorro array de tareas
				 
	             if(arr_tasks[i].type == 'ComposedTask'){
	             	this.writeComposite(arr_tasks[i].id,arr_tasks[i].taskTitle.value,-1);
	             	//split 
	             	var arr_id_tasks = arr_tasks[i].value.value.split(',');
	             	//console.debug(arr_id_tasks);
	             	for(var j = 0;j < arr_id_tasks.length;j++){
	             		//console.debug(arr_id_tasks[j]);
	             		var task = localStorageManager.getObject(arr_id_tasks[j]);
	             		//console.debug(task)
	             		Recorder.writer(task.id,task.taskTitle.value,-1);	
	             	}
	             	

	             } 
	             
	             if( arr_tasks[i].type !== 'ComposedTask'){
	             	if(arr_tasks[i].group.value = 1)
	             	this.writer(arr_tasks[i].id,arr_tasks[i].taskTitle.value,-1);
	             } 
	          	//&& arr_tasks[i].group.value == 1
	          	//this.writer(arr_tasks[i].id,arr_tasks[i].taskTitle.value,-1);
	           }
	       		
       		}catch(err){
       			console.log(err);
       		}
		*/
    	//Drag and drop
       	/*var tableDnD = new TableDnD();
	    tableDnD.init(table_consola);*/
		//Trae desde la base
		//StorageManager.getTasks(1); //Este metodo trae los datos y lo muestra en consola ( es asincrono)

	}
	,writeComposite: function(id,text,index){

		var table_consola = document.getElementById("table_consola");

        var tr = document.getElementById('table_consola').insertRow(index);
        tr.id = id;

        //Trae uno solo
        var task = localStorageManager.getObject(id);
        //Como es asincrono tengo que hacerlo dentro de un callback
     	 
        //Si la tarea se ejecuto ( estado 1 ), se pone verde
        
        //if(task.group.value == 1 )  tr.style.display = 'none';//tr.classList.add('tr_composite');
        tr.style.backgroundColor = '#2d5b89';
		if(task.state.value == 1 )  tr.style.backgroundColor = 'green';

		//Hardcodeado!!!!
	    var pTask = document.createTextNode(text + 'Task - id:'+tr.id);
	    var spTask = document.createElement('span');
	    spTask.setAttribute('style', 'font-size: 10px'); 
	    spTask.appendChild(pTask);
	    
	    var td1 = document.createElement('td');
	    td1.style.visibility = "hidden";
	    
	    var td2 = document.createElement('td');
	    if(task.group.value == 1 )
        	td2.classList.add('ident_composite');
        
		//add br
		var br = document.createElement("br");
	 	var text1 = document.createTextNode(id+' - '+text);
	 	var p_text = document.createElement("p");
	 	p_text.classList.add('task_title_style');
	 	p_text.appendChild(text1);

	    var delete_button = document.createElement('input');
		delete_button.type = "button";
		delete_button.value = "Delete";
		delete_button.classList.add('tesisunlp_button_left');

		delete_button.onclick = function(x){ 

			//if(confirm('Desea borrar el regitro?')){
			var id = this.parentNode.parentNode.id;
			var row = this.parentNode.parentNode.sectionRowIndex;
			document.getElementById('table_consola').deleteRow(row);
			localStorageManager.removeElement(id);
			//}
		};

		var edit_button = document.createElement('input');
		edit_button.type = "button";
		edit_button.value = "Edit";
		edit_button.classList.add('tesisunlp_button_left')
		edit_button.onclick = function(){
			//Add Listener to move de edit box
			addListenersEditBox();
			Recorder.editRow(this);
		};

	var state_button = document.createElement('input');
		state_button.type = "button";
		state_button.value = "P/D";
		state_button.classList.add('tesisunlp_button_left')
		state_button.onclick = function(){
		
		var task = localStorageManager.getObject(this.parentNode.parentNode.id);
		if( task.state.value == 1 ){
		task.state.value = 0;
		}else{
		task.state.value = 1;
		}
		localStorageManager.setObjectR(JSON.stringify(task));
		
		Recorder.refresh();
		
		};

	var show_button = document.createElement('input');
		show_button.type = "button";
		show_button.value = "hide";
		show_button.classList.add('tesisunlp_button_left')
		show_button.onclick = function(){
		
		if(this.value == "hide"){
			this.value = "show";
		}else{
			this.value = "hide";
		};

		//console.debug(this.parentNode.parentNode.id);
		//var el = document.getElementById(this.parentNode.parentNode.id);

		//Este comportamiento va al manager o RConsole
		var task = localStorageManager.getObject(this.parentNode.parentNode.id);
		//console.debug(tasks);
		//por ahora esta separado por comas
		var arr_id_tasks = task.value.value.split(',');
		//console.debug(arr_id_tasks);
			for(var i = 0;i < arr_id_tasks.length;i++){
			
			//oculto la tarea //Por ahora idento
			var inner_el = document.getElementById(arr_id_tasks[i]);
			
				if(inner_el.style.display == 'none'){
					inner_el.style.display ='';
					//inner_el.firstChild.classList.add('ident_composite');
					
				}else{
					inner_el.style.display ='none';
					//inner_el.firstChild.classList.add('ident_composite');
				}	

			} 

		};
/*Event Handler*/
var pasabaporaqui = function(e){
	
	console.debug('pasaba por aca');
	console.debug(e.target.parentNode.nodeName);
	
	//e.target.parentNode.nodeType
	if(e.target.parentNode.nodeName == 'TR'){
		console.debug(e.target.parentNode.id);

	}
};
/**/



	var add_button = document.createElement('input');
		add_button.type = "button";
		add_button.value = "add";
		add_button.classList.add('tesisunlp_button_left')
		add_button.onclick = function(e){

			var comp_id = e.target.parentNode.parentNode.id;
			var el = document.getElementById('table_consola');
	
			if( e.target.value == 'add' ){

				for(var i = 0 ; i < el.rows.length ; i++){
					console.debug(el.rows[i].id);

					//agrego boton para ver que onda
					var b = document.createElement("input");
					b.type = "checkbox";
					b.className = "add_button";
					b.value = el.rows[i].id;

					el.rows[i].appendChild(b);

					e.target.value = 'sel';					

				}	
				

			}else if( e.target.value == 'sel' ){

				//busca las tareas seleccionadas
				var els = document.getElementsByClassName('add_button');
				
				var id_composite = e.target.parentNode.parentNode.id;

				for(var i = 0 ; i < els.length ; i++){
						//console.debug(els[i]);
						if(els[i].checked) { //Si esta seleccionado realizo las modificaciones

							
							var task = localStorageManager.getObject(els[i].value);
							task.group.value = id_composite;
							localStorageManager.setObjectR(JSON.stringify(task));
							
							var comp_task = localStorageManager.getObject(comp_id);
						
							//console.debug('comp_task.value.value');
							//console.debug(typeof comp_task.value.value);
							if( comp_task.value.value == ''){
								var arr_values = Array();
							}else{
								var arr_values = comp_task.value.value.split(',');
							}

							
							//console.debug('arr_values');
							//console.debug(arr_values.le);
							//console.debug(typeof arr_values);
							//console.debug('arr_values');
							arr_values.push(els[i].value);
							//console.debug(arr_values);
							comp_task.value.value = arr_values.join();
							//console.debug(comp_task.value.value);
							//console.debug(typeof comp_task.value.value);
							localStorageManager.setObjectR(JSON.stringify(comp_task));
						}

				}

				e.target.value = 'sel';

				//refresh
				Recorder.refresh();

			};
			
			//console.debug(el.rows);
			/*
			for(var i = 0 ; i < el.rows.length ; i++){
				console.debug(el.rows[i].id);

				//el.rows[i].addEventListener('click', pasabaporaqui );

				//agrego boton para ver que onda
				var b = document.createElement("input");
				b.type = "checkbox";
				b.className = "add_button";
				b.value = el.rows[i].id;


				b.onclick = function(e){
					console.debug(e.target.parentNode.id);
					console.debug('este es el id para la area');
					console.debug(comp_id);
					var task = localStorageManager.getObject(e.target.parentNode.id);
					task.group.value = 1;
					localStorageManager.setObjectR(JSON.stringify(task));
					//console.debug(task);
					var comp_task = localStorageManager.getObject(comp_id);
					comp_task.value.value = e.target.parentNode.id;
					localStorageManager.setObjectR(JSON.stringify(comp_task));

					//refresh
					Recorder.refresh();


					//saca los elementos
					
					var els = document.getElementsByClassName('add_button');

					//console.debug(els);
					for(var i = 0 ; i < els.length ; i++){
					//	console.debug(els[i]);
					}
				};

				el.rows[i].appendChild(b);
			}
			*/
			//el.childNodes.map.call()
			/*el.rows.map(function(o){
				o.addEventListener('hover',function(){
					console.debug('paso por aqui');
				});
			});*/

		}
	

	var play_button = document.createElement('input');
		play_button.type = "button";
		play_button.value = ">";
		play_button.classList.add('tesisunlp_button_left')
		play_button.onclick = function(){
		
		console.debug('Empieza desde aca'+this.parentNode.parentNode.id);
		Manager.playTaskById(this.parentNode.parentNode.id);

	};


		//var id_text = document.createTextNode(id+' - ');
		var br = document.createElement('br');
		//td2.appendChild(id_text);
		td2.appendChild(p_text);
		//td2.appendChild(br);
		td2.appendChild(add_button);	
		td2.appendChild(edit_button);
		td2.appendChild(delete_button);
		td2.appendChild(state_button);
		td2.appendChild(play_button);

		//Este boton va solo en los composites
		td2.appendChild(show_button);	
		
		tr.appendChild(td2);
		

	}
	,writerComposed: function(id,text,index){

		var table_consola = document.getElementById("table_consola");

        var tr = document.getElementById('table_consola').insertRow(index);
        tr.id = id;

        //Trae uno solo
        var task = localStorageManager.getObject(id);
        //Como es asincrono tengo que hacerlo dentro de un callback
     	
     	//if(task.type == 'ComposedTask') console.debug('uso otro writer');
     	//if(task.group.value == 1) console.debug('no hago nada');
 
        //Si la tarea se ejecuto ( estado 1 ), se pone verde
        
        //if(task.group.value == 1 )  tr.style.display = 'none';//tr.classList.add('tr_composite');
        tr.style.backgroundColor = '#2d5b89';	
		if(task.state.value == 1 )  tr.style.backgroundColor = 'green';
		//Hardcodeado!!!!
	    var pTask = document.createTextNode(text + 'Task - id:'+tr.id);
	    var spTask = document.createElement('span');
	    spTask.setAttribute('style', 'font-size: 10px'); 
	    spTask.appendChild(pTask);
	    
	    var td1 = document.createElement('td');
	    td1.style.visibility = "hidden";
	    
	    var td2 = document.createElement('td');
	    if(task.group.value > 0 )
        	td2.classList.add('ident_composite');
        
		//add br
		var br = document.createElement("br");
	 	var text1 = document.createTextNode(id+' - '+text);
	 	var p_text = document.createElement("p");
	 	p_text.classList.add('task_title_style');
	 	p_text.appendChild(text1);

	    var delete_button = document.createElement('input');
		delete_button.type = "button";
		delete_button.value = "Delete";
		delete_button.classList.add('tesisunlp_button_left');

		delete_button.onclick = function(x){ 

			//if(confirm('Desea borrar el regitro?')){
			var id = this.parentNode.parentNode.id;
			var row = this.parentNode.parentNode.sectionRowIndex;
			document.getElementById('table_consola').deleteRow(row);
			localStorageManager.removeElement(id);
			//}
		};

		var edit_button = document.createElement('input');
		edit_button.type = "button";
		edit_button.value = "Edit";
		edit_button.classList.add('tesisunlp_button_left')
		edit_button.onclick = function(){
			//Add Listener to move de edit box
			addListenersEditBox();
			Recorder.editRow(this);
		};

	var state_button = document.createElement('input');
		state_button.type = "button";
		state_button.value = "P/D";
		state_button.classList.add('tesisunlp_button_left')
		state_button.onclick = function(){
		
		var task = localStorageManager.getObject(this.parentNode.parentNode.id);
		if( task.state.value == 1 ){
		task.state.value = 0;
		}else{
		task.state.value = 1;
		}
		localStorageManager.setObjectR(JSON.stringify(task));
		
		Recorder.refresh();
		
		};

	var show_button = document.createElement('input');
		show_button.type = "button";
		show_button.value = "show";
		show_button.classList.add('tesisunlp_button_left')
		show_button.onclick = function(){
		
		if(this.value == "show"){
			this.value = "hide";
		}else{
			this.value = "show";
		};
		
		//Este comportamiento va al manager o RConsole
		var task = localStorageManager.getObject(this.parentNode.parentNode.id);
		//console.debug(tasks);
		//por ahora esta separado por comas
		var arr_id_tasks = task.value.value.split(',');
		//console.debug(arr_id_tasks);
		for(var i = 0;i < arr_id_tasks.length;i++){
		
		//oculto la tarea //Por ahora idento
		var inner_el = document.getElementById(arr_id_tasks[i]);
		
		if(inner_el.style.display == 'none'){
			inner_el.style.display ='';
			//inner_el.firstChild.classList.add('ident_composite');
			
		}else{
			inner_el.style.display ='none';
			//inner_el.firstChild.classList.add('ident_composite');
		}	

		} 

		};

	
	var play_button = document.createElement('input');
		play_button.type = "button";
		play_button.value = ">";
		play_button.classList.add('tesisunlp_button_left')
		play_button.onclick = function(){
		
		console.debug('Empieza desde aca'+this.parentNode.parentNode.id);
		Manager.playTaskById(this.parentNode.parentNode.id);

	};

		//Este boton es para sacar la tarea del composite
		var out_button = document.createElement('input');
		out_button.type = "button";
		out_button.value = "O";
		out_button.classList.add('tesisunlp_button_left');

		out_button.onclick = function(e){
			//console.debug(e.target.parentNode.parentNode.id);
			var task = localStorageManager.getObject(e.target.parentNode.parentNode.id);
			var composite_id = task.group.value;
			
			task.group.value = 0;

			localStorageManager.setObjectR(JSON.stringify(task));
			//Le saco el id de la tarea, siempre tiene que estar
			var c_task = localStorageManager.getObject(composite_id);
			
			console.debug('saco saco saco');
			console.debug(composite_id);
			console.debug(c_task.value.value.split(','));
			
			var array_tasks = c_task.value.value.split(',');
			var index = array_tasks.indexOf(e.target.parentNode.parentNode.id);
			
			if (index > -1) {
			    array_tasks.splice(index, 1);
			}

			console.debug(array_tasks);
			console.debug('saco saco saco');
			//Y la saco de la tarea compuesta
			c_task.value.value = array_tasks.join();
			localStorageManager.setObjectR(JSON.stringify(c_task));

			Recorder.refresh();
		}


		//var id_text = document.createTextNode(id+' - ');
		var br = document.createElement('br');
		//td2.appendChild(id_text);
		td2.appendChild(p_text);
		//td2.appendChild(br);	
		td2.appendChild(edit_button);
		td2.appendChild(out_button);
		td2.appendChild(state_button);
		td2.appendChild(play_button);

		//Este boton va solo en los composites

		if(task.type == 'ComposedTask'){
				td2.appendChild(show_button);	
		};
		


		tr.appendChild(td2);
		}

	,writer: function(id,text,index){

		var table_consola = document.getElementById("table_consola");

        var tr = document.getElementById('table_consola').insertRow(index);
        tr.id = id;

        //Trae uno solo
        var task = localStorageManager.getObject(id);
        //Como es asincrono tengo que hacerlo dentro de un callback
     	
     	//if(task.type == 'ComposedTask') console.debug('uso otro writer');
     	//if(task.group.value == 1) console.debug('no hago nada');
 
        //Si la tarea se ejecuto ( estado 1 ), se pone verde
        if(task.state.value == 1 )  tr.style.backgroundColor = 'green';
        //if(task.group.value == 1 )  tr.style.display = 'none';//tr.classList.add('tr_composite');
        	
		
		//Hardcodeado!!!!
	    var pTask = document.createTextNode(text + 'Task - id:'+tr.id);
	    var spTask = document.createElement('span');
	    spTask.setAttribute('style', 'font-size: 10px'); 
	    spTask.appendChild(pTask);
	    
	    var td1 = document.createElement('td');
	    td1.style.visibility = "hidden";
	    
	    var td2 = document.createElement('td');
	    if(task.group.value == 1 )
        	td2.classList.add('ident_composite');
        
		//add br
		
		var br = document.createElement("br");
	 	var text1 = document.createTextNode(id+' - '+text);

	 	var text_type = document.createTextNode(task.type);
	 	var span_type = document.createElement('span');
	 	span_type.style.fontSize = '10px';
	 	span_type.appendChild(text_type);

	 	var p_text = document.createElement("p");
	 	
	 	p_text.classList.add('task_title_style');
	 	p_text.appendChild(text1);
		p_text.appendChild(br);
		p_text.appendChild(span_type);

	    var delete_button = document.createElement('input');
		delete_button.type = "button";
		delete_button.value = "Delete";
		delete_button.classList.add('tesisunlp_button_left');

		delete_button.onclick = function(x){ 

			//if(confirm('Desea borrar el regitro?')){
			var id = this.parentNode.parentNode.id;
			var row = this.parentNode.parentNode.sectionRowIndex;
			document.getElementById('table_consola').deleteRow(row);
			localStorageManager.removeElement(id);
			//}
		};

		var edit_button = document.createElement('input');
		edit_button.type = "button";
		edit_button.value = "Edit";
		edit_button.classList.add('tesisunlp_button_left')
		edit_button.onclick = function(){
			//Add Listener to move de edit box
			addListenersEditBox();
			Recorder.editRow(this);
		};

	var state_button = document.createElement('input');
		state_button.type = "button";
		state_button.value = "P/D";
		state_button.classList.add('tesisunlp_button_left')
		state_button.onclick = function(){
		
		var task = localStorageManager.getObject(this.parentNode.parentNode.id);
		if( task.state.value == 1 ){
		task.state.value = 0;
		}else{
		task.state.value = 1;
		}
		localStorageManager.setObjectR(JSON.stringify(task));
		
		Recorder.refresh();
		
		};

	var show_button = document.createElement('input');
		show_button.type = "button";
		show_button.value = "show";
		show_button.classList.add('tesisunlp_button_left')
		show_button.onclick = function(){
		
		if(this.value == "show"){
			this.value = "hide";
		}else{
			this.value = "show";
		};


	
		//console.debug(this.parentNode.parentNode.id);
		//var el = document.getElementById(this.parentNode.parentNode.id);

		//Este comportamiento va al manager o RConsole
		var task = localStorageManager.getObject(this.parentNode.parentNode.id);
		//console.debug(tasks);
		//por ahora esta separado por comas
		var arr_id_tasks = task.value.value.split(',');
		//console.debug(arr_id_tasks);
		for(var i = 0;i < arr_id_tasks.length;i++){
		
		//oculto la tarea //Por ahora idento
		var inner_el = document.getElementById(arr_id_tasks[i]);
		
		if(inner_el.style.display == 'none'){
			inner_el.style.display ='';
			//inner_el.firstChild.classList.add('ident_composite');
			
		}else{
			inner_el.style.display ='none';
			//inner_el.firstChild.classList.add('ident_composite');
		}	

		} 

		};

	var play_button = document.createElement('input');
		play_button.type = "button";
		play_button.value = ">";
		play_button.classList.add('tesisunlp_button_left')
		play_button.onclick = function(){
		
		console.debug('Empieza desde aca'+this.parentNode.parentNode.id);
		Manager.playTaskById(this.parentNode.parentNode.id);

		};

		var task = localStorageManager.getObject(id);

		//Le agrego una condicion, si es TableManager (Esto lo tengo que desacoplar de aca, cada tarea le dice que boton agregar)
		var conf_button = document.createElement('input');
		conf_button.type = "button";
		conf_button.value = "conf";
		conf_button.classList.add('tesisunlp_button_left')
		conf_button.onclick = function(){
		//console.debug('Empieza desde aca'+this.parentNode.parentNode.id);
		//Manager.playTaskById(this.parentNode.parentNode.id);
		    
            var oTask = construct(window[task.type]);
            oTask.instanciamela(task);//.execute();
            oTask.conf();

		}

		//var id_text = document.createTextNode(id+' - ');
		var br = document.createElement('br');
		//td2.appendChild(id_text);
		td2.appendChild(p_text);
		//td2.appendChild(br);	
		td2.appendChild(edit_button);
		td2.appendChild(delete_button);
		td2.appendChild(state_button);
		td2.appendChild(play_button);
		
		if(task.type == 'TableManagerTask'){ 
			td2.appendChild(conf_button);
		}
		//Este boton va solo en los composites

		if(task.type == 'ComposedTask'){
				td2.appendChild(show_button);	
		};
		
		tr.appendChild(td2);
		}
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
		/*tr.addEventListener("dblclick",function(){
			Recorder.editRow(this);
		} ,false);
		*/
	 	var text1 = document.createTextNode(text);
	    var delete_button = document.createElement('input');
		delete_button.type = "button";
		delete_button.value = "X";
		delete_button.setAttribute('class','tesisunlp_button');

		delete_button.onclick = function(x){ 

			//if(confirm('Desea borrar el regitro?')){
			var id = this.parentNode.parentNode.id;
			var row = this.parentNode.parentNode.sectionRowIndex;
			document.getElementById('table_consola').deleteRow(row);
			localStorageManager.removeElement(id);
			//}
		};

		var edit_button = document.createElement('input');
		edit_button.type = "button";
		edit_button.value = "E";
		edit_button.setAttribute('class','tesisunlp_button');
		edit_button.onclick = function(){
		Recorder.editRow(this);
		};

	var state_button = document.createElement('input');
		state_button.type = "button";
		state_button.value = "S";
		state_button.setAttribute('class','tesisunlp_button');
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
	       if (elm.hasAttribute('id') && false) { //no estra nunca a este if
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
	       } else if (elm.hasAttribute('class') && false) { //Tampoco entra aca 
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
