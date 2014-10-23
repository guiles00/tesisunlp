 /**
 * @module Tasks
 * PrimitiveTask
 * @class PrimitiveTask
 * @constructor
 */
function PrimitiveTask(id,xPath,value,tipo,state,taskTitle){ //Constructor
this.tipo = tipo;    
this.xPath = xPath;
this.value = value;
this.state = state;
this.id = id;
this.msg = "PrimitiveTask"
this.type = "PrimitiveTask"
this.precondition = {};
this.taskTitle = taskTitle;
}


PrimitiveTask.prototype.setPrecondition = function(p){
  this.precondition = p;
};

PrimitiveTask.prototype.getPrecondition = function(){
  return this.precondition;
};

/**
 * 
 * @method getState
 */
PrimitiveTask.prototype.getState = function(){ 
return this.state;
}
/**
 * 
 * @method setState
 */
PrimitiveTask.prototype.setState = function(aState){ 
this.state = aState;
}
PrimitiveTask.prototype.tempChequeoCondicion = function(texto){
return false;
}
/**
 * 
 * @method execute
 */
PrimitiveTask.prototype.execute = function(){

console.debug('ejecuto esto');
console.debug(this);
//Precondiciones

    var iterator = document.evaluate(this.xPath.getValue(),document,null,0,null);
    var node = iterator.iterateNext();
    //Auto = 1 , Manual = 0
    if(node){
        Manager.highlightElement(node)
        node.value = this.value.getValue();
    
    this.finalizo(this.id);

    return node;

    if(this.tipo == 0){ 
    
    //Por ahora agrego el evento aca si es manual
    var temp = function(e){ 
        console.debug('escucho texto'); console.debug(e.target);  
        var el_id = event.target.id;
        
        if(el_id){
        var sxPath = '//*[@id="'+el_id+'"]';
        }else{
        var sxPath = Recorder.createXPathFromElement(event.target) ;
        }

        document.removeEventListener("change", this , false);   

    }
    document.addEventListener("change", temp , false);   


    //alert('Es Manual, Tengo que ver la condicion de finalizacion?');
    //console.debug(this);



    //document.removeEventListener("change", temp , false);   

    //Por ejemplo, si es FillInputTask, tiene que esperar un evento del tipo change y que sea igual a ese xpath
    //var value = prompt("Ingrese Valor","");
    //if(value !='') alert('todo ok - continuo');

    //if(this.tempChequeoCondicion()) alert('Ok');

    /*node.focus();
    var value = prompt("Ingrese Valor","");
    node.value = value;
    */

    }else{
        Manager.highlightElement(node)
        //node.value= this.value;   
        //console.debug('y esto?');
        //console.debug(this.value);

        node.value = this.value.getValue();
    }
    }else{
        return false;
    }
    //si salio todo ok modifico el estado de la tarea ( por ahora asumo que sale ok)
    this.finalizo(this.id);

    return node;
}

PrimitiveTask.prototype.finalizo = function(id){

//Mando evento de que finalizio la tarea
var event = new CustomEvent("finalizado",{detail: { message: "Finalizado",id: id,},bubbles: true,cancelable: true});

    document.dispatchEvent(event);


//////////
    var oTask = localStorageManager.getObject(id);
    oTask.state.value = 1;
    localStorageManager.setObjectR(JSON.stringify(oTask));
/*
    console.debug(localStorageManager.getObject(id));

    var bpm = localStorage.getItem("BPM");
    var arr_tasks = JSON.parse(bpm);
    //recorro los objetos para buscar la tarea a editar
    var i;
    for(i = 0; i < arr_tasks.length; i = i + 1){
            if( arr_tasks[i].id == id ){
                arr_tasks[i].state.value = 1;
            } 
    }

    localStorage.setItem("BPM",JSON.stringify(arr_tasks));*/  
}

/**
 * @method toHtml
 */
PrimitiveTask.prototype.toHtml = function(properties){
    //Por ahora le paso las propiedades para inflar, pero la misma tarea tiene que saber que elementos HTML tiene
    var obj_properties = JSON.parse(properties);
    this.elements = [];
    
    // @TODO: refactor con lookup
    
        for (var i = 0; i < obj_properties.atributos.length; i++) {
            var type_el = obj_properties.atributos[i].el_type;
            var el_inflator = null;
            switch(type_el){
            case 'input':
            el_inflator = Object.create(inputElement);
            break;
            
            case 'select':
            el_inflator = Object.create(selectElement);
            break;
            
            default:
            return false;
            break;
            }

        el_inflator.label = obj_properties.atributos[i].label;
        el_inflator.value = obj_properties.atributos[i].value;
        el_inflator.id =  obj_properties.atributos[i].id;
        this.elements.push(el_inflator);  

        }

    return this.elements;
}


/**
 * 
 * FillInputTask
 * @class FillInputTask
 * @extends PrimitiveTask
 */
//aId,xPath,value,aMsg,aTipo,aState
function FillInputTask(id,xPath,value,tipo,state,taskTitle){
    PrimitiveTask.call(this,id,xPath,value,tipo,state,taskTitle);
    this.msg = "Enter String to Input ";
    //this.taskTitle = taskTitle;
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Enter String to Input '})
        
    this.type = "FillInputTask";
    this.state = state;
    //this.precondition = {};
}
FillInputTask.prototype = new PrimitiveTask();
//Sobrescribo para hace runa prueba

FillInputTask.prototype.execute = function(){

//Precondiciones

    var iterator = document.evaluate(this.xPath.getValue(),document,null,0,null);
    var node = iterator.iterateNext();
    //Auto = 1 , Manual = 0
    //Ejecuta una tarea manual
    
    console.debug(this);
    var that = this;
    if(node){
        if(this.tipo.getValue() == 1){
        Manager.highlightElement(node)
        node.value = this.value.getValue();
        this.finalizo(this.id);
        }else{
            Manager.highlightElement(node)
            node.addEventListener('change',
        function(){
           that.finalizo(that.id);
        }
        ,false);
        }
    

    return node;
    }
}

/**
 * @method toJson
 */
FillInputTask.prototype.toJson = function(){

return JSON.stringify(this);

}

FillInputTask.init = function(c){
  return new FillInputTask(c.id,c.xpath,c.value,c.tipo,c.state,c.taskTitle);
};

/**
 * @method emptyToJson
 */
FillInputTask.prototype.emptyToJson = function(){
//{"id":0,"type":"FillInputTask","state":0,"atributos":[{"label":"ID","el_type":"input","value":10,"id":"id"},{"label":"xPath","el_type":"input","id":"id_xpath"},{"label":"Valor","el_type":"input","id":"id_value"}]} 
//Aqui armo el objeto JSON segun especifcaciones, que por ahora es igual que JUNIO 20 
   var obj_task = new Object();
    obj_task.id = 0 ;    
    obj_task.type = 'FillInputTask';
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

    obj_task.atributos.push(obj_id);
    obj_task.atributos.push(obj_xpath);
    obj_task.atributos.push(obj_value);

    return JSON.stringify(obj_task);
}

/**
* override
* @method toHtml
*/
FillInputTask.prototype.toHtml = function(properties){
    //Por ahora le paso las propiedades para inflar, pero la misma tarea tiene que saber que elementos HTML tiene
  
    var array_elementos = new Array();
    
    //array_elementos.push(this.precondition.getUrl().getHtmlElement());
    ////console.debug(this.precondition.getUrl().getHtmlElement());
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


        function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
        }    

        //Se que un FillInputTask tiene los campos xPath y value
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
        
        var o_task = new FillInputTask(this.id,xPath,oValue,oTipo,oState);
        o_task.taskTitle = oTaskTitle; //Lo hago por ahora, hay que hacer
    
    return o_task.toJson();
}


/**
* @method htmlToJson
*/
FillInputTask.prototype.NOhtmlToJson = function(el_div){

    var obj_json = new Object();
    obj_json.type = "FillInputTask";
    obj_json.state = 0;
    obj_json.id = this.id;

    obj_json.atributos = new Array();
    var i ;
    var childnodes = el.childNodes;
        for (i = 0; i < childnodes.length ; i = i + 1){
        //mientras que sea un div ( Tiene atributos - elementos HTML)

            if(childnodes[i].nodeName == 'DIV'){ 
              var obj_atributo = new Object();
              var j;
              var elements = childnodes[i].childNodes;
                for (j = 0; j < elements.length ; j = j + 1){
                    //recorro otra vez el dom y armo el objeto
                    if(elements[j].nodeName == "#text"){
                    //////console.debug(elements[j].textContent);
                    obj_atributo.label = elements[j].textContent;
                    }
                    if(elements[j].nodeName == "INPUT"){
                    obj_atributo.el_type = 'input';
                    obj_atributo.value = elements[j].value;
                    obj_atributo.id = elements[j].id;
                    }
                    }
                obj_json.atributos.push(obj_atributo);
            }
        }

    return JSON.stringify(obj_json);
}

//Herencia --> PrimitiveTask
function SelectOptionTask(id,xPath,value,tipo,state,taskTitle){
    PrimitiveTask.call(this,id,xPath,value,tipo,state);
    this.msg = "SelectOptionTask";
    this.type = "SelectOptionTask";
    this.state = state;
}
SelectOptionTask.prototype = new PrimitiveTask();

SelectOptionTask.init = function(c){
  return new SelectOptionTask(c.id,c.xpath,c.value,c.tipo,c.state);
};
SelectOptionTask.prototype.toHtml = function(properties){

    var array_elementos = new Array();
    array_elementos.push(this.xPath.getHtmlElement());
    
    var el_select = Object.create(selectElement);
    el_select.specs = this.xPath.getValue();    
    array_elementos.push(el_select);
    array_elementos.push(this.value.getHtmlElement());
    array_elementos.push(this.state.getHtmlElement());
    array_elementos.push(this.tipo.getHtmlElement());

    
    return array_elementos;
}
SelectOptionTask.prototype.NotoHtml = function(properties){
    //Por ahora le paso las propiedades para inflar, pero la misma tarea tiene que saber que elementos HTML tiene
    var obj_properties = JSON.parse(properties);
    this.elements = [];
    
    // @TODO: refactor con lookup
    //Hardcodeo
    //Traigo el xPath
       var xPath = obj_properties.atributos[1].value ;     
    
        for (var i = 0; i < obj_properties.atributos.length; i++) {

            var type_el = obj_properties.atributos[i].el_type;
            var el_inflator = null;
            switch(type_el){
            case 'input':
            el_inflator = Object.create(inputElement);
            break;
            
            case 'select':
        //console.debug('es un select, le paso el xPath');
        conscole.debug(xPath);  
            el_inflator = Object.create(selectElement);

            el_inflator.specs = xPath;
            break;
            
            default:
            return false;
            break;
            }

        el_inflator.label = obj_properties.atributos[i].label;
        el_inflator.value = obj_properties.atributos[i].value;
        el_inflator.id =  obj_properties.atributos[i].id;
        this.elements.push(el_inflator);  

        }

    return this.elements;
}


SelectOptionTask.prototype.toJson = function(){
    return JSON.stringify(this);
}

/**
* @method htmlToJson
*/
FillInputTask.prototype.NOhtmlToJson = function(el_div){

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

        //Se que un FillInputTask tiene los campos xPath y value
        var xPath = Object.create(XPathAttribute);
        xPath.value = str_xPath;

        var oValue = Object.create(OValueAttribute);
        oValue._type = OValueAttribute._type;
        oValue.value = str_value;
        
       
        var oState = Object.create(StateAttribute);
        oState._type = StateAttribute._type;
        oState.value = str_state;
         
        var o_task = new SelectOptionTask(this.id,xPath,oValue,0,oState);
        
    return o_task.toJson();
}


SelectOptionTask.prototype.htmlToJson = function(el_div){

    var obj_json = new Object();
    obj_json.type = "SelectOptionTask";
    obj_json.state = 0;
    obj_json.id = this.id;

    obj_json.atributos = new Array();
    var i ;
    var childnodes = el.childNodes;
        for (i = 0; i < childnodes.length ; i = i + 1){
        //mientras que sea un div ( Tiene atributos - elementos HTML)

            if(childnodes[i].nodeName == 'DIV'){ 
              var obj_atributo = new Object();
              var j;
              var elements = childnodes[i].childNodes;
                for (j = 0; j < elements.length ; j = j + 1){
                    //recorro otra vez el dom y armo el objeto
                    if(elements[j].nodeName == "#text"){
                    //////console.debug(elements[j].textContent);
                    obj_atributo.label = elements[j].textContent;
                    }
                    if(elements[j].nodeName == "INPUT"){
                    obj_atributo.el_type = 'input';
                    obj_atributo.value = elements[j].value;
                    obj_atributo.id = elements[j].id;
                    }else if(elements[j].nodeName == "SELECT"){
                        
                        obj_atributo.el_type = 'select';
                        obj_atributo.value = elements[j].value;
                        obj_atributo.id = elements[j].id;
                    }
                    }
                obj_json.atributos.push(obj_atributo);
            }
        }

    return JSON.stringify(obj_json);
}

//Herencia --> PrimitiveTask
function TextAreaTask(id,xPath,value,tipo,state,taskTitle){
    PrimitiveTask.call(this,id,xPath,value,tipo,state,taskTitle);
    this.msg = "Enter String TextArea ";
    this.type = "TextAreaTask";
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Enter String TextArea '})
    this.state = state;
}
TextAreaTask.prototype = new PrimitiveTask();

TextAreaTask.init = function(c){
  return new TextAreaTask(c.id,c.xpath,c.value,c.tipo,c.state);
};
TextAreaTask.prototype.toJson = function(){

return JSON.stringify(this); 

}
/**
 * @method emptyToJson
 */
TextAreaTask.prototype.emptyToJson = function(){
//{"id":0,"type":"FillInputTask","state":0,"atributos":[{"label":"ID","el_type":"input","value":10,"id":"id"},{"label":"xPath","el_type":"input","id":"id_xpath"},{"label":"Valor","el_type":"input","id":"id_value"}]} 
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
                

         function isJson(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
            }    


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

        

        var oTaskTitle = Object.create(TaskTitleAttribute);
        oTaskTitle._type = TaskTitleAttribute._type;
        oTaskTitle.value = str_taskTitle;

        var o_task = new TextAreaTask(this.id,xPath,oValue,oTipo,oState,oTaskTitle);
        
    return o_task.toJson();
}


/**
 * 
 * CheckBoxTask
 * @class CheckBoxTask
 * @constructor
 */
function CheckBoxTask(id,xPath,value,tipo,state,taskTitle){
    PrimitiveTask.call(this,id,xPath,value,tipo,state);
    this.msg = "CheckBoxTask";
    this.type = "CheckBoxTask";
    this.state = state;

}
CheckBoxTask.prototype = new PrimitiveTask();
CheckBoxTask.init = function(c){
  return new CheckBoxTask(c.id,c.xpath,c.value,c.tipo,c.state);
};
CheckBoxTask.prototype.execute = function(){

var iterator = document.evaluate(this.xPath,document,null,0,null);
var node = iterator.iterateNext();
    node.checked= true;
  
    this.finalizo();

    return node;
}

function RadioTask(id,xPath,value,tipo,state,taskTitle){
    PrimitiveTask.call(this,id,xPath,value,tipo,state);
    this.msg = "RadioTask";
    this.type = "RadioTask";
    this.state = state;

}
RadioTask.prototype = new PrimitiveTask();

RadioTask.init = function(c){
  return new RadioTask(c.id,c.xpath,c.value,c.tipo,c.state);
};

RadioTask.prototype.execute = function(){

var iterator = document.evaluate(this.xPath,document,null,0,null);
var node = iterator.iterateNext();
    node.checked= true;
  
    this.finalizo();

    return node;
}


//==========================================================================//
// Tareas de carga de Pagina //



function ClickLinkTask(id,xPath,value,tipo,state,taskTitle){
    //console.debug('ejecuto tarea click Link');
    //console.debug('ejecutando:');
    //console.debug(localStorage.getItem("BPMEXECUTION"));

    PrimitiveTask.call(this,id,xPath,value,tipo,state);
    this.msg = "Click Link ";
    this.type = "ClickLinkTask";
    this.state = state;
}
ClickLinkTask.prototype = new PrimitiveTask();
ClickLinkTask.init = function(c){
  return new ClickLinkTask(c.id,c.xpath,c.value,c.tipo,c.state);
};
/**
 * @method toJson
 */
ClickLinkTask.prototype.toJson = function(){
return JSON.stringify(this);
}
/**
* override
* @method toHtml
*/

ClickLinkTask.prototype.toHtml = function(){

    var array_elementos = new Array();

    array_elementos.push(this.xPath.getHtmlElement());
    array_elementos.push(this.value.getHtmlElement());
    array_elementos.push(this.state.getHtmlElement());
    array_elementos.push(this.tipo.getHtmlElement());

    return array_elementos;
}

/**
* @method htmlToJson
*/
ClickLinkTask.prototype.htmlToJson = function(el_div){

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

        var o_task = new ClickLinkTask(this.id,xPath,'',oTipo,oState);
        
    return o_task.toJson();
}

ClickLinkTask.prototype.execute = function(){

    var iterator = document.evaluate(this.xPath.getValue(),document,null,0,null);
    var node = iterator.iterateNext();
    
    console.debug(node);
    //Como es un clic, hago clic en el nodo.
    node.click();
    
    //si salio todo ok modifico el estado de la tarea ( por ahora asumo que sale ok)
    this.finalizo(this.id);

    return true;

}


//==========================================================================//
// Tareas de Aumentación (Augmentation) //

 /**
 * 
 * AugmentedTask
 * @class PrimitiveTask
 * @constructor
 */
function AugmentedTask(id,link,value,tipo,state,taskTitle){
this.tipo = tipo;
this.xPath = '';    
this.link = link;
this.value = value;
this.state = state;
this.id = id;
this.msg = "Augmentation"
}
AugmentedTask.prototype.finalizo = function(id){

    var bpm = localStorage.getItem("BPM");
    var arr_tasks = JSON.parse(bpm);
    //recorro los objetos para buscar la tarea a editar
    var i;
    for(i = 0; i < arr_tasks.length; i = i + 1){
            if( arr_tasks[i].id == id ){
                arr_tasks[i].state = 1;
            } 
    }
    localStorage.setItem("BPM",JSON.stringify(arr_tasks));  
}

function LinkATask(id,link,value,msg,tipo,state,taskTitle){
    //console.debug('ejecuto tarea LinkATask');
    //console.debug('ejecutando:');
    //console.debug(localStorage.getItem("BPMEXECUTION"));

    //PrimitiveTask.call(this,id,link,value,tipo,state);
    this.msg = "LinkATask";
    this.state = state;
    this.id = id;
    this.link = link;
}
LinkATask.prototype = new AugmentedTask(); 
/**
 * @method toJson
 */
LinkATask.prototype.toJson = function(){
//Aqui armo el objeto JSON segun especifcaciones, que por ahora es igual que JUNIO 20 
   var obj_task = new Object();
    obj_task.id = 0 ;    
    obj_task.type = 'LinkATask';
    obj_task.state = 0;
    obj_task.atributos  = new Array();

    var obj_id = new Object();
    obj_id.label = 'ID';
    obj_id.el_type = 'input';
    obj_id.value = 10;
    obj_id.id = 'id';

    //@TEMP Creo objetos - y hardcodeo para ver como funciona
    //{"label": "xPath","el_type": "input","value": "/html/","id": "id_xpath"}
    var obj_link = new Object();
    obj_link.label = 'Link';
    obj_link.el_type = 'input';
    obj_link.value = this.link;
    obj_link.id = 'id_link';
    
    obj_task.atributos.push(obj_id);
    obj_task.atributos.push(obj_link);
    

    return JSON.stringify(obj_task);
}
/**
* override
* @method toHtml
*/
LinkATask.prototype.toHtml = function(properties){
    //Por ahora le paso las propiedades para inflar, pero la misma tarea tiene que saber que elementos HTML tiene
    var obj_properties = JSON.parse(properties);
    this.elements = [];
    
    // @TODO: refactor con lookup
    
        for (var i = 0; i < obj_properties.atributos.length; i++) {
            var type_el = obj_properties.atributos[i].el_type;
            var el_inflator = null;
            switch(type_el){
            case 'input':
            el_inflator = Object.create(inputElement);
            break;
            
            case 'select':
            el_inflator = Object.create(selectElement);
            break;
            
            default:
            return false;
            break;
            }

        el_inflator.label = obj_properties.atributos[i].label;
        el_inflator.value = obj_properties.atributos[i].value;
        el_inflator.id =  obj_properties.atributos[i].id;
        this.elements.push(el_inflator);  

        }

    return this.elements;
}
/**
* @method htmlToJson
*/
LinkATask.prototype.htmlToJson = function(el_div){

    var obj_json = new Object();
    obj_json.type = "LinkATask";
    obj_json.state = 0;
    obj_json.id = this.id;

    obj_json.atributos = new Array();
    var i ;
    var childnodes = el.childNodes;
        for (i = 0; i < childnodes.length ; i = i + 1){
        //mientras que sea un div ( Tiene atributos - elementos HTML)

            if(childnodes[i].nodeName == 'DIV'){ 
              var obj_atributo = new Object();
              var j;
              var elements = childnodes[i].childNodes;
                for (j = 0; j < elements.length ; j = j + 1){
                    //recorro otra vez el dom y armo el objeto
                    if(elements[j].nodeName == "#text"){
                    //////console.debug(elements[j].textContent);
                    obj_atributo.label = elements[j].textContent;
                    }
                    if(elements[j].nodeName == "INPUT"){
                    obj_atributo.el_type = 'input';
                    obj_atributo.value = elements[j].value;
                    obj_atributo.id = elements[j].id;
                    }
                    }
                obj_json.atributos.push(obj_atributo);
            }
        }

    return JSON.stringify(obj_json);
}

/**
 * @method emptyToJson
 */
LinkATask.prototype.emptyToJson = function(){

   var obj_task = new Object();
    obj_task.id = 0 ;    
    obj_task.type = 'LinkATask';
    obj_task.state = 0;
    obj_task.atributos  = new Array();

    var obj_id = new Object();
    obj_id.label = 'ID';
    obj_id.el_type = 'input';
    obj_id.value = 0;
    obj_id.id = 'id';

    var obj_link = new Object();
    obj_link.label = 'HREF';
    obj_link.el_type = 'input';
    obj_link.value = '';
    obj_link.id = 'id_link';
    var obj_value = new Object();
    


    obj_task.atributos.push(obj_id);
    obj_task.atributos.push(obj_link);

    return JSON.stringify(obj_task);
}
LinkATask.prototype.execute = function(){
    var aLink = 'http://'+this.link;
    //window.open(aLink);
    var myWindow = window.open(aLink, "MsgWindow", "width=200, height=100");
    //myWindow.document.write("<p>This is 'MsgWindow'. I am 200px wide and 100px tall!</p>");//alert('ejecuto!!!');
   // //console.debug('finalizo esta');
    
    this.finalizo(this.id);

    return true;

}
/*
LinkATask.prototype.execute = function(){

    //var iterator = document.evaluate(this.xPath,document,null,0,null);
    //var node = iterator.iterateNext();
    //Como es un clic, hago clic en el nodo.

    window.open(this.);
    alert('pop up de un link');
    //si salio todo ok modifico el estado de la tarea ( por ahora asumo que sale ok)
    this.finalizo(this.id);

    return true;

}
*/