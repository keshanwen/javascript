
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
        // 这里不用传值了，因为下面传过了
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
    // 因为then可以链式调用,说明then返回的也是promise实例
     let promise2 = new MyPromise((resolve,rejected) => {
      if (this.status === FULFILLED) {
        // 这里为什么用加,settimeout呢?因为下面的resolvePromise要用到promise2
        // 如果不加settimeout让其变为异步代码，那么就拿不到因为下面的resolvePromise要用到promise2
        // 让同步代码执行完，为了拿到promise2
        setTimeout(() => {
          try {
            // 如何将上一个then返回的值，传统给下一个then回调呢?
            // 拿到上一个then的回调结果
            let x = successCallback(this.value)
            // 将结果传统给下一个then
            //resolve(x) 
            resolvePromise(promise2,x,resolve,rejected)
          } catch(error) {
            rejected(error)
          }
        },0) 
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            // 如何将上一个then返回的值，传统给下一个then回调呢?
            // 拿到上一个then的回调结果
            let x = failCallback(this.reason)
            // 将结果传统给下一个then
            //resolve(x) 
            resolvePromise(promise2,x,resolve,rejected)
          } catch(error) {
            rejected(error)
          }
        },0) 
      } else {
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              // 如何将上一个then返回的值，传统给下一个then回调呢?
              // 拿到上一个then的回调结果
              let x = successCallback(this.value)
              // 将结果传统给下一个then
              //resolve(x) 
              resolvePromise(promise2,x,resolve,rejected)
            } catch(error) {
              rejected(error)
            }
          },0) 
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              // 如何将上一个then返回的值，传统给下一个then回调呢?
              // 拿到上一个then的回调结果
              let x = failCallback(this.reason)
              // 将结果传统给下一个then
              //resolve(x) 
              resolvePromise(promise2,x,resolve,rejected)
            } catch(error) {
              rejected(error)
            }
          },0) 
        })
      }
     })
     // 返回给then
     return promise2
  }
}

function resolvePromise(promise2,x,resolve,reject) {
  /* 
  判断 x 的值是普通值还是promise对象
  如果是普通值直接调用 resolve reject
  如果是Promis对象 查看promise对对象返回的结果
  再根据promise对象返回的结果 决定调用resolve 还是调用reject
  
  */
  if (promise2 === x) {
    return reject(new TypeError('不能循环引用'))
  } 
  if (x instanceof MyPromise) {
    // promise对象
    // 状态传递
    //x.then( value => resolve(value), reason => reject(reason))
    x.then(resolve,reject)
  } else {
    // 普通值
    resolve(x)
  }
}

const p = new MyPromise((res,rej) => {
  //throw new Error('executor error')
  //res('成功')
  setTimeout(() => {
    rej('失败')
  },2000)
})

function other() {
  return new MyPromise((res,rej) => {
    res('i am other success')
  })
}

const p1 = p.then((value) => {
  //throw new Error('then error')
  console.log(1)
  console.log(value)
 // return p1
 return other()
},(reason) => {
  console.log(1)
  console.log(reason)
  return 'i come from cacth1'
})

p1.then( (value) => {
  console.log(value,2)
},(reason) => {
  console.log(reason,2)
})



