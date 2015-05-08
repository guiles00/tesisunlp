var ClickLinkTask = (function(){

function ClickLinkTask(id,xPath,value,tipo,state,taskTitle){
    PrimitiveTask.call(this,id,xPath,value,tipo,state,taskTitle);
    
    this.type = "ClickLinkTask";
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Click Link '})
    
}
ClickLinkTask.prototype = new PrimitiveTask();

ClickLinkTask.prototype.instanciamela = function(o){
   
    this.id = o.id || 10;
    this.xPath = Object.create(XPathAttribute).init({'value':o.xPath.value});
    this.tipo = Object.create(TipoAttribute).init({'value':o.tipo.value})
    this.state = Object.create(StateAttribute).init({'value':(o.state.value).toString()})
    this.taskTitle = Object.create(TaskTitleAttribute).init({'value':o.taskTitle.value})
    //this.value = (o.value._type =='CValueAttribute')?Object.create(CValueAttribute).init({'concept':o.value.value,'value':o.value.value}):Object.create(SValueAttribute).init({'value':o.value.value});

    return this;
             
}

ClickLinkTask.init = function(c){
  return new ClickLinkTask(c.id,c.xpath,c.value,c.tipo,c.state,c.taskTitle);
};


/**
* @method htmlToJson
*/
ClickLinkTask.prototype.htmlToJson = function(el_div){

        var str_taskTitle = document.getElementById('task_title_id').value;
        var str_xPath = document.getElementById('xpath_id').value;
        var str_state = document.getElementById('state_id').value;
        var str_tipo = document.getElementById('tipo_id').value;


        var xPath = Object.create(XPathAttribute);
        xPath.value = str_xPath;
       
        var oState = Object.create(StateAttribute);
        oState._type = StateAttribute._type;
        oState.value = str_state;
        

        var oTipo = Object.create(TipoAttribute);
        oTipo._type = TipoAttribute._type;
        oTipo.value = str_tipo;

        var oTaskTitle = Object.create(TaskTitleAttribute);
        oTaskTitle._type = TaskTitleAttribute._type;
        oTaskTitle.value = str_taskTitle ;


        var o_task = new ClickLinkTask(this.id,xPath,'',oTipo,oState,oTaskTitle);
        
    return o_task.toJson();
}

ClickLinkTask.prototype.execute = function(){

    var iterator = document.evaluate(this.xPath.getValue(),document,null,0,null);
    var node = iterator.iterateNext();
//    console.debug(node);
    console.debug('click en el input, submit????');
    //Como es un clic, hago clic en el nodo.
    node.click();
    //si salio todo ok modifico el estado de la tarea ( por ahora asumo que sale ok)
    this.finalizo(this.id);
    return true;
}


return ClickLinkTask;    
})()