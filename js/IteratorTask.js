/*function procedureIteratorHandler(e){
        

   //var indice = Manager.getIndice();           
    console.debug(e.detail)
    //Si llego un finalizado incrementa indice
    Recorder.refresh();
    //Manager.incrementIndice(); 
    //Manager.executeNextTaskWithTimer();                     
    //IteratorTask.executeNextTask();
    
    //trae la proxima tarea y ejecuta
    var arr = JSON.parse(localStorage.getItem(e.detail.iterator));
    
          
         for (var i = 0;i < arr.length;i++){
                   
                   
                   if(arr[i].state === 0 ) { 
                      console.debug(arr[i]);
                      
                      var it = new IteratorTask;
                      if( confirm('ejecuta next task?') ){
                      it.executeNextTask(e.detail.iterator,arr[i].id);  
                      //alert('Execute Next Task');
                      }
                      
                      
                   }else{
                    
                   }
            }


console.log(
        "Ejecuto esta tarea dentro del Iterator y la da como finalizada "+e.currentTarget.nodeName+", "
        +e.detail.id+": "+e.detail.message
    );
    //refresco la consola
    
}*/

 var IteratorTask = (function(){

 /**
 * @module Tasks
 * IteratorTask
 * @class IteratorTask
 * @constructor
 */
function IteratorTask(id,xPath,value,tipo,state,taskTitle){ //Constructor
    AbstractTask.call(this,id,xPath,value,tipo,state,taskTitle);

    this.id = id || 10;
    this.xPath = xPath || Object.create(XPathAttribute).init({'value':'sxPath'});
    this.tipo = tipo || Object.create(TipoAttribute).init({'value':1});  
    this.state = state || Object.create(StateAttribute).init({'value':0}) ;
    this.type = "IteratorTask"
    this.precondition = {};
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Iterator'})
    this.value = value || Object.create(CValueAttribute).init({'value':value});

}
IteratorTask.prototype = new AbstractTask();


IteratorTask.prototype.instanciamela = function(o){
    //Acoplo estos objetos, no me salio el reviver de JSON
    this.id = o.id || 10;
    this.xPath = Object.create(XPathAttribute).init({'value':o.xPath.value});
    this.tipo = Object.create(TipoAttribute).init({'value':o.tipo.value})
    this.state = Object.create(StateAttribute).init({'value':(o.state.value).toString()})
    this.taskTitle = Object.create(TaskTitleAttribute).init({'value':o.taskTitle.value})
    this.value = (o.value._type =='CValueAttribute')?Object.create(CValueAttribute).init({'value':o.value.value}):Object.create(SValueAttribute).init({'value':o.value.value});

    return this;
             
}

IteratorTask.prototype.setPrecondition = function(p){
  this.precondition = p;
};

IteratorTask.prototype.getPrecondition = function(){
  return this.precondition;
};
/**
 * @method getState
 */
IteratorTask.prototype.getState = function(){ 
return this.state;
}
/**
 * @method setState
 */
IteratorTask.prototype.setState = function(aState){ 
this.state = aState;
}
/** 
 * @method execute
 */
IteratorTask.prototype.aexecute = function(){

var that = this;
//Precondiciones
//Que existan las tareas que tengo que ejecutar ( eso es un metodo aparte)
 
    var str = String(this.value.value);
    var arr_ids = str.split(',');
//Lo hago dos veces para ver que onda

   // for (var j = 0 ; j < 2; j++) {
    console.debug('Ejecuta este array BEGIN');
    console.debug(arr_ids);
    console.debug('Ejecuta este array END');

    //for (var i = arr_ids.length - 1; i >= 0; i--) {
    for (var i = 0; i < arr_ids.length; i++) {
             var task = localStorageManager.getObject(arr_ids[i]);
                var oTask = construct(window[task.type]);
                oTask.instanciamela(task);//.execute();
        //alert(task.id);

            Manager.playTaskById(task.id);
                 //oTask.execute();
                  
              //  Recorder.refresh();

   // };
   // //alert(j);
};
    console.debug(localStorage.getItem('BPME'));
    that.finalizo(that.id);
                console.debug('Ejecuta esta BEGIN');

            
                    console.debug('Ejecuta esta END');

}

IteratorTask.prototype.executeNextTask = function(iterator,id){

    //alert('Ejecuta tarea de Iterator de '+iterator+'con id'+id);

    var arr_task = JSON.parse(localStorage.getItem(iterator));

            var task = localStorageManager.getObject(id);
            var oTask = construct(window[task.type]);
                    oTask.instanciamela(task);//.execute();
                    oTask.execute();

            console.debug('ejecuto esta tarea y la pongo en ejecutada');
            var st = JSON.parse(localStorage.getItem(iterator));
            console.debug(st);
            for(var j = 0 ; j < st.length ; j++){
                if(st.id == id) 
                st[j].state = 1;               
            }
            console.debug(st);
            localStorage.setItem(iterator,JSON.stringify(st));

}


IteratorTask.prototype.execute = function(){

localStorage.setItem("BPMEXECUTIONIT",1);
localStorage.setItem("CONT",1);
localStorage.setItem("ITERADOR",this.id);
//traigo los ids para armar el array de ejecucion
console.debug(this.value.value);
    //var arr_tasks = [[3,13,12,16]];
    var arr_tasks = this.value.value.split(',');
    var iterantes = [];

    //for(var i = 0; i < arr_tasks.length; i++){
        var el = {tasks:arr_tasks,state:0};
        iterantes.push(el);  
    //}
var el_c = {task_id:arr_tasks[arr_tasks.length - 1]};        
iterantes.push(el_c);

var el_v = {vueltas:2};        
iterantes.push(el_v);

//var el_cont = {cont:0};        
//iterantes.push(el_cont);
        
localStorage.setItem('IT6',JSON.stringify(iterantes));
Manager.initCurrentIteratorTasks();
//alert('init currentTarget00');
//console.debug(Manager.getCurrentIteratorTasks() );

////alert('initCurrentIteratorTasks');
//return;
//this.finalizo(this.id);
Manager.startIterator();
//Recorder.clickPlayIterator();
return;

//localStorage.clear();


//document.addEventListener('Iteratorfinalizado',procedureIteratorHandler,false);
//ejecuta las tareas que tiene


var store = 'IT'+this.id;

var s_iterator = localStorage.getItem(store);

if( s_iterator == null ){
    console.debug(s_iterator);
    //alert('entro acaaaaaa');
    //Guarda en el store por primera vez
    var arr_tasks = this.value.value.split(',');
    var iterantes = [];

    for(var i = 0; i < arr_tasks.length; i++){
        var el = {id:arr_tasks[i],state:0};
        iterantes.push(el);
        console.debug(arr_tasks[i]);
    }
    
    localStorage.setItem(store,JSON.stringify(iterantes));
}
   
var arr_task = JSON.parse(localStorage.getItem(store));

//for(var i = 0; i < arr.length; i++){
//alert('ejecuta el primero y usa el listener');
console.debug(localStorage.getItem(store))

    //if(arr[i].state == 0){
        
       
            var task = localStorageManager.getObject(arr_task[0].id);
            var oTask = construct(window[task.type]);
                    oTask.instanciamela(task);//.execute();
                    oTask.execute();



            console.debug('ejecuto esta tarea');
            arr_task[0].state = 1;           
            localStorage.setItem(store,JSON.stringify(arr_task));
        
            var event = new CustomEvent("Iteratorfinalizado",{detail: { message: "Finalizado",id: this.id,iterator:store},bubbles: true,cancelable: true});
            document.dispatchEvent(event);
          
return;
    //}
    
//}




//    var event = new CustomEvent("Iteratorfinalizado",{detail: { message: "Finalizado",id: this.id,},bubbles: true,cancelable: true});
//    document.dispatchEvent(event);

/*var that = this;


                var   n = 1;
                var indice = n - 1 || 0;
                
                Manager.setIndice(indice);
                //Agrego el evento
                document.addEventListener('finalizado',procedureHandler,false);

                  //var arr_tareas = Manager.getCurrentPrimitiveTasks();
                  var arr_tasks = localStorageManager.getCurrentTasks();
                   for (i=0;i < arr_tasks.length ;i++){
                          console.debug(arr_tasks);
                          //var indice = Manager.getIndice();
                          var task = arr_tasks[i]; 
                          var json_task = localStorageManager.getObject(task.id);
                          
                         
                          
                          var c_task = construct(window[task.type]);
                    
                          c_task.instanciamela(json_task);
                         // c_task.execute();  
                    }
that.finalizo(that.id);*/
}


IteratorTask.prototype.finalizo = function(id){

    var oTask = localStorageManager.getObject(id);

    oTask.state.value = 1;
    localStorageManager.setObjectR(JSON.stringify(oTask));

    //Mando evento de que finalizio la tarea
    var event = new CustomEvent("finalizado",{detail: { message: "Finalizado",id: id,},bubbles: true,cancelable: true});
    document.dispatchEvent(event);

}

/**
 * @method toHtml
 */
IteratorTask.prototype.toHtml = function(properties){

    //console.debug(this.value.getHtmlElement());

    var array_elementos = new Array();
    array_elementos.push(this.taskTitle.getHtmlElement());
    array_elementos.push(this.xPath.getHtmlElement());
    array_elementos.push(this.value.getHtmlElement());
    array_elementos.push(this.state.getHtmlElement());
    array_elementos.push(this.tipo.getHtmlElement());

    return array_elementos;
}

/**
 * @method toJson
 */
IteratorTask.prototype.toJson = function(){
return JSON.stringify(this);
}

IteratorTask.prototype.htmlToJson = function(el_div){

        var str_taskTitle = document.getElementById('task_title_id').value;
        var str_xPath = document.getElementById('xpath_id').value;
        var str_value = document.getElementById('value_id').value;
        var str_state = document.getElementById('state_id').value;
        var str_tipo = document.getElementById('tipo_id').value;

        //Se que un FillInputTask tiene los campos xPath y value
        var xPath = Object.create(XPathAttribute);
        xPath.value = str_xPath;

        //Si es un concepto guarda un CAttribute 
        //Por ahora pregunto si el primer caracter es [
       
        //@comment Si el str_value es un string u objeto instancio distinto valor
        if( str_value.charAt(0) == '[' ){
        var oValue = Object.create(CValueAttribute);
        oValue._type = CValueAttribute._type;
        oValue.value = str_value;
        
        }else{
        var oValue = Object.create(SValueAttribute);
        oValue._type = SValueAttribute._type;
        oValue.value = str_value;
        }
       
        var oState = Object.create(StateAttribute);
        oState._type = StateAttribute._type;
        oState.value = str_state;
        

        var oTipo = Object.create(TipoAttribute);
        oTipo._type = TipoAttribute._type;
        oTipo.value = str_tipo;

        var oTaskTitle = Object.create(TaskTitleAttribute);
        oTaskTitle._type = TaskTitleAttribute._type;
        oTaskTitle.value = str_taskTitle ;
        
        var o_task = new IteratorTask(this.id,xPath,oValue,oTipo,oState,oTaskTitle);
        //o_task.taskTitle = oTaskTitle; //Lo hago por ahora, hay que hacer
        

        //Si estas vacia
       
        var old_task = localStorageManager.getObject(this.id);
        
        console.debug(old_task);
        var arr_old_tasks = old_task.value.value.split(',');
        var arr_id_tasks = str_value.split(',');

         //Estado inicial
        
        console.debug(arr_old_tasks);
        console.debug(arr_id_tasks);
        //console.debug(arr_old_tasks.length);
        if(old_task.value.value != ''){
        for(var i = 0;i < arr_old_tasks.length;i++){
        var task = localStorageManager.getObject(arr_old_tasks[i]);
        task.group.value = 0;
        localStorageManager.setObjectR(JSON.stringify(task));
        } 
        }
        for(var i = 0;i < arr_id_tasks.length;i++){
            var task = localStorageManager.getObject(arr_id_tasks[i]);
            task.group.value = this.id;
            localStorageManager.setObjectR(JSON.stringify(task));
        } 


    return o_task.toJson();
}


 return IteratorTask;   
 })()