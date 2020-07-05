// biến dữ liệu data_crossduck được lấy từ file data.js

var number_of_question = data_crossduck.number_of_question; // số câu hỏi
var info_question = data_crossduck.info_question; // thông tin các phép toán
var question = info_question[0];
var total_false_exp = 0; // đại diện tổng số lượng biểu thức sai đã được gạch
var number_false_exp = question.number_false_exp; // số biểu thức sai của câu hỏi

createQuestion(question);

createAudio();
var soundtrack = document.getElementById("soundtrack"); // nhạc nền
var true_answer = document.getElementById("true_answer"); // nhạc làm đúng
var false_answer = document.getElementById("false_answer"); // nhạc làm sai
var congratulations_audio = document.getElementById("congratulations_audio"); // nhạc khi hoàn thành bài

// tạo ra kết quả cần so sánh và các phép tính hiển thị trên mỗi con vịt theo thứ tự trái sang phải, trên xuống dưới
// tham số truyền vào: đối tượng chứa thông tin các biểu thức
function createQuestion(info_obj) {
    console.log("create question\n");
    document.getElementById("result_question").innerHTML = info_obj.result;
    document.getElementById("text_duck_top_left").innerHTML = info_obj.exp1;
    document.getElementById("text_duck_top").innerHTML = info_obj.exp2;
    document.getElementById("text_duck_top_right").innerHTML = info_obj.exp3;
    document.getElementById("text_duck_bottom_left").innerHTML = info_obj.exp4;
    document.getElementById("text_duck_bottom_right").innerHTML = info_obj.exp5;
};

//tạo nhạc cho game 
function createAudio() {
    document.getElementById("audio").innerHTML = `
    <!-- nhạc nền -->
    <audio id="soundtrack" autoplay loop>
        <source src="${data_crossduck.soundtrack}" type="audio/mpeg">
    </audio>
    <!-- nhạc thông báo kết quả đúng -->
    <audio id="true_answer" >
        <source src=${data_crossduck.true_answer} type="audio/mpeg">
    </audio>
    <!-- nhạc thông báo kết quả sai -->
    <audio id="false_answer" >
        <source src=${data_crossduck.false_answer} type="audio/mpeg">
    </audio>
    <!-- nhạc khi hoàn thành bài -->
    <audio id="congratulations_audio">
        <source src=${data_crossduck.congratulations_audio} type="audio/mpeg">
    </audio>`;
}

// gạch chéo đối tượng khi click vào biểu thức đúng
// tham số truyền vào: id dưới dạng string 
function cross(objClick) {
    document.querySelector(`#${objClick} img`);
    document.querySelector(`#${objClick} .cross`).classList.add("cross-selected");
};

// bỏ gạch chéo đối tượng
// tham số truyền vào: id dưới dạng string 
function deleteCross(objClick) {
    str = "check('" + objClick + "')";
    document.querySelector(`#${objClick} img`).setAttribute("onclick", str);
    document.querySelector(`#${objClick} .text`).setAttribute("onclick", str);
    document.querySelector(`#${objClick} .cross`).classList.remove("cross-selected");
};

// kiểm tra kết quả đúng hay sai
// tham số truyền vào: id dạng string
function check(objClick) {
    var result_of_exp;
    switch (objClick) {
        case "duck_top_left": 
            result_of_exp = eval(question.exp1);
            break;
        case "duck_top":
            result_of_exp = eval(question.exp2);
            break;
        case "duck_top_right":
            result_of_exp = eval(question.exp3);
            break;
        case "duck_bottom_left":
            result_of_exp = eval(question.exp4);
            break;
        case "duck_bottom_right":  
            result_of_exp = eval(question.exp5);
            break;
    }

    // nếu gạch đúng, tức gạch vào biểu thức có giá trị khác với số chuồng
    if (result_of_exp != question.result) {
        console.log("true !!!");
        true_answer.play();
        total_false_exp++;
        cross(objClick);
        console.log("cross " + objClick);
        document.querySelector(`#${objClick} img`).setAttribute("onclick", "");
        document.querySelector(`#${objClick} .text`).setAttribute("onclick", "");
        document.querySelector(`#${objClick} .cross`).classList.add("cross-selected");
        if (total_false_exp == number_false_exp) {
            if (question.index == number_of_question) {
                console.log("pass game");
                true_answer.pause();
                congratulations_audio.play();
                setTimeout(function(){ createCongratulations(); }, 3000);
            }
            else {
                setTimeout(function(){ 
                    createQuestion(question); 
                    deleteCross('duck_top_left');
                    deleteCross('duck_top');
                    deleteCross('duck_top_right');
                    deleteCross('duck_bottom_left');
                    deleteCross('duck_bottom_right');
                }, 3000);
                question = info_question[question.index]; // chuyển sang câu tiếp theo
                console.log("next qs");
                number_false_exp = question.number_false_exp;
                total_false_exp = 0;
            }
        }      
    }
    else {
        false_answer.play();
        console.log("cross false");
    }
};

function createCongratulations() {
    obj = document.getElementById("congratulations");
    obj.setAttribute("class", "congratulations_playing");
    obj.innerHTML = `<img id="congratulations_img" src="./img/congratulations.png" alt="">
    <img id="home_text" src="./img/button/home_text.png" onclick='window.location="./index.html";'>
    <img id="try_again_text" src="./img/button/try_again_text.png" onclick='window.location="./CrossDuck.html";'>`
}
