var AbstractTask =(function(){


 function AbstractTask(id,xPath,value,tipo,state,taskTitle){ //Constructor
this.tipo = tipo;    
this.xPath = xPath;
this.value = value;
this.state = state;
this.id = id;
this.msg = "AbstractTask"
this.type = "AbstractTask"
this.precondition = {};
this.taskTitle = taskTitle;
}

AbstractTask.prototype.sayHi = function(p){
  console.log('Hi from AbstractTask');
};
AbstractTask.prototype.setPrecondition = function(p){
  this.precondition = p;
};

AbstractTask.prototype.getPrecondition = function(){
  return this.precondition;
};
/**
 * @method getState
 */
AbstractTask.prototype.getState = function(){ 
return this.state;
}
/**
 * @method setState
 */
AbstractTask.prototype.setState = function(aState){ 
this.state = aState;
}
AbstractTask.prototype.finalizo = function(id){

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
 * @method execute
 */
AbstractTask.prototype.execute = function(){

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

AbstractTask.prototype.toJson = function(){
return JSON.stringify(this);
}
return AbstractTask;
})()