
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

  catch(failCallback) {
    return this.then(undefined,failCallback)
  }

  finally(callback) {
    return this.then( value => {
      return MyPromise.reslove(callback()).then( () => value)
    },reason => {
      return MyPromise.resolve(callback()).then( () => {
        throw reason
      })
    })
  }

  static all(array) {
    let result = []
    let index = 0
    // 返回一个promise
    return new MyPromise((resolve,reject) => {
      function addData(key,value) {
        result[key] = value
        index++
        if (index === array.length) {
          resolve(result)
        }
      }  
      for (let i = 0;i<array.length;i++) {
        let current = array[i]
        if (current instanceof MyPromise) {
          current.then( value => addData(i,value),
          reason => reject(reason))
        } else {
          addData(i,array[i])
        }
      }
    })

  }

  static resolve(value) {
    // 如果value是myPromise状态，那么将状态进行传下去
    if (value instanceof MyPromise) {
      return value
    }
    return new MyPromise(resolve => resolve(value))
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

new MyPromise((reslove,reject) => {
  reject('i am rejected....')
})
.then( (value) => {
  console.log(value)
}).catch( (reason) => {
  console.log(reason)
})

