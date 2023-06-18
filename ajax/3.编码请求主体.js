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

/* 
JSON 编码的请求
*/

function getJSON(url, data, callback) {
    let request = new XMLHttpRequest()
    request.open('POST',url)
    request.setRequestHeader('Content-Type', 'application/json')
    request.send(JSON.stringify(data))


    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200 && callback) {
            callback(request)
        }
    }
}


{/* <query>
    <find zipcode="01234" radius="1km">
        pizza
    </find>
</query> */}

/* xml 编码请求 */
function postQuery(url, what, where, radius, callback) {
    let request = new XMLHttpRequest()
    request.open('POST', url)
    request.onreadystatechange = function() {
        if (request.readyState === 4 && callback) {
            callback(request)
        }
    }

    let doc = document.implementation.createDocument('', 'query', null)
    let query = doc.documentElement
    let find = doc.createElement('find')
    query.appendChild(find)
    find.setAttribute('zipcode', where)
    find.setAttribute('radius', radius)
    find.appendChild(doc.createTextNode(what))

    /* 现在向服务器发送xml 编码的数据
        注意自动设置Content-Type 头
    */
   request.send(doc)
}

/* 上传文件 
    允许向 send() 方法传入任何的Blob对象（二进制），如果没有显式设置Content-Type头，这个Blob 对象的 type 属性
    用于设置待上传的Content-Type 头
*/

/* multipart/form-data 
可以将 字符串， File 或Blob 对象添加到请求中
*/
function postFormData(url, data, callback) {
    let request = new XMLHttpRequest()
    request.open('POST', url)
    request.onreadystatechange = function() {
        if(request.readyState === 4 && callback) {
            callback(request)
        }
    }

    let formdata = new FormData()
    for (let name in data) {
        if (!data.hasOwnProperty(name)) continue
        let value = data[name]
        if (typeof value === 'function') continue
        formdata.append(name, value)
    }

    // 在multi/form-data 请求主体中发送名/健对
    // 每对都是请求的一个部分，注意，当传入FormData 对象时
    // send() 会自动设置Content-Type 头
    request.send(formdata)
}

