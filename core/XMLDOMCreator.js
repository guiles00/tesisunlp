var XMLDOMCreator = (function(){

function XMLDOMCreator(){

}
XMLDOMCreator.prototype.init = function(){

	var bpmn = document.createElementNS('http://your-namespace-uri-here','bpmn:definitions');
	bpmn.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance");
	bpmn.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:bpmn","http://www.omg.org/spec/BPMN/20100524/MODEL");
	bpmn.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:bpmndi","http://www.omg.org/spec/BPMN/20100524/DI");
	bpmn.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:di","http://www.omg.org/spec/DD/20100524/DI"); 
	bpmn.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:dc","http://www.omg.org/spec/DD/20100524/DC");

	return bpmn;
}

XMLDOMCreator.prototype.createElementProcess = function(id){

	var process = document.createElementNS("task",'bpmn:process');
	process.id= id;
	process.setAttribute("isExecutable","false");
	return process;
}

XMLDOMCreator.prototype.createStartProcess = function(id){

var start = document.createElementNS("task",'bpmn:startEvent');
	start.id= id;
	return start;
}

XMLDOMCreator.prototype.createTaskElement = function(id,title){
	var task = document.createElementNS("task","bpmn:task");
	task.id = id;
	task.setAttribute("name",title);
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
	var extension = document.createElementNS("extension",'bpmn:extensionElements');
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
//    <bpmn:exclusiveGateway id="ExclusiveGateway_131w4oi" />

XMLDOMCreator.prototype.createGatewayElement = function(id){
	var gateway = document.createElementNS("extension",'bpmn:exclusiveGateway');
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


return XMLDOMCreator;
})()