var AugmentedTask =(function(){


function AugmentedTask(id,xPath,value,tipo,state,taskTitle){ //Constructor
    this.tipo = tipo;    
    this.xPath = xPath;
    this.value = value;
    this.state = state;
    this.id = id;
    this.msg = "AugmentedTask"
    this.type = "AugmentedTask"
    this.precondition = {};
    this.taskTitle = taskTitle;
}

AugmentedTask.prototype.sayHi = function(p){
  console.log('Hi from AugmentedTask');
};
AugmentedTask.prototype.setPrecondition = function(p){
  this.precondition = p;
};

AugmentedTask.prototype.getPrecondition = function(){
  return this.precondition;
};
/**
 * @method getState
 */
AugmentedTask.prototype.getState = function(){ 
return this.state;
}
/**
 * @method setState
 */
AugmentedTask.prototype.setState = function(aState){ 
this.state = aState;
}
AugmentedTask.prototype.finalizo = function(id){

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
AugmentedTask.prototype.execute = function(){

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

AugmentedTask.prototype.toJson = function(){
return JSON.stringify(this);
}
return AugmentedTask;
})()