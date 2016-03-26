var FillInputTask = (function(){
/**
 * FillInputTask
 * @class FillInputTask
 * @extends PrimitiveTask
 */
function FillInputTask(id,xPath,value,tipo,state,taskTitle){
    PrimitiveTask.call(this,id,xPath,value,tipo,state,taskTitle);

    this.type = "FillInputTask";
    this.value = value || Object.create(SValueAttribute).init({'value':''});  
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Enter String to Input '});
    this.shared = false;
    
}
FillInputTask.prototype = new PrimitiveTask();

FillInputTask.prototype.instanciamela = function(o){
    //Acoplo estos objetos, no me salio el reviver de JSON
    this.id = o.id || 10;
    this.xPath = Object.create(XPathAttribute).init({'value':o.xPath.value});
    this.tipo = Object.create(AutoAttribute).init({'value':o.tipo.value});
    this.state = Object.create(StateAttribute).init({'value':(o.state.value).toString()});
    this.taskTitle = Object.create(TaskTitleAttribute).init({'value':o.taskTitle.value});
    this.value = (o.value._type =='CValueAttribute')?Object.create(CValueAttribute).init({'concept':o.value.value,'value':o.value.value}):Object.create(SValueAttribute).init({'value':o.value.value});


    //Guardar en shared data?

    this.shared = Object.create(AutoAttribute).init({'value':false});  //Esto es temporal


    return this;
             
}


FillInputTask.prototype.execute = function(){
    //alert('ejecuta');
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

/*FillInputTask.prototype.init = function(c){
  return new FillInputTask(c.id,c.xpath,c.value,c.tipo,c.state,c.taskTitle);
};*/

FillInputTask.prototype.toHtml = function(properties){
    /*console.debug('this.value');
    console.debug(this.value);
    console.debug(this.value.getHtmlElement() );
    console.debug('this.value');
*/
    var array_elementos = new Array();
 
    array_elementos.push(this.taskTitle.getHtmlElement());
    array_elementos.push(this.xPath.getHtmlElement());
    array_elementos.push(this.value.getHtmlElement());
    array_elementos.push(this.state.getHtmlElement());
    array_elementos.push(this.tipo.getHtmlElement());
    //array_elementos.push(this.group.getHtmlElement());
    
    return array_elementos;
}


/**
* @method htmlToJson
*/
FillInputTask.prototype.htmlToJson = function(el_div){

        /*var el_test = document.getElementById('div_inflate');
        console.debug(el_test);
        */
        var str_taskTitle = document.getElementById('task_title_id').value;
        var str_xPath = document.getElementById('xpath_id').value;
        var str_value = document.getElementById('value_id').value;
        var str_state = document.getElementById('state_id').value;
        var str_tipo = document.getElementById('auto_id').checked;
        //var str_group = document.getElementById('group_id').value;

       // console.debug(str_tipo);
       // return;
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
        

//Reemplazo el atributo tipo por el atributo Automatico(Para determinar si las tareas son automaticas o manuales)

        var oTipo = Object.create(AutoAttribute);
        oTipo._type = TipoAttribute._type;
        oTipo.value = (str_tipo == true)? 0 : 1;


       /* var oTipo = Object.create(TipoAttribute);
        oTipo._type = TipoAttribute._type;
        oTipo.value = str_tipo;
        */

//****
        var oTaskTitle = Object.create(TaskTitleAttribute);
        oTaskTitle._type = TaskTitleAttribute._type;
        oTaskTitle.value = str_taskTitle ;


        var oGroup = Object.create(StateAttribute);
        oGroup._type = StateAttribute._type;
        oGroup.value = str_tipo;
       
        var t = localStorageManager.getObject(this.id);
        console.debug('t');
        console.debug(t);
        console.debug('/t');
        var o_task = new FillInputTask(this.id,xPath,oValue,oTipo,oState,oTaskTitle);
        //o_task.taskTitle = oTaskTitle; //Lo hago por ahora, hay que hacer
        o_task.setGroup(t.group);
    return o_task.toJson();
}

return FillInputTask;
})()