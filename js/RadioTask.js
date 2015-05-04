var RadioTask = (function(){

function RadioTask(id,xPath,value,tipo,state,taskTitle){
    PrimitiveTask.call(this,id,xPath,value,tipo,state);
    this.msg = "RadioTask";
    this.type = "RadioTask";
    this.state = state;

}
RadioTask.prototype = new PrimitiveTask();

RadioTask.prototype.init = function(c){
  return new RadioTask(c.id,c.xpath,c.value,c.tipo,c.state);
};

RadioTask.prototype.execute = function(){

var iterator = document.evaluate(this.xPath,document,null,0,null);
var node = iterator.iterateNext();
    node.checked= true;
  
    this.finalizo();

    return node;
}

return RadioTask;	
})()
