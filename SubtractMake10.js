// dữ liệu được lấy từ file data.js

var number_of_question = data.number_of_question; // số phép toán
var info_question = data.info_question; // thông tin các phép toán

var obj = info_question[0]; // thông tin câu hỏi
var total_obj = obj.number_obj; // đại diện tổng số lượng đối tượng chưa bị gạch

createQuestion(obj.question, obj.obj, obj.number_obj);

createAudio();
var soundtrack = document.getElementById("soundtrack"); // nhạc nền
var true_answer = document.getElementById("true_answer"); // nhạc làm đúng
var false_answer = document.getElementById("false_answer"); // nhạc làm sai
var congratulations_audio = document.getElementById("congratulations_audio"); // nhạc khi hoàn thành bài

// tạo ra hoa quả hay con vật làm đơn vị tính toán, hiển thị trên web 
// tương ứng với số lượng đối tượng đề cho
function createQuestion(question, obj, num_obj) {
    console.log("createQs\n");
    var contentHtml = "";
    for(let i = 0; i < num_obj; i++) {
        contentHtml += "<div id=\"obj" + (i+1) + "\" class=\"obj\" onclick=\"crossLine('obj" + (i+1) + "')\">\n\t<img src=\"./img/obj/"+ obj + ".png\">\n</div>"
                        + "\n";
    }
    document.getElementById("box_holder").innerHTML = contentHtml;
    document.getElementById("question").innerHTML = question;
};

//tạo nhạc cho game 
function createAudio() {
    console.log("Create audio\n");
    document.getElementById("audio").innerHTML = `
    <!-- nhạc nền -->
    <audio id="soundtrack" autoplay loop>
        <source src="${data.soundtrack}" type="audio/mpeg">
    </audio>
    <!-- nhạc thông báo kết quả đúng -->
    <audio id="true_answer" >
        <source src=${data.true_answer} type="audio/mpeg">
    </audio>
    <!-- nhạc thông báo kết quả sai -->
    <audio id="false_answer" >
        <source src=${data.false_answer} type="audio/mpeg">
    </audio>
    <!-- nhạc khi hoàn thành bài -->
    <audio id="congratulations_audio">
        <source src=${data.congratulations_audio} type="audio/mpeg">
    </audio>`;
}

// gạch chéo đối tượng khi click vào đối tượng chưa được gạch
function crossLine(objClick) {
    console.log("cross line " + objClick);
    document.getElementById(objClick).innerHTML = "<img src=\"./img/obj/" + obj.obj + "_cross_line.png\">";
    document.getElementById(objClick).setAttribute("onclick", "deleteCrossLine('" + objClick +"')");
    total_obj--;
};

// bỏ gạch chéo đối tượng khi click vào đối tượng đã được gạch
function deleteCrossLine(objClick) {
    console.log("click delete receive " + objClick + "\n");
    document.getElementById(objClick).innerHTML = "<img src=\"./img/obj/" + obj.obj + ".png\">";
    document.getElementById(objClick).setAttribute("onclick", "crossLine('" + objClick +"')");
    total_obj++;
}

// kiểm tra kết quả đúng hay sai
function checkResult() {
    if (total_obj == obj.result) {
        console.log("true answer!!!\n");
        true_answer.play();
        if (obj.index < number_of_question) {
            obj = info_question[obj.index]; // câu hỏi tiếp theo
            total_obj = obj.number_obj;
            document.getElementById("teacher_img").setAttribute("src", data.teacher.true_answer);
            setTimeout(function(){ 
                createQuestion(obj.question, obj.obj, obj.number_obj); 
                document.getElementById("teacher_img").setAttribute("src", data.teacher.thinking);
            }, 3000);
        }
        else {
            true_answer.pause();
            congratulations_audio.play();
            document.getElementById("teacher_img").setAttribute("src", data.teacher.true_answer);
            setTimeout(function(){ createCongratulations(); }, 3000);
        }
    }
    else {
        false_answer.play();
        document.getElementById("teacher_img").setAttribute("src", data.teacher.false_answer);
    }
};

// mở video gợi ý
function playVideo() {
    console.log("play video\n");
    soundtrack.pause();
    video_obj = document.getElementById("video");
    video_obj.innerHTML = `
                    <video src="`+ data.video + `" autoplay="true">
                    </video>
                    <img id="close_button" onclick="closeVideo()" src="./img/button/close.png">`;
    video_obj.setAttribute("class", "video video_playing");
    document.getElementById("hint_video").setAttribute("onclick", "");
}

// đóng video gợi ý khi click vào nút X
function closeVideo() {
    console.log("close video\n");
    soundtrack.play();
    video_obj = document.getElementById("video");
    video_obj.setAttribute("class", "video");
    video_obj.innerHTML = '';
    document.getElementById("hint_video").setAttribute("onclick", "playVideo()");
}

// tạo màn hình chúc mừng hoàn thành bài
function createCongratulations() {
    console.log("Create congras \n");
    congratulations_obj = document.getElementById("congratulations");
    congratulations_obj.setAttribute("class", "congratulations_playing");
    congratulations_obj.innerHTML = `<img id="congratulations_img" src="./img/congratulations.png" alt="">
    <img id="home_text" src="./img/button/home_text.png" onclick='window.location="./index.html";'>
    <img id="try_again_text" src="./img/button/try_again_text.png" onclick='window.location="./SubtractMake10.html";'>`
}