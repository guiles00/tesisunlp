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






var linkText = document.createTextNode("my title text");
var pom = document.createElement('a'); 			
		  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(container.innerHTML));
		  pom.setAttribute('download', 'bpmn.xml');
	pom.appendChild(linkText)	  
var el = document.getElementById("container");
el.appendChild(pom);












//console.log('-----------------------------------');
////console.log(json_export);

/*    <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>SequenceFlow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Task_1" name="Titulo111">
      <bpmn:incoming>SequenceFlow_1</bpmn:incoming>
     <extensionElements>abc</extensionElements>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_1" sourceRef="StartEvent_1" targetRef="Task_1" />
  </bpmn:process>
*/

/*
var xw = new XMLWriter('UTF-8');
xw.formatting = 'indented';//add indentation and newlines
xw.indentChar = ' ';//indent with spaces
xw.indentation = 2;//add 2 spaces per level

xw.writeStartDocument( );
xw.writeDocType('"items.dtd"');
xw.writeStartElement( 'items' );

  xw.writeComment('button');
  xw.writeStartElement('item');
    xw.writeAttributeString( 'id', 'item-1');
    xw.writeAttributeString( 'enabled', 'true' );
    xw.writeStartElement( 'code');
      xw.writeCDATA( '<button>Save</button>' );
    xw.writeEndElement();
    xw.writeElementString('description', 'a save button');
  xw.writeEndElement();
  
  xw.writeComment('image');
  xw.writeStartElement('item');
    xw.writeAttributeString( 'id', 'item-2');
    xw.writeAttributeString( 'enabled', 'false' );
    xw.writeStartElement( 'code');
      xw.writeCDATA( '<img src="photo.gif" alt="me" />' );
    xw.writeEndElement();
    xw.writeElementString('description', 'a pic of myself!');
  xw.writeEndElement();
  
  xw.writeComment('link');
  xw.writeStartElement('item');
    xw.writeAttributeString( 'id', 'item-3');
    xw.writeAttributeString( 'enabled', 'true' );
    xw.writeStartElement( 'code');
      xw.writeCDATA( '<a href="http://google.com">Google</a>' );
    xw.writeEndElement();
    xw.writeElementString('description', 'a link to Google');
  xw.writeEndElement();
  
xw.writeEndElement();
xw.writeEndDocument();

console.debug(xw.getDocument() );

function loadXMLDoc(filename)
{
if (window.XMLHttpRequest)
  {
  xhttp=new XMLHttpRequest();
  }
else // code for IE5 and IE6
  {
  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xhttp.open("GET",filename,false);
xhttp.send();
return xhttp.responseXML;
}
*/
/*
xmlDoc = loadXMLDoc("./testing_bpmn.xml");

var newel = xmlDoc.createElement("edition1");

x = xmlDoc.getElementsByTagName("book")[0];
//x.appendChild(newel);
xmlDoc.appendChild(newel);
//console.debug(xmlDoc);
*/
