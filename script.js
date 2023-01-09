var canvas = document.getElementById("canvas");
var width  = window.innerWidth;
var height = window.innerHeight;
var space_constant = 4;
if(width>height){
    canvas.height = height*.65;
    canvas.width = canvas.height*2/3**.5;
}
else{
    canvas.width=.95*width;
    canvas.height=canvas.width*.5*3**.5;
}
canvas.height = canvas.height+space_constant*2;
canvas.width = canvas.width+space_constant*2;

function graph(){
    if(sessionStorage.getItem("last")==null){
        sessionStorage.setItem("last", canvas.width/2+","+space_constant);
    }
    var lastPoint = sessionStorage.getItem("last");
    var old_width = parseFloat(lastPoint.split(",")[0])
    var old_height = parseFloat(lastPoint.split(",")[1])
    var points = [
        [space_constant,canvas.height-space_constant],
        [canvas.width-space_constant,canvas.height-space_constant],
        [canvas.width/2, space_constant]
    ];
    var selected = points[Math.floor(Math.random() * 3)];
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#3370d4";
    ctx.beginPath();
    ctx.arc((old_width+selected[0])/2,(old_height+selected[1])/2,1,0,2*Math.PI, true)
    ctx.fill()
    ctx.stroke()
    sessionStorage.setItem("last",(old_width+selected[0])/2+","+(old_height+selected[1])/2);
    document.getElementById("counter").innerHTML = parseFloat(document.getElementById("counter").innerHTML)+1;
}

document.getElementById("addButton").onclick=()=>{
    for(let i=0; i<document.getElementById("step").value; i++){
        graph()
    }
};

function inputResponse(changed, update){
    var newValue = document.getElementById(changed).value;
    document.getElementById(update).value = newValue;
    if(document.getElementById("chechbox").checked){
        clearInterval(sessionStorage.getItem("id"));
        var intervalID = setInterval(graph, 1000/newValue);
        sessionStorage.setItem("id",intervalID);
    }
}

var checkbox = document.getElementById("chechbox");

checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        var speed = 1000/document.getElementById("step").value;
        var intervalID = setInterval(graph, speed);
        sessionStorage.setItem("id",intervalID);
    } 
    else {
        clearInterval(sessionStorage.getItem("id"));
    }
});
