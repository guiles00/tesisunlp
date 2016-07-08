var seleccionado = 0; //Es TEMPORAL, como vairas cosas y nunca las cambie :P
var id_tabla = '';
var obj_header = [];
var gtask = {};

//Esto es una funcion que va a un evento, lo tengo que poner afuera
function tableHeaderHandler(e){
                //Comienza a escuchar eventos
                    //traigo el ID de la tarea
                    //console.debug(task);
                    if(e.target.tagName == 'TH' && seleccionado == 0){
                        if( confirm("Seleccionar esta tabla?") ){
                                
                            var el_nom = document.getElementById("div_table_manager_container");
                            id_tabla = e.target.parentNode.parentNode.parentNode.id;
                            
                            //Guardo el nombre de la tabla -- TENIENDO EN CUENTA QUE SIEMPRE TIENE UN ID
                            gtask.value.value = id_tabla;
                            localStorageManager.setObjectR(JSON.stringify(gtask));
    
                            var text = document.createTextNode('Id Table: '+id_tabla);
                            el_nom.appendChild(text);   
                            
                            var el_table_sel = e.target.parentNode.parentNode.parentNode;
                            el_table_sel.addEventListener('click',function(e){
                            
                            });
                            //highlihter_tabla
                            seleccionado = 1;
                            var header = e.target.parentNode.cells;
                            //console.debug(e.target.parentNode.cells);
                            
                            localStorage.setItem(id_tabla,JSON.stringify([]));  
                            /////////////////////Arma cabecera/array
                            for (var i = 0; i < header.length ; i++) {
                                 
                                // console.debug(header[i].innerText);
                                 if(header[i].innerText != ''){

                                   var text = header[i].innerText;
                                   var obj_element = {order:i, header:text, value: ''};
                                    
                                   obj_header.push(obj_element);    
                                 }
                             };
                            
                            ///////////////////
                        }
                    };
}

function filtrar(){
    
    var table_filter = document.getElementById('g_table_filter');
    
    //Recorro y veo si tiene valores
       var array_filter = []; 
       var array_json = []; 
            
            for (var i = 0; i < table_filter.rows.length ; i++) {
                console.debug(table_filter.rows[i].cells[0].innerText);    
                console.debug(table_filter.rows[i].cells[1].firstChild.value);
                //creo el filtro
               
               
                var order = table_filter.rows[i].id;
                var filter_value = table_filter.rows[i].cells[1].firstChild.value;
                if(filter_value != ''){
                    var element = { order: order ,value:filter_value };
                    array_filter.push(element);
                }   
            }
        
        var tabla = document.getElementById(id_tabla);
        
          for( var i = 0 ; i < tabla.rows[0].cells.length ; i++){
                //console.debug(tabla.rows[0].cells[i].innerText);
                array_json.push(tabla.rows[0].cells[i].innerText);
           }
             


             //Filtra //tabla.rows.length
             for (var i = 1; i < tabla.rows.length ; i++) {
                
                for (var j = 0; j < array_filter.length ; j++) { 
            
                   //recorro para comparar
                    
                  var text_a_comparar = tabla.rows[i].cells[ array_filter[j].order ].innerText;
                  var texto_filtrar = array_filter[j].value;
                  //console.debug('compara esto:'+text_a_comparar+' con esto:'+texto_filtrar);

                  if(! text_a_comparar.toUpperCase().includes(texto_filtrar.toUpperCase()) ) {
                        
                        tabla.rows[i].classList.add('hide');
                        
                    }else{
                        guardaElemento(array_json,tabla.rows[i]);
                    } 
                }      
             };
             
             
           
}


function guardaElemento(header,data){
//localStorage.setItem('beca',JSON.stringify([]));
//trae localStorage
var items = JSON.parse(localStorage.getItem(id_tabla));

var elemento = {};

for(var i = 0; i < data.cells.length ; i++){
    //elemento. No me juzguen
    if( !(header[i] == '')){
        elemento[header[i]] = data.cells[i].innerText;       
    }
}

items.push(elemento);

localStorage.setItem(id_tabla,JSON.stringify(items));

return elemento;
}

function saveData(){
    
    var data = document.getElementById(id_tabla);

    console.debug(data);

    
}

function reset(){
    
          var tabla = document.getElementById(id_tabla);
                     
                     //Filtra //tabla.rows.length
                     for (var i = 1; i < tabla.rows.length ; i++) {
                         //console.debug('compara esto');
                         //console.debug(tabla.rows[i].cells[1].innerText);                       
                       // if ( tabla.rows[i].cells[1].innerText.indexOf('BEC') === -1 ){
                            
                            tabla.rows[i].classList.remove('hide');
                       // };
                     };
                     
}

var TableManagerTask = (function(){


function TableManagerTask(id,xPath,value,tipo,state,taskTitle){
    AbstractTask.call(this,id,xPath,value,tipo,state,taskTitle);
    this.msg = "Init ";
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'TableManager '})
    this.type = "TableManagerTask";
    this.location = '';
    this.id = id || 10;
    this.tipo = tipo || Object.create(TipoAttribute).init({'value':1});  
    this.value = value || Object.create(SValueAttribute).init({'value':''});  
    this.msg = "Init ";
    this.state = state || Object.create(StateAttribute).init({'value':0}) ;
    this.location = '';
    this.xPath = xPath || Object.create(XPathAttribute).init({'value':'sxPath'});
}
//Lo pongo como primitiva, por ahora es igual
TableManagerTask.prototype = new AbstractTask();

TableManagerTask.prototype.instanciamela = function(o){
    this.id = o.id || 10;
    this.xPath = Object.create(XPathAttribute).init({'value':o.xPath.value});
    //this.value = (o.value._type =='CValueAttribute')?Object.create(CValueAttribute).init({'value':o.value.value}):Object.create(SValueAttribute).init({'value':o.value.value});
    this.tipo = Object.create(TipoAttribute).init({'value':o.tipo.value})
    this.state = Object.create(StateAttribute).init({'value':(o.state.value).toString()})
    this.taskTitle = Object.create(TaskTitleAttribute).init({'value':o.taskTitle.value})
    this.value = (o.value._type =='CValueAttribute')?Object.create(CValueAttribute).init({'concept':o.value.value,'value':o.value.value}):Object.create(SValueAttribute).init({'value':o.value.value});

    return this;
             
}

TableManagerTask.prototype.escucharTabla = function(){
     document.addEventListener("click",tableHeaderHandler,false);
}

TableManagerTask.prototype.execute = function(){
       
        this.finalizo(this.id);
    
}
TableManagerTask.prototype.conf = function(){
       
    //pongo la tarea como variable global, no es buena idea, pero quiero que funcione, dspues veo como lo arreglo.
    gtask = localStorageManager.getObject(this.id);
    
    //Tiene una tabla asignada?
    //console.debug(gtask.value.value);
    if(gtask.value.value !=''){

       // var el_nom = document.getElementById("div_table_manager_container");
        id_tabla = gtask.value.value;
                            
       // var text = document.createTextNode('Id Table: '+id_tabla);
       // el_nom.appendChild(text);   
                            
    } 

    this.createMasterUI();
    this.escucharTabla();

 /*   if( confirm('finalizo') ) {
        this.finalizo(this.id);
    }else{
        return false;
    }
   */ 
    
}
TableManagerTask.prototype.createUIFilter = function(){
   
    var div_filter = document.createElement("div");
                  
                div_filter.id = "div_filter";
                div_filter.classList.add('inner_topcorner');
                
                var sum_container = document.getElementById("div_table_manager_container");
                
                 var table = document.createElement('table');
                     table.id = 'g_table_filter';
                 //for (var i = 0; i < obj_header.length ; i++) {
                   //console.debug( Object.keys(obj_header) );

                   for (var prop in obj_header) {

                    //console.debug(Object.keys(obj_header[prop]));
                    //console.debug(Object.keys(obj_header[prop]));
                    //creo elemento
                    var tr = document.createElement('tr');
                    tr.id = obj_header[prop].order;
                    var td_title = document.createElement('td');
                    td_title.style.color = "white";
                    td_title.innerText = obj_header[prop].header;

                    var td_value = document.createElement('td');
                    var input_value = document.createElement('input');
                    input_value.type = "text";

                    td_value.appendChild(input_value);

                    tr.appendChild(td_title);
                    tr.appendChild(td_value);

                    table.appendChild(tr);   
                 }
                 
                 
                div_filter.appendChild(table);
                 //botones
                var button_save = document.createElement('input');
                button_save.type = 'button';
                button_save.value = 'Apply Filter';
                button_save.addEventListener('click',filtrar,false);

                var button_reset = document.createElement('input');
                button_reset.type = 'button';
                button_reset.value = 'Reset';
                button_reset.addEventListener('click',reset,false);

                var button_save_data = document.createElement('input');
                button_save_data.type = 'button';
                button_save_data.value = 'Save Data';
                button_save_data.addEventListener('click',saveData,false);

                

                div_filter.appendChild(button_save);
                div_filter.appendChild(button_reset);
                div_filter.appendChild(button_save_data);

                sum_container.appendChild(div_filter);
 
}
TableManagerTask.prototype.createMasterUI = function(){

            var div = document.createElement("div");
                div.classList.add('table_manager_topcorner');
                div.id = "div_table_manager_container";

                var close = document.createElement("input");
                close.classList.add('tesisunlp_close_button');
                close.value="X";
                close.type="button";
                close.addEventListener('click',function(e){
                        
                        var el = document.getElementById('div_table_manager_container');
                        el.remove();
                        
                        document.removeEventListener("click",tableHeaderHandler,false);
                });

                var boton_filtrar = document.createElement("input");
                boton_filtrar.value="Show Header";
                boton_filtrar.type="button";
                boton_filtrar.addEventListener('click',function(){
                     var table_manager = new TableManagerTask();

                     table_manager.createUIFilter();
                     
                     //Trae tabla que voy a filtrar
                     //var tabla = document.getElementById(id_tabla);
                   
                });


                //var div_sum = document.createElement("div");
                
                //div_sum.id = "nombre_tabla";
                
                var body = document.getElementsByTagName("body")[0];
                //div.appendChild(div_sum);
                div.appendChild(close);
                div.appendChild(boton_filtrar);
                //div.appendChild(boton_save);
                
                body.appendChild(div);


}
TableManagerTask.prototype.setLocation = function(url){
    this.location = url;
}
TableManagerTask.prototype.init = function(c){
  return new TableManagerTask(c.id,c.xpath,c.value,c.tipo,c.state,c.taskTitle);
};

/**
* @method htmlToJson
*/
TableManagerTask.prototype.htmlToJson = function(el_div){

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
        
  
        var o_task = new TableManagerTask(this.id,xPath,oValue,oTipo,oState,oTaskTitle);
        
    return o_task.toJson();
}

TableManagerTask.prototype.toHtml = function(properties){

    var array_elementos = new Array();
 
    array_elementos.push(this.taskTitle.getHtmlElement());
    array_elementos.push(this.xPath.getHtmlElement());
    array_elementos.push(this.value.getHtmlElement());
    array_elementos.push(this.state.getHtmlElement());
    array_elementos.push(this.tipo.getHtmlElement());

    return array_elementos;
}
return TableManagerTask;
})();



var tablemanager = new TableManagerTask;

