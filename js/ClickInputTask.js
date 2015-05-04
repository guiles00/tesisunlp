var ClickInputTask = (function(){

function ClickInputTask(id,xPath,value,tipo,state,taskTitle){
    PrimitiveTask.call(this,id,xPath,value,tipo,state,taskTitle);
    this.msg = "Click Button ";
    this.type = "ClickInputTask";
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Click Button '})
    this.id = id || 10;
    this.tipo = tipo || Object.create(TipoAttribute).init({'value':1});  
    this.value = value || Object.create(SValueAttribute).init({'value':''});  
    this.msg = "Init ";
    this.state = state || Object.create(StateAttribute).init({'value':0}) ;
    this.location = '';
    this.xPath = xPath || Object.create(XPathAttribute).init({'value':'sxPath'});
}
ClickInputTask.prototype = new PrimitiveTask();


ClickInputTask.prototype.instanciamela = function(o){
    this.id = o.id || 10;
    this.xPath = Object.create(XPathAttribute).init({'value':o.xPath.value});
    //this.value = (o.value._type =='CValueAttribute')?Object.create(CValueAttribute).init({'value':o.value.value}):Object.create(SValueAttribute).init({'value':o.value.value});
    this.tipo = Object.create(TipoAttribute).init({'value':o.tipo.value})
    this.state = Object.create(StateAttribute).init({'value':(o.state.value).toString()})
    this.taskTitle = Object.create(TaskTitleAttribute).init({'value':o.taskTitle.value})
    this.value = (o.value._type =='CValueAttribute')?Object.create(CValueAttribute).init({'concept':o.value.value,'value':o.value.value}):Object.create(SValueAttribute).init({'value':o.value.value});

    return this;
             
}

ClickInputTask.prototype.init = function(c){
  return new ClickInputTask(c.id,c.xpath,c.value,c.tipo,c.state,c.taskTitle);
};


/**
* @method htmlToJson
*/
ClickInputTask.prototype.htmlToJson = function(el_div){

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


        var o_task = new ClickInputTask(this.id,xPath,'',oTipo,oState,oTaskTitle);
        
    return o_task.toJson();
}

ClickInputTask.prototype.execute = function(){

    var iterator = document.evaluate(this.xPath.getValue(),document,null,0,null);
    var node = iterator.iterateNext();
    //Como es un clic, hago clic en el nodo.
    try{
    node.click();    
    }catch(err){
        console.log(err);
        return false;
    }
    //si salio todo ok modifico el estado de la tarea ( por ahora asumo que sale ok)
    this.finalizo(this.id);
    return true;
}

return ClickInputTask;    
})()