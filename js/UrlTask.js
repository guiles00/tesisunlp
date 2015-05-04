var UrlTask = (function(){

function UrlTask(id,xPath,value,tipo,state,taskTitle){
    PrimitiveTask.call(this,id,xPath,value,tipo,state,taskTitle);
    this.msg = "Init ";
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Init '})
    this.type = "UrlTask";
    this.location = '';
    this.id = id || 10;
    this.tipo = tipo || Object.create(TipoAttribute).init({'value':1});  
    this.value = value || Object.create(SValueAttribute).init({'value':''});  
    this.msg = "Init ";
    this.state = state || Object.create(StateAttribute).init({'value':0}) ;
    this.location = '';
    this.xPath = xPath || Object.create(XPathAttribute).init({'value':'sxPath'});
}
UrlTask.prototype = new PrimitiveTask();

UrlTask.prototype.instanciamela = function(o){
    this.id = o.id || 10;
    this.xPath = Object.create(XPathAttribute).init({'value':o.xPath.value});
    //this.value = (o.value._type =='CValueAttribute')?Object.create(CValueAttribute).init({'value':o.value.value}):Object.create(SValueAttribute).init({'value':o.value.value});
    this.tipo = Object.create(TipoAttribute).init({'value':o.tipo.value})
    this.state = Object.create(StateAttribute).init({'value':(o.state.value).toString()})
    this.taskTitle = Object.create(TaskTitleAttribute).init({'value':o.taskTitle.value})
    this.value = (o.value._type =='CValueAttribute')?Object.create(CValueAttribute).init({'concept':o.value.value,'value':o.value.value}):Object.create(SValueAttribute).init({'value':o.value.value});

    return this;
             
}

UrlTask.prototype.execute = function(){
    //alert(this.value.getValue());

    //var url = this.location;
    window.location.href = this.value.getValue(); //Usa this.value.getValue() para guardar la ubicacion 
    this.finalizo(this.id);

}
UrlTask.prototype.setLocation = function(url){
    this.location = url;
}
UrlTask.prototype.init = function(c){
  return new UrlTask(c.id,c.xpath,c.value,c.tipo,c.state,c.taskTitle);
};

/**
* @method htmlToJson
*/
UrlTask.prototype.htmlToJson = function(el_div){
// Nothing to do here... 
return false;
        var str_taskTitle = document.getElementById('task_title_id').value;
        var str_xPath = document.getElementById('xpath_id').value;
        var str_value = document.getElementById('value_id').value;
        var str_state = document.getElementById('state_id').value;
        var str_tipo = document.getElementById('tipo_id').value;


        function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
        }    

        //Se que un noFillInputTask tiene los campos xPath y value
        var xPath = Object.create(XPathAttribute);
        xPath.value = str_xPath;

        if(isJson(str_value)) var temp = JSON.parse(str_value);
       
        //@comment Si el str_value es un string u objeto instancio distinto valor
        if(typeof temp === 'object'){
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
        
        var o_task = new noFillInputTask(this.id,xPath,oValue,oTipo,oState,oTaskTitle);
        //o_task.taskTitle = oTaskTitle; //Lo hago por ahora, hay que hacer
    
    return o_task.toJson();
}

return UrlTask;    
})()
