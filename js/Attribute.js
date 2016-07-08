 /**
 * @module Attribute
 */
var Attribute = {
     _type:'Attribute'
    ,value:''
    ,htmlId:''
    ,label:''
    ,htmlElement:''
    //,hidden:false
    ,init: function(c){

        this.value = c.value || 'aValue' ;
        this.htmlId = c.htmlId || 'aId'; 
        this.label = c.label || 'aLabel';        
        return this;
    }
    ,setValue: function(value){
        this.value = value;
    }
    ,setHtmlId: function(htmlId){
        this.htmlId = htmlId;
    }
    ,setLabel: function(label){
        this.label = label;
    }
    ,getValue: function(){
        return this.value;
    }
    ,getLabel: function(){
        return this.label;
    }
    ,getHtmlElement: function(){    
       return this.htmlElement;
    }
    ,getHtmlId: function(){
        return this.htmlId;
    }
}

var TaskTitleAttribute = {
     _type:'TaskTitleAttribute'
    ,init: function(c){
        this.value = c.value || '' ;
        this.htmlId = c.htmlId || 'task_title_id'; 
        this.label = c.label || ' Task Title: ';
        return this;
    }
    ,getHtmlElement: function(){
        var input_element = Object.create(inputElement);
        input_element.label = this.getLabel();
        input_element.value = this.getValue();
        input_element.id =   this.getHtmlId();
            
       return input_element;
    }
    , __proto__ : Attribute
}


var DestDataAttribute = {
     _type:'DestDataAttribute'
    ,init: function(c){
        this.value = c.value || '' ;
        this.htmlId = c.htmlId || 'tsgc_dest_data_id'; 
        this.label = c.label || 'Dest.';
        return this;
    }
    ,getHtmlElement: function(){
        var input_element = Object.create(inputElement);
        input_element.label = this.getLabel();
        input_element.value = this.getValue();
        input_element.id =   this.getHtmlId();
            
       return input_element;
    }
    , __proto__ : Attribute
}


var XPathAttribute = {
     _type:'XPathAttribute'
    ,init: function(c){
       
        this.value = c.value || '' ;
        this.htmlId = c.htmlId || 'xpath_id'; 
        this.label = c.label || ' xPath: ';
        return this;
    }
    ,getHtmlElement: function(){
        var input_element = Object.create(inputElement);
        input_element.label = this.getLabel();
        input_element.value = this.getValue();
        input_element.id =   this.getHtmlId();
            
       return input_element;
    }
    , __proto__ : Attribute
}

var AutoAttribute = {
    type:'AutoAttribute'
    ,init: function(c){
        this.value = c.value || '' ;
        this.htmlId = c.htmlId || 'auto_id'; 
        this.label = c.label || ' Manual: ';
        this.checked = c.checked || false ;
        return this;
    } 
    ,getHtmlElement: function(){
        var check_element = Object.create(checkElement);
        check_element.label = this.getLabel();
        check_element.id =   this.getHtmlId();
        //check_element.value = this.getValue();

        check_element.checked = (this.getValue() == 0)? true : false;
       return check_element;
    }
    , __proto__ : Attribute
} 


var TipoAttribute = {
    type:'TipoAttribute'
    ,init: function(c){
        this.value = c.value || '' ;
        this.htmlId = c.htmlId || 'tipo_id'; 
        this.label = c.label || ' Auto: ';
        return this;
    } 
    ,getHtmlElement: function(){
        var input_element = Object.create(inputElement);
        input_element.label = this.getLabel();
        input_element.value = this.getValue();
        input_element.id =   this.getHtmlId();
            
       return input_element;
    }
    , __proto__ : Attribute
} 


var IdAttribute = {
    type:'IdAttribute'
    ,init: function(c){
        this.value = c.value || '' ;
        this.htmlId = c.htmlId || 'id_id'; 
        this.label = c.label || 'Id';
        return this;
    } 
    ,getHtmlElement: function(){
        var input_element = Object.create(inputElement);
        input_element.label = this.getLabel();
        input_element.value = this.getValue();
        input_element.id =   this.getHtmlId();
            
       return input_element;
    }
    , __proto__ : Attribute
} 

var StateAttribute = {
    _type:'StateAttribute'
     ,init: function(c){
        this.value = c.value || '' ;
        this.htmlId = c.htmlId || 'state_id'; 
        this.label = c.label || ' Ejecutado: ';
        return this;
    }
    ,getHtmlElement: function(){
        var input_element = Object.create(inputElement);
        input_element.label = this.getLabel();
        input_element.value = this.getValue();
        input_element.id =   this.getHtmlId();
            
       return input_element;
    }
    , __proto__ : Attribute
}


var SValueAttribute = {
     _type:'SValueAttribute'
      ,init: function(c){
        this.value = c.value || '' ;
        this.htmlId = c.htmlId || 'value_id'; 
        this.label = c.label || ' Value: ';
        return this;
    }
    ,getHtmlElement: function(){
       // console.debug('trae elemento');
        var input_element = Object.create(inputElement);
        input_element.label = this.getLabel();
        input_element.value = this.getValue();
        input_element.id =   this.getHtmlId();
            
       return input_element;
    }
    , __proto__ : Attribute
}

var CValueAttribute = {
    _type:'CValueAttribute'
     ,init: function(c){
        this.value = c.value || '' ;
        this.htmlId = c.htmlId || 'value_id'; 
        this.label = c.label || 'Value';
        this.concept = c.concept || 'concept1';
        
        return this;
    }
    ,getValue: function(n){
    
    var array = JSON.parse(localStorage.getItem('beca'));
    //traigo el objeto, la vuelta del array se la paso en getValue, de alguna manera
    var obj = array[n - 1];
    
    console.debug('trae valor');
    console.debug(array);
    console.debug(obj);
    console.debug('trae valor');

    var concept = this.value.substring(1,this.value.length -1);
    console.debug(concept); //Este concept es el nombre del header
    console.debug(obj[concept]);
    console.debug('Este es el valor que va a usar');
             //   console.debug('entro a este getValue');
             //   console.log(localStorageManager.getConceptValue(concept));
    //return localStorageManager.getConceptValue(concept);
    return obj[concept];
    }
    ,getConcept: function(){
        return this.concept;
    }
    ,getHtmlElement: function(){
        var input_element = Object.create(inputElement);
        input_element.label = this.getLabel();
        //input_element.value = this.getValue();
        input_element.value = this.getConcept();
        input_element.id =   this.getHtmlId();
            
       return input_element;
    }
    , __proto__ : Attribute

}


var ArrValueAttribute = {
    _type:'ArrValueAttribute'
     ,init: function(c){
        this.value = c.value || '' ;
        this.htmlId = c.htmlId || 'value_id'; 
        this.label = c.label || 'Value';
        this.concept = c.concept || 'concept1';
        
        return this;
    }
    ,getValue: function(n){
    
    var array = JSON.parse(localStorage.getItem('actuacion'));
    //traigo el objeto, la vuelta del array se la paso en getValue, de alguna manera
    var obj = array[n - 1];
    
    console.debug('trae valor');
    console.debug(array);
    console.debug(obj);
    console.debug('trae valor');
    alert('trae la tabla');
    var concept = this.value.substring(1,this.value.length -1);
    console.debug(concept); //Este concept es el nombre del header
    console.debug(obj[concept]);
    console.debug('Este es el valor que va a usar');
             //   console.debug('entro a este getValue');
             //   console.log(localStorageManager.getConceptValue(concept));
    //return localStorageManager.getConceptValue(concept);
    return obj[concept];
    }
    ,getConcept: function(){
        return this.concept;
    }
    ,getHtmlElement: function(){
        var input_element = Object.create(inputElement);
        input_element.label = this.getLabel();
        //input_element.value = this.getValue();
        input_element.value = this.getConcept();
        input_element.id =   this.getHtmlId();
            
       return input_element;
    }
    , __proto__ : Attribute

}


var OValueAttribute = {
     _type:'OValueAttribute'
      ,init: function(c){
        this.value = c.value || '' ;
        this.htmlId = c.htmlId || 'value_id'; 
        this.label = c.label || 'Value';
        return this;
    }
    ,getHtmlElement: function(){
        var option_element = Object.create(optionElement);
        option_element.label = this.getLabel();
        option_element.value = this.getValue();
        option_element.id =   this.getHtmlId();
            
       return option_element;
    }
    , __proto__ : Attribute
}




var UrlAttribute = {
     _type:'UrlAttribute'
      ,init: function(c){
        this.value = c.value || '' ;
        this.htmlId = c.htmlId || 'url_id'; 
        this.label = c.label || 'Url';
        return this;
    }/*
    ,getValue: function(){
        return this.value;
    }*/
    ,getHtmlElement: function(){
        var input_element = Object.create(inputElement);
        input_element.label = this.getLabel();
        input_element.value = this.getValue();
        input_element.id =   this.getHtmlId();
            
       return input_element;
    }
    , __proto__ : Attribute
}



//Objeto que encapsula varios atributos y comportamiento
var Precondition = {
    _type:'Precondition'
     ,url:''
     ,init: function(url){
        this.url = url || '' ; //Objeto
        return this;
    }
    ,getUrl: function(){
        return this.url;
    }
}



function XPath2Attribute(c){
     this._type = 'XPathAttribute';
     this.value = c.value || '' ;
     this.htmlId = c.htmlId || 'xpath_id'; 
     this.label = c.label || 'xPath';
     
     return this;
}
XPath2Attribute.init = function(c){
       
        this.value = c.value || '' ;
        this.htmlId = c.htmlId || 'xpath_id'; 
        this.label = c.label || 'xPath';
        return this;
    }
XPath2Attribute.getHtmlElement = function(){
        var input_element = Object.create(inputElement);
        input_element.label = this.getLabel();
        input_element.value = this.getValue();
        input_element.id =   this.getHtmlId();
            
       return input_element;
    }
