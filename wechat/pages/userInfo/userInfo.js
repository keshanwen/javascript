// pages/userInfo/userInfo.js
/* 如何获取用户信息？授权弹框如何出现？ */
/* 如何知道是否登录了呢？ */
/* 是要先登录了，在通过接口去获取其他信息吗？ */
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload....userinfo')
    /* wx.getUserInfo 这种方式现在不会弹出授权的弹框，所以说如果没有授权还是拿不到数据 */
    /* 判断用户是否授权 */
    wx.getSetting({
      //withSubscriptions: true,
      success(res) {
        /* 为什么一进来就授权了 */
        console.log(res,'是否授权。。。。。')
      }
    })
  },

  /* 获取用户信息的回调 */
  onGetUserInfo(e) {
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onshow.....userinfo')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onhide.....userinfo')
  },

  /**
   * 生命周期函数--监听页面卸载
   * 什么时候页面会卸载？？？
   */
  onUnload: function () {
    console.log('onunload.....uerinfo')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /* 页面路由的几种跳转方式，注意其触发的钩子 */
  toOther() {
    console.log('to....')
    wx.reLaunch({
      url: '../index/index.js',
      success: function(res) {
        console.log(res,'tourlCallback')
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  }
})




/* 
事件

冒泡 bind

阻止冒泡 catch

*/