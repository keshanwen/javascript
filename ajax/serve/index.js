const http = require('http');

const server = http.createServer(function(request,response) {
  let data = '';

  response.setHeader("Access-Control-Allow-Origin", "*")
  /* 对于 Content-type 为 application/json de 跨域请求，还应设置如下请求头*/
  response.setHeader("Access-Control-Allow-Headers", "content-type, accept");

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

    // response.writeHead(200,{'Content-Type': 'text/html'})
    response.writeHead(200,{'Content-Type': 'application/json'})
 

    let responseData = method + ", "+ headers + ", "+ httpVersion+ ", "+requestUrl;
    response.end(responseData)
  })
})

server.listen(3000,function() {
  console.log('node server started')
})