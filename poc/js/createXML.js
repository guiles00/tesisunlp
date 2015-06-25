var json_export = {"BPM":[{"id":1,"xPath":{"_type":"XPathAttribute","value":"sxPath"},"tipo":{"_type":"Attribute","value":1},"state":{"_type":"StateAttribute","value":0},"type":"UrlTask","precondition":{},"taskTitle":{"value":"Init ","htmlId":"task_title_id","label":" Task Title: "},"msg":"Init ","location":"http://localhost/content/tesisunlp/tesis.html","value":{"_type":"SValueAttribute","value":"http://localhost/content/tesisunlp/tesis.html"}},{"id":5,"xPath":{"_type":"XPathAttribute","value":"/html[1]/body[1]/div[2]/form[1]/input[3]"},"tipo":{"_type":"Attribute","value":1},"state":{"_type":"StateAttribute","value":0},"type":"FillInputTask","precondition":{"url":{"value":"http://localhost/content/tesisunlp/tesis.html","htmlId":"url_id","label":"Url"}},"taskTitle":{"value":"Enter String to Input ","htmlId":"task_title_id","label":" Task Title: "},"value":{"_type":"SValueAttribute","value":"asd"}}],"SHARED_DATA":{"Nombre":{"value":"Guillermo"},"Apellido":{"value":"Caserotto"}}};


var translator = function(json_data){
var str = '<?xml version="1.0" encoding="UTF-8"?><bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">';
	for (i in json_data) { 
		////console.log(json_data[i])
	}
	var bpmn = document.createElement("process");
		bpmn.id = "Process_1";
		bpmn.setAttribute("tstamp",  "now");
		bpmn.isExecutable = "false";
		//nada = "asdasd";
		bpmn.prefix="bpmn"
		//console.debug(bpmn.ownerDocument);
		//console.debug(bpmn);
	var Node = document.createElement("testing");
	Node.prefix = "prefix";
	var el = document.createElementNS('http://your-namespace-uri-here', 'prefix:localnamehere');

	Node.appendChild( el );
	Node.appendChild( document.createElement("TestingTwo") );
	Node.appendChild( document.createElement("TestingThree") );
	bpmn.appendChild(Node);
//console.debug(bpmn);
return bpmn;
}

  /*  
  <bpmn:task id="Task_1" name="Titulo111">
     <bpmn:incoming>SequenceFlow_1</bpmn:incoming>
     <extensionElements>abc</extensionElements>
    </bpmn:task>
*/

var container = document.createElement("root");
var bpmn = document.createElementNS('http://your-namespace-uri-here','bpmn:definitions');
bpmn.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance");
bpmn.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:bpmn","http://www.omg.org/spec/BPMN/20100524/MODEL");
bpmn.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:bpmndi","http://www.omg.org/spec/BPMN/20100524/DI");
bpmn.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:di","http://www.omg.org/spec/DD/20100524/DI"); 
bpmn.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:dc","http://www.omg.org/spec/DD/20100524/DC");

var process = document.createElementNS("task",'bpmn:process');
	process.id="Process_1";
	process.setAttribute("isExecutable","false");

var sequenceFlow = document.createTextNode("sequenceFlow_1");

var start = document.createElementNS("task",'bpmn:startEvent');
	start.id="StartEvent_1";
	var outgoing = document.createElementNS("task",'bpmn:outgoing');
	outgoing.appendChild(sequenceFlow)	
	start.appendChild(outgoing);

var sequenceFlow1 = document.createTextNode("sequenceFlow_1");
var incoming = document.createElementNS("incoming","bpmn:incoming");
	incoming.appendChild(sequenceFlow1)

var task = document.createElementNS("task","bpmn:task");
	task.id = "Task_1";
	task.setAttribute("name","Titulo112");
//    <bpmn:sequenceFlow id="SequenceFlow_1" sourceRef="StartEvent_1" targetRef="Task_1" />
var s_flow = document.createElementNS("s_flow","bpmn:sequenceFlow");
	s_flow.id = "SequenceFlow_1";
	s_flow.setAttribute("sourceRef","StartEvent_1");
	s_flow.setAttribute("targetRef","Task_1");

	task.appendChild(incoming);
	process.appendChild(start);
	process.appendChild(task);
	process.appendChild(s_flow);
	bpmn.appendChild(process);

/***otro grupo de nodos**/
//<bpmndi:BPMNDiagram id="BPMNDiagram_1">
var diagram = document.createElementNS("diagram",'bpmndi:BPMNDiagram');
	diagram.id="BPMNDiagram_1";
// <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">	
var plane = document.createElementNS("plane",'bpmndi:BPMNPlane');
	plane.id="BPMNPlane_1";
	plane.setAttribute("bpmnElement","Process_1");

// <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
var shape = document.createElementNS("shape",'bpmndi:BPMNShape');
	shape.id="_BPMNShape_StartEvent_2";
	shape.setAttribute("bpmnElement","StartEvent_1");
//<dc:Bounds x="173" y="102" width="36" height="36" />
var dc = document.createElementNS("dc",'dc:Bounds');
	dc.setAttribute("x","173");
	dc.setAttribute("y","102");
	dc.setAttribute("width","36");
	dc.setAttribute("height","36");

//      <bpmndi:BPMNShape id="Task_1_di" bpmnElement="Task_1">
var shape1 = document.createElementNS("shape",'bpmndi:BPMNShape');
	shape1.id="Task_1_di";
	shape1.setAttribute("bpmnElement","Task_1");
//        <dc:Bounds x="437" y="107" width="100" height="80" />
var dc1 = document.createElementNS("dc",'dc:Bounds');
	dc1.setAttribute("x","437");
	dc1.setAttribute("y","107");
	dc1.setAttribute("width","100");
	dc1.setAttribute("height","80");

//  <bpmndi:BPMNEdge id="SequenceFlow_1_di" bpmnElement="SequenceFlow_1">
var edge = document.createElementNS("edge",'bpmndi:BPMNEdge');
	edge.id="SequenceFlow_1_di";
	edge.setAttribute("bpmnElement","SequenceFlow_1");
	//<di:waypoint xsi:type="dc:Point" x="209" y="120" />
var di = document.createElementNS("edge",'di:waypoint');
	di.setAttribute("xsi:type","dc:Point");
 	di.setAttribute("x","209");
 	di.setAttribute("y","120");
edge.appendChild(di);

 	//	<di:waypoint xsi:type="dc:Point" x="323" y="120" />
var di2 = document.createElementNS("edge",'di:waypoint');
	di2.setAttribute("xsi:type","dc:Point");
 	di2.setAttribute("x","323");
 	di2.setAttribute("y","120");
edge.appendChild(di2);
    //    <di:waypoint xsi:type="dc:Point" x="323" y="147" />
    var di3 = document.createElementNS("edge",'di:waypoint');
	di3.setAttribute("xsi:type","dc:Point");
 	di3.setAttribute("x","323");
 	di3.setAttribute("y","147");
edge.appendChild(di3);
    //    <di:waypoint xsi:type="dc:Point" x="437" y="147" />
var di4 = document.createElementNS("edge",'di:waypoint');
	di4.setAttribute("xsi:type","dc:Point");
 	di4.setAttribute("x","437");
 	di4.setAttribute("y","147");
edge.appendChild(di4);


shape1.appendChild(dc1)
shape.appendChild(dc)
plane.appendChild(shape);
plane.appendChild(shape1);
plane.appendChild(edge);	
diagram.appendChild(plane);	
bpmn.appendChild(diagram);

container.appendChild(bpmn);

console.debug(container);




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
var c = document.createElement("root");

var domcreator = new XMLDOMCreator();
var def = domcreator.init();
var p = domcreator.createElementProcess("Process_1");
var s = domcreator.createStartProcess("StartEvent_1");
var t1 = domcreator.createTaskElement("Task_1","FillInputTask");
var d = domcreator.createBPMNDiagramElement("BPMNDiagram_1");
var pl = domcreator.createBPMNPlaneElement("BPMNPlane_1","Process_1");
var sh = domcreator.createBPMNShapeElement("_BPMNShape_StartEvent_2","StartEvent_1","173","102","36","36");
var sh2 = domcreator.createBPMNShapeElement("Task_1_di","Task_1","300","80","100","80");
//creo una tarea mas
//Se crea un elemento para process y un elemento para graficarlo
var t3 = domcreator.createTaskElement("Task_3","FillInputTask3");
var sh3 = domcreator.createBPMNShapeElement("Task_3_di","Task_3","500","80","100","80");
p.appendChild(t3);
pl.appendChild(sh3);
//***////

for(var i=4;i<7;i++){
	//suponte que voy leyendo un array y saco el ID
var p_t = domcreator.createTaskElement("Task_"+i,"FillInputTask"+i)
p.appendChild(p_t);
//calculo las coordenadas
var x = 500 + i*100;
var t_s = domcreator.createBPMNShapeElement("Task_"+i+"_di","Task_"+i,x,"80","100","80");
pl.appendChild(t_s);	
//console.debug(t_s);
};
//console.debug(p);

p.appendChild(s);
p.appendChild(t1);
pl.appendChild(sh);
pl.appendChild(sh2);
d.appendChild(pl);
def.appendChild(p);
def.appendChild(d);
c.appendChild(def);

//console.debug(p);
console.debug(c);

var linkText = document.createTextNode("my title text");
var pom = document.createElement('a'); 			
		  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(c.innerHTML));
		  pom.setAttribute('download', 'bpmn.xml');
	pom.appendChild(linkText)	  
var el = document.getElementById("container");
el.appendChild(pom);