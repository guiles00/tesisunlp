//alert('soy un objeto generalizado');

console.log('por ejemplo soy PrimitiveTask');

function PrimitiveTask(){ //Constructor
this.attr = 'tipo';    

}


PrimitiveTask.prototype.sayHi = function(p){
  console.debug('HI');
};