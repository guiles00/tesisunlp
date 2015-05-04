 var PrimitiveTask = (function(){

 /**
 * @module Tasks
 * PrimitiveTask
 * @class PrimitiveTask
 * @constructor
 */
function PrimitiveTask(id,xPath,value,tipo,state,taskTitle){ //Constructor
this.tipo = tipo;    
this.xPath = xPath;
this.value = value;
this.state = state;
this.id = id;
this.msg = "PrimitiveTask"
this.type = "PrimitiveTask"
this.precondition = {};
this.taskTitle = taskTitle;
}


PrimitiveTask.prototype.setPrecondition = function(p){
  this.precondition = p;
};

PrimitiveTask.prototype.getPrecondition = function(){
  return this.precondition;
};
/**
 * @method getState
 */
PrimitiveTask.prototype.getState = function(){ 
return this.state;
}
/**
 * @method setState
 */
PrimitiveTask.prototype.setState = function(aState){ 
this.state = aState;
}
/** 
 * @method execute
 */
PrimitiveTask.prototype.execute = function(){

//Precondiciones
//
    var iterator = document.evaluate(this.xPath.getValue(),document,null,0,null);
    var node = iterator.iterateNext();
    //Auto = 1 , Manual = 0
    var that = this;
    if(node){
        if(this.tipo.getValue() == 1){
        Manager.highlightElement(node)
        node.value = this.value.getValue();
        this.finalizo(this.id);
        }else{
            Manager.highlightElement(node)
            node.addEventListener('change',
        function(){
           that.finalizo(that.id);
        }
        ,false);
        }
    return node;
    }
}


PrimitiveTask.prototype.finalizo = function(id){

var oTask = localStorageManager.getObject(id);
console.log('trae objeto '+id);
console.debug(oTask);

    oTask.state.value = 1;
    localStorageManager.setObjectR(JSON.stringify(oTask));

    //Mando evento de que finalizio la tarea
    var event = new CustomEvent("finalizado",{detail: { message: "Finalizado",id: id,},bubbles: true,cancelable: true});
    document.dispatchEvent(event);

}

/**
 * @method toHtml
 */
PrimitiveTask.prototype.toHtml = function(properties){

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
PrimitiveTask.prototype.toJson = function(){
return JSON.stringify(this);
}



 return PrimitiveTask;   
 })()