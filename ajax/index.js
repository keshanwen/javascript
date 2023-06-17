/* let request = new XMLHttpRequest()

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

request.open('GET', 'http://localhost:3000/')

request.send(null) 
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


getData('http://localhost:3000/', {
    name: 'kebi', age: 18
}, (data) => {
    console.log(data, 'data~~~~~~~~~~~~~~~~')
})