var HighLightTask = (function(){

/**
 *  Augmented Task - Highlight searchText
 *
 *
 *
 */
 function HighLightTask(id,xPath,value,tipo,state,taskTitle/*,destData*/){
    AbstractTask.call(this,id,xPath,value,tipo,state,taskTitle);
    this.msg = "Init ";
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'HighLight Task '})
    this.type = "HighLightTask";
    this.id = id || 10;
    this.tipo = tipo || Object.create(TipoAttribute).init({'value':1});  
    this.value = value || Object.create(SValueAttribute).init({'value':''});  
    this.state = state || Object.create(StateAttribute).init({'value':0}) ;
    this.location = '';
    //this.xPath = xPath || Object.create(XPathAttribute).init({'value':'sxPath'});
}
//Lo pongo como primitiva, por ahora es igual
HighLightTask.prototype = new AbstractTask();

HighLightTask.prototype.execute = function(){
       
        searchText(this.value.getValue().toString());
        this.finalizo(this.id);
}
HighLightTask.prototype.setLocation = function(url){
    this.location = url;
}
HighLightTask.prototype.init = function(c){
  return new HighLightTask(c.id,c.xpath,c.value,c.tipo,c.state,c.taskTitle);
};

HighLightTask.prototype.instanciamela = function(o){

    //Se que parametros tiene
    //Acoplo estos objetos, aunque me parece que deberia usar json
    //return new ConcatStringTask(o.id,o.xPath,o.value,o.tipo,o.state,o.taskTitle,o.xPath2);
    this.id = o.id || 10;
    //this.xPath = Object.create(XPathAttribute).init({'value':o.xPath.value});
    this.tipo = Object.create(TipoAttribute).init({'value':o.tipo.value})
    this.state = Object.create(StateAttribute).init({'value':(o.state.value).toString()})
    this.taskTitle = Object.create(TaskTitleAttribute).init({'value':o.taskTitle.value})
   // this.value = Object.create(SValueAttribute).init({'value':o.value.value});

    //ojo porque depende el tipo de valor, guardo diferente objeto
    
    this.value = (o.value._type =='CValueAttribute')?Object.create(CValueAttribute).init({'concept':o.value.value,'value':o.value.value}):Object.create(SValueAttribute).init({'value':o.value.value});

    
    return this;
             
}

/**
* @method htmlToJson
*/
HighLightTask.prototype.htmlToJson = function(el_div){

        var str_taskTitle = document.getElementById('task_title_id').value;
      //  var str_xPath = document.getElementById('xpath_id').value;
        var str_value = document.getElementById('value_id').value;
        var str_state = document.getElementById('state_id').value;
        var str_tipo = document.getElementById('tipo_id').value;
        
        
        /*var xPath = Object.create(XPathAttribute);
        xPath.value = str_xPath;*/

        //@comment Si el str_value es un string u objeto instancio distinto valor
        if( str_value.charAt(0) == '[' ){
        var oValue = Object.create(CValueAttribute);
        oValue._type = CValueAttribute._type;
        var str = str_value.toString();
        
        oValue.value = str_value;//str.substring(1,str.length -1);;
        
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
        
  
        var o_task = new HighLightTask(this.id,'undefined',oValue,oTipo,oState,oTaskTitle);
    return o_task.toJson();
}

HighLightTask.prototype.toHtml = function(properties){

    var array_elementos = new Array();
    array_elementos.push(this.taskTitle.getHtmlElement());
    //array_elementos.push(this.xPath.getHtmlElement());
    array_elementos.push(this.value.getHtmlElement());
    array_elementos.push(this.state.getHtmlElement());
    array_elementos.push(this.tipo.getHtmlElement());
    return array_elementos;
}

/**
 * Funcion auxiliar -doHighLight
 *
 *
 */

function doHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag) {
  var count = 0;
  // the highlightStartTag and highlightEndTag parameters are optional
  if ((!highlightStartTag) || (!highlightEndTag)) {
    highlightStartTag = "<font class='animationLiveHighlighting'>";
    highlightEndTag = "</font>";
  }
  
  // find all occurences of the search term in the given text,
  // and add some "highlight" tags to them (we're not using a
  // regular expression search, because we want to filter out
  // matches that occur within HTML tags and script blocks, so
  // we have to do a little extra validation)
  var newText = "";
  var i = -1;
  var lcSearchTerm = searchTerm.toLowerCase();
  var lcBodyText = bodyText.toLowerCase();
    
  while (bodyText.length > 0) {
    i = lcBodyText.indexOf(lcSearchTerm, i+1);
    if (i < 0) {
      newText += bodyText;
      bodyText = "";
    } else {
      // skip anything inside an HTML tag
      if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
    
        // skip anything inside a <script> block
        if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {
            //Saca la consola tambien
          if (lcBodyText.lastIndexOf("/div>", i) >= lcBodyText.lastIndexOf('div_consola', i)) {
          
          newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, searchTerm.length) + highlightEndTag;
          bodyText = bodyText.substr(i + searchTerm.length);
          lcBodyText = bodyText.toLowerCase();
          i = -1;
          count++;
        }
    }
      }
    }
  }
  if(count>0)console.debug(count);
  return newText;
};

function searchText(a){

    //Por las dudas saco los espacios
    var a = a.trim();

    var items = document.getElementsByTagName("*");
    
    var tags_allowed = ['P','H2','H3','H4','H5','A','INPUT','FORM'];
    for (var i = 0; i < items.length ; i++) {
        //Sólo reemplaza los tags permitidos 
        if(tags_allowed.indexOf(items[i].nodeName) >= 0){
          //items[i].innerHTML = items[i].innerHTML.replace(a,'<font class="animationLiveHighlighting">'+a+'</font>');    
          items[i].innerHTML = doHighlight(items[i].innerHTML, a)      
        }
    }
    return false;
    
}
return HighLightTask;

})();