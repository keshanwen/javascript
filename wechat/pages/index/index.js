// index.js
// 获取应用实例
const app = getApp()


/* 小程序文件作用域：页面文件会覆盖app.js文件；每个文件夹下的js是独立的 */
Page({
  // 绑定数据（相当于vue中的data）
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /* 页面加载（一次）???不是一到这个页面就执行这个钩子吗 ？？？*/
  onLoad(options) {
    console.log(options,'opitons...')
    console.log('onload...页面加载....index.js')
    if (wx.getUserProfile) {
      // 修改数据（类此于react中的setData()）
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    // eventChannel.on('acceptDataFromOpenerPage', function(data) {
    //   console.log(data,'index...js')
    // })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /* 页面显示 (切切前台) ???????*/
  onShow() {
    console.log('onshow......页面显示....index.js')
  },
  /* 页面就绪（一次） */
  onReady() {
    console.log('onready......页面就绪')
  },
  /* 页面隐藏(切换后台) ?????????????????*/
  onHide() {
    console.log('onhide.....页面隐藏.....index.js')
  },
  /* 页面卸载（一次） */
  onUnload() {
    console.log('onunload.....页面卸载')
  }
})
