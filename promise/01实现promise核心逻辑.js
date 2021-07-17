/* 

1,promis 就是一个类，在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行
2，promise 中有三种状态，分别为 成功 fulfilled 失败 rejected 等待 pending
 pending -> fulilled
 pending -> rejected
3, resolve 和rejected函数是用来更改状态的
resolve:fulilled
reject: rejected
4，then方法内部做的事情就是判断状态，如果状态是成功，调用成功的回调。如果状态是失败，调用失败的回调。
5，then成功回调有一个参数，表示成功之后的值，then失败回调有一个参数，表示失败后的原因 

*/

/* 三种状态 */
const PENDING = 'pending'
const FULFILLED = 'fuifilled'
const REJECTED = 'rejected'

/* 实现一个类 */
class MyPromise {
  // new 的时候传入一个参数,executor，该函数有两个形参，触发后面的回调
  constructor(executor) {
    // 初始化状态,一开始是等待种
    this.status = PENDING
    // 保存resolve中的值
    this.value = undefined
    // 保存rejected 中的值
    this.reason = undefined
    // 内置成功的回调,由executor的第一个形参执行触发
    this.reslove = (value) => {
      // 状态的不可更改性，一但从pending改变，那么在也不能更改状态
      if (this.status !== PENDING) return
      // 改变状态
      this.status = FULFILLED
      // 保存reslove传过来的值
      this.value = value 
    }
    // 内置失败的回调
    this.rejected = (reason) => {
      // 状态的不可更改性，一但从pending改变，那么在也不能更改状态
      if (this.status !== PENDING) return
      this.status = REJECTED
      this.reason = reason
    }
    // 执行executor
    try {
      executor(this.reslove,this.rejected)
    } catch(error) {
      this.rejected(error)
    }
  }

  // 往原型上添加then方法
  then(successCallback,failCallback) {
    // 由 resolve 执行，触发successCallback回调
    if (this.status === FULFILLED) {
      successCallback(this.value)
    } else if (this.status === REJECTED) {
      failCallback(this.reason)
    }
  }
}

const p = new MyPromise((res,rej) => {
  //res('success')
  rej('fail')
})

p.then((value) => {
  console.log(value)
},(reason) => {
  console.log(reason)
})

