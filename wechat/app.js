// app.js
App({
  /* 小程序启动（全局只调用一次） */
  onLaunch() {
    console.log('onlanch.....')
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录 ？？？？？？
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res,'app.js')
      }
    })
  },
  // ？？？？？固定写法吗？
  globalData: {
    userInfo: null
  },
  /* 初始化完成，从后台切换到前台？？？？ */
  onShow() {
    console.log('onShow.......')
  },
  /* 从前台切换到后台 ???????*/
  onHide() {
    console.log('onHide.....')
  }
})
