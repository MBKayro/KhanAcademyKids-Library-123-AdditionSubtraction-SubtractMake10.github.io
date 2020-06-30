var obj = "books"; // đối tượng đã chọn 

// đổi ảnh của tiêu đề được chọn hiện tại
function choose(objClick) {
    // thay đổi ảnh của tiêu đề được chọn trước đó thành không được chọn
    document.getElementById(obj).innerHTML = "<img src=\"img/home/library_" + obj + ".png\">";
    document.getElementById(obj).setAttribute("onclick", "choose('" + obj + "')");
    if (obj == "123") {
        document.getElementById("select_game").innerHTML= "";
        document.getElementById("heading").innerHTML= "";
    }
    obj = objClick;
    console.log("click receive " + objClick);
    document.getElementById(objClick).innerHTML = "<img src=\"img/home/library_" + objClick + "_choosed.png\">";
    document.getElementById(objClick).setAttribute("onclick", "");

    if (obj == "123") {
        document.getElementById("heading").innerHTML= "Addition & Subtraction";
        document.getElementById("select_game").innerHTML= '<a id="add_make_10" href="SubtractMake10.html">' 
        + '\n\t<img src="./img/home/SubtractMake10.png" alt/>'
        + '\n\t<p> Subtract & Make 10</p>'
        + '</a>';
    }
};