window.onload = function(){
var el = document.getElementById('agregar_notas');
el.addEventListener('click',handler,false);

	function handler(){
		console.log('click');
		
		var el = document.getElementById('xpath_notas');
		var el_com = document.getElementById('comentario_notas');

		var xpath = el.value;
		

    var iterator = document.evaluate(xpath,document,null,0,null);
    var node = iterator.iterateNext();
    console.debug(node);
    //agrego label
    var label = document.createElement('p');
    //label.style.cssText = "display: block;";
    label.innerHTML = el_com.value;
    console.debug(node.nextSibling);
    node.parentNode.insertBefore(label,node.nextSibling)
	}
}