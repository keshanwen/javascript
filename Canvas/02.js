var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var cx = canvas.width = 400;
var cy = canvas.height = 400;

context.beginPath();
context.arc(100, 100, 50, 0, Math.PI * 0.5, false);
context.closePath()
context.strokeStyle="white";
context.stroke(); // 描边

/* 
stroke() 描边

fill() 填充
*/