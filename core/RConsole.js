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
  		//console.debug(array_area);
  		var texto = document.createTextNode(localStorage.getItem("SHARED_DATA"));
		//visibility: hidden;
  		//div_show_pocket.style.cssText="position:absolute;width:auto;height:auto;top:30%;left:50%;margin-top:-100px;margin-left:-100px;background-color:rgb(225, 218, 185);border: solid black;";
		div_show_pocket.setAttribute('class','tesisunlp_div_show_pocket');
		div_show_pocket.appendChild(texto);
		var bClose = document.createElement('input');
		bClose.type = 'button';
		bClose.value = 'x';
		//bClose.style.cssText = "position:absolute;float:right;top:0;right:0;";
		bClose.setAttribute('class','tesisunlp_close_button');
		bClose.onclick = function(){
			var el = document.getElementById('id_show_pocket');
 				el.parentNode.removeChild(el);
		}
		div_show_pocket.appendChild(bClose);
		

		var bClear = document.createElement('input');
		//bClear.type = 'button';
		bClear.type = 'image';
		//bClear.src = 'clear.png';

		//bClear.src = 'http://s13.postimg.org/ngpmrmhkj/clear.png';
		bClear.src = 'http://raw.githubusercontent.com/guiles/unlptesis/master/images/clear.png';
		bClear.value = 'clear';
		bClear.onclick = function(){
			localStorageManager.clearPocket();
		}
		div_show_pocket.appendChild(bClear);
		body.appendChild(div_show_pocket);

	    }

	return aButton;
	}
	,showAddPrimitiveTask: function(){

			var div_p_task = document.createElement("div");
			div_p_task.id="div_p_task";
			div_p_task.classList.add("div_p_task_style");
			var sAddTask = document.createElement('select');
			sAddTask.className = "tesisunlp_button";
			var aOptions=['Add Primitive Task','FillInput','TextArea','ClickInput','ClickLink','SelectOption'];
			for (j = 0; j < aOptions.length; j = j + 1) {
				opt = document.createElement('option');
				opt.value = j;
				if(j===0){opt.disabled = true;opt.selected = true;} 
				opt.innerHTML = aOptions[j];
				sAddTask.appendChild(opt);
			}
			var text = document.createTextNode("Primitive Tasks");
			var p = document.createElement("p");
			p.appendChild(text);
			div_p_task.appendChild(p);
			div_p_task.appendChild(sAddTask);
			var hr = document.createElement("hr");
			div_p_task.appendChild(hr);
			var attr = {};
			var close = this.createButton('Close','close_submit',attr);
			close.onclick  = function(){
				var el = document.getElementById('div_p_task');
 				el.parentNode.removeChild(el);
			}
			//div_p_task.appendChild(add);
			div_p_task.appendChild(close);
			
			//iStop_recorder.addEventListener("click", Recorder.clickStop , false); 
			
			sAddTask.addEventListener("change", Recorder.addPrimitiveTask , false); 	

			var container_header = document.getElementById("consola_header");
			container_header.appendChild(div_p_task);

			return div_p_task;		

	}
	,showAddAugmentedTask: function(){

			var div_a_task = document.createElement("div");
			div_a_task.id="div_a_task";
			div_a_task.classList.add("div_a_task_style");
			var sAddTask = document.createElement('select');
			sAddTask.className = "tesisunlp_button";
			var aOptions=['Add Augmented Task','DataCol.','HighLig.','Suma','Notas','Concat','Comp.'];
			for (j = 0; j < aOptions.length; j = j + 1) {
				opt = document.createElement('option');
				opt.value = j;
				if(j===0){opt.disabled = true;opt.selected = true;} 
				opt.innerHTML = aOptions[j];
				sAddTask.appendChild(opt);
			}
			var text = document.createTextNode("Augmented Tasks");
			var p = document.createElement("p");
			p.appendChild(text);
			div_a_task.appendChild(p);
			div_a_task.appendChild(sAddTask);
			var hr = document.createElement("hr");
			div_a_task.appendChild(hr);
			var attr = {};
			var close = this.createButton('Close','close_submit',attr);
			close.onclick  = function(){
				var el = document.getElementById('div_a_task');
 				el.parentNode.removeChild(el);
			}
			//div_a_task.appendChild(add);
			div_a_task.appendChild(close);
			
			//iStop_recorder.addEventListener("click", Recorder.clickStop , false); 
			
			sAddTask.addEventListener("change", Recorder.addAugmentedTask , false); 	

			var container_header = document.getElementById("div_consola");
			container_header.appendChild(div_a_task);

			return div_a_task;		

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
	//div_add_aug_container.style.cssText="padding: 10px;visibility: hidden;position:absolute;width:200px;height:auto;top:30%;left:50%;margin-top:-100px;margin-left:-100px;background-color:rgb(225, 218, 185);border: solid black;";
	//div_editor_container.style.cssText="position:absolute;width:200px;height:200px;top:20%;left:50%;margin-top:-100px;margin-left:-100px;background-color:red";
	div_add_aug_container.style.visibility = "hidden";

	var div_add_aug_header = document.createElement("div");	
	div_add_aug_header.id = "div_add_aug_header";
	//div_add_aug_header.style.cssText="";
	//div_add_aug_header.style.visibility = "hidden";

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
        //console.debug(option_aug_el);
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
	//div_add_container.style.cssText="visibility: hidden;position:absolute;width:200px;height:auto;top:30%;left:50%;margin-top:-100px;margin-left:-100px;background-color:rgb(225, 218, 185);border: solid black;";
	//div_editor_container.style.cssText="position:absolute;width:200px;height:200px;top:20%;left:50%;margin-top:-100px;margin-left:-100px;background-color:red";
	div_add_container.style.visibility = 'hidden';

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
	//div_editor_container.style.cssText="padding: 10px;visibility: hidden;position:absolute;width:auto;height:auto;top:30%;left:50%;margin-top:-100px;margin-left:-100px;background: #A2AFA0;border: solid #A2AFFF;";
	div_editor_container.setAttribute('class','tesisunlp_div_editor_container');
	//div_editor_container.style.cssText="position:absolute;width:200px;height:200px;top:20%;left:50%;margin-top:-100px;margin-left:-100px;background-color:red";
	//overflow:scroll;z-index: 300;position:fixed;left: 0px;width:auto;height: 100%;border:solid 1px #e1e1e1;vertical-align: middle;background: #A2AFA0;text-align:center;";

	var div_editor_header = document.createElement("div");	
	div_editor_header.id = "div_editor_header";
	div_editor_header.style.cssText="";

	var el_hr = document.createElement('hr');
	
    var header_title = document.createTextNode('Task Editor');
	//Creo un boton para mover con facilidad el Editor
	var mov = document.createElement("input");
	mov.type = "button";
	mov.id = "g_move_edit_box";
	mov.value = "^";

	div_editor_header.appendChild(mov);	
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
    
    //div_consola.style.visibility = "hidden";
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
	,createImageButton: function(aValue,anId,src){

		var aButton = document.createElement("input");	
	    aButton.setAttribute('type','image');
	    aButton.setAttribute('value',aValue);
	    aButton.setAttribute('id',anId);
		aButton.setAttribute('src',src);
		aButton.setAttribute('title',anId);
/*
	      for (var attr in attributes) { 
	      aButton.setAttribute(attr,attributes[attr]);  
	      }*/

	return aButton;
	} 
	//Temp 
	,downloadProcedure: function (filename, text) {
		  var pom = document.createElement('a');
		  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		  pom.setAttribute('download', filename);
		  
		  // Append anchor to body.
		  document.body.appendChild(pom)
		  pom.click();
		  document.body.removeChild(pom)

	}
	,createExportButton: function(){
		////console.debug('1. crea boton Stop');
		var b_export = document.createElement("input");	
	    b_export.setAttribute('type','button');
	    b_export.setAttribute('value','E');
	    b_export.setAttribute('class','tesisunlp_button');
	    b_export.setAttribute('id','g_b_export');
		//s_import.addEventListener("click", Recorder.import , false); 
		b_export.onclick = function(){
			

	        var p = document.getElementById('procedures_select').value;
 	      	var bpm = JSON.parse(localStorage.getItem("BPM") );
 	      	var shared_data = JSON.parse(localStorage.getItem("SHARED_DATA") );
 	      	var data_export = {'BPM':bpm[p],'SHARED_DATA':shared_data};

 	      	//Exporta el procedimiento actual junto con el shared_data
	      	RConsole.downloadProcedure('test.json',JSON.stringify( data_export ) );
			
		}
		return b_export;
	 }
	,createShowImportButton: function(){
		////console.debug('1. crea boton Stop');
		var s_import = document.createElement("input");	
	    s_import.setAttribute('type','button');
	    s_import.setAttribute('value','I');
	    s_import.setAttribute('class','tesisunlp_button');
	    s_import.setAttribute('id','g_s_import');
		//s_import.addEventListener("click", Recorder.import , false); 
		s_import.onclick = function(){
			
			var el = document.getElementById('g_import');
			//el.hidden = false ;
			el.hidden = (el.hidden)? false :  true; 
		}
		return s_import;
	 }

	,createImportButton: function(){
		////console.debug('1. crea boton Stop');
		var b_import = document.createElement("input");	
	    b_import.setAttribute('type','file');
	    b_import.hidden = true;
	    //b_import.setAttribute('value','I');
	    b_import.setAttribute('id','g_import');
		b_import.addEventListener("change", Recorder.importProcedure , false); 
		
		return b_import;
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
		//var iPlay_recorder = this.createButton('Play','play_procedure',null);
		var iPlay_recorder = this.createImageButton('Play','play_procedure','play.png');
		//iPlay_recorder.className = "tesisunlp_button";
		iPlay_recorder.title = "Play procedure";
		//iPlay_recorder.src = 'http://s30.postimg.org/yofdl7bal/play.png';
		iPlay_recorder.src = 'http://raw.githubusercontent.com/guiles/unlptesis/master/images/play.png';
		
		iPlay_recorder.addEventListener("click", Recorder.clickPlay , false); 
		return iPlay_recorder;
	 }
	 ,createRecordButton: function(){

		////console.debug('3. crea boton Record');
		var iRecord_recorder = this.createImageButton('Record','start_record','record.png');
		iRecord_recorder.addEventListener("click",Recorder.clickRecord, false); 
		//iRecord_recorder.className = "tesisunlp_button";
		iRecord_recorder.title = "Start Record Procedure";
		//iRecord_recorder.src = 'http://s27.postimg.org/6chig4jb3/record.png';
		iRecord_recorder.src = 'http://raw.githubusercontent.com/guiles/unlptesis/master/images/record.png';
		
		return iRecord_recorder;
	 }
	 ,createClearButton: function(){
	 	////console.debug('4. crea boton Clear');
		//var clear = this.createImageButton('CLR','clear','http://s13.postimg.org/ngpmrmhkj/clear.png');
		var clear = this.createImageButton('CLR','clear','http://raw.githubusercontent.com/guiles/unlptesis/master/images/clear.png');
		//clear.className = "tesisunlp_button";
		clear.onclick = function(){

		localStorageManager.clear();	
		
        document.getElementById("table_consola").innerHTML = "";
		}; 
		return clear;
	 }
	 ,createShowSharedButton: function(){
	 	//var shared_button = this.createImageButton('SHD','shared_data','http://s8.postimg.org/fya7herkh/shared.png');
		var shared_button = this.createImageButton('SHD','shared_data','http://raw.githubusercontent.com/guiles/unlptesis/master/images/shared.png');
		
		shared_button.onclick = function(){
			Recorder.mostrarPocket();
		}; 
		return shared_button;
	 }
	 ,refreshProceduresSelect:function(){
	 	var el = document.getElementById('procedures_select');
			el.innerHTML = '';
		var aOptions = localStorageManager.getPrceduresKeys();
		for (j = 0; j < aOptions.length; j = j + 1) {
			opt = document.createElement('option');
			opt.value = aOptions[j];
			opt.innerHTML = aOptions[j];
			el.appendChild(opt);
		}
			opt = document.createElement('option');
			opt.value = 'P0';
			opt.innerHTML = 'Add';
			el.appendChild(opt);
			/**/	
	 } 
	 ,createRemoveProcedureButton: function(){
	 	var remove_procedure = this.createImageButton('DEL','delete_procedure','http://raw.githubusercontent.com/guiles/unlptesis/master/images/delete.png');
		
		remove_procedure.onclick = function(){
		
			if(confirm('Desea eliminar el procedimiento?')){
			var el = document.getElementById( "procedures_select" );
			var proc = el.options[ el.selectedIndex ].value;

				localStorageManager.removeProcedure(proc);
				RConsole.refreshProceduresSelect();
				Recorder.refresh();
			}	
	 	}
	 	return remove_procedure;
	 },createShowLocalStorageButton: function(){
		var load = document.createElement('input');
		//load.className = "tesisunlp_button";
		load.type = "image";
		//load.src = "ls.png";
		//load.src = 'http://s23.postimg.org/j9db6rcc7/image.png';
		load.src = 'http://raw.githubusercontent.com/guiles/unlptesis/master/images/ls.png';
		load.classList.add("loadButton");
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

								};
	     return load;
		 }
		,createSelectPrimitiveTasks: function(){
			var div_p_task = document.createElement("div");
			div_p_task.id="div_p_task";
			div_p_task.classList.add("div_p_task_style");
			var sAddTask = document.createElement('select');
			sAddTask.className = "tesisunlp_button";
			var aOptions=['Add Augmented Task','DataCol.','HighLig.','Suma','Notas','Concat','Comp.'];
			for (j = 0; j < aOptions.length; j = j + 1) {
				opt = document.createElement('option');
				opt.value = j;
				if(j===0){opt.disabled = true;opt.selected = true;} 
				opt.innerHTML = aOptions[j];
				sAddTask.appendChild(opt);
			}
			var text = document.createTextNode("Augmented Tasks");
			var p = document.createElement("p");
			p.appendChild(text);
			div_p_task.appendChild(p);
			div_p_task.appendChild(sAddTask);
			var hr = document.createElement("hr");
			div_p_task.appendChild(hr);
			var attr = {};
			var add = this.createButton('Confirm','add_submit',attr);
			add.onclick  = function(){
			div_p_task.style.display = "none";
				
			}
			var close = this.createButton('Close','close_submit',attr);
			close.onclick  = function(){
			div_p_task.style.display = "none";
				
			}
			//div_p_task.appendChild(add);
			div_p_task.appendChild(close);
			
			//iStop_recorder.addEventListener("click", Recorder.clickStop , false); 
			
			sAddTask.addEventListener("change", Recorder.addPrimitiveTask , false); 	

			return div_p_task;		
		}
	 ,createaddTasksSelect: function(){

		////console.debug('5. crea Select Tasks');
		var sAddTask = document.createElement('select');
		sAddTask.className = "tesisunlp_button";
		//sAddTask.style.visibility = "hidden";
	 	
		sAddTask.setAttribute('id','add_task');
	 	var j;
	 	/** 29-05-2015 **/

	 	/*var aOptions=['Add Task','DataCol.','HighLig.','Suma','Notas','Concat','Comp.'];
		for (j = 0; j < aOptions.length; j = j + 1) {
			opt = document.createElement('option');
			opt.value = j;
			if(j===0){opt.disabled = true;opt.selected = true;} 
			opt.innerHTML = aOptions[j];
			sAddTask.appendChild(opt);
		}*/
		
		var aOptions=['Add Task','Primitive','Augmented'];
		for (j = 0; j < aOptions.length; j = j + 1) {
			opt = document.createElement('option');
			opt.value = j;
			if(j===0){opt.disabled = true;opt.selected = true;} 
			opt.innerHTML = aOptions[j];
			sAddTask.appendChild(opt);
		}

		//sAddTask.addEventListener("change", Recorder.addPrimitiveTask , false); 

		sAddTask.addEventListener("change", Recorder.addTypeTask , false); 

		return sAddTask;
	 }
	 ,createProceduresSelect: function(){

		var sProcedures = document.createElement('select');
		sProcedures.className = "tesisunlp_button";
		
		sProcedures.setAttribute('id','procedures_select');
	 	var j;
	 	 
		var aOptions = localStorageManager.getPrceduresKeys();
		for (j = 0; j < aOptions.length; j = j + 1) {
			opt = document.createElement('option');
			opt.value = aOptions[j];
			opt.innerHTML = aOptions[j];
			sProcedures.appendChild(opt);
		}
			opt = document.createElement('option');
			opt.value = 'P0';
			opt.innerHTML = 'Add';
			sProcedures.appendChild(opt);
		
		sProcedures.addEventListener("change", function(){ 
			
			var proc = document.getElementById('procedures_select').value;
		  	localStorageManager.setCurrentProc(proc);
		  	Recorder.refresh();
		} , false); 

		sProcedures.addEventListener("change", function(e){ 
			
			var option =  e.target.options[e.target.options.selectedIndex].value ;
			if(option!=='P0') return false;
			localStorageManager.addProcedure();
			RConsole.refreshProceduresSelect();
			/**focus ultimo elemento agregado*/
			/***/
		} , false);
		return sProcedures;
	 }
	 ,createHeaderContainer: function(){
		////console.debug('7. Crea el div consola');		
		var div_consola = document.createElement("div");
			div_consola.id = "div_consola";		
			//div_consola.style.cssText = "overflow:scroll;z-index: 300;position:fixed;left: 0px;width:auto;height: 100%;border:solid 1px #e1e1e1;vertical-align: middle;background: #A2AFA0;"; //text-align:center;
			div_consola.setAttribute('class','tesisunlp_div_consola');
			div_consola.style.visibility = "hidden";
		
			//var hr_el = document.createElement("hr");
			//div_consola.appendChild(hr_el);	
		
		return div_consola;

	 }
	 ,createContain:function(){
			
		var div_contain = document.createElement("div");
			//div_contain.id = "div_consola";		
			//div_consola.style.cssText = "overflow:scroll;z-index: 300;position:fixed;left: 0px;width:auto;height: 100%;border:solid 1px #e1e1e1;vertical-align: middle;background: #A2AFA0;"; //text-align:center;
			div_contain.setAttribute('class','contain');
			
		return div_contain;		 	
	 }
	 ,createHeader: function(){
	 	////console.debug('8. Crea el div consola header');
		var div_consola_header = document.createElement("div");
		div_consola_header.id = "consola_header"
    	div_consola_header.classList.add('consola_header_style');

		//var hr_el = document.createElement("hr");
		//	div_consola_header.appendChild(hr_el);	
		
		return div_consola_header;
	 }
	 ,createTableContainer: function(){
	 	////console.debug('9. Crea el div consola table');
		var div_table_consola = document.createElement("div");
		div_table_consola.id =  "div_table_consola";
		div_table_consola.classList.add('aParent');
		div_table_consola.classList.add('margen_tabla');
		
		//div_table_consola.class = "Table";
		return div_table_consola;
	 }
	 ,createTable: function(){ //Creo con divs
		////console.debug('10. Crea la tabla contenedora de la consola');
		var table_consola = document.createElement("table")
		//var table_consola = document.createElement("div") --> Para cuando sepa lo del drag and drop
		
		table_consola.id = "table_consola"
		//table_consola.style.cssText = "min-width:auto;font-family: Helvetica,Arial; font-size: 16px";
		//table_consola.setAttribute('class','tesisunlp_table_consola');
		table_consola.class = "Table";
		table_consola.classList.add("table_consola_style")

		//	var hr_el = document.createElement("hr");
		//	table_consola.appendChild(hr_el);	
		
		return table_consola;
	 }
	 ,createShowHide: function(){

	//console.debug('14. crea el div para la solapa show/hide');
	//Agrego la solapa para mostrar/ocultar
	var div_pestana = document.createElement("div");
	div_pestana.id =  "div_pestana"; 
	//div_pestana.style.cssText = "display: inline-block;background: #37abc8;opacity: 0.67;position: fixed;right: 0;bottom: 3.2em;z-index: 100;font-size: 14px;font-family: Helvetica, arial, freesans, clean, sans-serif;" ;
	//div_pestana.style.cssText = "display: inline-block;background: #A2AFA0;position: fixed;right: 0;bottom: 3.2em;z-index: 100;font-size: 14px;font-family: Helvetica, arial, freesans, clean, sans-serif;" ;
	div_pestana.setAttribute('class','tesisunlp_div_pestana');
	var input_label = document.createElement("input");
	input_label.type = "button";
	//input_label.style.cssText = "background-color: #A2AFA0; border: 0; border-radius: 2px; color: #fff; font-size: 12px; font-weight: 700; padding: 10px 30px 11px; text-transform: uppercase;vertical-align: bottom;";
	//input_label.style.cssText = "background-color: #A2AFA0; border: 0; border-radius: 2px; color: black; font-size: 11px; font-weight: 700; padding: 10px 30px 11px; text-transform: uppercase;vertical-align: bottom;";
	input_label.setAttribute('class','tesisunlp_input_label');
	input_label.value ="show/hide Console";
	input_label.id ="toc-label";
	input_label.onclick = function(){ 

	var div_consola = document.getElementById('div_consola');
	var body   = document.body || document.getElementsByTagName('body')[0];

	   if(div_consola.style.visibility=='visible'){
	   	RConsole.hideConsola();
		}else{
		RConsole.showConsola();
		}
	};

	div_pestana.appendChild(input_label);

	return div_pestana;
	 }
	 ,showConsola: function(){
	 	var div_consola = document.getElementById('div_consola');
		var body   = document.body || document.getElementsByTagName('body')[0];
		div_consola.style.visibility = "visible";
		body.style.marginLeft = "355px";
	
	 }
	 ,hideConsola: function(){
	 	var div_consola = document.getElementById('div_consola');
		var body   = document.body || document.getElementsByTagName('body')[0];
		div_consola.style.visibility = "hidden";
		body.style.marginLeft = "";
	
	 }
	 ,init: function(){

	 	//var stopButton = this.createStopButton();
	 	var playButton = this.createPlayButton();
	 	var recordButton = this.createRecordButton();
	 	var clearButton = this.createClearButton(); 
	 	var addTaksSelect = this.createaddTasksSelect();
	 	var loadButton = this.createShowLocalStorageButton();
		var pocketButton = this.createShowSharedButton();
		
		//var mostrarPocket = this.mostrarPocket('M','mpocket_id','')
		var div_wrapper = document.createElement("div");

		var container = this.createHeaderContainer();
		
		var show_hide = this.createShowHide();
		
		var container_header = this.createHeader();
		var table_console_container = this.createTableContainer();
		var table_console = this.createTable();
		var editor_container = this.createEditionContainer();
		var add_container = this.createAddContainer();
	 	var add_aug_container = this.createAddAugContainer();
	 	var procedures_select = this.createProceduresSelect();
	 	var del_proc_button = this.createRemoveProcedureButton();
	 	var import_proc_button = this.createImportButton();
		var show_import_button = this.createShowImportButton();
	 	var export_button = this.createExportButton();
	 	//console.debug(import_proc_button);
	 	//container_header.appendChild(stopButton);
	 	var contain_first = this.createContain();
	 	contain_first.appendChild(recordButton);
		contain_first.appendChild(playButton);
	 	contain_first.appendChild(clearButton);
	 	contain_first.appendChild(addTaksSelect);
		//container_header.appendChild(contain_first);
		
		var contain_two = this.createContain();
	 	
	 	contain_two.appendChild(procedures_select);
	 	contain_two.appendChild(del_proc_button);

		var contain_pocket = this.createContain();

 	 	contain_pocket.appendChild(pocketButton);

	 	//container_header.appendChild(contain_pocket);
		
		div_wrapper.appendChild(contain_first);
		div_wrapper.appendChild(contain_two);


		
		container_header.appendChild(div_wrapper);
	//parche
	var br = document.createElement("br");
	container_header.appendChild(br);

		var contain_three = this.createContain();
		contain_three.appendChild(loadButton);
		contain_three.appendChild(show_import_button);
		contain_three.appendChild(export_button);
		contain_three.appendChild(import_proc_button);
	 	container_header.appendChild(contain_three);
		container_header.appendChild(contain_pocket);
	 	var hr_el = document.createElement("hr");
			//container_header.appendChild(br);	
		
		//table_console_container.appendChild(br);
		table_console_container.appendChild(table_console);
		//container.appendChild(hr_el);
		container.appendChild(container_header);
		//
		container.appendChild(table_console_container);
		

	 	var body   = document.body || document.getElementsByTagName('body')[0];
	 	
	 	//if( !inIframe() ) {
		if(window.self === window.top){
		if (document.body.firstChild){
		      document.body.insertBefore(container, document.body.firstChild);
		      
		    }else{
		      document.body.appendChild(container);

		}
	//var div_p_task = this.createSelectPrimitiveTasks();
	//console.debug(div_p_task);
	//	container_header.appendChild(div_p_task);

		body.appendChild(editor_container);
		body.appendChild(add_container);
		body.appendChild(add_aug_container);
	 	body.appendChild(show_hide); 
    	//body.style.marginLeft = "500px";
    	}

	 }
}


  
