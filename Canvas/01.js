var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d') // 获取Canvas的上线文环境
var cx = canvas.width = 400  // 设置宽高
var cy = canvas.height = 400

context.beginPath() // 起始一条路径，或重置当前路径
// context.arc(100,100,50,0,Math.PI*2,true) // 创建圆弧
context.arc(100,100,1,0, Math.PI * 2, true)
context.closePath() // 创建从当前点回到起始点的路径

context.fillStyle = 'rgb(250,250,250)' // 设置填充绘画的颜色
context.fill() // 填充路径

