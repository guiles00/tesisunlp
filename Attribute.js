 /**
 * @module Attribute
 */
var Attribute = {
     _type:'Attribute'
    ,value:''
    ,htmlId:''
    ,label:''
    ,htmlElement:''
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
        this.label = c.label || 'Task Title';
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
        this.label = c.label || 'xPath';
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

var TipoAttribute = {
    type:'TipoAttribute'
    ,init: function(c){
        this.value = c.value || '' ;
        this.htmlId = c.htmlId || 'tipo_id'; 
        this.label = c.label || 'Auto';
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
        this.label = c.label || 'Ejecutado:';
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
        this.label = c.label || 'Value';
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

var CValueAttribute = {
    _type:'CValueAttribute'
     ,init: function(c){
        this.value = c.value || '' ;
        this.htmlId = c.htmlId || 'value_id'; 
        this.label = c.label || 'Value';
        return this;
    }
    ,getValue: function(){
    var concept = this.value.substring(1,this.value.length -1);
        
    return localStorageManager.getConceptValue(concept);
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
