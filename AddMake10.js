/**
 * xử lý thao tác click chuột
 */
var img_cross_line = '<img src="img/obj/apple_cross_line.png">';
var total_obj = 4; 

function crossLine(objClick) {
    console.log("click receive " + objClick);
    var obj = document.getElementById(objClick);
    obj.innerHTML = img_cross_line;
    total_obj--;
}

