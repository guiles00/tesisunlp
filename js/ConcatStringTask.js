var ConcatStringTask = (function(){


function ConcatStringTask(id,xPath,value,tipo,state,taskTitle,xPath2){
 
    AbstractTask.call(this,id,xPath,value,tipo,state,taskTitle);
    this.id = id || 10;
    this.tipo = tipo || Object.create(TipoAttribute).init({'value':1});  
    this.value = value || Object.create(SValueAttribute).init({'value':''});  
    this.msg = "Init ";
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Concatenate Task '})
    this.type = "ConcatStringTask";
    this.state = state || Object.create(StateAttribute).init({'value':0}) ;
    this.location = '';
    this.xPath2 = xPath2 || Object.create(XPathAttribute).init({'value':'sxPath'});
    this.xPath = xPath || Object.create(XPathAttribute).init({'value':'sxPath2'});
    this.concepto = Object.create(SValueAttribute).init({'value':'concepto','htmlId':'concepto_id','label':'Concepto'});

}
//Lo pongo como primitiva, por ahora es igual
ConcatStringTask.prototype = new AbstractTask();

ConcatStringTask.prototype.instanciamela = function(o){

    //Se que parametros tiene
    //Acoplo estos objetos, aunque me parece que deberia usar json
    //return new ConcatStringTask(o.id,o.xPath,o.value,o.tipo,o.state,o.taskTitle,o.xPath2);
    this.id = o.id || 10;
    this.xPath = Object.create(XPathAttribute).init({'value':o.xPath.value});
    this.value = Object.create(SValueAttribute).init({'value':o.value.value});
    this.tipo = Object.create(TipoAttribute).init({'value':o.tipo.value})
    this.state = Object.create(StateAttribute).init({'value':(o.state.value).toString()})
    this.taskTitle = Object.create(TaskTitleAttribute).init({'value':o.taskTitle.value})
    this.xPath2 = Object.create(XPathAttribute).init({'value':o.xPath2.value,'htmlId':'xpath2_id'});
    this.concepto = Object.create(SValueAttribute).init({'value':o.concepto.value,'htmlId':'concepto_id','label':'Concepto'});

    return this;
             
}
ConcatStringTask.prototype.setConcepto = function(o){
    this.concepto = o;
}
ConcatStringTask.prototype.execute = function(){
       
        //Esta tarea aumentada agarra elementos del DOM y concatena su valor
        //Y guarda en el shared data con el mismo nombre de concepto 
       // return;
        var iterator = document.evaluate(this.xPath.getValue(),document,null,0,null);
        var node = iterator.iterateNext();

        var iterator2 = document.evaluate(this.xPath2.getValue(),document,null,0,null);
        var node2 = iterator2.iterateNext();

        var value = node.value + '.' + node2.value;
        
        var o_value = {"value":value};
        
        localStorageManager.saveSharedData(this.concepto.value,o_value); 
       // var show =this.otroValor.getValue();
        /*****/
        this.finalizo(this.id);
}
ConcatStringTask.prototype.setLocation = function(url){
    this.location = url;
}
ConcatStringTask.init = function(c){
  return new ConcatStringTask(c.id,c.xpath,c.value,c.tipo,c.state,c.taskTitle,c.xpath2);
};

/**
* @method htmlToJson
*/
ConcatStringTask.prototype.htmlToJson = function(el_div){
       
        var str_taskTitle = document.getElementById('task_title_id').value;
        var str_xPath = document.getElementById('xpath_id').value;
        var str_value = document.getElementById('value_id').value;
        var str_state = document.getElementById('state_id').value;
        var str_tipo = document.getElementById('tipo_id').value;

        var str_xPath2 = document.getElementById('xpath2_id').value;
        var str_concepto = document.getElementById('concepto_id').value;
        
        //console.debug(str_xPath2);
        
        var xPath = Object.create(XPathAttribute);
        xPath.value = str_xPath;

        var xPath2 = Object.create(XPathAttribute);
        xPath2.value = str_xPath2;
        xPath2.htmlId = 'xpath2_id';
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
  
    var aoValue = Object.create(SValueAttribute);
        aoValue._type = SValueAttribute._type;
        aoValue.value = str_concepto;
        
        
        var o_task = new ConcatStringTask(this.id,xPath,oValue,oTipo,oState,oTaskTitle,xPath2);
        
        o_task.setConcepto(aoValue); //Este metodo esta por x segundos, hasta que reescriba el metodo htmlToJSON
        console.log('concepto');
        console.debug(aoValue);
        console.debug(o_task.toJson());
        console.log('concepto');
    return o_task.toJson();
}

ConcatStringTask.prototype.toHtml = function(properties){
    
    var array_elementos = new Array();

    array_elementos.push(this.taskTitle.getHtmlElement());
    array_elementos.push(this.xPath.getHtmlElement());
    array_elementos.push(this.xPath2.getHtmlElement());
    array_elementos.push(this.value.getHtmlElement());
    array_elementos.push(this.concepto.getHtmlElement());
    array_elementos.push(this.state.getHtmlElement());
    array_elementos.push(this.tipo.getHtmlElement());

    return array_elementos;
}
return ConcatStringTask;
})()
