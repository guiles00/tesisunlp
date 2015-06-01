
console.log('por ejemplo soy una tarea A que hereda PrimitiveTask');

function FillInputTask(){
    PrimitiveTask.call();
   
}
FillInputTask.prototype = new PrimitiveTask();

/*
FillInputTask.prototype.sayHi = function(){
	console.debug('Hi from FillInputTask');
};*/

FillInputTask.prototype.sayBye = function(){
	console.debug('Bye from FillInputTask');
};