var TableManagerTask = (function(){


function TableManagerTask(id,xPath,value,tipo,state,taskTitle){
    AbstractTask.call(this,id,xPath,value,tipo,state,taskTitle);
    this.msg = "Init ";
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'TableManager '})
    this.type = "TableManagerTask";
    this.location = '';
    this.id = id || 10;
    this.tipo = tipo || Object.create(TipoAttribute).init({'value':1});  
    this.value = value || Object.create(SValueAttribute).init({'value':''});  
    this.msg = "Init ";
    this.state = state || Object.create(StateAttribute).init({'value':0}) ;
    this.location = '';
    this.xPath = xPath || Object.create(XPathAttribute).init({'value':'sxPath'});
}
//Lo pongo como primitiva, por ahora es igual
TableManagerTask.prototype = new AbstractTask();

TableManagerTask.prototype.instanciamela = function(o){
    this.id = o.id || 10;
    this.xPath = Object.create(XPathAttribute).init({'value':o.xPath.value});
    //this.value = (o.value._type =='CValueAttribute')?Object.create(CValueAttribute).init({'value':o.value.value}):Object.create(SValueAttribute).init({'value':o.value.value});
    this.tipo = Object.create(TipoAttribute).init({'value':o.tipo.value})
    this.state = Object.create(StateAttribute).init({'value':(o.state.value).toString()})
    this.taskTitle = Object.create(TaskTitleAttribute).init({'value':o.taskTitle.value})
    this.value = (o.value._type =='CValueAttribute')?Object.create(CValueAttribute).init({'concept':o.value.value,'value':o.value.value}):Object.create(SValueAttribute).init({'value':o.value.value});

    return this;
             
}
TableManagerTask.prototype.execute = function(){
       
    if( confirm('finalizo') ) {
        this.finalizo(this.id);
    }else{
        return false;
    }
    
    
}
TableManagerTask.prototype.setLocation = function(url){
    this.location = url;
}
TableManagerTask.prototype.init = function(c){
  return new TableManagerTask(c.id,c.xpath,c.value,c.tipo,c.state,c.taskTitle);
};

/**
* @method htmlToJson
*/
TableManagerTask.prototype.htmlToJson = function(el_div){

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
        
  
        var o_task = new TableManagerTask(this.id,xPath,oValue,oTipo,oState,oTaskTitle);
        
    return o_task.toJson();
}

TableManagerTask.prototype.toHtml = function(properties){

    var array_elementos = new Array();
 
    array_elementos.push(this.taskTitle.getHtmlElement());
    array_elementos.push(this.xPath.getHtmlElement());
    array_elementos.push(this.value.getHtmlElement());
    array_elementos.push(this.state.getHtmlElement());
    array_elementos.push(this.tipo.getHtmlElement());

    return array_elementos;
}
return TableManagerTask;
})();