// dữ liệu json
// TODO: chuyen sang file data.json
var data_json = '{"background":"./img/background/background1.png","soundtrack":"./audio/sandypiano.mp3","true_audio":"./audio/reyaduet.mp3","false_audio":"./audio/peckpiano.mp3","home_button":"img/button/home3.png","submit_button":"img/button/submit.png","hint_video_button":"img/button/hint_video.png","teacher":{"img":"img/obj/teacher.png"},"number_of_question":3,"info_question":[{"index":1,"question":"5 - 3 = ?","result":2,"obj":"apple","number_obj":4},{"index":2,"question":"2 + 6 = ?","result":8,"obj":"cheese","number_obj":8},{"index":3,"question":"7 - 3 = ?","result":4,"obj":"apple","number_obj":6}]}';
var data = JSON.parse(data_json);
console.log(data);

var number_of_question = data.number_of_question; // số phép toán
var info_question = data.info_question; // thông tin các phép toán
var soundtrack = document.getElementById("soundtrack"); // nhạc nền
var true_answer = document.getElementById("true_answer"); // nhạc làm đúng
var false_answer = document.getElementById("false_answer"); // nhạc làm sai
var complete = false;

var obj = info_question[0];
console.log("info obj: " + obj.index + "\nqs: " + obj.question 
            + "\nobj: " + obj.obj + " " + obj.number_obj);
var total_obj = obj.number_obj; // đại diện tổng số lượng đối tượng chưa bị gạch
createQuestion(obj.question, obj.obj, obj.number_obj);

// tạo ra hoa quả hay con vật làm đơn vị tính toán, hiển thị trên web 
// tương ứng với số lượng đối tượng đề cho
function createQuestion(question, obj, num_obj) {
    console.log("createQs\n");
    var contentHtml = "";
    for(let i = 0; i < num_obj; i++) {
        console.log("obj" + (i+1) + "\n");
        contentHtml += "<div id=\"obj" + (i+1) + "\" class=\"obj\" onclick=\"crossLine('obj" + (i+1) + "')\">\n\t<img src=\"img/obj/"+ obj + ".png\">\n</div>"
                        + "\n";
    }
    document.getElementById("box_holder").innerHTML = contentHtml;
    document.getElementById("question").innerHTML = question;
};

// gạch chéo đối tượng khi click vào đối tượng chưa được gạch
function crossLine(objClick) {
    console.log("click receive " + objClick);
    document.getElementById(objClick).innerHTML = "<img src=\"img/obj/" + obj.obj + "_cross_line.png\">";
    document.getElementById(objClick).setAttribute("onclick", "deleteCrossLine('" + objClick +"')");
    total_obj--;
    console.log(total_obj);
};

// bỏ gạch chéo đối tượng khi click vào đối tượng đã được gạch
function deleteCrossLine(objClick) {
    console.log("click delete receive " + objClick);
    document.getElementById(objClick).innerHTML = "<img src=\"img/obj/" + obj.obj + ".png\">";
    document.getElementById(objClick).setAttribute("onclick", "crossLine('" + objClick +"')");
    total_obj++;
    console.log(total_obj);
}

// kiểm tra kết quả đúng hay sai
function checkResult() {
    soundtrack.pause();
    if (total_obj == obj.result) {
        console.log("true !!!");
        //true_answer.play();
        console.log("info obj: " + obj.index + "\nqs: " + obj.question 
            + "\nobj: " + obj.obj + " " + obj.number_obj);
        if (obj.index < number_of_question) {
            obj = info_question[obj.index]; // câu hỏi tiếp theo
            console.log("info obj: " + obj.index + "\nqs: " + obj.question 
            + "\nobj: " + obj.obj + " " + obj.number_obj);
            total_obj = obj.number_obj;
            createQuestion(obj.question, obj.obj, obj.number_obj);
        }
        else {
            window.location="PassGame.html";
            console.log("Congratulation!!!");
        }
    }
    else {
        console.log("lam lai di");
    }
};

function playVideo() {

    obj = document.querySelector(".video");

    videoHTML = document.createElement("video")
    videoHTML.setAttribute("src","./img/hint_video.mp4")
    videoHTML.setAttribute("autoplay","true")
    obj.classList.add("video_playing")
    // videoHTML = '<video src="./img/hint_video.mp4" autoplay></video>';
    obj.appendChild(videoHTML)
    // obj.setAttribute("onclick", "");
}

