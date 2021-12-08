/* 

1, 开始，你需要创建路径的起点

2，然后使用画图命令去画出路径

3，之后把路径封闭

4，一旦路径生成，你就能通过描边或填充路径区域来渲染图形

*/

/* 
 beginPath()

 closePath()

 stroke()

 fill()


*/

/* ctx.beginPath()
ctx.moveTo(75,50) // 设置起点
ctx.lineTo(100,75)
ctx.lineTo(100,25)
ctx.fill() 
 */

// ?????? 为什么有直线
/* ctx.beginPath();
ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
// ctx.moveTo(110, 75);
ctx.arc(75, 75, 35, 0, Math.PI, false);   // 口(顺时针)
// ctx.moveTo(65, 65);
ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // 左眼
// ctx.moveTo(95, 65);
ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // 右眼
ctx.stroke(); */


// 填充三角形
/* ctx.beginPath()
ctx.moveTo(25,25)
ctx.lineTo(105,25)
ctx.lineTo(25,105)
ctx.fill() */

// 描边三角形
/* ctx.beginPath()
ctx.moveTo(125,125)
ctx.lineTo(125,45)
ctx.lineTo(45,125)
ctx.closePath()
ctx.stroke() */

/* 
ctx.beginPath()
ctx.arc(50,50,50, 0,Math.PI,true)
ctx.stroke()

ctx.beginPath()
ctx.arc(100,100,50, 0,Math.PI)
//ctx.stroke()
ctx.fill() */


ctx.rect(10,10,100,100)
ctx.stroke()