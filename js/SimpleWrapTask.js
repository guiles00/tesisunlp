var SimpleWrapTask = (function(){


function SimpleWrapTask(id,xPath,value,tipo,state,taskTitle/*,destData*/){
    AbstractTask.call(this,id,xPath,value,tipo,state,taskTitle);
    
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Wrap Element '})
    this.type = "SimpleWrapTask";
    this.id = id || 10;
    this.tipo = tipo || Object.create(TipoAttribute).init({'value':1});  
    this.value = value || Object.create(SValueAttribute).init({'value':''});  
    this.msg = "Init ";
    this.state = state || Object.create(StateAttribute).init({'value':0}) ;
    this.location = '';
    this.xPath = xPath || Object.create(XPathAttribute).init({'value':'sxPath'});
    
}
//Lo pongo como primitiva, por ahora es igual
SimpleWrapTask.prototype = new AbstractTask();
SimpleWrapTask.prototype.instanciamela = function(o){
    //Se que parametros tiene
    //Acoplo estos objetos, aunque me parece que deberia usar json
    //return new ConcatStringTask(o.id,o.xPath,o.value,o.tipo,o.state,o.taskTitle,o.xPath2);
    this.id = o.id || 10;
    this.xPath = Object.create(XPathAttribute).init({'value':o.xPath.value});
    this.value = Object.create(SValueAttribute).init({'value':o.value.value});
    this.tipo = Object.create(TipoAttribute).init({'value':o.tipo.value})
    this.state = Object.create(StateAttribute).init({'value':(o.state.value).toString()})
    this.taskTitle = Object.create(TaskTitleAttribute).init({'value':o.taskTitle.value})
    return this;
             
}
SimpleWrapTask.prototype.execute = function(){
       //Este execute es provisorio, es para la demostracion

        console.debug('this.value.value');
        
        //var iterator = document.evaluate(this.xPath.getValue(),document,null,0,null);
        //var node = iterator.iterateNext();
       
        searchText(this.value.getValue().toString());
        
            
        console.debug('this.value.value');
       
        /*****/
        this.finalizo(this.id);
}
SimpleWrapTask.prototype.setLocation = function(url){
    this.location = url;
}
SimpleWrapTask.prototype.init = function(c){
  return new SimpleWrapTask(c.id,c.xpath,c.value,c.tipo,c.state,c.taskTitle);
};

/**
* @method htmlToJson
*/
SimpleWrapTask.prototype.htmlToJson = function(el_div){

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
        
        var oGroup = Object.create(StateAttribute);
        oGroup._type = StateAttribute._type;
        oGroup.value = str_tipo;

        var o_task = new SimpleWrapTask(this.id,xPath,oValue,oTipo,oState,oTaskTitle);
        var t = localStorageManager.getObject(this.id);

        o_task.setGroup(t.group);

    return o_task.toJson();
}

SimpleWrapTask.prototype.toHtml = function(properties){

    var array_elementos = new Array();
 
    array_elementos.push(this.taskTitle.getHtmlElement());
    array_elementos.push(this.xPath.getHtmlElement());
    array_elementos.push(this.value.getHtmlElement());
    array_elementos.push(this.state.getHtmlElement());
    array_elementos.push(this.tipo.getHtmlElement());

    return array_elementos;
}


function searchText(a){

    //Por las dudas saco los espacios
    var a = a.trim();

    var items = document.getElementsByTagName("*");
    
    var tags_allowed = ['P','H2','H3','H4','H5','A','FORM']; //'INPUT',,'FORM'
    for (var i = 0; i < items.length ; i++) {
        //Sólo reemplaza los tags permitidos 
        if(tags_allowed.indexOf(items[i].nodeName) >= 0){
          
            //Si es un input que no haga nada
          if( items[i].nodeName != 'INPUT'){
            console.debug('reemplaza esto');
            console.debug(items[i]);
            console.debug('por esto');
          items[i].innerHTML = items[i].innerHTML.replace(a,'<span style="color:red">'+a+'</span>');    
          console.debug(items[i]);
          };
        }
    }
    return false;
    
}


return SimpleWrapTask;
})()
