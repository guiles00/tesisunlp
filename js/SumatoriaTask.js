var SumatoriaTask = (function(){


function SumatoriaTask(id,xPath,value,tipo,state,taskTitle/*,destData*/){
    AbstractTask.call(this,id,xPath,value,tipo,state,taskTitle);
    
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Sumatoria Task '})
    this.type = "SumatoriaTask";
    this.id = id || 10;
    this.tipo = tipo || Object.create(TipoAttribute).init({'value':1});  
    this.value = value || Object.create(SValueAttribute).init({'value':''});  
    this.msg = "Init ";
    this.state = state || Object.create(StateAttribute).init({'value':0}) ;
    this.location = '';
    this.xPath = xPath || Object.create(XPathAttribute).init({'value':'sxPath'});
    
}
//Lo pongo como primitiva, por ahora es igual
SumatoriaTask.prototype = new AbstractTask();
SumatoriaTask.prototype.instanciamela = function(o){
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
SumatoriaTask.prototype.execute = function(){
       //Este execute es provisorio, es para la demostracion

        console.log('suma todo lo que le ponga!!!');
        console.log('Hago visible el cuadrito e imprimo esto');
        console.debug(this.value.value);
        var el = document.getElementById('sum_container');
        /*Esto no es asi, lo hago ahora para la demo*/
            var div = document.createElement("div");
                div.classList.add('topcorner');
                div.id = "sum_container";

                var stop = document.createElement("input");
                stop.value="X";
                stop.type="button";
                stop.addEventListener('click',function(){
                    
                     document.removeEventListener('mouseup', handlerSum,false);
                });

                var div_sum = document.createElement("div");
                //div.classList.add('topcorner');
                div_sum.id = "sum";
                var text = document.createTextNode('Sumatoria: '+this.value.value);
                div_sum.appendChild(text);
                var body = document.getElementsByTagName("body")[0];
                div.appendChild(div_sum);
                //div.appendChild(stop);
                
                body.appendChild(div);
        
        /*****/
        this.finalizo(this.id);
}
SumatoriaTask.prototype.setLocation = function(url){
    this.location = url;
}
SumatoriaTask.prototype.init = function(c){
  return new SumatoriaTask(c.id,c.xpath,c.value,c.tipo,c.state,c.taskTitle);
};

/**
* @method htmlToJson
*/
SumatoriaTask.prototype.htmlToJson = function(el_div){

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
        
  
        var o_task = new SumatoriaTask(this.id,xPath,oValue,oTipo,oState,oTaskTitle);
        
    return o_task.toJson();
}

SumatoriaTask.prototype.toHtml = function(properties){

    var array_elementos = new Array();
 
    array_elementos.push(this.taskTitle.getHtmlElement());
    array_elementos.push(this.xPath.getHtmlElement());
    array_elementos.push(this.value.getHtmlElement());
    array_elementos.push(this.state.getHtmlElement());
    array_elementos.push(this.tipo.getHtmlElement());

    return array_elementos;
}
return SumatoriaTask;
})()
