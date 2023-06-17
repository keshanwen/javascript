
/* 实例化对象 */
let request = new XMLHttpRequest()


/* 在ie6中 */
if (window.XMLHttpRequest === undefined) {
    window.XMLHttpRequest = function() {
        try {
            // 如果可用，则使用ActiveX对象的最新版本
            return new ActiveXObject("Msxml2.XMLHTTP.6.0")
        } catch(error1) {
            try {
                // 否则回退到旧的版本
                return new ActiveXObject("Msxml2.XMLHTTP.3.0")
            } catch(error2) {
                // 否则，抛错
                throw new Error("XMLHTTPRequest is not supported")
            }
        }
    }
}

/* 

一个 HTTP 请求部分由4部分组成

1, HTTP 请求方法或者动作

2, 正在请求的url

3, 一个可选的请求头集合，其中可能包括身份验证信息

4, 一个可选的请求主体

服务器返回的HTTP 响应包含3部分
1, 一个数字和文字组成的状态码，用来显示请求的成功和失败

2， 一个响应头集合

3， 响应主体


*/

/* 指定请求 */
request.open('GET', 'http://localhost:3000/')

/* 

如果有请求头的话。请求进程的下一个步骤是设置它。例如，POST 请求需要 'Content-Type' 头指定请求主题的MIME类型
request.setRequestHeader("Content-Type": "text/plain")

如果对相同的头设置多次，新值不会取代之前指定的值，相反，HTTP请求将包含这个头的多各副本或这个头将指定多各值
*/


/* 
GET 请求绝对没有主体，所以应该传递null 或者省略这个参数。POST 请求通常有主体，同时它应该匹配使用
setRequestHeader()指定的Content-Type 头
*/
request.send(null)


/* 使用post 方法发送纯文本给服务器 */
function postMessage(msg) {
    let request = new XMLHttpRequest() // 新请求
    request.open('POST', 'http://localhost:3000/') // 用post向服务器端发送脚本
    request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8') // 请求主体是纯文本
    request.send(msg)
}