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
 * @method getState
 */
PrimitiveTask.prototype.getState = function(){ 
return this.state;
}
/**
 * @method setState
 */
PrimitiveTask.prototype.setState = function(aState){ 
this.state = aState;
}
/** 
 * @method execute
 */
PrimitiveTask.prototype.execute = function(){

//Precondiciones
//
    var iterator = document.evaluate(this.xPath.getValue(),document,null,0,null);
    var node = iterator.iterateNext();
    //Auto = 1 , Manual = 0
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


PrimitiveTask.prototype.finalizo = function(id){

var oTask = localStorageManager.getObject(id);
console.log('trae objeto '+id);
console.debug(oTask);

    oTask.state.value = 1;
    localStorageManager.setObjectR(JSON.stringify(oTask));

    //Mando evento de que finalizio la tarea
    var event = new CustomEvent("finalizado",{detail: { message: "Finalizado",id: id,},bubbles: true,cancelable: true});
    document.dispatchEvent(event);

}

/**
 * @method toHtml
 */
PrimitiveTask.prototype.toHtml = function(properties){

    var array_elementos = new Array();
    array_elementos.push(this.taskTitle.getHtmlElement());
    array_elementos.push(this.xPath.getHtmlElement());
    array_elementos.push(this.value.getHtmlElement());
    array_elementos.push(this.state.getHtmlElement());
    array_elementos.push(this.tipo.getHtmlElement());

    return array_elementos;
}

/**
 * @method toJson
 */
PrimitiveTask.prototype.toJson = function(){
return JSON.stringify(this);
}

function RadioTask(id,xPath,value,tipo,state,taskTitle){
    PrimitiveTask.call(this,id,xPath,value,tipo,state);
    this.msg = "RadioTask";
    this.type = "RadioTask";
    this.state = state;

}
RadioTask.prototype = new PrimitiveTask();

RadioTask.prototype.init = function(c){
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

function ClickLinkTask(id,xPath,value,tipo,state,taskTitle){
    PrimitiveTask.call(this,id,xPath,value,tipo,state,taskTitle);
    this.msg = "Click Link ";
    this.type = "ClickLinkTask";
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Click Link '})
    this.state = state;
}
ClickLinkTask.prototype = new PrimitiveTask();

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


function ClickInputTask(id,xPath,value,tipo,state,taskTitle){
    PrimitiveTask.call(this,id,xPath,value,tipo,state,taskTitle);
    this.msg = "Click Button ";
    this.type = "ClickInputTask";
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Click Button '})
    this.state = state;
}
ClickInputTask.prototype = new PrimitiveTask();

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
this.type = "PrimitiveTask"
this.precondition = {};
this.taskTitle = taskTitle;
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
    //@TODO Actualizo en el localStorage el estado finalizado

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



//Tarea que no tiene interaccion con el usuario

function UrlTask(id,xPath,value,tipo,state,taskTitle){
    PrimitiveTask.call(this,id,xPath,value,tipo,state,taskTitle);
    this.msg = "Init ";
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Init '})
    this.type = "UrlTask";
    this.state = state;
    this.location = '';
}
UrlTask.prototype = new PrimitiveTask();

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
