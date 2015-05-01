var DataCollectionTask = (function(){

function DataCollectionTask(id,xPath,value,tipo,state,taskTitle/*,destData*/){
    PrimitiveTask.call(this,id,xPath,value,tipo,state,taskTitle);
    this.msg = "Init ";
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Data Collection '})
    this.type = "DataCollectionTask";
    this.id = id || 10;
    this.tipo = tipo || Object.create(TipoAttribute).init({'value':1});  
    this.value = value || Object.create(SValueAttribute).init({'value':''});  
    this.msg = "Init ";
    this.state = state || Object.create(StateAttribute).init({'value':0}) ;
    this.location = '';
    this.xPath = xPath || Object.create(XPathAttribute).init({'value':'sxPath'});
}
//Lo pongo como primitiva, por ahora es igual
DataCollectionTask.prototype = new PrimitiveTask();

DataCollectionTask.prototype.instanciamela = function(o){
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

DataCollectionTask.prototype.execute = function(){
    
    var that = this;
    function handler(){
           
        if (window.getSelection) {
            selection = window.getSelection();
            console.debug('en getSelection');
            } else if (document.selection) {
            selection = document.selection.createRange();
            console.debug('en createRange');
        }
        
        //Traigo el texto seleccionado 
        var concept = that.value.value.substring(1,that.value.value.length -1);
        var object = {'value':selection.toString()};
        localStorageManager.saveSharedData(concept,object);

        that.finalizo(that.id);
        document.removeEventListener('mouseup',handler,false);
    
     }
    
    if(this.tipo.getValue() == 1){
        this.finalizo(this.id);
        }else{
            //alert('selecciona texto');
        document.addEventListener("mouseup", handler, false);
        }
}
DataCollectionTask.prototype.setLocation = function(url){
    this.location = url;
}
DataCollectionTask.prototype.init = function(c){
  return new DataCollectionTask(c.id,c.xpath,c.value,c.tipo,c.state,c.taskTitle/*,c.destData*/);
};

/**
* @method htmlToJson
*/
DataCollectionTask.prototype.htmlToJson = function(el_div){

        var str_taskTitle = document.getElementById('task_title_id').value;
        var str_xPath = document.getElementById('xpath_id').value;
        var str_value = document.getElementById('value_id').value;
        var str_state = document.getElementById('state_id').value;
        var str_tipo = document.getElementById('tipo_id').value;
        //var str_destData = document.getElementById('tsgc_dest_data_id').value;

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
        

      /*  var oDestData = Object.create(DestDataAttribute);
        oDestData._type = DestDataAttribute._type;
        oDestData.value = str_destData ;
      */  
        var o_task = new DataCollectionTask(this.id,xPath,oValue,oTipo,oState,oTaskTitle/*,oDestData*/);
        
    return o_task.toJson();
}

DataCollectionTask.prototype.toHtml = function(properties){

    var array_elementos = new Array();
 
    array_elementos.push(this.taskTitle.getHtmlElement());
    array_elementos.push(this.xPath.getHtmlElement());
    array_elementos.push(this.value.getHtmlElement());
    //array_elementos.push(this.destData.getHtmlElement());
    array_elementos.push(this.state.getHtmlElement());
    array_elementos.push(this.tipo.getHtmlElement());

    return array_elementos;
}


   return DataCollectionTask; 
})()