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
return AbstractTask;

})();
