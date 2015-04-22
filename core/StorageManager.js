/*function send_request_jsonp(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

StorageManager = {
	getTasks: function(p){
		
		var url = 'http://localhost:8080/api/getTasks?p='+p; 
		//console.debug(url);
		//Envia peticion a la apiREST
		send_request_jsonp(url, function(data) {
   		
			for (var i=0;i < data.length;i++){
			//console.debug(data[i].id);
			 Recorder.writer(data[i].id,data[i].taskTitle.value,-1);
           }

	    
		});	
	}
	,getTaskById: function(p,id,callback){
		
		var url = 'http://localhost:8080/api/getTaskById?p='+p+'&id='+id; 
		console.debug(url);
		//Envia peticion a la apiREST
		send_request_jsonp(url, function(data) {
   		
			console.log(data);
			callback(data);	    
		});	
	}
}
*/