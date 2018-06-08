//index.js
let WxParse = require('../wxParse/wxParse.js');
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    newsData: [],
    self : ''    
  },



  onLoad: function () {
    this.getNewData();
  },
  // 初始化新闻
  getNewData: function () {
    let self = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/',
      data: {
        appId: 578080,  // 查询PUBG
        count: 10,
        // maxlength: 1000,
        format: 'json'
      },
      success: res => {
        console.log(res)
        let newsItems = [];
        if (res.statusCode == 200) {
          newsItems = res.data.appnews.newsitems;
          newsItems.forEach(function (v, i) {
            // 日期格式化 补000
            v.fmtDate = util.formatTime(new Date(parseInt(v.date + '000')))
            // 对于返回的html片段做处理
            WxParse.wxParse('article' + i, 'html', v.contents, self, 5);
          });        

          this.setData({
            newsData: newsItems,
            self: this.data
          })
          wx.hideLoading();
          wx.stopPullDownRefresh();
        }
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getNewData();
  }
})
