/**
 * 
 * @module EditTasks
*/
/**
* @class optionsElement
*/
var optionsElement = {
    attributes:{}
    ,id: '' 
    ,label:''
    ,options:[]
    ,render: function(){
    
    //select.id="id_options";
    //console.debug(select);
    //return select;
        
        var div_select = document.createElement('div');
        div_select.id = this.id;
        var label = document.createTextNode(this.label);
            div_select.appendChild(label);
        var select = document.createElement('select');
        
        //var len = this.attributes.choices.length;
        var len = this.options.length;
        for (var i = 0; i < len; i++) {
        var option = document.createElement('option');
            option.text = this.options[i][0];
            option.value = this.options[i][1];
            select.appendChild(option);
        }
    
        div_select.appendChild(select);    
    return div_select;
    }
}
/**
* @class selectElement
*/
var selectElement = {
    specs:{}
    ,render: function(){
    
    var iterator = document.evaluate(this.specs,document,null,0,null);
    var node = iterator.iterateNext();
    var select = node.cloneNode(true);
    select.id="id_select";
    //console.debug(select);
    //return select;
        
        var div_select = document.createElement('div');
        var label = document.createTextNode('SELECT');
            div_select.appendChild(label);
    /*    var input = document.createElement('select');
        
        var len = this.specs.choices.length;
        
        for (var i = 0; i < len; i++) {
        var option = document.createElement('option');
            option.text = this.specs.choices[i];
            option.value = this.specs.choices[i];
            input.appendChild(option);
        }
    */    
        //div_select.appendChild(input);

        div_select.appendChild(select);    
    return div_select;
    }
}

/**
* @class inputElement
*/

var inputElement = {
    specs:{}
    ,label:''
    ,id:''
    ,value:''
    ,render: function(){

        var div_input = document.createElement('div');
        var label = document.createTextNode(this.label);
            div_input.appendChild(label);
        var input = document.createElement('input');
            input.type = 'text';
            input.id = this.id;
            input.value = this.value;
            div_input.appendChild(input);

    return div_input;
    }
}
/**
* @class view
*/
var view = {
      render: function(target, elements) {
      console.debug('----------------------');
      console.debug(target);
      console.debug(elements);
      console.debug('----------------------');
      if(target){
      //target.firstChild.innerHTML="";
      target.innerHTML = "";
      }
          for (var i = 0; i < elements.length; i++) {
	      target.appendChild(elements[i].render());
          }
      }
};

/**
* @class inflater
*/
var inflater = {
	properties:[]
	,elements:[]
	,inflate: function(){
	var obj_properties = JSON.parse(this.properties);
    
	// @TODO: refactor con lookup
	this.elements = [];
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
}


var editor = {
	properties: []
	,htmlToJson: function(el_div){

	var obj_json = new Object();
	obj_json.type = "FillInputTask";
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
					////console.debug(elements[j].textContent);
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
}

//Highlighting


function Highlighter(){
//Create a variable that reminds the background color of the trigger element.
this.reminder = '';
}
//Highlight the trigger element on the page.
Highlighter.prototype.highlight = function(event)
{
    this.reminder = event.target.style.backgroundColor;
    event.target.style.backgroundColor = "rgba(255, 255, 0, 0.25)";
    event.target.style.outline = "0.25em solid #FFFF00";
}

//Create the tooltip.
Highlighter.prototype.createTooltip = function (event){
    //console.log("createTooltip() starts.");

    //console.log("The tooltip is generate.");

    var tooltip = document.createElement("div");
    
    //console.log("The tooltip styles are defined.");
    
    tooltip.id = "Tooltip";
    tooltip.style.position = "absolute";
    tooltip.style.top = "0em";
    tooltip.style.right = "0em";
    tooltip.style.padding = "10px";
    tooltip.style.fontFamily = "Arial";
    tooltip.style.fontSize = "large";
    tooltip.style.fontWeight = "bold";
    tooltip.style.color = "#FCFCFC";
    tooltip.style.textAlign = "center";
    tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.50)";
    tooltip.style.zIndex = "100";
    
    //console.log("The tooltip text is set.");
    
    tooltip.innerHTML = event.target.tagName.toLowerCase().toString();
    
    if(event.target.id != "")
    {
        tooltip.innerHTML = tooltip.innerHTML + "#" + event.target.id;
    }
    
    //Get an error when trying to retrieve all elements of a same class.
    if(event.target.className != "")
    {
        var classes = event.target.className.split(" ");
    
        classes.forEach(
    function (aclass)
    {     
        //Error: The node list of getElementsByClassName() is always undefined.
        tooltip.innerHTML = tooltip.innerHTML + "." + aclass + "(" + document.getElementsByClassName(aclass).lenght + ")";
    }
        );
    }
    
    //console.log("The tooltip is returned.");
    
    return tooltip;
}



//Remove the highlight on the previous selected element.
Highlighter.prototype.init = function ()
{
//Setup a global event for onmouseover.
//console.log("Global handlers are set.");

document.onmouseover = mouseoverHandler;
document.onmouseout = mouseoutHandler;
document.onclick = onClickHandler;

//console.log("Script ends.");
}
//Remove the highlight on the previous selected element.
Highlighter.prototype.stop = function ()
{
//Setup a global event for onmouseover.
//console.log("Global handlers are set.");
document.onmouseover = null;
document.onmouseout = null;
document.onclick = null;

//console.log("Script ends.");
}

//Creates a function to handle the global event.
var mouseoverHandler = function (event)
{
    //console.log("mouseover event is trigger.");

    //console.log("highlight() is called.");    
    var high = new Highlighter();
   high.highlight(event);
    
    //console.log("createTooltip() is called and the callback is append to the event target.");
    
    event.target.appendChild(high.createTooltip(event));
}
//Remove the highlight on the previous selected element.
var mouseoutHandler = function (event)
{
    //console.log("mouseout event is trigger.");
    var high = new Highlighter();
    var tooltip = document.getElementById("Tooltip");

    event.target.removeChild(tooltip);

    event.target.style.backgroundColor = high.reminder;
    event.target.style.outline = "none";
}
   

//Remove the highlight on the previous selected element.
var onClickHandler = function (event)
{
    console.log("onClick event is trigger.");
    var xPath = Recorder.createXPathFromElement(event.target) ;
    var el = document.getElementById("id_xpath");
    el.value = xPath;

}
