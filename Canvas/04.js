/* 实现随计粒子 */

var ctx = document.getElementById('canvas'),
content = ctx.getContext('2d'),
round = [],
WIDTH,
HEIGHT,
initRoundPopulation = 80;

WIDTH = document.documentElement.clientWidth;
HEIGHT = document.documentElement.clientHeight;

ctx.width = WIDTH;
ctx.height = HEIGHT;


function Round_item(index,x,y) {
  this.index = index // 唯一的参数
  this.x = x // x 坐标
  this.y = y // y 坐标
  this.r = Math.random()*2 + 1 // 半径
  var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2; // 透明度
  this.color = "rgba(255,255,255," + alpha + ")"; 
}

Round_item.prototype.draw = function() {
  content.fillStyle = this.color
  content.shadowBlur = this.r * 2
  content.beginPath()
  content.arc(this.x,this.y,this.r,0,2 * Math.PI,false)
  content.closePath()
  content.fill()
}

function init() {
  for (var i = 0; i < initRoundPopulation;i++) {
    round[i] = new Round_item(i,Math.random() * WIDTH,Math.random() * HEIGHT);
    round[i].draw();
  }
}

init()