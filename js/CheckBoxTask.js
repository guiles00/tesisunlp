function CheckBoxTask(id,xPath,value,tipo,state,taskTitle){
    PrimitiveTask.call(this,id,xPath,value,tipo,state);
    this.msg = "CheckBoxTask";
    this.type = "CheckBoxTask";
    this.state = state;

}
CheckBoxTask.prototype = new PrimitiveTask();
CheckBoxTask.prototype.init = function(c){
  return new CheckBoxTask(c.id,c.xpath,c.value,c.tipo,c.state);
};
CheckBoxTask.prototype.execute = function(){

var iterator = document.evaluate(this.xPath,document,null,0,null);
var node = iterator.iterateNext();
    node.checked= true;
  
    this.finalizo();

    return node;
}