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

var TipoAttribute = {
    _type:'TipoAttribute'
    ,init: function(c){
        this.value = c.value || '' ;
        this.htmlId = c.htmlId || 'tipo_id'; 
        this.label = c.label || 'Tipo';
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
        this.label = c.label || 'State';
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
        console.debug('trae valor mas complejo');
        //el valor es un JSON
        var t = JSON.parse(this.value);
        console.debug(t.index);
        console.debug('imprimio el index');
        var array_area = JSON.parse(localStorage.getItem("SHARED_DATA"));
        console.debug(array_area[t.index]);
        return array_area[t.index].data;
        //return this.value;
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
