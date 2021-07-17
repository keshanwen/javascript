
const PENDING = 'pending'
const FULFILLED = 'fuifilled'
const REJECTED = 'rejected'


class MyPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    // 将所用成功回调存储起来
    this.successCallback = []
    // 将所有失败的回调存储起来
    this.failCallback = []
    this.reslove = (value) => {
      if (this.status !== PENDING) return
      this.status = FULFILLED
      this.value = value 
      // 循环执行成功的回调
      while( this.successCallback.length) {
        this.successCallback.shift()(this.value)
      }
    }
    this.rejected = (reason) => {
      if (this.status !== PENDING) return
      this.status = REJECTED
      this.reason = reason
      while (this.failCallback.length) {
        this.failCallback.shift()(this.reason)
      }
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
      // 将成功，失败的回调存储在数组中
      this.successCallback.push(successCallback)
      this.failCallback.push(failCallback)
    }
  }
}

const p = new MyPromise((res,rej) => {
  // setTimeout(() => {
  //   rej('失败')
  // },2000)
  setTimeout(() => {
    //res('成功')
    rej('失败')
  },0)
})

p.then((value) => {
  console.log(1)
  console.log(value)
},(reason) => {
  console.log(1)
  console.log(reason)
})


p.then((value) => {
  console.log(2)
  console.log(value)
},(reason) => {
  console.log(2)
  console.log(reason) 
})

p.then((value) => {
  console.log(3)
  console.log(value)
},(reason) => {
  console.log(3)
  console.log(reason)
})
