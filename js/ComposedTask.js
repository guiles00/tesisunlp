 var ComposedTask = (function(){

 /**
 * @module Tasks
 * ComposedTask
 * @class ComposedTask
 * @constructor
 */
function ComposedTask(id,xPath,value,tipo,state,taskTitle){ //Constructor
    AbstractTask.call(this,id,xPath,value,tipo,state,taskTitle);

    this.id = id || 10;
    this.xPath = xPath || Object.create(XPathAttribute).init({'value':'sxPath'});
    this.tipo = tipo || Object.create(TipoAttribute).init({'value':1});  
    this.state = state || Object.create(StateAttribute).init({'value':0}) ;
    this.type = "ComposedTask"
    this.precondition = {};
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Composed Task '})
    this.value = value || Object.create(CValueAttribute).init({'value':value});

}
ComposedTask.prototype = new AbstractTask();


ComposedTask.prototype.instanciamela = function(o){
    //Acoplo estos objetos, no me salio el reviver de JSON
    this.id = o.id || 10;
    this.xPath = Object.create(XPathAttribute).init({'value':o.xPath.value});
    this.tipo = Object.create(TipoAttribute).init({'value':o.tipo.value})
    this.state = Object.create(StateAttribute).init({'value':(o.state.value).toString()})
    this.taskTitle = Object.create(TaskTitleAttribute).init({'value':o.taskTitle.value})
    this.value = (o.value._type =='CValueAttribute')?Object.create(CValueAttribute).init({'value':o.value.value}):Object.create(SValueAttribute).init({'value':o.value.value});

    return this;
             
}

ComposedTask.prototype.setPrecondition = function(p){
  this.precondition = p;
};

ComposedTask.prototype.getPrecondition = function(){
  return this.precondition;
};
/**
 * @method getState
 */
ComposedTask.prototype.getState = function(){ 
return this.state;
}
/**
 * @method setState
 */
ComposedTask.prototype.setState = function(aState){ 
this.state = aState;
}
/** 
 * @method execute
 */
ComposedTask.prototype.execute = function(){
var that = this;
//Precondiciones
//Que existan las tareas que tengo que ejecutar ( eso es un metodo aparte)
    //console.debug()
    var str = String(this.value.value);
    var arr_ids = str.split(',');
for (var i = arr_ids.length - 1; i >= 0; i--) {
         var task = localStorageManager.getObject(arr_ids[i]);
            var oTask = construct(window[task.type]);
            oTask.instanciamela(task);//.execute();
            oTask.execute();
            Recorder.refresh();

};

    that.finalizo(that.id);

}


ComposedTask.prototype.finalizo = function(id){

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
ComposedTask.prototype.toHtml = function(properties){

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
ComposedTask.prototype.toJson = function(){
return JSON.stringify(this);
}

ComposedTask.prototype.htmlToJson = function(el_div){

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
        
        var o_task = new ComposedTask(this.id,xPath,oValue,oTipo,oState,oTaskTitle);
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
            task.group.value = 1;
            localStorageManager.setObjectR(JSON.stringify(task));
        } 


    return o_task.toJson();
}


 return ComposedTask;   
 })()