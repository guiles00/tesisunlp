//===========================================================
/**
* Este Manager en algun momento tendria que generalizarse y persistir en otros servidores
* @class localStorageManager
*/
localStorageManager = {
    clearPocket:function(){
        localStorage.setItem("SHARED_DATA",JSON.stringify(new Array()));
    }
    ,saveSharedData: function(concept,text){

        var array_area = JSON.parse(localStorage.getItem("SHARED_DATA"));
        var data_object = new Object();
        data_object.concept = concept;
        data_object.data = text;
        array_area.push(data_object);

        localStorage.setItem("SHARED_DATA",JSON.stringify(array_area)); 

    return true;
    }
    /**
    * Trae la tarea del localStorage
    * @method
    */
    ,getObject: function(id){
        var tasks = localStorage.getItem("BPM");
        var temp = JSON.parse(tasks);
        var i;
        for (i = 0; i < temp.length; i = i + 1) {
           // ////console.debug(temp[i]);
            if(temp[i].id == id) return temp[i];
        };
//Si no trajo ninguna
    return false;
    }
 
    /**
    * Reemplaza atributos de la tarea en el localStorage
    * @method
    */
    ,setObject: function(id,json_task){
        
        var tasks = localStorage.getItem("BPM");
        var obj_tasks = JSON.parse(tasks);
        var i;
        for (i = 0; i < obj_tasks.length; i = i + 1) {
       
            if(obj_tasks[i].id == id) {
                
                var task = JSON.parse(json_task);
                obj_tasks[i].atributos = task.atributos; 
            }
        };
    
    localStorage.setItem("BPM",JSON.stringify(obj_tasks)); 
    return true;
    }
    /**
    * Reemplaza atributos de la tarea en el localStorage
    * @method
    * @params: json_tasks (un objeto JSON)
    */
    ,setObjectR: function(json_task){
        var o = JSON.parse(json_task);
        var tasks = localStorage.getItem("BPM");
        var obj_tasks = JSON.parse(tasks);
        var i;
        for (i = 0; i < obj_tasks.length; i = i + 1) {
       
            if(obj_tasks[i].id == o.id) {
                
                obj_tasks[i] = o; 
            }
        };
    localStorage.setItem("BPM",JSON.stringify(obj_tasks)); 
    return true;
    }
    ,insert: function(json_object){ //Esto es como un insert en el localStorage, arriba esta el set y se puede reutilizar(?)
    
    //*************************************/
    var o = JSON.parse(json_object);
    console.debug('inserta esto');
    console.debug(json_object);
    //@TODO: Que onda este if? 
    if(o.type == 'FillInputTask' || o.type == 'TextAreaTask' || o.type == 'SelectOptionTask' 
        || o.type == 'ClickLinkTask' || o.type == 'ClickInputTask'){
    
    var ls = localStorage.getItem("BPM");
    var arr_ls = JSON.parse(ls);
    var id = arr_ls.length;
    o.id = id;
    arr_ls.push(o);
    var json_task = JSON.stringify(arr_ls);
    localStorage.setItem("BPM",json_task);

    return false; 
    }

    //PARCHE--> Cuando modifique el JSON ya no va a estar mas
    //Traigo el array
    var ls = localStorage.getItem("BPM");
    var arr_ls = JSON.parse(ls);
    var id = arr_ls.length;
    var o = JSON.parse(json_object);
    o.id = id;
    o.atributos[0].value = id; //----> Parche
    arr_ls.push(o);
    //Lo convierto en JSON
    var json_task = JSON.stringify(arr_ls);
    localStorage.setItem("BPM",json_task);
    }
    ,getCurrentTasks: function(){
        var tasks = localStorage.getItem("BPM");
        var temp = JSON.parse(tasks);
            
        var currentTasks = new Array();
        var i;
        for (i = 0; i < temp.length; i = i + 1) {
            if(temp[i].state.value == 0) {
                currentTasks.push(temp[i]);
            }
        };

        /*if(currentTasks.length == 0){
            return false;
        }else{
            return currentTasks;
        }*/
    return currentTasks;
    }
    ,removeElement: function(id){
        
        //No me funciono el splice
        var tasks = localStorage.getItem("BPM");
        var array_temp = new Array();
        var obj_tasks = JSON.parse(tasks);
        console.debug('antes');
        console.debug(obj_tasks);
        var i;
        for (i = 0; i < obj_tasks.length; i = i + 1) {
       
            if(obj_tasks[i].id == id) {
                //console.debug(i);
                //array.splice(i,1,obj_tasks);
            }else{
                array_temp.push(obj_tasks[i]);
            }
        };
        //console.debug('despues');
        //console.debug(array_temp);
    localStorage.setItem("BPM",JSON.stringify(array_temp)); 
    return true;
    }


    ,actualizarOrden: function(table){

        var tasks_temp = new Array();
        //armo el array con el orden indicado ( no se si sera mejor agregar un atributo de orden)
        var rows = table.tBodies[0].rows; 
        for (var i=0; i<rows.length; i++) {
            var id = rows[i].id;
            var obj_task = localStorageManager.getObject(id);
            tasks_temp.push(obj_task);
            
        }
        
        localStorage.setItem("BPM",JSON.stringify(tasks_temp));
    }
}
