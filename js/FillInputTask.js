var FillInputTask = (function(){
/**
 * FillInputTask
 * @class FillInputTask
 * @extends PrimitiveTask
 */
function FillInputTask(id,xPath,value,tipo,state,taskTitle){
    PrimitiveTask.call(this,id,xPath,value,tipo,state,taskTitle);
    this.msg = "Enter String to Input ";
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Enter String to Input '})
    this.type = "FillInputTask";
    this.id = id || 10;
    this.tipo = tipo || Object.create(TipoAttribute).init({'value':1});  
    this.value = value || Object.create(SValueAttribute).init({'value':''});  
    this.msg = "Init ";
    this.state = state || Object.create(StateAttribute).init({'value':0}) ;
    this.location = '';
    this.xPath = xPath || Object.create(XPathAttribute).init({'value':'sxPath'});
}
FillInputTask.prototype = new PrimitiveTask();

FillInputTask.prototype.instanciamela = function(o){
    //Se que parametros tiene
    //Acoplo estos objetos, aunque me parece que deberia usar json
    //return new ConcatStringTask(o.id,o.xPath,o.value,o.tipo,o.state,o.taskTitle,o.xPath2);
    this.id = o.id || 10;
    this.xPath = Object.create(XPathAttribute).init({'value':o.xPath.value});
   // this.value = (o.value._type =='CValueAttribute')?Object.create(CValueAttribute).init({'value':o.value.value}):Object.create(SValueAttribute).init({'value':o.value.value});
     this.value = Object.create(SValueAttribute).init({'value':o.value.value});
    this.tipo = Object.create(TipoAttribute).init({'value':o.tipo.value})
    this.state = Object.create(StateAttribute).init({'value':(o.state.value).toString()})
    this.taskTitle = Object.create(TaskTitleAttribute).init({'value':o.taskTitle.value})
    return this;
             
}


FillInputTask.prototype.execute = function(){
    
    var that = this;
/**handlers*/
var handlers = function(){
    console.debug('finaliza esta');
    //console.debug(handlers);
    that.finalizo(that.id);
    document.removeEventListener('change',handlers,false);
    if(node) node.removeEventListener('change',handlers,false);
       
}
//Precondiciones
//
    if(this.xPath.getValue() == ''){


        document.addEventListener('change',
                    /*function(){
                        console.debug(this.callee);
                        document.removeEventListener('change',this,false);
                    }*/handlers
                    ,false);
        return true;
    }
    var iterator = document.evaluate(this.xPath.getValue(),document,null,0,null);
    var node = iterator.iterateNext();
    //Auto = 1 , Manual = 0
    
    if(node){
        if(this.tipo.getValue() == 1){
        Manager.highlightElement(node)
        node.value = this.value.getValue();
        this.finalizo(this.id);
        }else{
                Manager.highlightElement(node)
                node.addEventListener('change',
                    /*function(){
                        that.finalizo(that.id);
                        console.debug(this);
                        node.removeEventListener('change',this,false);
                    }*/handlers
                    ,false);    
        }
    return node;
    }
}

FillInputTask.prototype.init = function(c){
  return new FillInputTask(c.id,c.xpath,c.value,c.tipo,c.state,c.taskTitle);
};


FillInputTask.prototype.toHtml = function(properties){
    console.debug('this.value');
    console.debug(this.value);
    console.debug(this.value.getHtmlElement() );
    console.debug('this.value');

    var array_elementos = new Array();
 
    array_elementos.push(this.taskTitle.getHtmlElement());
    array_elementos.push(this.xPath.getHtmlElement());
    array_elementos.push(this.value.getHtmlElement());
    array_elementos.push(this.state.getHtmlElement());
    array_elementos.push(this.tipo.getHtmlElement());

    return array_elementos;
}


/**
* @method htmlToJson
*/
FillInputTask.prototype.htmlToJson = function(el_div){

        var str_taskTitle = document.getElementById('task_title_id').value;
        var str_xPath = document.getElementById('xpath_id').value;
        var str_value = document.getElementById('value_id').value;
        var str_state = document.getElementById('state_id').value;
        var str_tipo = document.getElementById('tipo_id').value;

/*
        function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
        }    */

        //Se que un FillInputTask tiene los campos xPath y value
        var xPath = Object.create(XPathAttribute);
        xPath.value = str_xPath;

        //Si es un concepto guarda un CAttribute 
        //Por ahora pregunto si el primer caracter es [
       
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
        
        var o_task = new FillInputTask(this.id,xPath,oValue,oTipo,oState,oTaskTitle);
        //o_task.taskTitle = oTaskTitle; //Lo hago por ahora, hay que hacer
    return o_task.toJson();
}

return FillInputTask;
})()