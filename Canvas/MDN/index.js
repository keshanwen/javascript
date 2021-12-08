var canvas = document.getElementById('my-canvas')


if (canvas.getContext('2d')) {
  // 获取渲染上下文和它的绘画功能
  var ctx = canvas.getContext('2d')
} else {
  window.alert('啊哦，我不支持canvas')
}