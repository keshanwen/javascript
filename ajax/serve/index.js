const http = require('http');

const server = http.createServer(function(request,response) {
  let data = '';

  response.setHeader("Access-Control-Allow-Origin", "*")

  // 监听请求带来的数据
  request.on('data',function(chunk) {
    data += chunk
  })
  // 请求结束 
  request.on('end',function() {
    let method = request.method;
    let headers = JSON.stringify(request.headers);
    let httpVersion = request.httpVersion;
    let requestUrl = request.url;

    response.writeHead(200,{'Content-Type': 'text/html'})

    let responseData = method + ", "+ headers + ", "+ httpVersion+ ", "+requestUrl;
    response.end(responseData)
  })
})

server.listen(3000,function() {
  console.log('node server started')
})