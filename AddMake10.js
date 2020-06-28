/**
 * xử lý thao tác click chuột
 */
var img_cross_line = '<img src="img/obj/apple_cross_line.png">';
var total_obj = 4; 
var result_of_question = 2;
var soundtrack = document.getElementById("soundtrack");
var true_answer = document.getElementById("true_answer");
var false_answer = document.getElementById("false_answer");

// xử lý gạch chéo đối tượng đã chọn
function crossLine(objClick) {
    console.log("click receive " + objClick);
    var obj = document.getElementById(objClick);
    obj.innerHTML = img_cross_line;
    total_obj--;
}

// kiểm tra kết quả đúng hay sai
function checkResult() {
    soundtrack.pause();
    if (total_obj == result_of_question) {
        console.log("Congratulation!!!");
        //window.location="PassGame.html";
        true_answer.play();
    }
    else {
        console.log("lam lai di");
    }
}

