/* 
    调用 abort() 的主要原因时完成取消或者超时请求的耗时时间太长或当响应变的无关时
*/

/* 
    发起HTTP GET 请求获取指定URL的内容
    如果响应成功到达，传入responseText 给回调函数
    如果响应在timeout毫秒内没有到达，中止这个请求
    浏览器可能在abort()后触发'readyStatechange'
    如果是部分请求结果到达，甚至可能设置status属性
    所以需要设置一个标记，当部分且超时的响应到达时不会调用回调函数
    如果使用load就没有这个风险
*/

function timegGetText(url, timeout, callback) {
    let request = new XMLHttpRequest()
    let timedout = false
    let timer = setTimeout(() => {
        timedout = true
        request.abort()
    }, timeout)
    request.open('GET', url)
    request.onreadystatechange = function() {
        if(request.readyState !== 4) return
        if (timedout) return
        clearTimeout(timer)
        if (request.status === 200) {
            callback(request.responseText)
        }  
    }
    request.send(null)
}