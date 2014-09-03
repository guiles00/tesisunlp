//(id,xPath,value,tipo,state)
var primitiveTask = {
id: ''
,tipo: '' 
,xPath: ''
,attr: []
    ,init: function(id,tipo,xPath,attr){
        this.id = id;
        this.tipo = tipo;
        this.xPath = xPath;
        this.attr = attr;
    }
    ,toJson: function(){
        console.debug('to Primitive toJson');
    }
    ,atoJson: function(){
        console.debug('to toJson');
    }
};



var fillInputTask = Object.create(primitiveTask);
fillInputTask.toJson = function(){
    console.debug('to fillInputTask toJson');
}
fillInputTask.init(1,'dos','/html/body',[{'a':1,'b':2},{'a':3,'b':4}]);

console.debug(fillInputTask);
fillInputTask.toJson();
fillInputTask.atoJson();

console.debug(JSON.stringify(fillInputTask));
console.debug(fillInputTask.attr);
primitiveTask.toJson();
