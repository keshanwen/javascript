
const PENDING = 'pending'
const FULFILLED = 'fuifilled'
const REJECTED = 'rejected'


class MyPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.successCallback = []
    this.failCallback = []
    this.reslove = (value) => {
      if (this.status !== PENDING) return
      this.status = FULFILLED
      this.value = value 
      while( this.successCallback.length) {
        this.successCallback.shift()()
      }
    }
    this.rejected = (reason) => {
      if (this.status !== PENDING) return
      this.status = REJECTED
      this.reason = reason
      while (this.failCallback.length) {
        this.failCallback.shift()()
      }
    }
    try {
      executor(this.reslove,this.rejected)
    } catch(error) {
      this.rejected(error)
    }
  }

  then(successCallback,failCallback) {
    // 如果未传入了successCallback,那么将状态向下传递
    successCallback = successCallback ? successCallback : value => value
    failCallback = failCallback ? failCallback : reason => { throw reason }
     let promise2 = new MyPromise((resolve,rejected) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value)
            resolvePromise(promise2,x,resolve,rejected)
          } catch(error) {
            rejected(error)
          }
        },0) 
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason)
            resolvePromise(promise2,x,resolve,rejected)
          } catch(error) {
            rejected(error)
          }
        },0) 
      } else {
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value)
              resolvePromise(promise2,x,resolve,rejected)
            } catch(error) {
              rejected(error)
            }
          },0) 
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason)
              resolvePromise(promise2,x,resolve,rejected)
            } catch(error) {
              rejected(error)
            }
          },0) 
        })
      }
     })
     return promise2
  }
}

function resolvePromise(promise2,x,resolve,reject) {
  if (promise2 === x) {
    return reject(new TypeError('不能循环引用'))
  } 
  if (x instanceof MyPromise) {
    x.then(resolve,reject)
  } else {
    resolve(x)
  }
}

const p = new MyPromise((res,rej) => {
  //res('come on success')
  rej('failer....')
})

p.then()
.then()
.then()
.then( (value) => {
  console.log(value)
},(reason) => {
  console.log(reason)
})


