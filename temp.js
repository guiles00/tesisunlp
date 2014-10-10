//Attributes.js
Class Attribute = {
     _type:'Attribute'
    ,value:''
    ,htmlId:''
    ,label:''
    ,htmlElement:''
    ,init()
    ,setValue()
    ,setHtmlId()
    ,setLabel()
    ,getValue()
    ,getLabel()
    ,getHtmlElement()
    ,getHtmlId()
}

Class XPathAttribute = {
     _type:'XPathAttribute'
    ,init() 
    ,getHtmlElement()
}


Class IdAttribute = {
    type:'IdAttribute'
    ,init()
    ,getHtmlElement()
} 

Class TipoAttribute = {
    _type:'TipoAttribute'
    ,init()
    ,getHtmlElement()
}
Class StateAttribute = {
    _type:'StateAttribute'
     ,init()
    ,getHtmlElement()
}
Class SValueAttribute = {
     _type:'SValueAttribute'
      ,init()
    ,getHtmlElement()
}

Class CValueAttribute = {
    _type:'CValueAttribute'
     ,init()
    ,getValue()
    ,getHtmlElement()
}

//Recorder.js
/////======================================================================//
Class Recorder = {
    createButton()
    ,addPrimitiveTask()
    ,addAugmentedTask()
    ,createEditorContainer()
    ,editRow()
    ,formatearTextoPocket()
    ,mostrarPocket()
    ,clickRecord()
    ,clickStop()
    ,clickPlay()
    ,refresh()
    ,writer()
    ,lookupElementByXPath()
    ,createXPathFromElement()
    ,init()
  }

//Manager.js
/////===================================================================////

Class Manager = {
    var currentPrimitiveTasks
    var primitiveTasks
    var indice;
    var arr_tareas;
    ,subscribe()
    ,createFillInputTask()
    ,createSelectOptionTask()
    ,createTextAreaTask()
    ,createCheckBoxTask()
    ,createRadioTask()
    ,createClickLinkTask()
    ,incrementIndice()
    ,getIndice()
    ,setIndice()
    ,getNextTask()
    ,getNextTaskTimer()
    ,start()
    ,clearCurrentPrimitiveTasks()
    ,addPrimitiveTask()
    ,getCurrentPrimitiveTasks()
    ,initCurrentPrimitiveTasks()
    ,highlightElement()
    ,hayTareas()
    ,executeNextTaskWithTimer()
    ,init()
}

//PrimitiveTasks.js
/////////==========================================================//

Class PrimitiveTask = { //Constructor
var tipo,
var xPath,
var value,
var state,
var id,
var msg,
var type,
,getState()
,setState()
,execute()
,finalizo()
,toHtml()
}

Class FillInputTask = {
var msg,
var type,
var state,
,toJson()
,init()
,emptyToJson()
,toHtml()
,htmlToJson()
}

Class SelectOptionTask = {
var msg,
var type,
var state,
,init()
,toHtml()
,toJson()
,htmlToJson()
}

Class TextAreaTask = {
var msg,
var type,
var state,
,init()
,toJson()
,emptyToJson()
,toHtml()
,htmlToJson()

}

Class CheckBoxTask = {
var msg,
var type,
var state,
,init()
,execute()
}

Class RadioTask = {
var msg,
var type,
var state,
,init()
,execute()
}

//==========================================================================//
// Tareas de carga de Pagina //

Class ClickLinkTask = {
var msg,
var type,
var state,
,init()
,toJson()
,toHtml()
,htmlToJson()
,execute()

}

//==========================================================================//
// Tareas de Aumentación (Augmentation) //
Class AugmentedTask = {
var tipo,
var xPath,
var link,
var value,
var state,
var id,
var msg
,finalizo()
}

Class LinkATask = {
var msg,
var state,
var id,
var link,
,toJson()
,toHtml()
,htmlToJson()
,emptyToJson()
,execute()
}

//=================================================================================//
//RConsole.js

var RConsole = {

,mostrarPocket()
,createButtonPocket()
,createAddAugContainer()
,createAddContainer()
,createEditionContainer()
,createButton()
,createStopButton()
,createPlayButton()
,createRecordButton()
,createClearButton()   
,createShowLocalStorageButton()
,createaddTasksSelect()
,createHeaderContainer()
,createHeader()
,createTableContainer()
,createTable()
,createShowHide()
,init()
}

//localStorageManager.js

//===========================================================
/**
* Este Manager en algun momento tendria que generalizarse y persistir en otros servidores
* @class localStorageManager
*/
Class localStorageManager = {
,clearPocket()
,saveSharedData()
,getObject()
,setObject()
,setObjectR()
,insert()
,getCurrentTasks()
,removeElement()
,actualizarOrden()
}

//Edit.js
//==================================================================//
Class optionsElement = {
var attributes,
var id, 
var label,
var options,
,render()
}

Class selectElement = {
var specs
,render()
}

Class inputElement = {
var specs,
var label,
var id,
var value,
,render()
}

Class view = {
      render()
}

Class inflater = {
var properties,
var elements,
,inflate()
}

Class editor = {
var properties,
,htmlToJson()
}

