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
function pausecomp(millis)
                 {
                  var date = new Date();
                  var curDate = null;
                  do { curDate = new Date(); }
                  while(curDate-date < millis);
        }


function procedureHandler(e){
        
    var indice = Manager.getIndice();           
    //console.debug(indice);
    //Si llego un finalizado incrementa indice
    Recorder.refresh();
    Manager.incrementIndice(); 
    if(localStorage.getItem('BPMEXECUTIONIT') == '1'){
   // alert('entro en bpm');
    Manager.executeNextIteratorTaskWithTimer(2);
    }else{
    Manager.executeNextTaskWithTimer();                         
    }
    
console.log(
        "Ejecuto esta tarea y la da como finalizada "+e.currentTarget.nodeName+", "
        +e.detail.id+": "+e.detail.message
    );
    //refresco la consola
    
}


var Manager = (function () {
	"use strict";
    var currentPrimitiveTasks = []; //Array de las tareas a realizar cuando se ejecuta el Manager
    var currentIteratorTasks = [];
    var executeTasksIterator = [];
    var primitiveTasks = ['FillInputTask','SelectOptionTask','TextAreaTask','CheckBoxTask']; //Un array de tareas que puede realizar
    var indice;
    var arr_tareas;
        /**
        * @method Subscribe
        */
        function subscribe(aPrimitiveTask){ //Este metodo por ahora solo agrega el objeto 
         currentPrimitiveTasks.push(aPrimitiveTask);
        }

        function createConcatStringTask(aId,xPath,value,aMsg,aTipo,aState,xPath2){
                                        //(aId,xPath,value,tipo,state,xPath2)
         return new ConcatStringTask(aId,xPath,value,aMsg,aTipo,aState,xPath2);   
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
                //alert(this.indice);
		     }
             ,incrementIteratorIndice: function(){
                
                this.iteratorIndice = this.iteratorIndice + 1;
                //alert(this.indice);
             }
        /**
        * @method getIndice
        */
		     ,getIndice: function(){
				return this.indice;
		     }
             ,getIteratorIndice: function(){
                return this.iteratorIndice;
             }
        /**
        * @method setIndice
        */     
		     ,setIndice:function(val){
		     	this.indice = val;	
		      }
              ,setIteratorIndice:function(val){
                this.iteratorIndice = val;  
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
            ,armaElarray: function(){

            //Manager.clearCurrentIteratorTasks();
            this.executeTasksIterator = [];
            var arr_ls = Manager.getCurrentIteratorTasks();
                    
                console.debug(arr_ls);    
                    var i; //Recorro el array de tareas
                    for (i=0;i < arr_ls.length ;i++){
                            
                        //como es una de las tareas nuevas la convierto otra vez en JSON
                        var json_task = localStorageManager.getObject(arr_ls[i].id);
                        var c_task = construct(window[arr_ls[i].type]);
                        console.debug(c_task);
                        //alert(arr_ls[i].id);
                        c_task.instanciamela(json_task);
                        
                        //var c_t = Manager.getCurrentIteratorTasks();
                        this.executeTasksIterator.push(c_task);
                        
                    }
           // console.debug(this.executeTasksIterator);        
           // //alert('asdasdas');
            }
            ,startIterator: function(n){
               //Manager.armaElarray();
               //alert('llama a este y este se encarga de todo');

                var indice = 0;
                //alert(indice);
                Manager.setIteratorIndice(indice);

                  document.addEventListener('finalizado',procedureHandler,false);

                  var arr_tareas = Manager.getCurrentIteratorTasks();
                  //var arr_tareas.length  
                  console.debug(arr_tareas);
                 // alert('arr_tareas');
                    
                  //var indice = Manager.getIndice();
                  var task = arr_tareas[indice]; 
                 // alert(indice);
                  task.execute();  

                  //alert('ejecuta esta tarea');
                  //alert(task.id);
                  //console.debug('ejecuta esta tarea');
                    
               /* if(task.id == 9 ){
                    alert('entro aca?')
                    localStorageManager.poneTareasenCero();
                    //Temporalmente agrego un contador al Iterador
                    var cont = parseInt(localStorage.getItem('CONT'));
                    cont = cont + 1; 
                    localStorage.setItem('CONT',cont);
                localStorage.setItem("BPMEXECUTIONIT",0);

                }*/
               // alert(task.id);
              /*  var cont = localStorage.getItem('CONT');
               
                console.debug('contador: '+cont);
               
                if(cont <= 2){
                    Manager.resumeIterator(cont);
                    //alert('segui ejecutando');
                // Manager.playTaskById(6);   
                }else{
                localStorage.setItem("BPMEXECUTIONIT",0);
                localStorage.setItem("CONT",0);
                Manager.finalizoTarea(6);
                }*/
                    //Si el contador es mas a 2 finalizo las dos tareas
                 
                 
                  //Manager.finalizoTarea(6);  
                  
                  //console.debug('ejecuto o no ejecuto?');
                  //Manager.executeNextTaskWithTimer();
            }
            ,resumeIterator: function(n){
                console.debug('sigue ejecutando '+n);
            }
        /**
        * @method start
        */  
        	,start: function(n){
               
                var indice = n - 1 || 0;
		        
                Manager.setIndice(indice);

                  document.addEventListener('finalizado',procedureHandler,false);

                  var arr_tareas = Manager.getCurrentPrimitiveTasks();
                  
                  //console.debug('arr_tareas');
                  //console.debug(arr_tareas);
                  
                  var indice = Manager.getIndice();
                  var task = arr_tareas[indice]; 
                  
                  task.execute();  
                 
                  //Si es iterator, lo saco del localStorage 
                  //Y si es la ultima tarea para ejecutar, las pongo otra vez en estado 0
                 // var v = localStorageManager.traeLasVueltas();
                  //if(v == 2) Manager.finalizoTarea(6);
                  
                  //var oTask = localStorageManager.getObject(6);
//&& oTask.state.value == 0
                  //
                 // Manager.finalizoTarea(6);  
                  //traigo los datos del iterator
                  

        	}
            ,finalizoTarea: function(id){
                    
                    var oTask = localStorageManager.getObject(id);

                    oTask.state.value = 1;
                    localStorageManager.setObjectR(JSON.stringify(oTask));
            }
        /**
        * @method clearCurrentPrimitiveTasks
        */       
        	,clearCurrentPrimitiveTasks: function(){
            currentPrimitiveTasks=[];
        	}
            ,clearCurrentIteratorTasks: function(){
            currentIteratorTasks=[];
            }
        /**
        * @method addPrimitiveTask
        */   //Manager.addPrimitiveTask(arr_ls[i].id,arr_ls[i].type,xPath,value,0,arr_ls[i].state);
        	,addPrimitiveTask : function(aId,aPrimitiveTaskType,xPath,value,tipo,state,taskTitle,xPath2){
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
            , ConcatStringTask: createConcatStringTask(aId,xPath,value,tipo,state,xPath2)

            } 
	    	, def = null ;

	    	lookup[aPrimitiveTaskType] ? subscribe(lookup[aPrimitiveTaskType]) : def();
		   }
           ,factoryTask : function(aId,aPrimitiveTaskType,xPath,value,tipo,state,taskTitle,xPath2){
            
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
            , ConcatStringTask: createConcatStringTask(aId,xPath,value,'',tipo,state,xPath2)
            } 
            , def = null ;

            return lookup[aPrimitiveTaskType] ;
           }
        /**
        * @method getCurrentPrimitiveTasks
        */  
        //Que me devuelva las que estan en estado 0, para ejectuar
        	,getCurrentIteratorTasks: function(){
             var tasks = localStorageManager.getCurrentIteratorTasks();
               return tasks;        
        	//return currentIteratorTasks;
        	}
            ,getCurrentPrimitiveTasks: function(){
            return currentPrimitiveTasks;
            }
            ,initCurrentPrimitiveTasks: function(){
               this.currentPrimitiveTasks = [];
               var tasks = localStorageManager.getCurrentTasks();
               return tasks;
            }
            ,initCurrentIteratorTasks: function(){
               this.currentIteratorTasks = [];
               var tasks = localStorageManager.getCurrentIteratorTasks();
               console.debug(tasks);
               //alert('asdasdasd11111');
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
            ,executeNextIteratorTaskWithTimer: function(n){
              //alert('ejecuta');
              //  pausecomp(1000);

            //Tiene que traer las tareas del localStorage
            var arr_tareas =  Manager.getCurrentIteratorTasks();
            //Esto hay que modificarlo, no me gusta como esta
            //Si el indice es igual( ya llego a ejecutar todas las tareas)
            
         /*   var indice = Manager.getIndice();           
                        //alert('indice'+indice);
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
                        
         */

                setTimeout(
                    function () {    

                        var indice = Manager.getIteratorIndice();
                        console.debug(arr_tareas);           
                        //alert('Ejecuta esta tarea indice '+indice);
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
                    var ultima_tarea = JSON.parse(localStorage.getItem('IT6'))[1].task_id;
                    var cont = parseInt(localStorage.getItem('CONT'));

                    /*if(cont == 2){
                     console.debug(Manager.getCurrentIteratorTasks());
                     //alert('finaliza');   
                     Manager.finalizoTarea(6); //Sacale el hardcodeo por el amor de jesucristo
                     localStorage.setItem("BPMEXECUTIONIT",0);   
                    }*/
                   // alert(ultima_tarea);
                    if(task.id == ultima_tarea){
                    if(cont == 2){
                    var it = localStorage.getItem('ITERADOR');
                     Manager.finalizoTarea(it); //Sacale el hardcodeo por el amor de jesucristo
                     Recorder.refresh();
                     localStorage.setItem("BPMEXECUTIONIT",0);
                     return;   
                    }
                   // alert('realizo '+cont+' vueltas');
                    localStorageManager.poneTareasenCero();
                    //Temporalmente agrego un contador al Iterador
                    cont = cont + 1; 
                    localStorage.setItem('CONT',cont);
                    //localStorage.setItem("BPMEXECUTIONIT",0);
                    
                    Manager.startIterator();
                    }
                    
                    

                            //Manager.incrementIndice(); 
                            //Manager.executeNextTaskWithTimer();                     

                    }

                , 1000);
            }
            ,playTaskById: function(id){

            var task = localStorageManager.getObject(id);
            var oTask = construct(window[task.type]);
            oTask.instanciamela(task);//.execute();
            oTask.execute();
            Recorder.refresh();
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
                /*var xPath = Object.create(XPathAttribute);
                    xPath._type = XPathAttribute._type;
                    xPath.setValue('sxPath');*/
                var objValue = Object.create(CValueAttribute);
                    objValue._type = SValueAttribute._type;     
                    //objValue.setValue('['+concept+']');
                    objValue.setValue(data);
                var oConcept = Object.create(SValueAttribute);
                    oConcept._type = SValueAttribute._type;
                    oConcept.value = concept;

            //var o_task = new DataCollectionTask(this.id,null,oValue,oTipo,oState,oTaskTitle,oConcept);
    
                o_task = new DataCollectionTask(10,null,objValue,tipo,state,null,oConcept);
                o_task.setLocation(location);
                localStorageManager.insert(o_task.toJson());
                Recorder.refresh();

            }
            ,addHighLightTask: function(searchText){


                //Instancio tarea vacia y guardo en el localStorage
                var a_task = new HighLightTask();
                localStorageManager.insert(a_task.toJson());
                //No te olvides de actualizar la consola
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
                    //objValue.setValue(searchText);
   
                o_task = new SumatoriaTask(10,xPath,objValue,tipo,state,null);
                o_task.setLocation(location);
                localStorageManager.insert(o_task.toJson());
                Recorder.refresh();
                
                //Este augmenter tiene mas comportamiento, donde lo pongo??
                //Pensar algun injector de todo el codigo JS
                //Agrego en la esquina izquierda un "contenedor" que muestre los valores y la sumatoria
                var div = document.createElement("div");
                div.classList.add('topcorner');
                div.id = "sum_container";

                var stop = document.createElement("input");
                stop.classList.add("tesisunlp_button_stop");
                stop.value="Stop";
                stop.type="button";
                stop.addEventListener('click',function(){
                     //Guardo en el objeto creado
                        
                     document.removeEventListener('mouseup', handlerSum,false);
                });

                var close = document.createElement("input");
                close.classList.add("tesisunlp_close_button");
                close.value="X";
                close.type="button";
                close.addEventListener('click',function(){
                     //Guardo en el objeto creado
                var el = document.getElementById('sum_container');
                el.parentNode.removeChild(el);
                     //document.removeEventListener('mouseup', handlerSum,false);
                });


                var div_sum = document.createElement("div");
                //div.classList.add('topcorner');
                div_sum.id = "sum";

                var body = document.getElementsByTagName("body")[0];
                div.appendChild(div_sum);
                div.appendChild(stop);
                div.appendChild(close);
                
                body.appendChild(div);

                //Inicializo localStorage
                localStorage.setItem('sumatoria',JSON.stringify({values:[]}));

              //  var st = [];
             //   localStorage.setItem('sumatoria',JSON.stringify(st));
              //  console.debug(localStorage.getItem('sumatoria'));
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
                   // objValue.setValue(searchText);
   
                o_task = new NotasTask(10,xPath,objValue,tipo,state,null);
                //o_task.setLocation(location);
                localStorageManager.insert(o_task.toJson());
                Recorder.refresh();
                
            }
            ,addConcatStringTask: function(){

           
                //Instancio tarea vacia y guardo en el localStorage
                var a_task = new ConcatStringTask();
                localStorageManager.insert(a_task.toJson());
                //No te olvides de actualizar la consola
                Recorder.refresh();
                
            }
           ,addComposedTask: function(){

                //Instancio tarea vacia y guardo en el localStorage
                var a_task = new ComposedTask();
                localStorageManager.insert(a_task.toJson());
                //No te olvides de actualizar la consola
                Recorder.refresh();
                
            }
            ,addFillInputTask: function(){
                //Instancio tarea vacia y guardo en el localStorage
                var a_task = new FillInputTask();
                localStorageManager.insert(a_task.toJson());
                //Actualizo la consola
                Recorder.refresh();
            }
            ,addTextAreaTask: function(){
                //Instancio tarea vacia y guardo en el localStorage
                var a_task = new TextAreaTask();
                localStorageManager.insert(a_task.toJson());
                //Actualizo la consola
                Recorder.refresh();
            }
            ,addClickLinkTask: function(){
                //Instancio tarea vacia y guardo en el localStorage
                var a_task = new ClickLinkTask();
                localStorageManager.insert(a_task.toJson());
                //Actualizo la consola
                Recorder.refresh();
            }
            ,addSelectOptionTask: function(){
                //Instancio tarea vacia y guardo en el localStorage
                var a_task = new SelectOptionTask();
                localStorageManager.insert(a_task.toJson());
                //Actualizo la consola
                Recorder.refresh();
            } 
            ,addClickInputTask: function(){
                //Instancio tarea vacia y guardo en el localStorage
                var a_task = new ClickInputTask();
                localStorageManager.insert(a_task.toJson());
                //Actualizo la consola
                Recorder.refresh();
            },addIfTask: function(){
                //Instancio tarea vacia y guardo en el localStorage
                var a_task = new IfTask();
                localStorageManager.insert(a_task.toJson());
                //Actualizo la consola
                Recorder.refresh();
            },addSimpleHideTask:function(){
                //Instancio tarea vacia y guardo en el localStorage
                var a_task = new SimpleHideTask();
                localStorageManager.insert(a_task.toJson());
                //Actualizo la consola
                Recorder.refresh();
            },addSimpleWrapTask:function(){
                //Instancio tarea vacia y guardo en el localStorage
                var a_task = new SimpleWrapTask();
                localStorageManager.insert(a_task.toJson());
                //Actualizo la consola
                Recorder.refresh();
            },addTableManagerTask:function(){
                //Instancio tarea vacia y guardo en el localStorage
                var a_task = new TableManagerTask();
                localStorageManager.insert(a_task.toJson());
                //Actualizo la consola
                Recorder.refresh();
            },addIteratorTask:function(){
                //Instancio tarea vacia y guardo en el localStorage
                var a_task = new IteratorTask();
                localStorageManager.insert(a_task.toJson());
                //Actualizo la consola
                Recorder.refresh();
            }
            
        }
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