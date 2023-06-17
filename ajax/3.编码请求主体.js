/*  表单编码的请求

格式 name=kebi&age=18&like=basketball

MIME application/x-www-form-urlencoded

*/

function encodeFormData(data) {
    if (!data) return ''
    let paris = []
    for (let name in data) {
        if (!data.hasOwnProperty(name)) continue
        if (typeof data[name]  === 'function') continue
        let value = data[name].toString() // 把值换成字符串
        name = encodeURIComponent(name.replace('%20', '+'))
        value = encodeURIComponent(value.replace('%20', '+'))
        paris.push(name + '=' + value)
    }
    return paris.join('&')
}

function postData(url, data, callback) {
    let request = new XMLHttpRequest()
    request.open('POST', url)
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200 && callback) {
            callback(request)
        }
    }
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.send(encodeFormData(data))
}

function getData(url, data, callback) {
    let request = new XMLHttpRequest()
    request.open('GET', url + '?' + encodeFormData(data))
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200 && callback) {
            callback(request)
        }
    }
    request.send(null)
}