var NotasTask = (function(){


function NotasTask(id,xPath,value,tipo,state,taskTitle){
    AbstractTask.call(this,id,xPath,value,tipo,state,taskTitle);
    this.msg = "Init ";
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Notas Task '})
    this.type = "NotasTask";
    this.state = state;
    this.location = '';
}
//Lo pongo como primitiva, por ahora es igual
NotasTask.prototype = new AbstractTask();

NotasTask.prototype.execute = function(){
       
    console.log('agrega la nota de todo lo que le ponga!!!')
    
    var iterator = document.evaluate(this.xPath.getValue(),document,null,0,null);
    var node = iterator.iterateNext();
    //agrego label
    var label = document.createElement('label');
    label.style.cssText = "color: red;display:block;";
    label.innerHTML = this.value.getValue();
   
    node.parentNode.insertBefore(label,node.nextSibling)

    this.finalizo(this.id);
}
NotasTask.prototype.setLocation = function(url){
    this.location = url;
}
NotasTask.prototype.init = function(c){
  return new NotasTask(c.id,c.xpath,c.value,c.tipo,c.state,c.taskTitle);
};

/**
* @method htmlToJson
*/
NotasTask.prototype.htmlToJson = function(el_div){

        var str_taskTitle = document.getElementById('task_title_id').value;
        var str_xPath = document.getElementById('xpath_id').value;
        var str_value = document.getElementById('value_id').value;
        var str_state = document.getElementById('state_id').value;
        var str_tipo = document.getElementById('tipo_id').value;
        
        
        var xPath = Object.create(XPathAttribute);
        xPath.value = str_xPath;

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
        
  
        var o_task = new NotasTask(this.id,xPath,oValue,oTipo,oState,oTaskTitle);
        
    return o_task.toJson();
}

NotasTask.prototype.toHtml = function(properties){

    var array_elementos = new Array();
 
    array_elementos.push(this.taskTitle.getHtmlElement());
    array_elementos.push(this.xPath.getHtmlElement());
    array_elementos.push(this.value.getHtmlElement());
    array_elementos.push(this.state.getHtmlElement());
    array_elementos.push(this.tipo.getHtmlElement());

    return array_elementos;
}
return NotasTask;
})();