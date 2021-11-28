var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var cx = canvas.width = 400;
var cy = canvas.height = 400;

/* context.beginPath()
context.moveTo(20,20) // 把路径移动到画布中的指定点，不创建线条。起点
context.lineTo(100,100) // 添加一个新点，然后再画布中创建从该点到最后指定点的线条
context.strokeStyle = '#fff'
context.stroke() */


/* context.beginPath()
context.lineTo(200,200)
context.lineTo(200,100)
context.lineTo(100,50)
context.strokeStyle = '#fff'
context.stroke() */

// 给绘制的直线添加样式
/* context.beginPath()


context.moveTo(10,10)
context.lineTo(100,100)
context.lineWidth = 10
context.lineCap = 'round' 
context.strokeStyle = '#fff'
context.stroke() */

// 绘制矩形
/* context.beginPath()
context.fillStyle = '#fff' // 设置填充的颜色
context.fillRect(10,10,100,100)  // 绘制一个实心矩形
context.strokeStyle = '#fff' // 设置描边的颜色
context.strokeRect(130,10,100,100) // 绘制一个空心矩形 */

// context.beginPath()
// context.arc(50,200,50,0,2*Math.PI,false)
// context.fillStyle = '#fff'
// context.shadowBlur = 20 // 模糊指数
// context.shadowColor = '#fff' // 模糊颜色
// context.fill()


// 设置渐变
/* var grd = context.createLinearGradient(0,0,0,400); // 创建线性渐变（用于在画布内容上）
grd.addColorStop(0,'rgb(255, 0, 0)'); // 规定渐变对象中的颜色和停止的位置
grd.addColorStop(0.2,'rgb(255, 165, 0)');
grd.addColorStop(0.3,'rgb(255, 255, 0)');
grd.addColorStop(0.5,'rgb(0, 255, 0)');
grd.addColorStop(0.7,'rgb(0, 127, 255)');
grd.addColorStop(0.9,'rgb(0, 0, 255)');
grd.addColorStop(1,'rgb(139, 0, 255)');

context.fillStyle = grd;
context.fillRect(0,0,400,400); */


// 图形转换
// context.strokeStyle = 'white'
// context.strokeRect(5,5,50,25)
// context.scale(2,2); // 缩放当前绘图至更大或更小
// context.strokeRect(5,5,50,25);
// context.scale(2,2);
// context.strokeRect(5,5,50,25);


// 旋转
context.fillStyle = 'white';
context.rotate(20*Math.PI/180);
context.fillRect(70,30,200,100);

// 图像变换的时候，我们需要将画布旋转，然后在绘制图形