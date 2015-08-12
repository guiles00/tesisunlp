 var IfTask = (function(){

 /**
 * @module Tasks
 * IfTask
 * @class IfTask
 * @constructor
 */
function IfTask(id,xPath,value,tipo,state,taskTitle){ //Constructor
    AbstractTask.call(this,id,xPath,value,tipo,state,taskTitle);

    this.id = id || 10;
   // this.xPath = xPath || Object.create(XPathAttribute).init({'value':'sxPath'});
    this.tipo = tipo || Object.create(TipoAttribute).init({'value':1});  
    this.state = state || Object.create(StateAttribute).init({'value':0}) ;
    this.type = "IfTask"
    this.precondition = {};
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'IF .. THEN'})
    this.value = value || Object.create(CValueAttribute).init({'value':value});
    this.value2 = Object.create(CValueAttribute).init({'value':''});
    this.condition = Object.create(SValueAttribute).init({'value':'','htmlId':'condition_id','label':'condition'});



}
IfTask.prototype = new AbstractTask();


IfTask.prototype.instanciamela = function(o){
    //Acoplo estos objetos, no me salio el reviver de JSON
    this.id = o.id || 10;
   // this.xPath = Object.create(XPathAttribute).init({'value':o.xPath.value});
    this.tipo = Object.create(TipoAttribute).init({'value':o.tipo.value})
    this.state = Object.create(StateAttribute).init({'value':(o.state.value).toString()})
    this.taskTitle = Object.create(TaskTitleAttribute).init({'value':o.taskTitle.value})
    this.value = Object.create(SValueAttribute).init({'value':o.value.value,'label':'If true:'});
    this.value2 = Object.create(SValueAttribute).init({'value':o.value2.value,'htmlId':'value2_id','label':'Else:'});
    this.condition = Object.create(SValueAttribute).init({'value':o.condition.value,'htmlId':'condition_id','label':'condition'});

    return this;
             
}

IfTask.prototype.setPrecondition = function(p){
  this.precondition = p;
};

IfTask.prototype.getPrecondition = function(){
  return this.precondition;
};
/**
 * @method getState
 */
IfTask.prototype.getState = function(){ 
return this.state;
}
/**
 * @method setState
 */
IfTask.prototype.setState = function(aState){ 
this.state = aState;
}
/** 
 * @method execute
 */
IfTask.prototype.execute = function(){
var that = this;
//Precondiciones
//Que existan las tareas que tengo que ejecutar ( eso es un metodo aparte)
    //console.debug()
    //console.debug(this.condition.value);
    if(this.condition.value == '0' || this.condition.value == '0' )
    {
      that.finalizo(that.id);  
      return;  
    } 
    if(this.condition.value == '1'){
    var id_comp = String(this.value.value);
    console.debug('execute true');
    }else{
        console.debug('execute else');
    var id_comp = String(this.value2.value);
    }

    //console.debug('ejecuta este composite');
    //console.debug(id_comp);
    //Tiene que chequear que sea compositeTask
      var task = localStorageManager.getObject(id_comp);
            var oTask = construct(window[task.type]);
            oTask.instanciamela(task);//.execute();
            oTask.execute();
            Recorder.refresh();

    that.finalizo(that.id);

}


IfTask.prototype.finalizo = function(id){

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
IfTask.prototype.toHtml = function(properties){

    var array_elementos = new Array();
    array_elementos.push(this.taskTitle.getHtmlElement());
   // array_elementos.push(this.xPath.getHtmlElement());
    array_elementos.push(this.condition.getHtmlElement());
    array_elementos.push(this.value.getHtmlElement());

    array_elementos.push(this.value2.getHtmlElement());
    array_elementos.push(this.state.getHtmlElement());
    array_elementos.push(this.tipo.getHtmlElement());

    return array_elementos;
}

/**
 * @method toJson
 */
IfTask.prototype.toJson = function(){
return JSON.stringify(this);
}
IfTask.prototype.setValue2 = function(o){
    this.value2 = o;
}
IfTask.prototype.setCondition = function(o){
    this.condition = o;
}
IfTask.prototype.htmlToJson = function(el_div){

        var str_taskTitle = document.getElementById('task_title_id').value;
        var str_condition = document.getElementById('condition_id').value;
        var str_value = document.getElementById('value_id').value;
        var str_state = document.getElementById('state_id').value;
        var str_tipo = document.getElementById('tipo_id').value;
        var str_value2 = document.getElementById('value2_id').value;


        //Se que un FillInputTask tiene los campos xPath y value
       // var xPath = Object.create(XPathAttribute);
       // xPath.value = str_xPath;

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
        
        var oValue2 = Object.create(SValueAttribute);
        oValue2._type = SValueAttribute._type;
        oValue2.value = str_value2;


        var oCondition = Object.create(SValueAttribute);
        oCondition._type = SValueAttribute._type;
        oCondition.value = str_condition;

        var o_task = new IfTask(this.id,null,oValue,oTipo,oState,oTaskTitle);
        //o_task.taskTitle = oTaskTitle; //Lo hago por ahora, hay que hacer
        o_task.setValue2(oValue2);
        o_task.setCondition(oCondition);

    return o_task.toJson();
}


 return IfTask;   
 })()