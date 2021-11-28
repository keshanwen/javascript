// logs.js
// 小程序中的模块化开发遵循Comonjs(exports,require)
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad(options) {
    console.log(options,'options....logs')
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  }
})
