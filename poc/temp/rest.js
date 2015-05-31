//console.log('rest');

function put(){
	//var url = "http://localhost/tesis/tesisunlp/temp/rest.php/?var=1";
	var url = "http://localhost:81/request/example";
	var json_data = "{'name':'data','completed':true,'notes':'data'}";
	var client = new XMLHttpRequest();

	client.open("POST", url, false);
	//Send the proper header information along with the request
	client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//client.setRequestHeader("Content-length", params.length);
	//client.setRequestHeader("Connection", "close");
	//client.setRequestHeader("Content-Type", "text/plain");
	client.send(json_data);

	if (client.status == 200)
		console.log(client.responseText)
	else
		console.log("The request did not succeed!\n\nThe response status was: " + client.status + " " + client.statusText + ".");
}


function get(callback){

	var req = new XMLHttpRequest();
	//req.open('GET', 'data.json', false);
	//req.open('GET', 'http://httpbin.org/user-agent', false);
	//var url = 'http://localhost/tesis/tesisunlp/temp/rest.php/?var=1';
	//var url = "http://localhost:81/request/example";
	var url = "http://localhost:3000/todos/5498e6b4db8c7b940709ea24";

	req.open('GET',url, false);
	req.send(null);
	if(req.status == 200){
		console.debug(req.responseText);	
	}
	if(typeof callback == 'function'){
		callback();	
	}
}


function getC(){

  var xhr = new XMLHttpRequest();
  var method = "PUT";
  var url = "http://localhost:81/request/example";

  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  	} else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  }
	
	xhr.open(method, url);

	xhr.send(null);
	if(xhr.status == 200){
		console.debug(req.responseText);	
	}
}

