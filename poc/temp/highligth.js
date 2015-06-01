/*
 * This displays a dialog box that allows a user to enter their own
 * search terms to highlight on the page, and then passes the search
 * text or phrase to the highlightSearchTerms function. All parameters
 * are optional.
 */
/*function getAugmenterInstance(){
	return new LiveHighlight();
};

*/
//var animation_block = 'animate = function(eid){ document.getElementById(eid).style = "background-color:yellow;width:200px;height:200px;-moz-transform:rotate(360deg);setTimeout("var elem = document.getElementById(\'" + eid + "\'); var evt = document.createEvent("MouseEvents");evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);elem.dispatchEvent(evt);", 5);"';
//var fadeout_script_block = 'fadeout = function(eid){ document.getElementById(eid).style.border = (document.getElementById(eid).style.border == "")? "red solid 1px":parseFloat(document.getElementById(eid).style.opacity) - 0.05; (document.getElementById(eid).style.opacity >= "0")?setTimeout("fadeout(\'" + eid + "\')", 70):document.getElementById(eid).style.opacity;};fadein = function(eid){ document.getElementById(eid).style.opacity = (document.getElementById(eid).style.opacity == "")? 0:parseFloat(document.getElementById(eid).style.opacity) + 0.05; (document.getElementById(eid).style.opacity <= "1")?setTimeout("fadein(\'" + eid + "\')", 30):document.getElementById(eid).style.opacity;};';


function LiveHighlight(){
	this.name = "LiveHighlight";
	this.label = "Live Highlight";
};

/*LiveHighlight.prototype.isApplicableToConcept = function(){
	return true;
};

LiveHighlight.prototype.adaptTextPlainInstance = function(instance){	
	this.highlight_text(this.doc, instance.getValue(),true,false,false);
  this.triggerEventForTaskExecution(metadata["scriptAttributes"]);
};*/

/*LiveHighlight.prototype.adaptDOMElementInstance = function(instance){
  var css_animation = content.document.createElement("style");
  css_animation.setAttribute("type","text/css");
  css_animation.innerHTML = ".animationLiveHighlighting {-moz-animation: liveHighlight 1s linear infinite; animation: liveHighlight 1s linear infinite;} @-moz-keyframes liveHighlight {0%{border-width:1px;border-color:red; background-color:inherit;}50% {border-style: solid;border-width:3px;border-color:red;background-color:yellow;}100% {border-style: solid;border-width:1px;border-color:red;background-color:inherit;}}";

	var dom_element = instance.getValue();
  dom_element.appendChild(css_animation);
  dom_element.setAttribute("class","animationLiveHighlighting");
  this.triggerEventForTaskExecution(metadata["scriptAttributes"]);
};

LiveHighlight.prototype.automaticExecution = function(attributes){
  var textValue = attributes[0]["value"];
  var isConcept = (attributes[1]["value"] == "true") || (attributes[1]["value"] == "True");
  var doc = CSA.getCurrentDocument();
  this.highlight_text(doc, textValue,true,false,false);
  this.triggerEventForTaskExecution(metadata["scriptAttributes"]);
};
*/
/*LiveHighlight.prototype.highlight_text = function(doc, searchText, treatAsPhrase, textColor, bgColor){
  // we can optionally use our own highlight tag values
  if ((!textColor) || (!bgColor)) {
    textColor = "black";
    bgColor = "yellow";
  } 
  highlightStartTag = "<font class='animationLiveHighlighting'>";
  highlightEndTag = "</font>"; 
  this.highlightSearchTerms(doc, searchText, treatAsPhrase, true, highlightStartTag, highlightEndTag);
};
*/
/*
 * This is the function that actually highlights a text string by
 * adding HTML tags before and after all occurrences of the search
 * term. You can pass your own tags if you'd like, or if the
 * highlightStartTag or highlightEndTag parameters are omitted or
 * are empty strings then the default <font> tags will be used.
 */
LiveHighlight.prototype.doHighlight = function(bodyText, searchTerm, highlightStartTag, highlightEndTag) 
{
  // the highlightStartTag and highlightEndTag parameters are optional
  if ((!highlightStartTag) || (!highlightEndTag)) {
    highlightStartTag = "<font class='animationLiveHighlighting'>";
    highlightEndTag = "</font>";
  }
  
  // find all occurences of the search term in the given text,
  // and add some "highlight" tags to them (we're not using a
  // regular expression search, because we want to filter out
  // matches that occur within HTML tags and script blocks, so
  // we have to do a little extra validation)
  var newText = "";
  var i = -1;
  var lcSearchTerm = searchTerm.toLowerCase();
  var lcBodyText = bodyText.toLowerCase();
    
  while (bodyText.length > 0) {
    i = lcBodyText.indexOf(lcSearchTerm, i+1);
    //console.debug('-->'+i);
    //console.debug('aaaa'+bodyText.lastIndexOf(">", i));
    if (i < 0) {
      newText += bodyText;
      bodyText = "";
    } else {

      // skip anything inside an HTML tag
      if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
        if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {
        // skip anything inside a <script> block
        if (lcBodyText.lastIndexOf("/div>", i) >= lcBodyText.lastIndexOf('div_consola', i)) {
          newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, searchTerm.length) + highlightEndTag;
          bodyText = bodyText.substr(i + searchTerm.length);
          lcBodyText = bodyText.toLowerCase();
          i = -1;
        }
        }
      }
    
    }
  }
  
  return newText;
};


/*
 * This is sort of a wrapper function to the doHighlight function.
 * It takes the searchText that you pass, optionally splits it into
 * separate words, and transforms the text on the current web page.
 * Only the "searchText" parameter is required; all other parameters
 * are optional and can be omitted.
 */
/*LiveHighlight.prototype.highlightSearchTerms = function(doc, searchText, treatAsPhrase, warnOnFailure, highlightStartTag, highlightEndTag){
  // if the treatAsPhrase parameter is true, then we should search for 
  // the entire phrase that was entered; otherwise, we will split the
  // search string so that each word is searched for and highlighted
  // individually
  if (treatAsPhrase) {
    searchArray = [searchText];
  } else {
    searchArray = searchText.split(" ");
  }
  if (!doc.body || typeof(doc.body.innerHTML) == "undefined") {
    if (warnOnFailure) {
      alert("Sorry, for some reason the text of this page is unavailable. Searching will not work.");
    }
    return false;
  }  
  var bodyText = doc.body.innerHTML;
  for (var i = 0; i < searchArray.length; i++) {
    bodyText = this.doHighlight(bodyText, searchArray[i], highlightStartTag, highlightEndTag);
  }
  
  doc.body.innerHTML = bodyText;

  var css_animation = content.document.createElement("style");
  css_animation.setAttribute("type","text/css");
  css_animation.innerHTML = ".animationLiveHighlighting {-moz-animation: liveHighlight 1s linear infinite; animation: liveHighlight 1s linear infinite;} @-moz-keyframes liveHighlight {0%{border-width:1px;border-color:red; background-color:inherit;}50% {border-style: solid;border-width:3px;border-color:red;background-color:yellow;}100% {border-style: solid;border-width:1px;border-color:red;background-color:inherit;}}";
  doc.body.appendChild(css_animation);

  return true;
};*/
/*
recorro los elementos del nodo
1. Si es texto lo busco y reemplazo
2. si no es texto busco y reemplazo
*/
function searchText(a,b){
    var items = document.getElementsByTagName("*");
    //return false;
    for (var i = 0; i < items.length; i++) {
        //if( items[i].nodeType == 1 )
        //si es parrafo reemplaza
        if( items[i].nodeName == 'P' ){
          console.debug(items[i]);
          items[i].innerHTML = items[i].innerHTML.replace('The','<b>The</b>');
         // console.debug( doHighlight(items[i].innerHTML,'The') );
          //items[i].innerHTML = doHighlight(items[i].innerHTML,'The');
        }
        
        
    }
}