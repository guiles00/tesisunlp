var  logHandler = function(e) { 
			console.debug('Evento Capturado '+e.target.nodeName);
			console.debug(e.target);
		};

//=========================RConsole====================
var  handlerPocket = function(e) { 
			console.debug(e.target.nodeName);
			//Si toque el boton que no haga nada
			if(e.target.nodeName == 'INPUT') return false;
			if (window.getSelection) {
          	selection = window.getSelection();
          	console.debug('en getSelection');
        	} else if (document.selection) {
          	selection = document.selection.createRange();
          	console.debug('en createRange');
        	}

			if(selection.toString().length != 0){

				if(confirm('Guardar: '+selection.toString()+'?')){
					localStorageManager.saveObject(selection.toString());
					selection = '';
					var elButton = document.getElementById('pocket_id'); 
				}		
			} 
		};

//=================================================================
window.onbeforeunload = function(e) {
  //console.debug('Se fue de la pagina');
};

var  handlerPocketEvent = function(e) { 
			console.debug(e.target.nodeName);
			//Si toque el boton que no haga nada
			if(e.target.nodeName == 'INPUT') return false;
			if (window.getSelection) {
          	selection = window.getSelection();
          	console.debug('en getSelection');
        	} else if (document.selection) {
          	selection = document.selection.createRange();
          	console.debug('en createRange');
        	}

			if(selection.toString().length != 0){
				
				var concept = prompt('Que dato Guardar','Concept');
				
				if(concept){

					localStorageManager.saveSharedData(concept,{'value':selection.toString()});
					//Agrego DataCollectionTask
					console.log('Add:'+selection.toString());
					
					Manager.addDataCollectionTask(selection.toString());
					selection = '';
				}		
			} 
		};


/**  
* Listener de eventos cuando cambia el foco, recolecta datos relacionados.
* @event eventoChange
*/

var eventoClick = function(event){
	//Si captura los eventos de la consola, sali!
	if( event.target.id == 'start_record' || event.target.id == 'stop_record' || event.target.id == 'play_procedure') return false; 

	//Hago switch, el que tiene mejor idea que me la pase

	switch(event.target.nodeName) {
		//Si hizo clic en un link
		case 'A':

		var tipo = 0;
		var el_id = event.target.id;
		var el_value = event.target.value;
		//Si tiene id le pongo el xPath //*[@id="THE_ID"]
		if(el_id){
		var sxPath = '//*[@id="'+el_id+'"]';
		}else{ //Si no tiene ID tengo que ver la manera de sacar el absoluto
		var sxPath = Recorder.createXPathFromElement(event.target) ;
		}
		var tipo = Object.create(TipoAttribute);
			tipo._type = TipoAttribute._type;
			tipo.setValue(1);
		var state = Object.create(StateAttribute);
			state._type = StateAttribute._type;
			state.setValue(0);		
		var xPath = Object.create(XPathAttribute);
		xPath._type = XPathAttribute._type;
		xPath.setValue(sxPath);
		var o_task = new ClickLinkTask(10,xPath,'',tipo,state);
		localStorageManager.insert(o_task.toJson());
		Recorder.refresh();


		break;
		//Si hizo clic en un input hay que ver que tipo de input
		case 'INPUT':

		var tipo = 0;
		var el_id = event.target.id;
		var el_value = event.target.value;
		//Si tiene id le pongo el xPath //*[@id="THE_ID"]
		if(el_id){
		var sxPath = '//*[@id="'+el_id+'"]';
		}else{ //Si no tiene ID tengo que ver la manera de sacar el absoluto
		var sxPath = Recorder.createXPathFromElement(event.target) ;
		}
		var tipo = Object.create(TipoAttribute);
			tipo._type = TipoAttribute._type;
			tipo.setValue(1);
		var state = Object.create(StateAttribute);
			state._type = StateAttribute._type;
			state.setValue(0);		
		var xPath = Object.create(XPathAttribute);
		xPath._type = XPathAttribute._type;
		xPath.setValue(sxPath);
		var o_task = new ClickInputTask(10,xPath,'',tipo,state);
		localStorageManager.insert(o_task.toJson());
		Recorder.refresh();
		
		break;
		//Si hizo clic en un input/button
		case 'BUTTON':

		var tipo = 0;
		var el_id = event.target.id;
		var el_value = event.target.value;
		//Si tiene id le pongo el xPath //*[@id="THE_ID"]
		if(el_id){
		var sxPath = '//*[@id="'+el_id+'"]';
		}else{ //Si no tiene ID tengo que ver la manera de sacar el absoluto
		var sxPath = Recorder.createXPathFromElement(event.target) ;
		}
		var tipo = Object.create(TipoAttribute);
			tipo._type = TipoAttribute._type;
			tipo.setValue(1);
		var state = Object.create(StateAttribute);
			state._type = StateAttribute._type;
			state.setValue(0);		
		var xPath = Object.create(XPathAttribute);
		xPath._type = XPathAttribute._type;
		xPath.setValue(sxPath);
		var o_task = new ClickInputTask(10,xPath,'',tipo,state);
		localStorageManager.insert(o_task.toJson());
		Recorder.refresh();
		
		break;
		
		default:
		break;
	}
	
/*
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

		var tipo = Object.create(TipoAttribute);
			tipo._type = TipoAttribute._type;
			tipo.setValue(1);

		var state = Object.create(StateAttribute);
			state._type = StateAttribute._type;
			state.setValue(0);		
		var xPath = Object.create(XPathAttribute);
		xPath._type = XPathAttribute._type;
		xPath.setValue(sxPath);
		
		var o_task = new ClickLinkTask(10,xPath,'',tipo,state);
		localStorageManager.insert(o_task.toJson());
		Recorder.refresh();

	}*/ 
}
/**
* @event
* eventoChange
* Registra los cambios en los elementos HTML
*/

var eventoChange = function(event){
		
		
		var location = document.location.href;
		var el_id = event.target.id;
		var el_value = event.target.value;
		var	o_task;

		if(el_id){
		var sxPath = '//*[@id="'+el_id+'"]';
		}else{
		var sxPath = Recorder.createXPathFromElement(event.target) ;
		}

		var tipo = Object.create(TipoAttribute);
			tipo._type = TipoAttribute._type;
			tipo.setValue(1);

		var state = Object.create(StateAttribute);
			state._type = StateAttribute._type;
			state.setValue(0);
		var xPath = Object.create(XPathAttribute);
			xPath._type = XPathAttribute._type;
			xPath.setValue(sxPath);
		var objValue = Object.create(SValueAttribute);
			objValue._type = SValueAttribute._type;		
			objValue.setValue(el_value);

		var pre = Object.create(Precondition).init(Object.create(UrlAttribute).init({'value':location}));	
				
		//Diferencio los tipos de nodos, ahi le envio el tipo de tarea que recolecto.
		switch(event.target.nodeName)
		{
		case 'SELECT':
			o_task = new SelectOptionTask(10,xPath,objValue,tipo,state);
	    break;
		case 'INPUT':
			if(event.target.type=='radio'){ 
				o_task = new RadioTask(10,xPath,objValue,tipo,state);
			}else if(event.target.type=='checkbox'){
				o_task = new CheckBoxTask(10,xPath,objValue,tipo,state);
			}else{
				o_task = new FillInputTask(10,xPath,objValue,tipo,state);//,taskTitle);
			}
		break;
	 	case 'TEXTAREA':
				o_task = new TextAreaTask(10,xPath,objValue,tipo,state);
		
        break;
		default:
			console.log('No se encontro Nodo');
		break;
		}
	
		//le paso las precondiciones por un setter
		o_task.setPrecondition(pre);

		localStorageManager.insert(o_task.toJson());
		Recorder.refresh();
		//console.debug(o_task);
		console.log('NodeName:'+event.target.nodeName+',id:'+event.target.id+',xPath:'+sxPath);
}
/*
var addInputTaskEvent = function(event){

		//var tipo = 0;
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
		//o_task.tipo = tipo;
		localStorageManager.insert(o_task.toJson());
		Recorder.refresh();
	document.removeEventListener("change", addInputTaskEvent, false); 


	}
}*/

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

