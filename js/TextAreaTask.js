var TextAreaTask = (function(){

function TextAreaTask(id,xPath,value,tipo,state,taskTitle){
    PrimitiveTask.call(this,id,xPath,value,tipo,state,taskTitle);
    this.msg = "Enter String TextArea ";
    this.type = "TextAreaTask";
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Enter String TextArea '})
    this.id = id || 10;
    this.tipo = tipo || Object.create(TipoAttribute).init({'value':1});  
    this.value = value || Object.create(SValueAttribute).init({'value':''});  
    this.msg = "Init ";
    this.state = state || Object.create(StateAttribute).init({'value':0}) ;
    this.location = '';
    this.xPath = xPath || Object.create(XPathAttribute).init({'value':'sxPath'});

    
}
TextAreaTask.prototype = new PrimitiveTask();

TextAreaTask.prototype.instanciamela = function(o){
    //Se que parametros tiene
    //Acoplo estos objetos, aunque me parece que deberia usar json
    //return new ConcatStringTask(o.id,o.xPath,o.value,o.tipo,o.state,o.taskTitle,o.xPath2);
    this.id = o.id || 10;
    this.xPath = Object.create(XPathAttribute).init({'value':o.xPath.value});
   // this.value = (o.value._type =='CValueAttribute')?Object.create(CValueAttribute).init({'value':o.value.value}):Object.create(SValueAttribute).init({'value':o.value.value});
    // this.value = Object.create(SValueAttribute).init({'value':o.value.value});
    this.tipo = Object.create(TipoAttribute).init({'value':o.tipo.value})
    this.state = Object.create(StateAttribute).init({'value':(o.state.value).toString()})
    this.taskTitle = Object.create(TaskTitleAttribute).init({'value':o.taskTitle.value})
    this.value = (o.value._type =='CValueAttribute')?Object.create(CValueAttribute).init({'concept':o.value.value,'value':o.value.value}):Object.create(SValueAttribute).init({'value':o.value.value});

    return this;
             
}


TextAreaTask.prototype.init = function(c){
  return new TextAreaTask(c.id,c.xpath,c.value,c.tipo,c.state);
};
TextAreaTask.prototype.toJson = function(){

return JSON.stringify(this); 

}
/**
 * @method emptyToJson
 */
TextAreaTask.prototype.emptyToJson = function(){
//{"id":0,"type":"noFillInputTask","state":0,"atributos":[{"label":"ID","el_type":"input","value":10,"id":"id"},{"label":"xPath","el_type":"input","id":"id_xpath"},{"label":"Valor","el_type":"input","id":"id_value"}]} 
//Aqui armo el objeto JSON segun especifcaciones, que por ahora es igual que JUNIO 20 
   var obj_task = new Object();
    obj_task.id = 0 ;    
    obj_task.type = 'TextAreaTask';
    obj_task.state = 0;
    obj_task.atributos  = new Array();

    var obj_id = new Object();
    obj_id.label = 'ID';
    obj_id.el_type = 'input';
    obj_id.value = 0;
    obj_id.id = 'id';

    //@TEMP Creo objetos - y hardcodeo para ver como funciona
    //{"label": "xPath","el_type": "input","value": "/html/","id": "id_xpath"}
    var obj_xpath = new Object();
    obj_xpath.label = 'xPath';
    obj_xpath.el_type = 'input';
    obj_xpath.value = '';
    obj_xpath.id = 'id_xpath';
    //{"label": "valor","el_type": "input","value": "un valor","id": "id_value"}
    var obj_value = new Object();
    
    obj_value.label = 'Valor';
    obj_value.el_type = 'input';
    obj_value.value = '';
    obj_value.id = 'id_value';

  var aobj_id = new Object();
    aobj_id.label = 'Otro campo';
    aobj_id.el_type = 'input';
    aobj_id.value = 'un valor';
    aobj_id.id = 'un_id';

    obj_task.atributos.push(obj_id);
    obj_task.atributos.push(obj_xpath);
    obj_task.atributos.push(obj_value);
    obj_task.atributos.push(aobj_id);
    
    return JSON.stringify(obj_task);
}

TextAreaTask.prototype.toHtml = function(properties){
    
    var array_elementos = new Array();
    array_elementos.push(this.taskTitle.getHtmlElement());
    array_elementos.push(this.xPath.getHtmlElement());
    array_elementos.push(this.value.getHtmlElement());
    array_elementos.push(this.state.getHtmlElement());
    array_elementos.push(this.tipo.getHtmlElement());
console.debug('asd');
console.debug(this.value);

console.debug(this.value.getHtmlElement());
    console.debug('asd');
    return array_elementos;
  }


TextAreaTask.prototype.htmlToJson = function(el_div){

        var str_taskTitle = document.getElementById('task_title_id').value;
        var str_xPath = document.getElementById('xpath_id').value;
        var str_value = document.getElementById('value_id').value;
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
       

        var oTaskTitle = Object.create(TaskTitleAttribute);
        oTaskTitle._type = TaskTitleAttribute._type;
        oTaskTitle.value = str_taskTitle;

        var o_task = new TextAreaTask(this.id,xPath,oValue,oTipo,oState,oTaskTitle);
        
    return o_task.toJson();
}

return TextAreaTask;
})()