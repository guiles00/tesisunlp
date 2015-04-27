//Draggable Edit Window //===============================================//
var dragObj = null;
function draggable(id)
{
    var obj = document.getElementById(id);
    obj.style.position = "absolute";
    obj.onmousedown = function(){
            dragObj = obj;
    }
}
 
document.onmouseup = function(e){
    dragObj = null;
};

document.onmousemove = function(e){
    var x = e.pageX;
    var y = e.pageY;

    if(dragObj == null)
        return;

    dragObj.style.left = x +"px";
    dragObj.style.top= y +"px";
};


function mouseUpEditBox()
{
    window.removeEventListener('mousemove', moveEditBox, true);
}

function mouseDownEditBox(e){
  window.addEventListener('mousemove', moveEditBox, true);
}

function moveEditBox(e){
var div = document.getElementById('div_editor_container');
  div.style.position = 'absolute';
  div.style.top = e.clientY + 'px';
  div.style.left = e.clientX + 'px';
}


function addListenersEditBox(){
   document.getElementById('g_move_edit_box').addEventListener('mousedown', mouseDownEditBox, false);
    window.addEventListener('mouseup', mouseUpEditBox, false);

}
function removeListenersEditBox(){
    document.getElementById('g_header_title_id').removeEventListener('mousedown', mouseDownEditBox, false);
    window.removeEventListener('mouseup', mouseUpEditBox, false);

}