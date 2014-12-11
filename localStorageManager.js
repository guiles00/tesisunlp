//===========================================================
/**
* Este Manager en algun momento tendria que generalizarse y persistir en otros servidores
* @class localStorageManager
*/
localStorageManager = {
    setStopRecording: function(){
        localStorage.setItem("BPMRECORDING",0);
    }
    ,setStartRecording: function(){
    localStorage.setItem("BPMRECORDING",1);   
    }
    ,setStopExecuting: function() { 
        localStorage.setItem("BPMEXECUTION",0); 
    }
    ,setStartExecuting: function(){
     localStorage.setItem("BPMEXECUTION",1);   
    }
    ,clear: function(){
        localStorage.setItem("BPMP",1);    
        localStorage.setItem("BPM", JSON.stringify( {'P1':[],'P2':[] } ) );

        localStorage.setItem("BPMRECORDING",0);
        localStorage.setItem("BPMEXECUTION",0);
        localStorage.setItem("BPMPROC",'P1');

    }
    ,clearPocket:function(){
        localStorage.setItem("SHARED_DATA",JSON.stringify(new Array()));



    }
    ,getConceptValue: function(concept){

        var array_area = JSON.parse(localStorage.getItem("SHARED_DATA"));
        console.debug("lo que trae del localStorage es un objeto\n");
        console.debug("asocia el mapeo por clave valor del objeto, si no existe tira error");

    return 'Valor del concepto';
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
        
        var procedure = document.getElementById('procedures_select').value;

        var parseo_ls = JSON.parse(tasks);
        var arr_ls = parseo_ls[procedure];
        
        var i;
        for (i = 0; i < arr_ls.length; i = i + 1) {
           
            if(arr_ls[i].id == id) return arr_ls[i];
        };
    //Si no trajo ninguna
    return false;
    }
    /**
    * Reemplaza atributos de la tarea en el localStorage
    * @method
    */
    ,setObject: function(id,json_task){
        var procedure = document.getElementById('procedures_select').value;

        var tasks = localStorage.getItem("BPM");
        var obj_tasks = JSON.parse(tasks);
        var i;
        for (i = 0; i < obj_tasks.length; i = i + 1) {
       
            if(obj_tasks[i].id == id) {
                
                var task = JSON.parse(json_task);
                obj_tasks[i].atributos = task.atributos; 
            }
        };

    var ls = localStorage.getItem("BPM");
    
    var o_ls = JSON.parse(ls);    
    var arr_ls = o_ls[procedure];
    
    var id = arr_ls.length;    
    o.id = id;
    arr_ls.push(o);
    o_ls[procedure] = arr_ls; 
    var json_task = JSON.stringify(o_ls);
    localStorage.setItem("BPM",json_task);

    return true;
    }
    /**
    * Reemplaza atributos de la tarea en el localStorage
    * @method
    * @params: json_tasks (un objeto JSON)
    */
    ,setObjectR: function(json_task){
       // console.log('guarda este objeto');
       // console.debug(json_task);
        var procedure = document.getElementById('procedures_select').value;

        var o = JSON.parse(json_task);
        var tasks = localStorage.getItem("BPM");
        var obj_tasks = JSON.parse(tasks);
        var arr_ls = obj_tasks[procedure];
        
        var i;
        for (i = 0; i < arr_ls.length; i = i + 1) {
       
            if(arr_ls[i].id == o.id) {
                
                arr_ls[i] = o; 
            }
        };
    
    obj_tasks[procedure] = arr_ls;
    localStorage.setItem("BPM",JSON.stringify(obj_tasks)); 

    return true;
    }
    ,insert: function(json_object){ //Esto es como un insert en el localStorage, arriba esta el set y se puede reutilizar(?)
    //Lo inserta en el procedure correspondiente
    var procedure = document.getElementById('procedures_select').value;
    
    if(procedure == 'P0'){alert('Selecciona un procedimiento');return false; } 
    
    //*************************************/
    var o = JSON.parse(json_object);
    
    //@TODO: Que onda este if? 
    if(o.type == 'FillInputTask' || o.type == 'TextAreaTask' || o.type == 'SelectOptionTask' 
        || o.type == 'ClickLinkTask' || o.type == 'ClickInputTask' 
        || o.type == 'UrlTask' || o.type == 'DataCollectionTask'){
    
    var ls = localStorage.getItem("BPM");
    var o_ls = JSON.parse(ls);

    var arr_ls = o_ls[procedure];
    /*
    var a = localStorageManager.getNextId(o_ls[procedure]);
    //console.debug(a);
    
    var id = arr_ls.length;
    */
    o.id = localStorageManager.getNextId(o_ls[procedure]);
    arr_ls.push(o);
    //reemplaza el array del procedure
    o_ls[procedure] = arr_ls; 
    //var json_task = JSON.stringify(arr_ls);
    var json_task = JSON.stringify(o_ls);
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
    ,getNextId: function(t){
        //si no hay tareas devolve id 1
        if(t.length == 0 ) return 1;
        var i;
        var id = t[0].id;
        //Traigo el numero mas alto
        for ( i = 0; i < t.length ; i = i + 1) {
            if(t[i].id > id) id = t[i].id;
        };
        //proximo id
        return id + 1;
    }
    ,NOgetCurrentTasks: function(){
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
    ,getCurrentTasks: function(){
        
        var tasks = localStorage.getItem("BPM");
        //var procedure = 'P1'; //trae del select
        var procedure = document.getElementById('procedures_select').value;

        var o_ls = JSON.parse(tasks);
        var arr_ls = o_ls[procedure];

        var currentTasks = new Array();
        var i;
        for (i = 0; i < arr_ls.length; i = i + 1) {
            if(arr_ls[i].state.value == 0) {
                currentTasks.push(arr_ls[i]);
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
        
        var procedure = document.getElementById('procedures_select').value;

        var tasks = localStorage.getItem("BPM");
        var array_temp = new Array();
        var obj_tasks = JSON.parse(tasks);
        var arr_ls = obj_tasks[procedure];
        
        var i;
        for (i = 0; i < arr_ls.length; i = i + 1) {
       
            if(arr_ls[i].id == id) {
            //nothing
            }else{
                array_temp.push(arr_ls[i]);
            }
        };
    
    obj_tasks[procedure] = array_temp; 
    var json_task = JSON.stringify(obj_tasks);
    localStorage.setItem("BPM",json_task);
    
    ////console.debug('obj_tasks[procedure]');
    ////console.debug(obj_tasks[procedure]);
    //localStorage.setItem("BPM",JSON.stringify(array_temp)); 
    return true;
    }

    ,actualizarOrden: function(table){

        var procedure = document.getElementById('procedures_select').value;

        var tasks_temp = new Array();
        //armo el array con el orden indicado ( no se si sera mejor agregar un atributo de orden)
        var rows = table.tBodies[0].rows; 
        for (var i=0; i<rows.length; i++) {
            var id = rows[i].id;
            var obj_task = localStorageManager.getObject(id);
            tasks_temp.push(obj_task);
            
        }
        
        var ls = localStorage.getItem("BPM");
        var o_ls = JSON.parse(ls);
        o_ls[procedure] = tasks_temp;
        localStorage.setItem("BPM",JSON.stringify(o_ls));
    }
    ,setCurrentProc: function(p){
        localStorage.setItem('BPMPROC',p);
    }
    ,addProcedure: function(){

        var bpm = JSON.parse(localStorage.getItem("BPM"));
        var keys = Object.keys(bpm);
        var next_key = 'P'+(Number((keys[keys.length - 1]).substr(1,1)) + 1);
        bpm[next_key] = new Array();
        
        localStorage.setItem("BPM",JSON.stringify(bpm)); 

        return next_key;        
    }
    ,removeProcedure: function(p){

        var bpm = JSON.parse(localStorage.getItem("BPM"));
        delete bpm[p];
        localStorage.setItem("BPM",JSON.stringify(bpm)); 

        return true;
    }
    ,getPrceduresKeys: function(){
        var bpm = JSON.parse(localStorage.getItem("BPM"));
        var keys = Object.keys(bpm);
        return keys;
    }
}
