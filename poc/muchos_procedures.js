//muchos_procedures.js
//"[{"tipo":{"_type":"Attribute","value":1},"xPath":{…,"htmlId":"task_title_id","label":"Task Title"}}]

//console.debug(localStorageManager);
var o = new Object();
o.type = "FillInputTask";
o.xPath = "/asd/asd/asd";

var o1 = new Object();
o1.type = "FillInputTask";
o1.xPath = "/asd/asd/asd";

var o2 = new Object();
o2.type = "FillInputTask";
o2.xPath = "/asd/asd/asd";

var o21 = new Object();
o21.type = "FillInputTask";
o21.xPath = "/asd/asd/asd";

var o3 = new Object();
o3.type = "FillInputTask";
o3.xPath = "/asd/asd/asd";

var o31 = new Object();
o31.type = "FillInputTask";
o31.xPath = "/asd/asd/asd";

var procedures = { 'P1':[o,o1]  ,'P2':[o2,o21] , 'P3':[o3,o31] };
//console.debug(procedures.P1);

//localStorage.setItem("SBPM",JSON.stringify(new Object()));
localStorage.setItem("SBPM", JSON.stringify(procedures) );


//localStorage.setItem("SBPM",JSON.stringify(new Array()));
//localStorageManager.insert(procedures);
var ls = localStorage.getItem('SBPM');
var arr_ls = JSON.parse(ls);
//console.debug(arr_ls);

//console.debug('estos son los procedures');
//var keys = Object.keys(arr_ls);
//console.debug(keys);
//Array parseado
//console.debug(arr_ls);

//arr_ls.push(JSON.stringify(o));
var json_task = JSON.stringify(arr_ls);
localStorage.setItem("SBPM",json_task);

//console.debug(localStorage.getItem('SBPM'));

//console.debug(window.location.href);


//agrego listener
var el = document.getElementById('procedures');
			el.addEventListener('change',function(){
			console.debug(el.value);
			var procedure = el.value;

			var ls = localStorage.getItem('SBPM');
			var arr_ls = JSON.parse(ls);

			console.debug(arr_ls[procedure]);

			} ,false);




//agrego listener
var add = document.getElementById('add');
			add.addEventListener('click',function(){
			
			var ls = localStorage.getItem('SBPM');
			var arr_ls = JSON.parse(ls);
			//Por ahora no importa el nombre
			var random_number = Math.floor((Math.random() * 10) + 1);
			var attr_string = 'P'+random_number;
			//console.debug(attr_string);
			arr_ls[attr_string] = new Array();
			//return false;
			//arr_ls
			localStorage.setItem('SBPM',JSON.stringify(arr_ls));
			console.debug(arr_ls);

			} ,false);