var XMLDOMCreator = (function(){

function XMLDOMCreator(){

}
XMLDOMCreator.prototype.init = function(){

	var bpmn = document.createElementNS('http://your-namespace-uri-here','bpmn2:definitions');
	bpmn.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance");
	bpmn.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:bpmn2","http://www.omg.org/spec/BPMN/20100524/MODEL");
	bpmn.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:bpmndi","http://www.omg.org/spec/BPMN/20100524/DI");
	bpmn.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:di","http://www.omg.org/spec/DD/20100524/DI"); 
	bpmn.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:dc","http://www.omg.org/spec/DD/20100524/DC");

	return bpmn;
}

XMLDOMCreator.prototype.createElementProcess = function(id){

	var process = document.createElementNS("task",'bpmn2:process');
	process.id= id;
	process.setAttribute("isExecutable","false");
	return process;
}

XMLDOMCreator.prototype.createElementSubProcess = function(id){

	var sprocess = document.createElementNS("task",'bpmn2:subProcess');
	sprocess.id= id;
	//sprocess.setAttribute("isExpanded","true");
	return sprocess;
}

XMLDOMCreator.prototype.createStartProcess = function(id){

var start = document.createElementNS("task",'bpmn2:startEvent');
	start.id= id;
	return start;
}

XMLDOMCreator.prototype.createTaskElement = function(id,title,type){
	var task = document.createElementNS("task","bpmn2:task");
	task.id = id;

	task.setAttribute("name",title);
	task.setAttribute("type",type);
	return task;
}

XMLDOMCreator.prototype.createBPMNDiagramElement = function(id){
	var diagram = document.createElementNS("diagram",'bpmndi:BPMNDiagram');
	diagram.id= id;
	return diagram;
}

XMLDOMCreator.prototype.createBPMNPlaneElement = function(id,title){
	var plane = document.createElementNS("plane",'bpmndi:BPMNPlane');
	plane.id=id;
	plane.setAttribute("bpmnElement",title);
	return plane;
}



XMLDOMCreator.prototype.createExtensionElement = function(id){
	var extension = document.createElementNS("extension",'bpmn2:extensionElements');
	extension.id=id;
	//extension.setAttribute("bpmnElement",title);
	return extension;
}

XMLDOMCreator.prototype.createBPMNShapeElement = function(id,title,x,y,width,height){
	// <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
var shape = document.createElementNS("shape",'bpmndi:BPMNShape');
	shape.id=id;
	shape.setAttribute("bpmnElement",title);
//<dc:Bounds x="173" y="102" width="36" height="36" />
var dc = document.createElementNS("dc",'dc:Bounds');
	dc.setAttribute("x",x);
	dc.setAttribute("y",y);
	dc.setAttribute("width",width);
	dc.setAttribute("height",height);
	shape.appendChild(dc);
	return shape;
}


XMLDOMCreator.prototype.createBPMNSubProcessShapeElement = function(id,title,x,y,width,height){
	// <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
var shape = document.createElementNS("shape",'bpmndi:BPMNShape');
	shape.id=id;
	shape.setAttribute("bpmnElement",title);
	shape.setAttribute("isExpanded","true");

//<dc:Bounds x="173" y="102" width="36" height="36" />
var dc = document.createElementNS("dc",'dc:Bounds');
	dc.setAttribute("x",x);
	dc.setAttribute("y",y);
	dc.setAttribute("width",width);
	dc.setAttribute("height",height);
	shape.appendChild(dc);
	return shape;
}




//    <bpmn:exclusiveGateway id="ExclusiveGateway_131w4oi" />

XMLDOMCreator.prototype.createGatewayElement = function(id){
	var gateway = document.createElementNS("extension",'bpmn2:exclusiveGateway');
	gateway.id = id;
	return gateway;
}
XMLDOMCreator.prototype.createBPMNGatewayShapeElement = function(id,title,x,y,width,height){
	// <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
var shape = document.createElementNS("shape",'bpmndi:BPMNShape');
	shape.id= id+'_di';
	shape.setAttribute("bpmnElement",id);
 //       <dc:Bounds x="253" y="95" width="50" height="50" />
var dc = document.createElementNS("dc",'dc:Bounds');
	dc.setAttribute("x",x);
	dc.setAttribute("y",y);
	dc.setAttribute("width","50");
	dc.setAttribute("height","50");
	shape.appendChild(dc);

var label = document.createElementNS("label",'bpmndi:BPMNLabel');
	
	//     <bpmndi:BPMNLabel>
    //      <dc:Bounds x="233" y="145" width="90" height="20" />
    //    </bpmndi:BPMNLabel>

var dc_label = document.createElementNS("dc",'dc:Bounds');
	dc_label.setAttribute("x",(x-20));
	dc_label.setAttribute("y",(y-20));
	dc_label.setAttribute("width","90");
	dc_label.setAttribute("height","20");
	label.appendChild(dc_label);

	shape.appendChild(label);

console.debug(shape);
	
	return shape;
}

XMLDOMCreator.prototype.exportXML = function(){
	
	
	        var p = document.getElementById('procedures_select').value;
 	      	var bpm = JSON.parse(localStorage.getItem("BPM") );
 	      	//var shared_data = JSON.parse(localStorage.getItem("SHARED_DATA") );
 	      	var data_export = bpm[p];

 	      	/******/
 	      	var c = document.createElement("root");

			var domcreator = new XMLDOMCreator();
			var def = domcreator.init();
			var p = domcreator.createElementProcess("Process_1");
			var s = domcreator.createStartProcess("StartEvent_1");
			var ge = domcreator.createGatewayElement("Gateway_1");
			var d = domcreator.createBPMNDiagramElement("BPMNDiagram_1");
			var pl = domcreator.createBPMNPlaneElement("BPMNPlane_1","Process_1");
			var sh = domcreator.createBPMNShapeElement("_BPMNShape_StartEvent_2","StartEvent_1","173","102","36","36");
		

for (index in data_export) { 
		
	var title = data_export[index].taskTitle.value;
	console.debug(data_export[index].type);

	if( data_export[index].type == 'IfTask') {
	var p_t = domcreator.createGatewayElement("Gateway_"+data_export[index].id,title+"_"+data_export[index].id)
	p.appendChild(p_t);

	//var p_e = domcreator.createExtensionElement("DataTask_"+data_export[index].id,title+"_"+data_export[index].id);
		
	/*var el_json = document.createTextNode(JSON.stringify(data_export[index]));
	var el_wrap = document.createElementNS("jsonData",'json_task:jsonData');
	el_wrap.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:json_task","http://json_task");
	el_wrap.appendChild(el_json);}
	*/
	//p_e.appendChild(el_wrap);	
	//p_t.appendChild(p_e);
	
	//calculo las coordenadas
	var x = 500 + index*100;
	var t_s = domcreator.createBPMNGatewayShapeElement("Gateway_"+data_export[index].id,"Gateway_"+data_export[index].id,x,"80","100","80");
	
	pl.appendChild(t_s);


	}else if(data_export[index].type == 'ComposedTask'){

		//Por ahora usa el split para sacasr las tareas 
		    //console.debug(data_export[index]);
		    var str = String(data_export[index].value.value);
    		var arr_ids = str.split(',');
    		//console.debug(arr_ids);

			var sprocess = domcreator.createElementSubProcess('SubProcess'+data_export[index].id);
			var sp_shape = domcreator.createBPMNSubProcessShapeElement('SubProcess_di','SubProcess'+data_export[index].id,'353','89','350','200');

			for (var j = arr_ids.length - 1; j >= 0; j--) {

		    var task = localStorageManager.getObject(arr_ids[j]);
			console.debug(task);
			
			var d_title = task.taskTitle.value+'_'+task.id;

			var sp = domcreator.createTaskElement('Task_'+d_title,'Task_'+d_title,'ComposedTask');			
			sprocess.appendChild(sp);
			//console.debug(sprocess);
			var st_s = domcreator.createBPMNShapeElement('Task_'+d_title+'_di','Task_'+d_title,'380',"135","100","80");

			pl.appendChild(st_s);
			}
		
		p.appendChild(sprocess);	
			console.debug(p);	
		pl.appendChild(sp_shape);

	}else if( data_export[index].group.value != 1){ //Chequear esto!!!
		
		//console.debug();
	
	var p_t = domcreator.createTaskElement("Task_"+data_export[index].id,title+"_"+data_export[index].id,data_export[index].type);
	p.appendChild(p_t);

	var p_e = domcreator.createExtensionElement("DataTask_"+data_export[index].id,title+"_"+data_export[index].id);
	
	//var p_e = domcreator.createExtensionElement("Ext_"+index);
 	//<bpmn:outgoing>SequenceFlow_0uuxjxl</bpmn:outgoing>
	//var data = document.createElementNS("incoming",'bpmn:incoming');
	
	var el_json = document.createTextNode(JSON.stringify(data_export[index]));
	//"http://json_task","jsonData"
	var el_wrap = document.createElementNS("jsonData",'json_task:jsonData');
	el_wrap.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:json_task","http://json_task");
	//console.debug(el_test);
	el_wrap.appendChild(el_json);
	
	p_e.appendChild(el_wrap);	
	p_t.appendChild(p_e);
	
	//calculo las coordenadas
	var x = 500 + index*100;
	var t_s = domcreator.createBPMNShapeElement("Task_"+data_export[index].id+"_di","Task_"+data_export[index].id,x,"80","100","80");
	pl.appendChild(t_s);

	
	}
	
	//var s_s = document.createElementNS("foo",'foo:jsonPayload');
	//p_e.innerHTML = '<foo:jsonPayload xmlns:foo="http://foo"> some json data </foo:jsonPayload>';
		//data.appendChild(el_json);
		//p_e.appendChild(s_s);
	}

		p.appendChild(s);
		pl.appendChild(sh);
		d.appendChild(pl);
		def.appendChild(p);
		def.appendChild(d);
		c.appendChild(def);


	return c;

}



return XMLDOMCreator;
})()