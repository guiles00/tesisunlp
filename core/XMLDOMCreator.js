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

return XMLDOMCreator;
})()