var obj = "books"; // đối tượng đã chọn 

// đổi ảnh của chủ đề được click
function choose(objClick) {
    // thay đổi ảnh của chủ đề được chọn trước đó thành không được chọn
    document.getElementById(obj).innerHTML = "<img src=\"./img/home/library_" + obj + ".png\">";
    document.getElementById(obj).setAttribute("onclick", "choose('" + obj + "')");

    // nếu chủ đề được chọn trước đó là 123 thì bỏ hiển thị 2 bài học
    if (obj == "123") {
        document.getElementById("select_game").innerHTML= "";
        document.getElementById("heading").innerHTML= "";
    }

    // gán obj = chủ đề đang chọn
    obj = objClick;
    console.log("click receive " + objClick);
    document.getElementById(objClick).innerHTML = "<img src=\"./img/home/library_" + objClick + "_choosed.png\">";
    document.getElementById(objClick).setAttribute("onclick", "");
    
    // nếu chủ đề đang chọn là 123 thì hiện ra 2 bài học
    if (obj == "123") {
        document.getElementById("heading").innerHTML= "Addition & Subtraction";
        document.getElementById("select_game").innerHTML= `<a class="lesson" href="./SubtractMake10.html"> 
            <img src="./img/home/SubtractMake10.png" alt/>
            <p> Subtract & Make 10</p>
        </a>
        <a class="lesson" href="./CrossDuck.html"> 
            <img src="./img/home/CrossDuck.png" alt/>
            <p> Cross Duck</p>
        </a>`;
    }
};