
const PENDING = 'pending'
const FULFILLED = 'fuifilled'
const REJECTED = 'rejected'


class MyPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    // 保存成功的回调
    this.successCallback = undefined
    // 保存失败的回调
    this.failCallback = undefined
    this.reslove = (value) => {
      if (this.status !== PENDING) return
      this.status = FULFILLED
      this.value = value 
      // 判断成功的回调是否存在,存在就执行
      this.successCallback && this.successCallback(this.value)
    }
    this.rejected = (reason) => {
      if (this.status !== PENDING) return
      this.status = REJECTED
      this.reason = reason
      // 判断失败的回调是否存在，存在就执行
      this.failCallback && this.failCallback(this.reason)
    }
    try {
      executor(this.reslove,this.rejected)
    } catch(error) {
      this.rejected(error)
    }
  }

  then(successCallback,failCallback) {
    if (this.status === FULFILLED) {
      successCallback(this.value)
    } else if (this.status === REJECTED) {
      failCallback(this.reason)
    } else {
      // 等待
      // 将成功的回调和失败的回调存储起来
      this.successCallback = successCallback
      this.failCallback = failCallback
    }
  }
}

const p = new MyPromise((res,rej) => {
  setTimeout(() => {
    //res('成功')
    rej('失败')
  },2000)
})

p.then((value) => {
  console.log(value)
},(reason) => {
  console.log(reason)
})

