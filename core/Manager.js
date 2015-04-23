/**
 * Tesis Ing. Guillermo A. Caserotto
 * @module BPMA
*/
/*
 * Eventos que voy a tratar:
 * onChange: select, text, textarea
 * onClick: select, text, textarea --> en los botones de submit?
 * onFocus: select, text, textarea
 * onSelect: text, textarea
 */
 /**
 * @class Manager
 */
function procedureHandler(e){
        
    var indice = Manager.getIndice();           
    //console.debug(indice);
    //Si llego un finalizado incrementa indice
    Recorder.refresh();
    Manager.incrementIndice(); 
    Manager.executeNextTaskWithTimer();                     

console.log(
        "Ejecuto esta tarea y la da como finalizada "+e.currentTarget.nodeName+", "
        +e.detail.id+": "+e.detail.message
    );
    //refresco la consola
    
}



var Manager = (function () {
	"use strict";
    var currentPrimitiveTasks = []; //Array de las tareas a realizar cuando se ejecuta el Manager
    var primitiveTasks = ['FillInputTask','SelectOptionTask','TextAreaTask','CheckBoxTask']; //Un array de tareas que puede realizar
    var indice;
    var arr_tareas;
        /**
        * @method Subscribe
        */
        function subscribe(aPrimitiveTask){ //Este metodo por ahora solo agrega el objeto 
         currentPrimitiveTasks.push(aPrimitiveTask);
        }

        function createNotasTask(aId,xPath,value,aMsg,aTipo,aState){
         return new NotasTask(aId,xPath,value,aMsg,aTipo,aState);   
        }
        function createSumatoriaTask(aId,xPath,value,aMsg,aTipo,aState){
         return new SumatoriaTask(aId,xPath,value,aMsg,aTipo,aState);   
        }
        function createHighLightTask(aId,xPath,value,aMsg,aTipo,aState){
         return new HighLightTask(aId,xPath,value,aMsg,aTipo,aState);   
        }

        function createDataCollectionTask(aId,xPath,value,aMsg,aTipo,aState){
        return new DataCollectionTask(aId,xPath,value,aMsg,aTipo,aState);
        }
        /**
        * @method createUrlTask
        */
        function createUrlTask(aId,xPath,value,aMsg,aTipo,aState){
        return new UrlTask(aId,xPath,value,aMsg,aTipo,aState);
        }
        /**
        * @method createFillInputTask
        */
        function createFillInputTask(aId,xPath,value,aMsg,aTipo,aState,aTaskTitle){
            //console.debug('dentro de createFillInputTask');
            //console.debug(value);
            
        return  new FillInputTask(aId,xPath,value,aMsg,aTipo,aState,aTaskTitle);
        }
        /**
        * @method createSelectOptionTask
        */

        function createSelectOptionTask(aId,xPath,value,aMsg,aTipo,aState){
        return new SelectOptionTask(aId,xPath,value,aMsg,aTipo,aState);
        }
        /**
        * @method createTextAreaTask
        */
        function createTextAreaTask(aId,xPath,value,aMsg,aTipo,aState){
        return new TextAreaTask(aId,xPath,value,aMsg,aTipo,aState);
        }
        /**
        * @method createCheckBoxTask
        */
        function createCheckBoxTask(aId,xPath,value,aMsg,aTipo,aState){
        return new CheckBoxTask(aId,xPath,value,aMsg,aTipo,aState);
        }
        /**
        * @method createRadioTask
        */
        function createRadioTask(aId,xPath,value,aMsg,aTipo,aState){
        return new RadioTask(aId,xPath,value,aMsg,aTipo,aState);
        }
        /**
        * @method createClickLinkTask
        */
        function createClickLinkTask(aId,xPath,value,aMsg,aTipo,aState){
        return new ClickLinkTask(aId,xPath,value,aMsg,aTipo,aState);
        }
        /**
        * @method createClickLinkTask
        */
        function createClickInputTask(aId,xPath,value,aMsg,aTipo,aState){
        return new ClickInputTask(aId,xPath,value,aMsg,aTipo,aState);
        }
    	return {
        /**
        * @method incrementIndice
        */
		     incrementIndice: function(){
				this.indice = this.indice + 1;
		     }
        /**
        * @method getIndice
        */
		     ,getIndice: function(){
				return this.indice;
		     }
        /**
        * @method setIndice
        */     
		     ,setIndice:function(val){
		     	this.indice = val;	
		      }
        /**
        * @method getNextTask
        */       
           	,getNextTask : function(){ //Me trae la proxima tarea pendiente
           		//////console.debug("Trae la siguiente tarea");
           		////////console.debug(currentPrimitiveTasks.length);
           		var i;
            	for (i = 0;i < currentPrimitiveTasks.length;i=i+1){
            		   
                       
                       if(currentPrimitiveTasks[i].getState() === 0 ) { 
                return currentPrimitiveTasks[i]; 
                       }else{
                       	////////console.debug("Esto esta mal");
        						////////console.debug(i);
                       }
            	}
        	}
        /**
        * @method getNextTaskTimer
        */    
        	,getNextTaskTimer : function(){ //Me trae la proxima tarea pendiente
           		//////console.debug("Trae la siguiente tarea");
           		////////console.debug(currentPrimitiveTasks.length);

           		var i;
            	for (i = 0;i < currentPrimitiveTasks.length;i=i+1){
            		   
                       
                       if(currentPrimitiveTasks[i].getState() === 0 ) { 
                          return currentPrimitiveTasks[i]; 
                       }else{
                       	////////console.debug("Esto esta mal");
        			    ////////console.debug(i);
                       }
            	}
        	}
        /**
        * @method start
        */  
        	,start: function(n){
               
                var indice = n - 1 || 0;
		        console.debug('ejecuta desde:'+indice);
                Manager.setIndice(indice);

                  document.addEventListener('finalizado',procedureHandler,false);

                  var arr_tareas = Manager.getCurrentPrimitiveTasks();
                  console.debug(arr_tareas);
                  var indice = Manager.getIndice();
                  var task = arr_tareas[indice]; 
                  console.debug(task);
                  
                  task.execute();
                  //console.debug('ejecuto o no ejecuto?');
		          //Manager.executeNextTaskWithTimer();
        	}
        /**
        * @method clearCurrentPrimitiveTasks
        */       
        	,clearCurrentPrimitiveTasks: function(){
            currentPrimitiveTasks=[];
        	}
        /**
        * @method addPrimitiveTask
        */   //Manager.addPrimitiveTask(arr_ls[i].id,arr_ls[i].type,xPath,value,0,arr_ls[i].state);
        	,addPrimitiveTask : function(aId,aPrimitiveTaskType,xPath,value,tipo,state,taskTitle){
    		//Este metodo reemplaza al switch
	    	var lookup = 
	    	{ FillInputTask: createFillInputTask(aId,xPath,value,tipo,state,taskTitle)
	    	, SelectOptionTask: createSelectOptionTask(aId,xPath,value,tipo,state)
	    	, TextAreaTask: createTextAreaTask(aId,xPath,value,tipo,state)
	    	, CheckBoxTask: createCheckBoxTask(aId,xPath,value,tipo,state)
            , ClickLinkTask: createClickLinkTask(aId,xPath,value,tipo,state)
            , ClickInputTask: createClickInputTask(aId,xPath,value,tipo,state) 
            , UrlTask: createUrlTask(aId,xPath,value,tipo,state) 
            , DataCollectionTask: createDataCollectionTask(aId,xPath,value,tipo,state)             
            , HighLightTask: createHighLightTask(aId,xPath,value,tipo,state)
            , SumatoriaTask: createSumatoriaTask(aId,xPath,value,tipo,state)
            , NotasTask: createNotasTask(aId,xPath,value,tipo,state)
            } 
	    	, def = null ;

	    	lookup[aPrimitiveTaskType] ? subscribe(lookup[aPrimitiveTaskType]) : def();
		   }
           ,factoryTask : function(aId,aPrimitiveTaskType,xPath,value,tipo,state,taskTitle){
            //Este metodo reemplaza al switch
            var lookup = 
            { FillInputTask: createFillInputTask(aId,xPath,value,tipo,state,taskTitle)
            , SelectOptionTask: createSelectOptionTask(aId,xPath,value,tipo,state)
            , TextAreaTask: createTextAreaTask(aId,xPath,value,tipo,state)
            , CheckBoxTask: createCheckBoxTask(aId,xPath,value,tipo,state)
            , ClickLinkTask: createClickLinkTask(aId,xPath,value,tipo,state)
            , ClickInputTask: createClickInputTask(aId,xPath,value,tipo,state) 
            , UrlTask: createUrlTask(aId,xPath,value,tipo,state) 
            , DataCollectionTask: createDataCollectionTask(aId,xPath,value,tipo,state)             
            , HighLightTask: createHighLightTask(aId,xPath,value,tipo,state)
            , SumatoriaTask: createSumatoriaTask(aId,xPath,value,tipo,state)
            , NotasTask: createNotasTask(aId,xPath,value,tipo,state)
            } 
            , def = null ;

            return lookup[aPrimitiveTaskType] ;
           }
        /**
        * @method getCurrentPrimitiveTasks
        */  
        //Que me devuelva las que estan en estado 0, para ejectuar
        	,getCurrentPrimitiveTasks: function(){
        	return currentPrimitiveTasks;
        	}
            
            ,initCurrentPrimitiveTasks: function(){
               this.currentPrimitiveTasks = [];
               var tasks = localStorageManager.getCurrentTasks();
               return tasks;
            }
        /**
        * @method highlightElement
        */ 
            ,highlightElement: function(obj){

               var orig = obj.style.outline;
			   //obj.style.outline = "0.25em solid #FFFF00";
			   obj.classList.add("cssClass");
			   setTimeout(function(){
			   		obj.classList.remove("cssClass");
			   }, 1000);
			}
         
            ,hayTareas: function(){

            var a = localStorageManager.getCurrentTasks();
            ////console.debug('hay tareas?');
            ////console.debug(a);
            if(typeof a == "undefined"){
            ////console.debug('no, no hay');    
            return false;
            }
            
            for (var i = 0; i < a.length; i++) {
                if(a[i].state == 0){
                    return true;    
                }
            }
            return false;
            }
        
        /**
        * @method executeNextTaskWithTimer
        */
			,executeNextTaskWithTimer: function(){

            //Tiene que traer las tareas del localStorage
            var arr_tareas =  Manager.getCurrentPrimitiveTasks();
            //Esto hay que modificarlo, no me gusta como esta
            //Si el indice es igual( ya llego a ejecutar todas las tareas)

                setTimeout(
                    function () {    

                        var indice = Manager.getIndice();           
                        
                        
                        if(typeof arr_tareas[indice] == "undefined") {
                            //Asumo que finalizo el procedimiento
                            //Fijate un metodo que trae la siguiente tarea 
                            //La finalizacion del procedimiento pone en cero el estado y sale.    
                            
                            localStorageManager.setStopExecuting();
                            return false;
                        }
                        //siempre trae las tareas con estado 0, este if esta al pedo.
                     
                            var task = arr_tareas[indice]; 
                            task.execute();
                            
                            //Manager.incrementIndice(); 
                            //Manager.executeNextTaskWithTimer();                     

                    }

                , 1000);
            }
            ,playFromTask: function(n){

            //Tengo que para la ejecucion y empezar una nueva

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
        console.debug('y???');
        var i; //Recorro el array de tareas
        for (i=0;i < arr_ls.length ;i++){
            
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
        console.debug( Manager.getCurrentPrimitiveTasks() );
        Manager.start(n);

            }
            ,playTaskById: function(id){


            var task = localStorageManager.getObject(id);
            console.debug(task);
            
            //Instancio xPath y Value (wrappers de atributos)
            var xPath = Object.create(XPathAttribute); 
            xPath.setValue(task.xPath.value);
            var tipo = Object.create(TipoAttribute); 
            tipo.setValue(task.tipo.value);
            
            if(task.value._type == 'CValueAttribute'){ 
            var valor = Object.create(CValueAttribute); 
                valor.setValue(task.value.value);
            }else{
            var valor = Object.create(SValueAttribute); 
                valor.setValue(task.value.value);
            }
            
            //Manager.addPrimitiveTask(arr_ls[i].id,arr_ls[i].type,xPath,valor,tipo,arr_ls[i].state,arr_ls[i].taskTitle);
            //Creo el objeto tarea
            var oTask = Manager.factoryTask(task.id,task.type,xPath,valor,tipo,task.state,task.taskTitle);
            console.debug(oTask);
            oTask.execute();
            Recorder.refresh();
            return;   

            }

            ,init: function(){

             //Si esta ejecutando 
             //Este metodo es para inicializar el Manager y para que contemple todos los escenarios
            
            }
            ,addUrlTask: function(){


                var location = document.location.href;
                
                //var el_id = event.target.id;
                //var el_value = event.target.value;
                var o_task;

                var tipo = Object.create(TipoAttribute);
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
                    objValue.setValue(location);

                o_task = new UrlTask(10,xPath,objValue,tipo,state);
                o_task.setLocation(location);
                localStorageManager.insert(o_task.toJson());
                Recorder.refresh();

            }
            ,addDataCollectionTask: function(concept,data){


                //var el_id = event.target.id;
                //var el_value = event.target.value;
                var o_task;

                var tipo = Object.create(TipoAttribute);
                    tipo._type = TipoAttribute._type;
                    tipo.setValue(1);
                var state = Object.create(StateAttribute);
                    state._type = StateAttribute._type;
                    state.setValue(0);
                var xPath = Object.create(XPathAttribute);
                    xPath._type = XPathAttribute._type;
                    xPath.setValue('sxPath');
                var objValue = Object.create(CValueAttribute);
                    objValue._type = SValueAttribute._type;     
                    objValue.setValue('['+concept+']');
   
                o_task = new DataCollectionTask(10,xPath,objValue,tipo,state,null);
                o_task.setLocation(location);
                localStorageManager.insert(o_task.toJson());
                Recorder.refresh();

            }
            ,addHighLightTask: function(searchText){

                var o_task;

                var tipo = Object.create(TipoAttribute);
                    tipo._type = TipoAttribute._type;
                    tipo.setValue(1);
                var state = Object.create(StateAttribute);
                    state._type = StateAttribute._type;
                    state.setValue(0);
                var xPath = Object.create(XPathAttribute);
                    xPath._type = XPathAttribute._type;
                    xPath.setValue('sxPath');
                var objValue = Object.create(CValueAttribute);
                    objValue._type = SValueAttribute._type;     
                    objValue.setValue(searchText);
   
                o_task = new HighLightTask(10,xPath,objValue,tipo,state,null);
                o_task.setLocation(location);
                localStorageManager.insert(o_task.toJson());
                Recorder.refresh();

            },addSumatoriaTask: function(){

                var o_task;

                var tipo = Object.create(TipoAttribute);
                    tipo._type = TipoAttribute._type;
                    tipo.setValue(1);
                var state = Object.create(StateAttribute);
                    state._type = StateAttribute._type;
                    state.setValue(0);
                var xPath = Object.create(XPathAttribute);
                    xPath._type = XPathAttribute._type;
                    xPath.setValue('sxPath');
                var objValue = Object.create(CValueAttribute);
                    objValue._type = SValueAttribute._type;     
                    objValue.setValue(searchText);
   
                o_task = new SumatoriaTask(10,xPath,objValue,tipo,state,null);
                o_task.setLocation(location);
                localStorageManager.insert(o_task.toJson());
                Recorder.refresh();
                //alert('agrego?');
                
                //Este augmenter tiene mas comportamiento, donde lo pongo??
                //Pensar algun injector de todo el codigo JS
                //Agrego en la esquina izquierda un "contenedor" que muestre los valores y la sumatoria
                var div = document.createElement("div");
                div.classList.add('topcorner');
                div.id = "sum_container";

                var stop = document.createElement("input");
                stop.value="X";
                stop.type="button";
                stop.addEventListener('click',function(){
                    
                     document.removeEventListener('mouseup', handlerSum,false);
                });

                var div_sum = document.createElement("div");
                //div.classList.add('topcorner');
                div_sum.id = "sum";
                var body = document.getElementsByTagName("body")[0];
                div.appendChild(div_sum);
                div.appendChild(stop);
                
                body.appendChild(div);


                //Asumo que se agrego la tarea y empezo a escuchar 
                document.addEventListener('mouseup', handlerSum,false);
                //localStorage.setItem('sumatoria',JSON.stringify({values:[]}));

            }
            ,addNotasTask: function(){

                var o_task;

                var tipo = Object.create(TipoAttribute);
                    tipo._type = TipoAttribute._type;
                    tipo.setValue(1);
                var state = Object.create(StateAttribute);
                    state._type = StateAttribute._type;
                    state.setValue(0);
                var xPath = Object.create(XPathAttribute);
                    xPath._type = XPathAttribute._type;
                    xPath.setValue('sxPath');
                var objValue = Object.create(CValueAttribute);
                    objValue._type = SValueAttribute._type;     
                    objValue.setValue(searchText);
   
                o_task = new NotasTask(10,xPath,objValue,tipo,state,null);
                //o_task.setLocation(location);
                localStorageManager.insert(o_task.toJson());
                Recorder.refresh();
                
            }
        };
}());

/*****TEMPORALMENTE LO PONGO ACA***/

//El handler tiene como parametro el evento para traer el valor
var  handlerSum = function(e) { 
            
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

                if(confirm('Seleccionar: '+selection.toString()+'?')){
                    var val = selection.toString()
                    //guardo en localStorage
                    var st = JSON.parse(localStorage.getItem('sumatoria'));
                    //Agrego elemento
                    st.values.push(val);
                    //guardo en el localStorage
                    localStorage.setItem('sumatoria',JSON.stringify(st));
                    
                    //sumatoria
                    var st_sum = JSON.parse(localStorage.getItem('sumatoria'));
                    var sum = 0;
                    for(var i=0;i< st_sum.values.length;i++){
                        
                        sum = sum + parseInt(st_sum.values[i]);
                        
                    }

                    var sum_container = document.getElementById("sum_container");
                    var l = document.createElement("li");
                    l.textContent = val;
                    sum_container.appendChild(l);
                    
                    document.getElementById('sum').innerHTML = 'sum: '+sum;
                }       
            } 
        };