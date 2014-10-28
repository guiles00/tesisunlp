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
        	,start: function(){

                //console.debug(this);

		          Manager.setIndice(0);

                  document.addEventListener('finalizado',procedureHandler,false);

                  var arr_tareas =  Manager.getCurrentPrimitiveTasks();
                //console.debug(arr_tareas);
                  var indice = Manager.getIndice();
                  var task = arr_tareas[indice]; 
                  task.execute();

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
            , ClickInputTask: createClickInputTask(aId,xPath,value,tipo,state) } 
	    	, def = null ;

	    	lookup[aPrimitiveTaskType] ? subscribe(lookup[aPrimitiveTaskType]) : def();
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
                            localStorage.setItem("BPMEXECUTION",0);
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
            ,init: function(){

             //Si esta ejecutando 
             //Este metodo es para inicializar el Manager y para que contemple todos los escenarios
            
            }
        };
}());