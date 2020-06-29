var obj = "books"; // đối tượng đã chọn 

// đổi ảnh của tiêu đề được chọn hiện tại
function choose(objClick) {
    // thay đổi ảnh của tiêu đề được chọn trước đó thành không được chọn
    document.getElementById(obj).innerHTML = "<img src=\"img/home/library_" + obj + ".png\">";
    document.getElementById(obj).setAttribute("onclick", "choose('" + obj + "')");
    obj = objClick;
    console.log("click receive " + objClick);
    document.getElementById(objClick).innerHTML = "<img src=\"img/home/library_" + objClick + "_choosed.png\">";
    document.getElementById(objClick).setAttribute("onclick", "");

    if (obj == "123") {
        document.getElementById("select_game").innerHTML='<a id="add_make_10" href="SubtractMake10.html">' 
        + '<img src="./img/home/SubtractMake10.png" alt/>'
        + '<br /> Subtract & Make 10'
        + '</a>';
    }
};