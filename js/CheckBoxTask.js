function CheckBoxTask(id,xPath,value,tipo,state,taskTitle){
    PrimitiveTask.call(this,id,xPath,value,tipo,state);
	
	this.type = "CheckBoxTask";
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'CheckBox Task '})

}
CheckBoxTask.prototype = new PrimitiveTask();

CheckBoxTask.prototype.instanciamela = function(o){
    //Acoplo estos objetos, no me salio el reviver de JSON
    this.id = o.id || 10;
    this.xPath = Object.create(XPathAttribute).init({'value':o.xPath.value});
    this.tipo = Object.create(TipoAttribute).init({'value':o.tipo.value})
    this.state = Object.create(StateAttribute).init({'value':(o.state.value).toString()})
    this.taskTitle = Object.create(TaskTitleAttribute).init({'value':o.taskTitle.value})
    this.value = (o.value._type =='CValueAttribute')?Object.create(CValueAttribute).init({'concept':o.value.value,'value':o.value.value}):Object.create(SValueAttribute).init({'value':o.value.value});

    return this;
             
}


CheckBoxTask.prototype.execute = function(){

var iterator = document.evaluate(this.xPath,document,null,0,null);
var node = iterator.iterateNext();
    node.checked= true;
  
    this.finalizo();

    return node;
}