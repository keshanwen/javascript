/* 
一个完整的http 响应由状态码，响应头集合和响应主体组成

状态码 status statusText 

响应头集合 查询响应头 getResponseHeader()   getAllResponseHeaders()

响应主体  responseText 得到文本形式   responseXML 得到Document形式


readyState 是一个整数，它指定了HTTP请求的状态

UNSENT                          0       open()尚未调用 
 
OPENED                          1       open()已调用

HEADERS_RECEIVED                2       接收到头信息

LOADING                         3       接收到响应主体

DONE                            4        响应完成


当readState值改变成4或服务器响应完成时，所有的浏览器都触发readyStatechange 事件，因为在响应完成之前也会触发事件，
所以事件处理程序应该一直检验 readyState 值

*/

// 获取HTTP 响应的onreadystatechange 事件
function getText(url, callback) {
    let request = new XMLHttpRequest()
    request.open('GET', 'http://localhost:3000/')
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            let type = request.getResponseHeader('Content-Type')
            if (type.match(/^text/)) { // 确保响应是文本
                callback(request.responseText)
            }
        }
    }
    request.send(null)
}

// 同步响应
function getTextSync(url) {
    let request = new XMLHttpRequest()
    request.open('GET', url, false)
    request.send(null)

    if (request.status !== 200) throw new Error(request.statusText)

    let type = request.getResponseHeader('Content-Type')

    if (!type.match(/^text/)) {
        throw new Error('Expected textual response; got' + type)
    }

    return request.responseText
}

// 响应解码
function get(url, callback) {
    let request = new XMLHttpRequest()
    request.open('GET', url)
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            let type = request.getResponseHeader('Content-Type')
            if (type.indexOf('xml') !== -1 && request.responseXML) {
                callback(request.responseXML)
            } else if(type === 'application/json') {
                callback(JSON.parse(request.responseText))
            } else {
                callback(request.responseText)
            }
        }
    }

    request.send(null)
}

/* 
<script> 元素可以发起跨域请求，而XMLHttpRequest api 则禁止

服务器响应的正常解码是假设服务器为这个响应发送了 Content-Type 头和正确的MIME类型

不要把响应作为xml文档处理
request.overrideMimeType('text/plain;charset=utf-8)

*/