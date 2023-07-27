/*
语句的前面有标签（label），相当于定位符，用于跳转到程序的任意位置，标签的格式如下。
label:
  语句

*/

// break命令后面加上了top标签（注意，top不用加引号），满足条件时，直接跳出双层循环。如果break语句后面不使用标签，则只能跳出内层循环，进入下一次的外层循环。
/* top:
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (i === 1 && j === 1) break top;
      console.log('i=' + i + ', j=' + j);
    }
  } */

// 标签也可以用于跳出代码块。
/* foo: {
  console.log(1);
  break foo;
}
console.log(2); */


top:
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (i === 1 && j === 1) continue top;
      console.log('i=' + i + ', j=' + j);
    }
  }