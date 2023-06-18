/* 

当调用 send() 时，触发单各loadstart 事件。当正在加载服务器的响应时，XMLHttpRequest 对象会发生progress 事件
，通常每隔50毫秒左右，所以可以使用这些事件给用户反馈请求的进度，如果请求快速完成，它可能不会触发progress事件。
当事件完成，会触发load 事件。

一个完整的请求不一定时成功的请求。因为两人有可能返回 404

http 请求无法完成有3中情况
1， 请求超时  timeout 事件
2， 请求中止， 会触发 abort 事件
3， 网络错误...... error 事件

对于如何具体请求，浏览器只会触发load abort timeout error 事件中的一个

progress 事件有用的属性

loaded 是目前传输的字节数值
total 是Content-length 头传输的数据整体长度（单位是字节）,如果不知道内容长度则为0
lengthComputable 是否知道内容长度 

*/

if ('onprogress' in (new XMLHttpRequest)) {
    // 支持progress 事件
    request.onprogress = function(e) {
        if (e.lengthComputable) {
            ProgressEvent.innerHTML = Math.round(100*(e.loaded/e.total)) + '% 完成'
        }
    }
}

// 查找所有含有 'fileDropTarget' 类的元素
// 并注册DnD 事件处理程序使他们能响应文件的拖放
// 当文件放下时，上传他们到 data-uploadto 属性指定的URL
function whenReady() {
    let elts = document.getElementsByClassName("fileDropTarget")
    for (let i = 0; i < elts.length; i++) {
        let target = elts[i]
        let url = target.getAttribute('data-uploadto')
        if (!url) continue; 
        createFileUploadDropTarget(target, url)
    }

    function createFileUploadDropTarget(target, url) {
        // 跟踪当前是否正在上传，因此我们能拒绝放下
        // 我们可以处理多个并发上传
        // 但对这个列子使用进度通知太困难
        let uploading = false

        console.log(target, url)

        target.ondragenter = function() {
            console.log('dragenter')
            if (uploading) return // 如果正在忙，忽略拖放
            let types = e.dataTransfer.types
            if (types && ((types.contains && types.contains('Files'))) || (types.indexof && types.indexof('Files') !== -1)) {
                target.classList.add('wantdrop')
                return false
            }
        }

        target.ondragover = function(e) {
            if (!uploading) {
                return false
            }
        }

        target.ondragleave = function(e) {
            if (!uploading) {
                return false
            }
        }

        target.ondrop = function(e) {
            if (uploading) return false
            let files = e.dataTransfer.files
            if (files && files.length) {
                uploading = true
                let message = 'Uploading files: <ul>'
                for (let i = 0; i <files.length; i++) {
                    message += '<li>' + files[i].name + '</li>'
                }
                message += '</ul>'

                target.innerHTML = message
                target.classList.remove('wantdrop')
                target.classList.add('uploading')

                let xhr = new XMLHttpRequest()
                xhr.open('POST', url)
                let body = new FormData()
                for (let i = 0; i < files.length; i++) {
                    body.append(i, files[i])
                }
                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        target.innerHTML = message + Math.round((e.loaded / e.total) * 100) + '% 完成'
                    }
                }
                xhr.upload.onload = function(e) {
                    uploading = false
                    target.classList.remove('uploading')
                    target.innerHTML = 'Drop files to uload'
                }
                xhr.send(body)

                return false
            }
            target.classList.remove('wantdrop')
        }
    }
}