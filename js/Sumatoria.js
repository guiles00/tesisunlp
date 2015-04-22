/*var SumatoriaTask = (function(){


function SumatoriaTask(id,xPath,value,tipo,state,taskTitle){
    AbstractTask.call(this,id,xPath,value,tipo,state,taskTitle);
    this.msg = "Init ";
    this.taskTitle = taskTitle || Object.create(TaskTitleAttribute).init({'value':'Sumatoria Task '})
    this.type = "SumatoriaTask";
    this.state = state;
    this.location = '';
}
//Lo pongo como primitiva, por ahora es igual
SumatoriaTask.prototype = new AbstractTask();

SumatoriaTask.prototype.execute = function(){
       
        console.log('suma todo lo que le ponga!!!')
        //this.finalizo(this.id);
}

return SumatoriaTask;
})();*/
