/* 

可以在<form> 和<inframe> 元素中使用跨域URL，而浏览器显示最终文档。但因为同源策略，浏览器不允许原始脚本查找跨域问文档的内容。
使用XMLHttprequest，文档内容都是通过 reponseText 属性暴露,所以同源策略不允许XMLHttpRequest进行跨域请求。（注意<script> 元素
并未真正受限于同源策略，它加载并执行任何来源的脚本）

cookie 和 http 身份验证立牌（token）通常不会作为请求的内容部分发送且任何作为跨域响应来接收的 cookie 都会被丢弃

*/
/* 
使用 script 元素发送jsonp请求
根据指定的url 发送一个jsonp 请求
然后把解析得到的响应数据传递给回调函数
在url 中添加一个名为jsonp 的查询参数，用于指定该请求的回调函数的名称

*/
function getJSONP(url,callback) {
    // 为本次请求创建一个唯一的回调函数名称
    let cbnum = 'cb' + getJSONP.counter++ // 每次自增计数器
    let cbname = 'getJSONP.' + cbnum      // 作为 JSONP 函数的属性

    // 将回调函数名称以表单编码的形式添加到url的查询部分中
    // 使用jsonp 作为参数，一些支持jsonp 的服务
    // 可能使用其他的参数名，比如callback
    if (url.indexof('?' === -1)) { // url 没有查询部分
        url += '?jsonp=' + cbname  // 作为查询部分添加参数
    } else {
        url += '&jsonp' + cbname   // 作为新的参数添加它
    }  

    // 创建script 元素用于发送请求
    let script = document.createElement('script')

    // 定义将被脚本执行的回调函数
    getJSONP[cbname] = function(response) {
        try {
            callback(response)
        } catch(error) {

        } finally {
            delete getJSONP[cbname]
            script.parentNode.removeChild(script)
        }
    }

    //立即触发HTTP 请求
    script.src = url // 设置脚本的URL
    document.body.appendChild(script) // 把它添加到文档中去
}

getJSONP.counter = 0 // 用于创建唯一的回调函数名称的计算器